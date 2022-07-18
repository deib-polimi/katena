
import type { JsonFragment } from '@ethersproject/abi';
import chalk from 'chalk';
import Table from 'cli-table';
import { constants, Contract, utils } from 'ethers';
import fetch from 'node-fetch';
import readline from 'readline';
import DiamondCutFacetABI from './DiamondCutFacet.json';
import DiamondLoupeFacetABI from './DiamondLoupeFacet.json';
import OwnershipFacetABI from './OwnershipFacet.json';

export const enum FacetCutAction {
  Add = 0,
  Replace = 1,
  Remove = 2,
}

export function toSignature(abiElement: unknown): string {
  return utils.Fragment.fromObject(abiElement as JsonFragment).format();
}

const signaturesToIgnore = [
  ['DFArtifactFacet$', 'supportsInterface(bytes4)'],
] as const;

export function isIncluded(contractName: string, signature: string): boolean {
  const isIgnored = signaturesToIgnore.some(([contractNameMatcher, ignoredSignature]) => {
    if (contractName.match(contractNameMatcher)) {
      return signature === ignoredSignature;
    } else {
      return false;
    }
  });

  return !isIgnored;
}

interface FacetCut {
  facetAddress: string;
  action: FacetCutAction;
  functionSelectors: string[];
}

interface Facet {
  facetAddress: string;
  functionSelectors: string[];
}

interface HasInterface {
  interface: utils.Interface;
}

interface Changeset {
  added: [string, string][]; 
  replaced: [string, string][];
  ignored: [string, string][]; 
  removed: string[];
}

interface SelectorDiff {
  add: string[];
  replace: string[];
}

interface FourBytesJson {
  count: number;
  results: {
    id: number;
    text_signature: string;
  }[];
}

export class DiamondChanges {
  private changes: Changeset;

  private previous?: Facet[];

  constructor(previous?: Facet[]) {
    this.previous = previous;

    this.changes = {
      added: [],
      replaced: [],
      ignored: [],
      removed: [],
    };
  }

 
  public getFacetCuts(contractName: string, contract: Contract): FacetCut[] {
    const facetCuts = [];

    if (this.previous) {
      const diff = this.diffSelectors(contractName, contract, this.previous);

      if (diff.add.length > 0) {
        facetCuts.push({
          facetAddress: contract.address,
          action: FacetCutAction.Add,
          functionSelectors: diff.add,
        });
      }
      if (diff.replace.length > 0) {
        facetCuts.push({
          facetAddress: contract.address,
          action: FacetCutAction.Replace,
          functionSelectors: diff.replace,
        });
      }
    } else {
      facetCuts.push({
        facetAddress: contract.address,
        action: FacetCutAction.Add,
        functionSelectors: this.getSelectors(contractName, contract),
      });
    }

    return facetCuts;
  }

 
  public getRemoveCuts(cuts: FacetCut[]): FacetCut[] {
    if (!this.previous) {
      throw new Error('You must construct DiamondChanges with previous cuts to find removals');
    }
    const functionSelectors = cuts.flatMap((cut) => cut.functionSelectors);

    const seenSelectors = new Set(functionSelectors);

    const toRemove = [] as string[];
    for (const { functionSelectors } of this.previous) {
      for (const selector of functionSelectors) {
        if (!seenSelectors.has(selector) && !this.isDiamondSpecSelector(selector)) {
          toRemove.push(selector);
          this.changes.removed.push(selector);
        }
      }
    }

    const removeCuts = [];

    if (toRemove.length) {
      removeCuts.push({
        facetAddress: constants.AddressZero,
        action: FacetCutAction.Remove,
        functionSelectors: toRemove,
      });
    }

    return removeCuts;
  }

  
  public async verify(): Promise<boolean> {
    const table = new Table({
      head: ['Change', 'Signature', 'Facet'],
      style: {
        head: undefined,
      },
    });

   
    for (const [contractName, signature] of this.changes.ignored) {
      table.push([chalk.gray('Ignored'), signature, contractName]);
    }

    for (const [contractName, signature] of this.changes.replaced) {
      table.push([chalk.green('Replaced'), signature, contractName]);
    }

    for (const [contractName, signature] of this.changes.added) {
      table.push([chalk.blue('Added'), signature, contractName]);
    }

    for (const selector of this.changes.removed) {
      const signature = await this.lookupSelector(selector);
      table.push([chalk.red('Removed'), signature, '']);
    }

    if (table.length > 0) {
      console.log(table.toString());
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      return new Promise((resolve) => {
        rl.question('Review the table of Diamond changes. Proceed with upgrade? yN ', (answer) => {
          if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    } else {
      table.push(['None', '', '']);
      console.log(table.toString());
      return false;
    }
  }

  private getSignatures(contract: HasInterface): string[] {
    return Object.keys(contract.interface.functions);
  }

  private getSelector(contract: HasInterface, signature: string): string {
    return contract.interface.getSighash(signature);
  }

  private getSelectors(contractName: string, contract: HasInterface): string[] {
    const signatures = this.getSignatures(contract);
    const selectors: string[] = [];

    for (const signature of signatures) {
      if (isIncluded(contractName, signature)) {
        selectors.push(this.getSelector(contract, signature));
        this.changes.added.push([contractName, signature]);
      }
    }

    return selectors;
  }

  private diffSelectors(
    contractName: string,
    contract: HasInterface,
    previous: Facet[]
  ): SelectorDiff {
    const signatures = this.getSignatures(contract);

    const diff: SelectorDiff = { add: [], replace: [] };

    for (const signature of signatures) {
      if (isIncluded(contractName, signature)) {
        const selector = contract.interface.getSighash(signature);
        const selectorExists = previous.some(({ functionSelectors }) => {
          return functionSelectors.some((val) => selector === val);
        });
        if (selectorExists) {
          this.changes.replaced.push([contractName, signature]);
          diff.replace.push(selector);
        } else {
          this.changes.added.push([contractName, signature]);
          diff.add.push(selector);
        }
      } else {
        this.changes.ignored.push([contractName, signature]);
      }
    }

    return diff;
  }

  private isDiamondSpecSelector(selector: string): boolean {
    const diamondCutFacetInterface = Contract.getInterface(DiamondCutFacetABI);
    const diamondLoupeFacetInterface = Contract.getInterface(DiamondLoupeFacetABI);
    const ownershipFacetInterface = Contract.getInterface(OwnershipFacetABI);

    const diamondCutSignatures = this.getSignatures({ interface: diamondCutFacetInterface });
    const diamondLoupeSignatures = this.getSignatures({ interface: diamondLoupeFacetInterface });
    const ownershipSignatures = this.getSignatures({ interface: ownershipFacetInterface });
    return [
      ...diamondCutSignatures.map((signature) => diamondCutFacetInterface.getSighash(signature)),
      ...diamondLoupeSignatures.map((signature) =>
        diamondLoupeFacetInterface.getSighash(signature)
      ),
      ...ownershipSignatures.map((signature) => ownershipFacetInterface.getSighash(signature)),
    ].includes(selector);
  }

  private async lookupSelector(selector: string): Promise<string> {
    const fallbackMsg = `${selector} (unable to find a signature)`;

    try {
      const response = await fetch(
        `https://www.4byte.directory/api/v1/signatures/?hex_signature=${selector}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const json: FourBytesJson | undefined = await response.json();

      if (json && json.count > 0) {
        return json.results.flatMap((result) => result.text_signature).join(' | ');
      } else {
        return fallbackMsg;
      }
    } catch {
      return fallbackMsg;
    }
  }
}
