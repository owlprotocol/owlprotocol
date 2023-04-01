/* eslint-disable import/no-unresolved */
/***** Owl Protocol *****/
//Base
export type { IOwlBase } from "../typechain/ethers/contracts/common/IOwlBase";
export type { IContractURI, IContractURIInterface } from "../typechain/ethers/contracts/common/IContractURI";
export type { IRouterReceiver, IRouterReceiverInterface } from "../typechain/ethers/contracts/common/IRouterReceiver";
export type { IBaseURI, IBaseURIInterface } from "../typechain/ethers/contracts/common/IBaseURI";
export type { BlockNumber } from "../typechain/ethers/contracts/utils/BlockNumber";

export type { IMulticall2, IMulticall2Interface } from "../typechain/ethers/contracts/utils/IMulticall2";
export type { Multicall2 } from "../typechain/ethers/contracts/utils/Multicall2";

//Proxy
export type {
    ERC1167Factory,
    ERC1167FactoryInterface,
} from "../typechain/ethers/contracts/proxy/ERC1167/ERC1167Factory";
export type {
    IERC1167Factory,
    IERC1167FactoryInterface,
} from "../typechain/ethers/contracts/proxy/ERC1167/IERC1167Factory";
export type {
    BeaconProxy,
    BeaconProxyInterface,
    UpgradedEvent as BeaconProxyUpgradedEvent,
} from "../typechain/ethers/contracts/proxy/Beacon/BeaconProxy";
export type { IBeacon, IBeaconInterface } from "../typechain/ethers/contracts/proxy/Beacon/IBeacon";
export type {
    UpgradeableBeacon,
    UpgradeableBeaconInterface,
} from "../typechain/ethers/contracts/proxy/Beacon/UpgradeableBeacon";
export type { Fallback, FallbackInterface } from "../typechain/ethers/contracts/utils/Fallback";

//Assets
export type {
    IERC20Mintable,
    IERC20MintableInterface,
} from "../typechain/ethers/contracts/assets/ERC20/IERC20Mintable";
export type { IERC20Dna, IERC20DnaInterface } from "../typechain/ethers/contracts/assets/ERC20/IERC20Dna";
export type { ERC20Mintable, ERC20MintableInterface } from "../typechain/ethers/contracts/assets/ERC20/ERC20Mintable";

export type {
    IERC2981Upgradeable as IERC2981,
    IERC2981UpgradeableInterface as IERC2981Interface,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable";
export type {
    IERC2981Setter,
    IERC2981SetterInterface,
} from "../typechain/ethers/contracts/assets/common/IERC2981Setter";

export type { IERC721Dna, IERC721DnaInterface } from "../typechain/ethers/contracts/assets/ERC721/IERC721Dna";
export type {
    IERC721Mintable,
    IERC721MintableInterface,
} from "../typechain/ethers/contracts/assets/ERC721/IERC721Mintable";
export type {
    IERC721MintableAutoId,
    IERC721MintableAutoIdInterface,
} from "../typechain/ethers/contracts/assets/ERC721/IERC721MintableAutoId";
export type {
    IERC721TopDown,
    IERC721TopDownInterface,
    SetChild721Event as IERC721TopDownSetChild721Event,
    AttachedChild1155Event as IERC721TopDownAttachedChild1155Event,
    DetachedChild1155Event as IERC721TopDownDetachedChild1155Event,
} from "../typechain/ethers/contracts/assets/ERC721/IERC721TopDown";

export type {
    ERC721Mintable,
    ERC721MintableInterface,
} from "../typechain/ethers/contracts/assets/ERC721/ERC721Mintable";
export type {
    ERC721MintableAutoId,
    ERC721MintableAutoIdInterface,
} from "../typechain/ethers/contracts/assets/ERC721/ERC721MintableAutoId";
export type { ERC721Dna, ERC721DnaInterface } from "../typechain/ethers/contracts/assets/ERC721/ERC721Dna";
export type {
    ERC721TopDownMintable,
    ERC721TopDownMintableInterface,
} from "../typechain/ethers/contracts/assets/ERC721/ERC721TopDownMintable";
export type {
    ERC721TopDownMintableAutoId,
    ERC721TopDownMintableAutoIdInterface,
} from "../typechain/ethers/contracts/assets/ERC721/ERC721TopDownMintableAutoId";
export type {
    ERC721TopDownDnaMintable,
    ERC721TopDownDnaMintableInterface,
} from "../typechain/ethers/contracts/assets/ERC721/ERC721TopDownDnaMintable";
export type {
    ERC721TopDownDna,
    ERC721TopDownDnaInterface,
} from "../typechain/ethers/contracts/assets/ERC721/ERC721TopDownDna";

export type { IERC1155Dna, IERC1155DnaInterface } from "../typechain/ethers/contracts/assets/ERC1155/IERC1155Dna";
export type {
    IERC1155Mintable,
    IERC1155MintableInterface,
} from "../typechain/ethers/contracts/assets/ERC1155/IERC1155Mintable";
export type { ERC1155Base, ERC1155BaseInterface } from "../typechain/ethers/contracts/assets/ERC1155/ERC1155Base";
export type {
    ERC1155Mintable,
    ERC1155MintableInterface,
} from "../typechain/ethers/contracts/assets/ERC1155/ERC1155Mintable";
export type { ERC1155Dna, ERC1155DnaInterface } from "../typechain/ethers/contracts/assets/ERC1155/ERC1155Dna";

//export type { IERC4907 } from '../typechain/ethers/contracts/IERC4907';

//Plugins
export type {
    IAssetRouterCraft,
    IAssetRouterCraftInterface,
} from "../typechain/ethers/contracts/plugins/AssetRouter/IAssetRouterCraft";
export type {
    IAssetRouterInput,
    IAssetRouterInputInterface,
} from "../typechain/ethers/contracts/plugins/AssetRouter/IAssetRouterInput";
export type {
    IAssetRouterOutput,
    IAssetRouterOutputInterface,
} from "../typechain/ethers/contracts/plugins/AssetRouter/IAssetRouterOutput";
export type {
    AssetRouterCraft,
    AssetRouterCraftInterface,
} from "../typechain/ethers/contracts/plugins/AssetRouter/AssetRouterCraft";
export type {
    AssetRouterInput,
    AssetRouterInputInterface,
} from "../typechain/ethers/contracts/plugins/AssetRouter/AssetRouterInput";
export type {
    AssetRouterOutput,
    AssetRouterOutputInterface,
} from "../typechain/ethers/contracts/plugins/AssetRouter/AssetRouterOutput";

//Examples
export type { OwlTemplate } from "../typechain/ethers/contracts/examples/OwlTemplate";

/*
//Finance
export type { DutchAuction } from '../typechain/ethers/contracts/DutchAuction';
export type { EnglishAuction } from '../typechain/ethers/contracts/EnglishAuction';

//Paymaster
export type { NaivePaymaster } from '../typechain/ethers/contracts/NaivePaymaster';
export type { NFTOwnershipPaymaster } from '../typechain/ethers/contracts/NFTOwnershipPaymaster';
*/

/***** Openzeppelin *****/
export type {
    IAccessControlUpgradeable as IAccessControl,
    IAccessControlUpgradeableInterface as IAccessControlInterface,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable";
export type {
    IERC20Upgradeable as IERC20,
    IERC20UpgradeableInterface as IERC20Interface,
    TransferEvent as IERC20TransferEvent,
    ApprovalEvent as IERC20ApprovalEvent,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable";
export type {
    IERC20MetadataUpgradeable as IERC20Metadata,
    IERC20MetadataUpgradeableInterface as IERC20MetadataInterface,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/IERC20MetadataUpgradeable";

export type {
    IERC721Upgradeable as IERC721,
    IERC721UpgradeableInterface as IERC721Interface,
    TransferEvent as IERC721TransferEvent,
    ApprovalEvent as IERC721ApprovalEvent,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable";
export type {
    IERC721MetadataUpgradeable as IERC721Metadata,
    IERC721MetadataUpgradeableInterface as IERC721MetadataInterface,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable";
export type {
    IERC721EnumerableUpgradeable as IERC721Enumerable,
    IERC721EnumerableUpgradeableInterface as IERC721EnumerableInterface,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable";
export type {
    IERC721ReceiverUpgradeable as IERC721Receiver,
    IERC721ReceiverUpgradeableInterface as IERC721ReceiverInterface,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable";

export type {
    IERC1155Upgradeable as IERC1155,
    IERC1155UpgradeableInterface as IERC1155Interface,
    TransferSingleEvent as IERC1155TransferSingleEvent,
    TransferBatchEvent as IERC1155TransferBatchEvent,
    ApprovalForAllEvent as IERC1155ApprovalForAllEvent,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable";
export type {
    IERC1155ReceiverUpgradeable as IERC1155Receiver,
    IERC1155ReceiverUpgradeableInterface as IERC1155ReceiverInterface,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable";
export type {
    IERC1155MetadataURIUpgradeable as IERC1155MetadataURI,
    IERC1155MetadataURIUpgradeableInterface as IERC1155MetadataURIInterface,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable";

export type {
    IERC165Upgradeable as IERC165,
    IERC165UpgradeableInterface as IERC165Interface,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable";
export type {
    IERC1820RegistryUpgradeable as IERC1820Registry,
    IERC1820RegistryUpgradeableInterface as IERC1820RegistryInterface,
    InterfaceImplementerSetEvent,
} from "../typechain/ethers/@openzeppelin/contracts-upgradeable/utils/introspection/IERC1820RegistryUpgradeable";

//Factories
export type { ERC1167Factory__factory } from "../typechain/ethers/factories/contracts/proxy/ERC1167/ERC1167Factory__factory";
export type { BeaconProxy__factory } from "../typechain/ethers/factories/contracts/proxy/Beacon/BeaconProxy__factory";
export type { IBeacon__factory } from "../typechain/ethers/factories/contracts/proxy/Beacon/IBeacon__factory";
export type { UpgradeableBeacon__factory } from "../typechain/ethers/factories/contracts/proxy/Beacon/UpgradeableBeacon__factory";
export type { Fallback__factory } from "../typechain/ethers/factories/contracts/utils/Fallback__factory";

export type { IMulticall2__factory } from "../typechain/ethers/factories/contracts/utils/IMulticall2__factory";
export type { Multicall2__factory } from "../typechain/ethers/factories/contracts/utils/Multicall2__factory";

//Assets
export type { IERC20Dna__factory } from "../typechain/ethers/factories/contracts/assets/ERC20/IERC20Dna__factory";
export type { ERC20Mintable__factory } from "../typechain/ethers/factories/contracts/assets/ERC20/ERC20Mintable__factory";
export type { IERC721Dna__factory } from "../typechain/ethers/factories/contracts/assets/ERC721/IERC721Dna__factory";
export type { IERC721Mintable__factory } from "../typechain/ethers/factories/contracts/assets/ERC721/IERC721Mintable__factory";
export type { IERC721MintableAutoId__factory } from "../typechain/ethers/factories/contracts/assets/ERC721/IERC721MintableAutoId__factory";
export type { IERC721TopDown__factory } from "../typechain/ethers/factories/contracts/assets/ERC721/IERC721TopDown__factory";

export type { ERC721Mintable__factory } from "../typechain/ethers/factories/contracts/assets/ERC721/ERC721Mintable__factory";
export type { ERC721MintableAutoId__factory } from "../typechain/ethers/factories/contracts/assets/ERC721/ERC721MintableAutoId__factory";
export type { ERC721Dna__factory } from "../typechain/ethers/factories/contracts/assets/ERC721/ERC721Dna__factory";
export type { ERC721TopDownMintable__factory } from "../typechain/ethers/factories/contracts/assets/ERC721/ERC721TopDownMintable__factory";
export type { ERC721TopDownMintableAutoId__factory } from "../typechain/ethers/factories/contracts/assets/ERC721/ERC721TopDownMintableAutoId__factory";
export type { ERC721TopDownDnaMintable__factory } from "../typechain/ethers/factories/contracts/assets/ERC721/ERC721TopDownDnaMintable__factory";
export type { ERC721TopDownDna__factory } from "../typechain/ethers/factories/contracts/assets/ERC721/ERC721TopDownDna__factory";

export type { IERC1155Dna__factory } from "../typechain/ethers/factories/contracts/assets/ERC1155/IERC1155Dna__factory";
export type { IERC1155Mintable__factory } from "../typechain/ethers/factories/contracts/assets/ERC1155/IERC1155Mintable__factory";
export type { ERC1155Mintable__factory } from "../typechain/ethers/factories/contracts/assets/ERC1155/ERC1155Mintable__factory";
export type { ERC1155Dna__factory } from "../typechain/ethers/factories/contracts/assets/ERC1155/ERC1155Dna__factory";

//export type { IERC4907__factory } from '../typechain/ethers/factories/contracts/IERC4907__factory';
//Plugins
export type { IAssetRouterCraft__factory } from "../typechain/ethers/factories/contracts/plugins/AssetRouter/IAssetRouterCraft__factory";
export type { IAssetRouterInput__factory } from "../typechain/ethers/factories/contracts/plugins/AssetRouter/IAssetRouterInput__factory";
export type { IAssetRouterOutput__factory } from "../typechain/ethers/factories/contracts/plugins/AssetRouter/IAssetRouterOutput__factory";
export type { AssetRouterCraft__factory } from "../typechain/ethers/factories/contracts/plugins/AssetRouter/AssetRouterCraft__factory";
export type { AssetRouterInput__factory } from "../typechain/ethers/factories/contracts/plugins/AssetRouter/AssetRouterInput__factory";
export type { AssetRouterOutput__factory } from "../typechain/ethers/factories/contracts/plugins/AssetRouter/AssetRouterOutput__factory";
//Examples
export type { OwlTemplate__factory } from "../typechain/ethers/factories/contracts/examples/OwlTemplate__factory";

/***** Openzeppelin *****/
export type { IERC20Upgradeable__factory as IERC20__factory } from "../typechain/ethers/factories/@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable__factory";
export type { IERC20MetadataUpgradeable__factory as IERC20Metadata__factory } from "../typechain/ethers/factories/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/IERC20MetadataUpgradeable__factory";

export type { IERC721Upgradeable__factory as IERC721__factory } from "../typechain/ethers/factories/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable__factory";
export type { IERC721ReceiverUpgradeable__factory as IERC721Receiver__factory } from "../typechain/ethers/factories/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable__factory";
export type { IERC721MetadataUpgradeable__factory as IERC721Metadata_factory } from "../typechain/ethers/factories/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable__factory";

export type { IERC1155Upgradeable__factory as IERC1155__factory } from "../typechain/ethers/factories/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable__factory";
export type { IERC1155MetadataURIUpgradeable__factory as IERC1155MetadataURI__factory } from "../typechain/ethers/factories/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable__factory";
export type { IERC1155ReceiverUpgradeable__factory as IERC1155Receiver__factory } from "../typechain/ethers/factories/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable__factory";

export type { IERC165Upgradeable__factory as IERC165__factory } from "../typechain/ethers/factories/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable__factory";
export type { IERC1820RegistryUpgradeable__factory as IERC1820Registry__factory } from "../typechain/ethers/factories/@openzeppelin/contracts-upgradeable/utils/introspection/IERC1820RegistryUpgradeable__factory";
