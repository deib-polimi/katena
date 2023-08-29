/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  Implementation1,
  Implementation1Interface,
} from "../../contracts/Implementation1";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "factor",
        type: "uint256",
      },
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractVersion",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initial_count",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061024b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806306661abd1461005c5780631003e2d2146100775780638aa104351461008c578063a87d942c14610093578063fe4b84df1461009b575b600080fd5b61006560015481565b60405190815260200160405180910390f35b61008a6100853660046101d5565b6100ae565b005b6001610065565b600154610065565b61008a6100a93660046101d5565b6100c2565b806001546100bc91906101ee565b60015550565b600054610100900460ff16158080156100e25750600054600160ff909116105b806100fc5750303b1580156100fc575060005460ff166001145b6101635760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840160405180910390fd5b6000805460ff191660011790558015610186576000805461ff0019166101001790555b600182905580156101d1576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050565b6000602082840312156101e757600080fd5b5035919050565b8082018082111561020f57634e487b7160e01b600052601160045260246000fd5b9291505056fea264697066735822122042de7e40842317b6f56323920cf22eb7ead6c6896524b83444a691f80aa84ee464736f6c63430008120033";

type Implementation1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Implementation1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Implementation1__factory extends ContractFactory {
  constructor(...args: Implementation1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Implementation1 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Implementation1__factory {
    return super.connect(runner) as Implementation1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Implementation1Interface {
    return new Interface(_abi) as Implementation1Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): Implementation1 {
    return new Contract(address, _abi, runner) as unknown as Implementation1;
  }
}