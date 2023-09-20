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
import type { NonPayableOverrides } from "../../../../../common";
import type {
  ERC721,
  ERC721Interface,
} from "../../../../../@openzeppelin/contracts/token/ERC721/ERC721";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001358380380620013588339810160408190526200003491620001db565b81516200004990600090602085019062000068565b5080516200005f90600190602084019062000068565b50505062000282565b828054620000769062000245565b90600052602060002090601f0160209004810192826200009a5760008555620000e5565b82601f10620000b557805160ff1916838001178555620000e5565b82800160010185558215620000e5579182015b82811115620000e5578251825591602001919060010190620000c8565b50620000f3929150620000f7565b5090565b5b80821115620000f35760008155600101620000f8565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013657600080fd5b81516001600160401b03808211156200015357620001536200010e565b604051601f8301601f19908116603f011681019082821181831017156200017e576200017e6200010e565b816040528381526020925086838588010111156200019b57600080fd5b600091505b83821015620001bf5785820183015181830184015290820190620001a0565b83821115620001d15760008385830101525b9695505050505050565b60008060408385031215620001ef57600080fd5b82516001600160401b03808211156200020757600080fd5b620002158683870162000124565b935060208501519150808211156200022c57600080fd5b506200023b8582860162000124565b9150509250929050565b600181811c908216806200025a57607f821691505b602082108114156200027c57634e487b7160e01b600052602260045260246000fd5b50919050565b6110c680620002926000396000f3fe608060405234801561001057600080fd5b50600436106100af5760003560e01c806301ffc9a7146100b457806306fdde03146100dc578063081812fc146100f1578063095ea7b31461011c57806323b872dd1461013157806342842e0e146101445780636352211e1461015757806370a082311461016a57806395d89b411461018b578063a22cb46514610193578063b88d4fde146101a6578063c87b56dd146101b9578063e985e9c5146101cc575b600080fd5b6100c76100c2366004610c18565b6101df565b60405190151581526020015b60405180910390f35b6100e4610231565b6040516100d39190610c8d565b6101046100ff366004610ca0565b6102c3565b6040516001600160a01b0390911681526020016100d3565b61012f61012a366004610cd5565b6102ea565b005b61012f61013f366004610cff565b610405565b61012f610152366004610cff565b610436565b610104610165366004610ca0565b610451565b61017d610178366004610d3b565b610485565b6040519081526020016100d3565b6100e461050b565b61012f6101a1366004610d56565b61051a565b61012f6101b4366004610da8565b610529565b6100e46101c7366004610ca0565b610561565b6100c76101da366004610e83565b6105d5565b60006001600160e01b031982166380ac58cd60e01b148061021057506001600160e01b03198216635b5e139f60e01b145b8061022b57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461024090610eb6565b80601f016020809104026020016040519081016040528092919081815260200182805461026c90610eb6565b80156102b95780601f1061028e576101008083540402835291602001916102b9565b820191906000526020600020905b81548152906001019060200180831161029c57829003601f168201915b5050505050905090565b60006102ce82610603565b506000908152600460205260409020546001600160a01b031690565b60006102f582610451565b9050806001600160a01b0316836001600160a01b031614156103685760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b0382161480610384575061038481336105d5565b6103f65760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000606482015260840161035f565b610400838361062b565b505050565b61040f3382610699565b61042b5760405162461bcd60e51b815260040161035f90610ef1565b6104008383836106f8565b61040083838360405180602001604052806000815250610529565b60008061045d8361085c565b90506001600160a01b03811661022b5760405162461bcd60e51b815260040161035f90610f3e565b60006001600160a01b0382166104ef5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b606482015260840161035f565b506001600160a01b031660009081526003602052604090205490565b60606001805461024090610eb6565b610525338383610877565b5050565b6105333383610699565b61054f5760405162461bcd60e51b815260040161035f90610ef1565b61055b84848484610942565b50505050565b606061056c82610603565b600061058360408051602081019091526000815290565b905060008151116105a357604051806020016040528060008152506105ce565b806105ad84610975565b6040516020016105be929190610f70565b6040516020818303038152906040525b9392505050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61060c81610a11565b6106285760405162461bcd60e51b815260040161035f90610f3e565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061066082610451565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806106a583610451565b9050806001600160a01b0316846001600160a01b031614806106cc57506106cc81856105d5565b806106f05750836001600160a01b03166106e5846102c3565b6001600160a01b0316145b949350505050565b826001600160a01b031661070b82610451565b6001600160a01b0316146107315760405162461bcd60e51b815260040161035f90610f9f565b6001600160a01b0382166107935760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161035f565b826001600160a01b03166107a682610451565b6001600160a01b0316146107cc5760405162461bcd60e51b815260040161035f90610f9f565b600081815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260038552838620805460001901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6000908152600260205260409020546001600160a01b031690565b816001600160a01b0316836001600160a01b031614156108d55760405162461bcd60e51b815260206004820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b604482015260640161035f565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b61094d8484846106f8565b61095984848484610a2e565b61055b5760405162461bcd60e51b815260040161035f90610fe4565b6060600061098283610b2c565b60010190506000816001600160401b038111156109a1576109a1610d92565b6040519080825280601f01601f1916602001820160405280156109cb576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610a0457610a09565b6109d5565b509392505050565b600080610a1d8361085c565b6001600160a01b0316141592915050565b60006001600160a01b0384163b15610b2157604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610a72903390899088908890600401611036565b6020604051808303816000875af1925050508015610aad575060408051601f3d908101601f19168201909252610aaa91810190611073565b60015b610b07573d808015610adb576040519150601f19603f3d011682016040523d82523d6000602084013e610ae0565b606091505b508051610aff5760405162461bcd60e51b815260040161035f90610fe4565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506106f0565b506001949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610b6b5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6904ee2d6d415b85acef8160201b8310610b95576904ee2d6d415b85acef8160201b830492506020015b662386f26fc100008310610bb357662386f26fc10000830492506010015b6305f5e1008310610bcb576305f5e100830492506008015b6127108310610bdf57612710830492506004015b60648310610bf1576064830492506002015b600a831061022b5760010192915050565b6001600160e01b03198116811461062857600080fd5b600060208284031215610c2a57600080fd5b81356105ce81610c02565b60005b83811015610c50578181015183820152602001610c38565b8381111561055b5750506000910152565b60008151808452610c79816020860160208601610c35565b601f01601f19169290920160200192915050565b6020815260006105ce6020830184610c61565b600060208284031215610cb257600080fd5b5035919050565b80356001600160a01b0381168114610cd057600080fd5b919050565b60008060408385031215610ce857600080fd5b610cf183610cb9565b946020939093013593505050565b600080600060608486031215610d1457600080fd5b610d1d84610cb9565b9250610d2b60208501610cb9565b9150604084013590509250925092565b600060208284031215610d4d57600080fd5b6105ce82610cb9565b60008060408385031215610d6957600080fd5b610d7283610cb9565b915060208301358015158114610d8757600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610dbe57600080fd5b610dc785610cb9565b9350610dd560208601610cb9565b92506040850135915060608501356001600160401b0380821115610df857600080fd5b818701915087601f830112610e0c57600080fd5b813581811115610e1e57610e1e610d92565b604051601f8201601f19908116603f01168101908382118183101715610e4657610e46610d92565b816040528281528a6020848701011115610e5f57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215610e9657600080fd5b610e9f83610cb9565b9150610ead60208401610cb9565b90509250929050565b600181811c90821680610eca57607f821691505b60208210811415610eeb57634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b602080825260189082015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604082015260600190565b60008351610f82818460208801610c35565b835190830190610f96818360208801610c35565b01949350505050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061106990830184610c61565b9695505050505050565b60006020828403121561108557600080fd5b81516105ce81610c0256fea26469706673582212200c15472c7e9035d519c8e4cb8ed02b78d9d3dba5c79b190c4a57307072b0062764736f6c634300080a0033";

type ERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721__factory extends ContractFactory {
  constructor(...args: ERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override deploy(
    name_: string,
    symbol_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<
      ERC721 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC721__factory {
    return super.connect(runner) as ERC721__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721Interface {
    return new Interface(_abi) as ERC721Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): ERC721 {
    return new Contract(address, _abi, runner) as unknown as ERC721;
  }
}
