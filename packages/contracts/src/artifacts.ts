/* eslint-disable import/no-unresolved */
/***** Owl Protocol *****/
// @ts-nocheck
//Base
export { default as IOwlBase } from './artifacts/contracts/common/IOwlBase.sol/IOwlBase.js';
export { default as IContractURI } from './artifacts/contracts/common/IContractURI.sol/IContractURI.js';
export { default as IRouterReceiver } from './artifacts/contracts/common/IRouterReceiver.sol/IRouterReceiver.js';
export { default as IBaseURI } from './artifacts/contracts/common/IBaseURI.sol/IBaseURI.js';

export { default as Multicall } from './artifacts/contracts/utils/Multicall.sol/Multicall.js';
export { default as BlockNumber } from './artifacts/contracts/utils/BlockNumber.sol/BlockNumber.js';

//Proxy
export { default as IERC1167Factory } from './artifacts/contracts/proxy/ERC1167/IERC1167Factory.sol/IERC1167Factory.js';
export { default as ERC1167Factory } from './artifacts/contracts/proxy/ERC1167/ERC1167Factory.sol/ERC1167Factory.js';
export { default as BeaconProxy } from './artifacts/contracts/proxy/Beacon/BeaconProxy.sol/BeaconProxy.js';
export { default as IBeacon } from './artifacts/contracts/proxy/Beacon/IBeacon.sol/IBeacon.js';
export { default as UpgradeableBeacon } from './artifacts/contracts/proxy/Beacon/UpgradeableBeacon.sol/UpgradeableBeacon.js';
export { default as Fallback } from './artifacts/contracts/utils/Fallback.sol/Fallback.js';

//Assets
export { default as IERC20Dna } from './artifacts/contracts/assets/ERC20/IERC20Dna.sol/IERC20Dna.js';
export { default as IERC20Mintable } from './artifacts/contracts/assets/ERC20/IERC20Mintable.sol/IERC20Mintable.js';
export { default as ERC20Mintable } from './artifacts/contracts/assets/ERC20/ERC20Mintable.sol/ERC20Mintable.js';

export { default as IERC721Dna } from './artifacts/contracts/assets/ERC721/IERC721Dna.sol/IERC721Dna.js';
export { default as IERC721Mintable } from './artifacts/contracts/assets/ERC721/IERC721Mintable.sol/IERC721Mintable.js';
export { default as IERC721MintableAutoId } from './artifacts/contracts/assets/ERC721/IERC721MintableAutoId.sol/IERC721MintableAutoId.js';
export { default as IERC721TopDown } from './artifacts/contracts/assets/ERC721/IERC721TopDown.sol/IERC721TopDown.js';
export { default as ERC721Base } from './artifacts/contracts/assets/ERC721/ERC721Base.sol/ERC721Base.js';
export { default as ERC721Mintable } from './artifacts/contracts/assets/ERC721/ERC721Mintable.sol/ERC721Mintable.js';
export { default as ERC721Dna } from './artifacts/contracts/assets/ERC721/ERC721Dna.sol/ERC721Dna.js';
export { default as ERC721MintableAutoId } from './artifacts/contracts/assets/ERC721/ERC721MintableAutoId.sol/ERC721MintableAutoId.js';
export { default as ERC721TopDownMintable } from './artifacts/contracts/assets/ERC721/ERC721TopDownMintable.sol/ERC721TopDownMintable.js';
export { default as ERC721TopDownMintableAutoId } from './artifacts/contracts/assets/ERC721/ERC721TopDownMintableAutoId.sol/ERC721TopDownMintableAutoId.js';
export { default as ERC721TopDownDna } from './artifacts/contracts/assets/ERC721/ERC721TopDownDna.sol/ERC721TopDownDna.js';
//Libraries
export { default as ERC721TopDownLib } from './artifacts/contracts/assets/ERC721/ERC721TopDownLib.sol/ERC721TopDownLib.js';
export { default as ERC721TopDownDnaLib } from './artifacts/contracts/assets/ERC721/ERC721TopDownDnaLib.sol/ERC721TopDownDnaLib.js';

export { default as IERC1155Dna } from './artifacts/contracts/assets/ERC1155/IERC1155Dna.sol/IERC1155Dna.js';
export { default as IERC1155Mintable } from './artifacts/contracts/assets/ERC1155/IERC1155Mintable.sol/IERC1155Mintable.js';
export { default as ERC1155Base } from './artifacts/contracts/assets/ERC1155/ERC1155Base.sol/ERC1155Base.js';
export { default as ERC1155Mintable } from './artifacts/contracts/assets/ERC1155/ERC1155Mintable.sol/ERC1155Mintable.js';
export { default as ERC1155Dna } from './artifacts/contracts/assets/ERC1155/ERC1155Dna.sol/ERC1155Dna.js';

export { default as IERC2981Setter } from './artifacts/contracts/assets/common/IERC2981Setter.sol/IERC2981Setter.js';
export { default as ERC2981Setter } from './artifacts/contracts/assets/common/ERC2981Setter.sol/ERC2981Setter.js';

//export { default as IERC4907 } from './artifacts/contracts/assets/ERC721/IERC4907.sol/IERC4907.js';

//Plugins
export { default as IAssetRouterCraft } from './artifacts/contracts/plugins/AssetRouter/IAssetRouterCraft.sol/IAssetRouterCraft.js';
export { default as IAssetRouterInput } from './artifacts/contracts/plugins/AssetRouter/IAssetRouterInput.sol/IAssetRouterInput.js';
export { default as IAssetRouterOutput } from './artifacts/contracts/plugins/AssetRouter/IAssetRouterOutput.sol/IAssetRouterOutput.js';
export { default as AssetRouterCraft } from './artifacts/contracts/plugins/AssetRouter/AssetRouterCraft.sol/AssetRouterCraft.js';
export { default as AssetRouterInput } from './artifacts/contracts/plugins/AssetRouter/AssetRouterInput.sol/AssetRouterInput.js';
export { default as AssetRouterOutput } from './artifacts/contracts/plugins/AssetRouter/AssetRouterOutput.sol/AssetRouterOutput.js';

/*
//Finance
export { default as DutchAuction } from '../artifacts/contracts/finance/DutchAuction.sol/DutchAuction.js';
export { default as EnglishAuction } from '../artifacts/contracts/finance/EnglishAuction.sol/EnglishAuction.js';

//Paymaster
export { default as NaivePaymaster } from '../artifacts/contracts/paymasters/NaivePaymaster.sol/NaivePaymaster.js';
export { default as NFTOwnershipPaymaster } from '../artifacts/contracts/paymasters/NFTOwnershipPaymaster.sol/NFTOwnershipPaymaster.js';
*/

/***** Openzeppelin *****/
//Access Control
export { default as IAccessControl } from './artifacts/@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol/IAccessControlUpgradeable.js';

//Tokens
export { default as IERC2981 } from './artifacts/@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol/IERC2981Upgradeable.js';

export { default as IERC20 } from './artifacts/@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol/IERC20Upgradeable.js';
export { default as IERC20Metadata } from './artifacts/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/IERC20MetadataUpgradeable.sol/IERC20MetadataUpgradeable.js';
export { default as ERC20PresetMinterPauser } from './artifacts/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol/ERC20PresetMinterPauserUpgradeable.js';

export { default as IERC721 } from './artifacts/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol/IERC721Upgradeable.js';
export { default as IERC721Receiver } from './artifacts/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol/IERC721ReceiverUpgradeable.js';
export { default as IERC721Metadata } from './artifacts/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol/IERC721MetadataUpgradeable.js';
export { default as IERC721Enumerable } from './artifacts/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol/IERC721EnumerableUpgradeable.js';
export { default as ERC721PresetMinterPauserAutoId } from './artifacts/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol/ERC721PresetMinterPauserAutoIdUpgradeable.js';

export { default as IERC1155 } from './artifacts/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol/IERC1155Upgradeable.js';
export { default as IERC1155Receiver } from './artifacts/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol/IERC1155ReceiverUpgradeable.js';
export { default as IERC1155MetadataURI } from './artifacts/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable.sol/IERC1155MetadataURIUpgradeable.js';
export { default as ERC1155PresetMinterPauser } from './artifacts/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol/ERC1155PresetMinterPauserUpgradeable.js';

//Utils
export { default as IERC165 } from './artifacts/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol/IERC165Upgradeable.js';
export { default as IERC1820Registry } from './artifacts/@openzeppelin/contracts-upgradeable/utils/introspection/IERC1820RegistryUpgradeable.sol/IERC1820RegistryUpgradeable.js';
