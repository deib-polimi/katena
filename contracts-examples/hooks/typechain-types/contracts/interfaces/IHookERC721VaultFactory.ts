/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface IHookERC721VaultFactoryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "findOrCreateVault"
      | "getMultiVault"
      | "getVault"
      | "makeMultiVault"
      | "makeSoloVault"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "ERC721MultiVaultCreated" | "ERC721VaultCreated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "findOrCreateVault",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getMultiVault",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getVault",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "makeMultiVault",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "makeSoloVault",
    values: [AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "findOrCreateVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMultiVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getVault", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "makeMultiVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "makeSoloVault",
    data: BytesLike
  ): Result;
}

export namespace ERC721MultiVaultCreatedEvent {
  export type InputTuple = [nftAddress: AddressLike, vaultAddress: AddressLike];
  export type OutputTuple = [nftAddress: string, vaultAddress: string];
  export interface OutputObject {
    nftAddress: string;
    vaultAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ERC721VaultCreatedEvent {
  export type InputTuple = [
    nftAddress: AddressLike,
    tokenId: BigNumberish,
    vaultAddress: AddressLike
  ];
  export type OutputTuple = [
    nftAddress: string,
    tokenId: bigint,
    vaultAddress: string
  ];
  export interface OutputObject {
    nftAddress: string;
    tokenId: bigint;
    vaultAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IHookERC721VaultFactory extends BaseContract {
  connect(runner?: ContractRunner | null): IHookERC721VaultFactory;
  waitForDeployment(): Promise<this>;

  interface: IHookERC721VaultFactoryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  findOrCreateVault: TypedContractMethod<
    [nftAddress: AddressLike, tokenId: BigNumberish],
    [string],
    "nonpayable"
  >;

  getMultiVault: TypedContractMethod<
    [nftAddress: AddressLike],
    [string],
    "view"
  >;

  getVault: TypedContractMethod<
    [nftAddress: AddressLike, tokenId: BigNumberish],
    [string],
    "view"
  >;

  makeMultiVault: TypedContractMethod<
    [nftAddress: AddressLike],
    [string],
    "nonpayable"
  >;

  makeSoloVault: TypedContractMethod<
    [nftAddress: AddressLike, tokenId: BigNumberish],
    [string],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "findOrCreateVault"
  ): TypedContractMethod<
    [nftAddress: AddressLike, tokenId: BigNumberish],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getMultiVault"
  ): TypedContractMethod<[nftAddress: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "getVault"
  ): TypedContractMethod<
    [nftAddress: AddressLike, tokenId: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "makeMultiVault"
  ): TypedContractMethod<[nftAddress: AddressLike], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "makeSoloVault"
  ): TypedContractMethod<
    [nftAddress: AddressLike, tokenId: BigNumberish],
    [string],
    "nonpayable"
  >;

  getEvent(
    key: "ERC721MultiVaultCreated"
  ): TypedContractEvent<
    ERC721MultiVaultCreatedEvent.InputTuple,
    ERC721MultiVaultCreatedEvent.OutputTuple,
    ERC721MultiVaultCreatedEvent.OutputObject
  >;
  getEvent(
    key: "ERC721VaultCreated"
  ): TypedContractEvent<
    ERC721VaultCreatedEvent.InputTuple,
    ERC721VaultCreatedEvent.OutputTuple,
    ERC721VaultCreatedEvent.OutputObject
  >;

  filters: {
    "ERC721MultiVaultCreated(address,address)": TypedContractEvent<
      ERC721MultiVaultCreatedEvent.InputTuple,
      ERC721MultiVaultCreatedEvent.OutputTuple,
      ERC721MultiVaultCreatedEvent.OutputObject
    >;
    ERC721MultiVaultCreated: TypedContractEvent<
      ERC721MultiVaultCreatedEvent.InputTuple,
      ERC721MultiVaultCreatedEvent.OutputTuple,
      ERC721MultiVaultCreatedEvent.OutputObject
    >;

    "ERC721VaultCreated(address,uint256,address)": TypedContractEvent<
      ERC721VaultCreatedEvent.InputTuple,
      ERC721VaultCreatedEvent.OutputTuple,
      ERC721VaultCreatedEvent.OutputObject
    >;
    ERC721VaultCreated: TypedContractEvent<
      ERC721VaultCreatedEvent.InputTuple,
      ERC721VaultCreatedEvent.OutputTuple,
      ERC721VaultCreatedEvent.OutputObject
    >;
  };
}