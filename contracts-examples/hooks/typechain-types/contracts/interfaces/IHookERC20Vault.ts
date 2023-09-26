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

export declare namespace Entitlements {
  export type EntitlementStruct = {
    beneficialOwner: AddressLike;
    operator: AddressLike;
    vaultAddress: AddressLike;
    assetId: BigNumberish;
    expiry: BigNumberish;
  };

  export type EntitlementStructOutput = [
    beneficialOwner: string,
    operator: string,
    vaultAddress: string,
    assetId: bigint,
    expiry: bigint
  ] & {
    beneficialOwner: string;
    operator: string;
    vaultAddress: string;
    assetId: bigint;
    expiry: bigint;
  };
}

export interface IHookERC20VaultInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "approveOperator"
      | "assetAddress"
      | "assetBalance"
      | "clearEntitlement"
      | "clearEntitlementAndDistribute"
      | "entitlementExpiration"
      | "getApprovedOperator"
      | "getBeneficialOwner"
      | "getCurrentEntitlementOperator"
      | "getHoldsAsset"
      | "grantEntitlement"
      | "imposeEntitlement"
      | "setBeneficialOwner"
      | "supportsInterface"
      | "withdrawalAsset"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "AssetReceived"
      | "AssetWithdrawn"
      | "BeneficialOwnerSet"
      | "EntitlementCleared"
      | "EntitlementImposed"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "approveOperator",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "assetAddress",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "assetBalance",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "clearEntitlement",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "clearEntitlementAndDistribute",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "entitlementExpiration",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getApprovedOperator",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBeneficialOwner",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentEntitlementOperator",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getHoldsAsset",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "grantEntitlement",
    values: [Entitlements.EntitlementStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "imposeEntitlement",
    values: [
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setBeneficialOwner",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawalAsset",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assetAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assetBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "clearEntitlement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "clearEntitlementAndDistribute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "entitlementExpiration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getApprovedOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBeneficialOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentEntitlementOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHoldsAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "grantEntitlement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "imposeEntitlement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBeneficialOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawalAsset",
    data: BytesLike
  ): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    beneficialOwner: AddressLike,
    approved: AddressLike,
    assetId: BigNumberish
  ];
  export type OutputTuple = [
    beneficialOwner: string,
    approved: string,
    assetId: bigint
  ];
  export interface OutputObject {
    beneficialOwner: string;
    approved: string;
    assetId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AssetReceivedEvent {
  export type InputTuple = [
    owner: AddressLike,
    sender: AddressLike,
    contractAddress: AddressLike,
    assetId: BigNumberish
  ];
  export type OutputTuple = [
    owner: string,
    sender: string,
    contractAddress: string,
    assetId: bigint
  ];
  export interface OutputObject {
    owner: string;
    sender: string;
    contractAddress: string;
    assetId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AssetWithdrawnEvent {
  export type InputTuple = [
    assetId: BigNumberish,
    to: AddressLike,
    beneficialOwner: AddressLike
  ];
  export type OutputTuple = [
    assetId: bigint,
    to: string,
    beneficialOwner: string
  ];
  export interface OutputObject {
    assetId: bigint;
    to: string;
    beneficialOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BeneficialOwnerSetEvent {
  export type InputTuple = [
    assetId: BigNumberish,
    beneficialOwner: AddressLike,
    setBy: AddressLike
  ];
  export type OutputTuple = [
    assetId: bigint,
    beneficialOwner: string,
    setBy: string
  ];
  export interface OutputObject {
    assetId: bigint;
    beneficialOwner: string;
    setBy: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace EntitlementClearedEvent {
  export type InputTuple = [
    assetId: BigNumberish,
    beneficialOwner: AddressLike
  ];
  export type OutputTuple = [assetId: bigint, beneficialOwner: string];
  export interface OutputObject {
    assetId: bigint;
    beneficialOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace EntitlementImposedEvent {
  export type InputTuple = [
    assetId: BigNumberish,
    entitledAccount: AddressLike,
    expiry: BigNumberish,
    beneficialOwner: AddressLike
  ];
  export type OutputTuple = [
    assetId: bigint,
    entitledAccount: string,
    expiry: bigint,
    beneficialOwner: string
  ];
  export interface OutputObject {
    assetId: bigint;
    entitledAccount: string;
    expiry: bigint;
    beneficialOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IHookERC20Vault extends BaseContract {
  connect(runner?: ContractRunner | null): IHookERC20Vault;
  waitForDeployment(): Promise<this>;

  interface: IHookERC20VaultInterface;

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

  approveOperator: TypedContractMethod<
    [to: AddressLike, assetId: BigNumberish],
    [void],
    "nonpayable"
  >;

  assetAddress: TypedContractMethod<[assetId: BigNumberish], [string], "view">;

  assetBalance: TypedContractMethod<[assetId: BigNumberish], [bigint], "view">;

  clearEntitlement: TypedContractMethod<
    [assetId: BigNumberish],
    [void],
    "nonpayable"
  >;

  clearEntitlementAndDistribute: TypedContractMethod<
    [assetId: BigNumberish, receiver: AddressLike],
    [void],
    "nonpayable"
  >;

  entitlementExpiration: TypedContractMethod<
    [assetId: BigNumberish],
    [bigint],
    "view"
  >;

  getApprovedOperator: TypedContractMethod<
    [assetId: BigNumberish],
    [string],
    "view"
  >;

  getBeneficialOwner: TypedContractMethod<
    [assetId: BigNumberish],
    [string],
    "view"
  >;

  getCurrentEntitlementOperator: TypedContractMethod<
    [assetId: BigNumberish],
    [[boolean, string]],
    "view"
  >;

  getHoldsAsset: TypedContractMethod<
    [assetId: BigNumberish],
    [boolean],
    "view"
  >;

  grantEntitlement: TypedContractMethod<
    [entitlement: Entitlements.EntitlementStruct],
    [void],
    "nonpayable"
  >;

  imposeEntitlement: TypedContractMethod<
    [
      operator: AddressLike,
      expiry: BigNumberish,
      assetId: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  setBeneficialOwner: TypedContractMethod<
    [assetId: BigNumberish, newBeneficialOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  withdrawalAsset: TypedContractMethod<
    [assetId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "approveOperator"
  ): TypedContractMethod<
    [to: AddressLike, assetId: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "assetAddress"
  ): TypedContractMethod<[assetId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "assetBalance"
  ): TypedContractMethod<[assetId: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "clearEntitlement"
  ): TypedContractMethod<[assetId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "clearEntitlementAndDistribute"
  ): TypedContractMethod<
    [assetId: BigNumberish, receiver: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "entitlementExpiration"
  ): TypedContractMethod<[assetId: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "getApprovedOperator"
  ): TypedContractMethod<[assetId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getBeneficialOwner"
  ): TypedContractMethod<[assetId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getCurrentEntitlementOperator"
  ): TypedContractMethod<[assetId: BigNumberish], [[boolean, string]], "view">;
  getFunction(
    nameOrSignature: "getHoldsAsset"
  ): TypedContractMethod<[assetId: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "grantEntitlement"
  ): TypedContractMethod<
    [entitlement: Entitlements.EntitlementStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "imposeEntitlement"
  ): TypedContractMethod<
    [
      operator: AddressLike,
      expiry: BigNumberish,
      assetId: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setBeneficialOwner"
  ): TypedContractMethod<
    [assetId: BigNumberish, newBeneficialOwner: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "withdrawalAsset"
  ): TypedContractMethod<[assetId: BigNumberish], [void], "nonpayable">;

  getEvent(
    key: "Approval"
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "AssetReceived"
  ): TypedContractEvent<
    AssetReceivedEvent.InputTuple,
    AssetReceivedEvent.OutputTuple,
    AssetReceivedEvent.OutputObject
  >;
  getEvent(
    key: "AssetWithdrawn"
  ): TypedContractEvent<
    AssetWithdrawnEvent.InputTuple,
    AssetWithdrawnEvent.OutputTuple,
    AssetWithdrawnEvent.OutputObject
  >;
  getEvent(
    key: "BeneficialOwnerSet"
  ): TypedContractEvent<
    BeneficialOwnerSetEvent.InputTuple,
    BeneficialOwnerSetEvent.OutputTuple,
    BeneficialOwnerSetEvent.OutputObject
  >;
  getEvent(
    key: "EntitlementCleared"
  ): TypedContractEvent<
    EntitlementClearedEvent.InputTuple,
    EntitlementClearedEvent.OutputTuple,
    EntitlementClearedEvent.OutputObject
  >;
  getEvent(
    key: "EntitlementImposed"
  ): TypedContractEvent<
    EntitlementImposedEvent.InputTuple,
    EntitlementImposedEvent.OutputTuple,
    EntitlementImposedEvent.OutputObject
  >;

  filters: {
    "Approval(address,address,uint32)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "AssetReceived(address,address,address,uint32)": TypedContractEvent<
      AssetReceivedEvent.InputTuple,
      AssetReceivedEvent.OutputTuple,
      AssetReceivedEvent.OutputObject
    >;
    AssetReceived: TypedContractEvent<
      AssetReceivedEvent.InputTuple,
      AssetReceivedEvent.OutputTuple,
      AssetReceivedEvent.OutputObject
    >;

    "AssetWithdrawn(uint32,address,address)": TypedContractEvent<
      AssetWithdrawnEvent.InputTuple,
      AssetWithdrawnEvent.OutputTuple,
      AssetWithdrawnEvent.OutputObject
    >;
    AssetWithdrawn: TypedContractEvent<
      AssetWithdrawnEvent.InputTuple,
      AssetWithdrawnEvent.OutputTuple,
      AssetWithdrawnEvent.OutputObject
    >;

    "BeneficialOwnerSet(uint32,address,address)": TypedContractEvent<
      BeneficialOwnerSetEvent.InputTuple,
      BeneficialOwnerSetEvent.OutputTuple,
      BeneficialOwnerSetEvent.OutputObject
    >;
    BeneficialOwnerSet: TypedContractEvent<
      BeneficialOwnerSetEvent.InputTuple,
      BeneficialOwnerSetEvent.OutputTuple,
      BeneficialOwnerSetEvent.OutputObject
    >;

    "EntitlementCleared(uint256,address)": TypedContractEvent<
      EntitlementClearedEvent.InputTuple,
      EntitlementClearedEvent.OutputTuple,
      EntitlementClearedEvent.OutputObject
    >;
    EntitlementCleared: TypedContractEvent<
      EntitlementClearedEvent.InputTuple,
      EntitlementClearedEvent.OutputTuple,
      EntitlementClearedEvent.OutputObject
    >;

    "EntitlementImposed(uint32,address,uint32,address)": TypedContractEvent<
      EntitlementImposedEvent.InputTuple,
      EntitlementImposedEvent.OutputTuple,
      EntitlementImposedEvent.OutputObject
    >;
    EntitlementImposed: TypedContractEvent<
      EntitlementImposedEvent.InputTuple,
      EntitlementImposedEvent.OutputTuple,
      EntitlementImposedEvent.OutputObject
    >;
  };
}