/* eslint-disable import/no-unresolved */

import type { BaseContract } from '../typechain/web3/types.js';

/****** Web3 *****/
export type {
    NonPayableTx,
    NonPayableTransactionObject,
    PayableTx,
    PayableTransactionObject,
} from '../typechain/web3/types.js';

/***** Owl Protocol *****/
type Await<T> = T extends PromiseLike<infer U> ? U : T;
export type Web3ContractMethod<T extends BaseContract, K extends keyof T['methods']> = T['methods'][K];
export type Web3ContractMethodParams<T extends BaseContract, K extends keyof T['methods']> = Parameters<
    Web3ContractMethod<T, K>
>;
export type Web3ContractMethodCall<T extends BaseContract, K extends keyof T['methods']> = Await<
    ReturnType<ReturnType<Web3ContractMethod<T, K>>['call']>
>;

//Base
export type { IOwlBase } from '../typechain/web3/IOwlBase.js';
export type { IContractURI } from '../typechain/web3/IContractURI.js';
export type { Multicall } from '../typechain/web3/Multicall';
export type { BlockNumber } from '../typechain/web3/BlockNumber';
export type { IRouterReceiver } from '../typechain/web3/IRouterReceiver';
export type { RouterReceiver } from '../typechain/web3/RouterReceiver';

//Proxy
export type { ERC1167Factory } from '../typechain/web3/ERC1167Factory.js';
export type { BeaconProxy } from '../typechain/web3/BeaconProxy.js';
export type { IBeacon } from '../typechain/web3/IBeacon.js';
export type { UpgradeableBeacon } from '../typechain/web3/UpgradeableBeacon.js';
export type { Fallback } from '../typechain/web3/Fallback.js';

//Assets
export type { IERC20Dna } from '../typechain/web3/IERC20Dna.js';
export type { ERC20Mintable } from '../typechain/web3/ERC20Mintable.js';

export type { IERC721Dna } from '../typechain/web3/IERC721Dna.js';
export type { IERC721Mintable } from '../typechain/web3/IERC721Mintable.js';
export type { IERC721MintableAutoId } from '../typechain/web3/IERC721MintableAutoId.js';
export type {
    IERC721TopDown,
    SetChild721 as IERC721TopDownSetChild721Event,
    AttachedChild1155 as IERC721TopDownAttachedChild1155Event,
    DetachedChild1155 as IERC721TopDownDetachedChild1155Event,
} from '../typechain/web3/IERC721TopDown.js';
export type { ERC721Mintable } from '../typechain/web3/ERC721Mintable.js';
export type { ERC721MintableAutoId } from '../typechain/web3/ERC721MintableAutoId.js';
export type { ERC721Base } from '../typechain/web3/ERC721Base.js';

export type { ERC721TopDownDna } from '../typechain/web3/ERC721TopDownDna.js';

export type { IERC1155Dna } from '../typechain/web3/IERC1155Dna.js';
export type { IERC1155Mintable } from '../typechain/web3/IERC1155Mintable.js';
export type { ERC1155Base } from '../typechain/web3/ERC1155Base.js';
export type { ERC1155Mintable } from '../typechain/web3/ERC1155Mintable.js';

export type { IERC2981Upgradeable as IERC2981 } from '../typechain/web3/IERC2981Upgradeable';
export type { ERC2981Upgradeable } from '../typechain/web3/ERC2981Upgradeable';
export type { ERC2981Setter } from '../typechain/web3/ERC2981Setter';

//export type { IERC4907 } from '../typechain/web3/IERC4907.js';

//Plugins
export type { SupportsAsset, RouteBasket } from '../typechain/web3/IAssetRouter.js';
export type { IAssetRouterInput } from '../typechain/web3/IAssetRouterInput.js';
export type { IAssetRouterOutput } from '../typechain/web3/IAssetRouterOutput.js';
export type { AssetRouterInput } from '../typechain/web3/AssetRouterInput.js';
export type { AssetRouterOutput } from '../typechain/web3/AssetRouterOutput.js';

/*
//Finance
export type { DutchAuction } from '../typechain/web3/DutchAuction.js';
export type { EnglishAuction } from '../typechain/web3/EnglishAuction.js';

//Paymaster
export type { NaivePaymaster } from '../typechain/web3/NaivePaymaster.js';
export type { NFTOwnershipPaymaster } from '../typechain/web3/NFTOwnershipPaymaster.js';
*/

/***** Openzeppelin *****/
export type {
    IAccessControlUpgradeable as IAccessControl,
    RoleAdminChanged as RoleAdminChangedEvent,
    RoleGranted as RoleGrantedEvent,
    RoleRevoked as RoleRevokedEvent,
} from '../typechain/web3/IAccessControlUpgradeable.js';
export type {
    IERC20Upgradeable as IERC20,
    Transfer as IERC20TransferEvent,
    Approval as IERC20ApprovalEvent,
} from '../typechain/web3/IERC20Upgradeable.js';
export type { IERC20MetadataUpgradeable as IERC20Metadata } from '../typechain/web3/IERC20MetadataUpgradeable.js';
export type { ERC20PresetMinterPauserUpgradeable as ERC20PresetMinterPauser } from '../typechain/web3/ERC20PresetMinterPauserUpgradeable.js';

export type {
    IERC721Upgradeable as IERC721,
    Transfer as IERC721TransferEvent,
    Approval as IERC721ApprovalEvent,
} from '../typechain/web3/IERC721Upgradeable.js';
export type { IERC721ReceiverUpgradeable as IERC721Receiver } from '../typechain/web3/IERC721ReceiverUpgradeable.js';
export type { IERC721MetadataUpgradeable as IERC721Metadata } from '../typechain/web3/IERC721MetadataUpgradeable.js';
export type { IERC721EnumerableUpgradeable as IERC721Enumerable } from '../typechain/web3/IERC721EnumerableUpgradeable.js';
export type { ERC721PresetMinterPauserAutoIdUpgradeable as ERC721PresetMinterPauserAutoId } from '../typechain/web3/ERC721PresetMinterPauserAutoIdUpgradeable.js';

export type {
    IERC1155Upgradeable as IERC1155,
    TransferSingle as IERC1155TransferSingleEvent,
    TransferBatch as IERC1155TransferBatchEvent,
    ApprovalForAll as IERC1155ApprovalForAllEvent,
} from '../typechain/web3/IERC1155Upgradeable.js';
export type { IERC1155ReceiverUpgradeable as IERC1155Receiver } from '../typechain/web3/IERC1155ReceiverUpgradeable.js';
export type { IERC1155MetadataURIUpgradeable as IERC1155MetadataURI } from '../typechain/web3/IERC1155MetadataURIUpgradeable.js';
export type { ERC1155PresetMinterPauserUpgradeable as ERC1155PresetMinterPauser } from '../typechain/web3/ERC1155PresetMinterPauserUpgradeable.js';

export type { IERC165Upgradeable as IERC165 } from '../typechain/web3/IERC165Upgradeable.js';
export type {
    IERC1820RegistryUpgradeable as IERC1820Registry,
    InterfaceImplementerSet as InterfaceImplementerSetEvent,
} from '../typechain/web3/IERC1820RegistryUpgradeable.js';
