/* eslint-disable import/no-unresolved */
/***** Owl Protocol *****/
//Base
export type { IOwlBase } from '../typechain/ethers/IOwlBase';
export type { IContractURI, IContractURIInterface } from '../typechain/ethers/IContractURI';
export type { IRouterReceiver, IRouterReceiverInterface } from '../typechain/ethers/IRouterReceiver';
export type { IBaseURI, IBaseURIInterface } from '../typechain/ethers/IBaseURI';
export type { Multicall } from '../typechain/ethers/Multicall';
export type { BlockNumber } from '../typechain/ethers/BlockNumber';

//Proxy
export type { ERC1167Factory, ERC1167FactoryInterface } from '../typechain/ethers/ERC1167Factory';
export type {
    BeaconProxy,
    BeaconProxyInterface,
    UpgradedEvent as BeaconProxyUpgradedEvent,
} from '../typechain/ethers/BeaconProxy';
export type { IBeacon, IBeaconInterface } from '../typechain/ethers/IBeacon';
export type { UpgradeableBeacon, UpgradeableBeaconInterface } from '../typechain/ethers/UpgradeableBeacon';
export type { Fallback, FallbackInterface } from '../typechain/ethers/Fallback';

//Assets
export type { IERC20Mintable, IERC20MintableInterface } from '../typechain/ethers/IERC20Mintable';
export type { IERC20Dna, IERC20DnaInterface } from '../typechain/ethers/IERC20Dna';
export type { ERC20Mintable, ERC20MintableInterface } from '../typechain/ethers/ERC20Mintable';

export type {
    IERC2981Upgradeable as IERC2981,
    IERC2981UpgradeableInterface as IERC2981Interface,
} from '../typechain/ethers/IERC2981Upgradeable';
export type { IERC2981Setter, IERC2981SetterInterface } from '../typechain/ethers/IERC2981Setter';

export type { IERC721Dna, IERC721DnaInterface } from '../typechain/ethers/IERC721Dna';
export type { IERC721Mintable, IERC721MintableInterface } from '../typechain/ethers/IERC721Mintable';
export type { IERC721MintableAutoId, IERC721MintableAutoIdInterface } from '../typechain/ethers/IERC721MintableAutoId';
export type { IERC721TopDown, IERC721TopDownInterface } from '../typechain/ethers/IERC721TopDown';
export type { ERC721Mintable, ERC721MintableInterface } from '../typechain/ethers/ERC721Mintable';
export type { ERC721MintableAutoId, ERC721MintableAutoIdInterface } from '../typechain/ethers/ERC721MintableAutoId';
export type { ERC721Base, ERC721BaseInterface } from '../typechain/ethers/ERC721Base';

export type { ERC721TopDownDna, ERC721TopDownDnaInterface } from '../typechain/ethers/ERC721TopDownDna';

export type { IERC1155Dna, IERC1155DnaInterface } from '../typechain/ethers/IERC1155Dna';
export type { IERC1155Mintable, IERC1155MintableInterface } from '../typechain/ethers/IERC1155Mintable';
export type { ERC1155Base, ERC1155BaseInterface } from '../typechain/ethers/ERC1155Base';
export type { ERC1155Mintable, ERC1155MintableInterface } from '../typechain/ethers/ERC1155Mintable';

//export type { IERC4907 } from '../typechain/ethers/IERC4907';

//Plugins
export type { IAssetRouterInput, IAssetRouterInputInterface } from '../typechain/ethers/IAssetRouterInput';
export type { IAssetRouterOutput, IAssetRouterOutputInterface } from '../typechain/ethers/IAssetRouterOutput';
export type { AssetRouterInput, AssetRouterInputInterface } from '../typechain/ethers/AssetRouterInput';
export type { AssetRouterOutput, AssetRouterOutputInterface } from '../typechain/ethers/AssetRouterOutput';

/*
//Finance
export type { DutchAuction } from '../typechain/ethers/DutchAuction';
export type { EnglishAuction } from '../typechain/ethers/EnglishAuction';

//Paymaster
export type { NaivePaymaster } from '../typechain/ethers/NaivePaymaster';
export type { NFTOwnershipPaymaster } from '../typechain/ethers/NFTOwnershipPaymaster';
*/

/***** Openzeppelin *****/
export type {
    IAccessControlUpgradeable as IAccessControl,
    IAccessControlUpgradeableInterface as IAccessControlInterface,
} from '../typechain/ethers/IAccessControlUpgradeable';
export type {
    IERC20Upgradeable as IERC20,
    IERC20UpgradeableInterface as IERC20Interface,
    TransferEvent as IERC20TransferEvent,
    ApprovalEvent as IERC20ApprovalEvent,
} from '../typechain/ethers/IERC20Upgradeable';
export type {
    IERC20MetadataUpgradeable as IERC20Metadata,
    IERC20MetadataUpgradeableInterface as IERC20MetadataInterface,
} from '../typechain/ethers/IERC20MetadataUpgradeable';

export type {
    IERC721Upgradeable as IERC721,
    IERC721UpgradeableInterface as IERC721Interface,
    TransferEvent as IERC721TransferEvent,
    ApprovalEvent as IERC721ApprovalEvent,
} from '../typechain/ethers/IERC721Upgradeable';
export type {
    IERC721MetadataUpgradeable as IERC721Metadata,
    IERC721MetadataUpgradeableInterface as IERC721MetadataInterface,
} from '../typechain/ethers/IERC721MetadataUpgradeable';
export type {
    IERC721EnumerableUpgradeable as IERC721Enumerable,
    IERC721EnumerableUpgradeableInterface as IERC721EnumerableInterface,
} from '../typechain/ethers/IERC721EnumerableUpgradeable';
export type {
    IERC721ReceiverUpgradeable as IERC721Receiver,
    IERC721ReceiverUpgradeableInterface as IERC721ReceiverInterface,
} from '../typechain/ethers/IERC721ReceiverUpgradeable';

export type {
    IERC1155Upgradeable as IERC1155,
    IERC1155UpgradeableInterface as IERC1155Interface,
    TransferSingleEvent as IERC1155TransferSingleEvent,
    TransferBatchEvent as IERC1155TransferBatchEvent,
    ApprovalForAllEvent as IERC1155ApprovalForAllEvent,
} from '../typechain/ethers/IERC1155Upgradeable';
export type {
    IERC1155ReceiverUpgradeable as IERC1155Receiver,
    IERC1155ReceiverUpgradeableInterface as IERC1155ReceiverInterface,
} from '../typechain/ethers/IERC1155ReceiverUpgradeable';
export type {
    IERC1155MetadataURIUpgradeable as IERC1155MetadataURI,
    IERC1155MetadataURIUpgradeableInterface as IERC1155MetadataURIInterface,
} from '../typechain/ethers/IERC1155MetadataURIUpgradeable';

export type {
    IERC165Upgradeable as IERC165,
    IERC165UpgradeableInterface as IERC165Interface,
} from '../typechain/ethers/IERC165Upgradeable';
export type {
    IERC1820RegistryUpgradeable as IERC1820Registry,
    IERC1820RegistryUpgradeableInterface as IERC1820RegistryInterface,
    InterfaceImplementerSetEvent,
} from '../typechain/ethers/IERC1820RegistryUpgradeable';

//Factories
export type { ERC1167Factory__factory } from '../typechain/ethers/factories/ERC1167Factory__factory';
export type { BeaconProxy__factory } from '../typechain/ethers/factories/BeaconProxy__factory';
export type { IBeacon__factory } from '../typechain/ethers/factories/IBeacon__factory';
export type { UpgradeableBeacon__factory } from '../typechain/ethers/factories/UpgradeableBeacon__factory';
export type { Fallback__factory } from '../typechain/ethers/factories/Fallback__factory';

//Assets
export type { IERC20Dna__factory } from '../typechain/ethers/factories/IERC20Dna__factory';
export type { ERC20Mintable__factory } from '../typechain/ethers/factories/ERC20Mintable__factory';
export type { IERC721Dna__factory } from '../typechain/ethers/factories/IERC721Dna__factory';
export type { IERC721Mintable__factory } from '../typechain/ethers/factories/IERC721Mintable__factory';
export type { IERC721MintableAutoId__factory } from '../typechain/ethers/factories/IERC721MintableAutoId__factory';
export type { IERC721TopDown__factory } from '../typechain/ethers/factories/IERC721TopDown__factory';
export type { ERC721Mintable__factory } from '../typechain/ethers/factories/ERC721Mintable__factory';
export type { ERC721MintableAutoId__factory } from '../typechain/ethers/factories/ERC721MintableAutoId__factory';
export type { ERC721Base__factory } from '../typechain/ethers/factories/ERC721Base__factory';
export type { ERC721TopDownDna__factory } from '../typechain/ethers/factories/ERC721TopDownDna__factory';

export type { IERC1155Dna__factory } from '../typechain/ethers/factories/IERC1155Dna__factory';
export type { IERC1155Mintable__factory } from '../typechain/ethers/factories/IERC1155Mintable__factory';
export type { ERC1155Mintable__factory } from '../typechain/ethers/factories/ERC1155Mintable__factory';

//export type { IERC4907__factory } from '../typechain/ethers/factories/IERC4907__factory';

//Plugins
export type { IAssetRouterInput__factory } from '../typechain/ethers/factories/IAssetRouterInput__factory';
export type { IAssetRouterOutput__factory } from '../typechain/ethers/factories/IAssetRouterOutput__factory';
export type { AssetRouterInput__factory } from '../typechain/ethers/factories/AssetRouterInput__factory';
export type { AssetRouterOutput__factory } from '../typechain/ethers/factories/AssetRouterOutput__factory';
/***** Openzeppelin *****/
export type { IERC20Upgradeable__factory as IERC20__factory } from '../typechain/ethers/factories/IERC20Upgradeable__factory';
export type { IERC20MetadataUpgradeable__factory as IERC20Metadata__factory } from '../typechain/ethers/factories/IERC20MetadataUpgradeable__factory';

export type { IERC721Upgradeable__factory as IERC721__factory } from '../typechain/ethers/factories/IERC721Upgradeable__factory';
export type { IERC721ReceiverUpgradeable__factory as IERC721Receiver__factory } from '../typechain/ethers/factories/IERC721ReceiverUpgradeable__factory';
export type { IERC721MetadataUpgradeable__factory as IERC721Metadata_factory } from '../typechain/ethers/factories/IERC721MetadataUpgradeable__factory';

export type { IERC1155Upgradeable__factory as IERC1155__factory } from '../typechain/ethers/factories/IERC1155Upgradeable__factory';
export type { IERC1155MetadataURIUpgradeable__factory as IERC1155MetadataURI__factory } from '../typechain/ethers/factories/IERC1155MetadataURIUpgradeable__factory';
export type { IERC1155ReceiverUpgradeable__factory as IERC1155Receiver__factory } from '../typechain/ethers/factories/IERC1155ReceiverUpgradeable__factory';

export type { IERC165Upgradeable__factory as IERC165__factory } from '../typechain/ethers/factories/IERC165Upgradeable__factory';
export type { IERC1820RegistryUpgradeable__factory as IERC1820Registry__factory } from '../typechain/ethers/factories/IERC1820RegistryUpgradeable__factory';
