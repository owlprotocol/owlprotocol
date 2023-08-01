import { Interface } from "@ethersproject/abi";
import { constants } from "ethers";
import * as contracts from "../typechain/ethers/factories/contracts/index.js";
import * as oz from "../typechain/ethers/factories/@openzeppelin/contracts-upgradeable/index.js";
import { interfaceId } from "../utils/IERC165.js";

// ERC1667Factory
export const IMulticall2Interface = contracts.utils.IMulticall2__factory.createInterface();
export const IMulticall2InterfaceId = interfaceId(IMulticall2Interface.fragments);

// ERC165
export const IERC165Interface = oz.utils.introspection.IERC165Upgradeable__factory.createInterface();
const IERC165Sighashes = new Set(IERC165Interface.fragments.map(Interface.getSighash));
export const IERC165InterfaceId = interfaceId(IERC165Interface.fragments);

// ERC1820
export const IERC1820Interface = oz.utils.introspection.IERC1820RegistryUpgradeable__factory.createInterface();
export const IERC1820InterfaceId = interfaceId(IERC1820Interface.fragments);

// ERC20
export const IERC20Interface = oz.token.erc20.IERC20Upgradeable__factory.createInterface();
const IERC20Sighashes = new Set(IERC20Interface.fragments.map(Interface.getSighash));
export const IERC20InterfaceId = interfaceId(
    IERC20Interface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IERC20MetadataInterface = oz.token.erc20.extensions.IERC20MetadataUpgradeable__factory.createInterface();
const IERC20MetadataSighashes = new Set(IERC20MetadataInterface.fragments.map(Interface.getSighash));
export const IERC20MetadataInterfaceId = interfaceId(
    IERC20MetadataInterface.fragments.filter((f) => !IERC20Sighashes.has(Interface.getSighash(f))),
);

export const IERC20MintableInterface = contracts.assets.erc20.IERC20Mintable__factory.createInterface();
export const IERC20MintableInterfaceId = interfaceId(
    IERC20MintableInterface.fragments.filter((f) => !IERC20MetadataSighashes.has(Interface.getSighash(f))),
);

// ERC2981
export const IERC2981Interface = oz.interfaces.IERC2981Upgradeable__factory.createInterface();
//const IERC2981Sighashes = new Set(IERC2981Interface.fragments.map(Interface.getSighash));
export const IERC2981InterfaceId = interfaceId(
    IERC2981Interface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IERC2981SetterInterface = contracts.plugins.erc2981.IERC2981Setter__factory.createInterface();
//const IERC2981SetterSighashes = new Set(IERC2981SetterInterface.fragments.map(Interface.getSighash));
export const IERC2981SetterInterfaceId = interfaceId(
    IERC2981SetterInterface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

// ERC721
export const IERC721Interface = oz.token.erc721.IERC721Upgradeable__factory.createInterface();
const IERC721Sighashes = new Set(IERC721Interface.fragments.map(Interface.getSighash));
export const IERC721InterfaceId = interfaceId(
    IERC721Interface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IERC721MetadataInterface =
    oz.token.erc721.extensions.IERC721MetadataUpgradeable__factory.createInterface();
//const IERC721MetadataSighashes = new Set(IERC721MetadataInterface.fragments.map(Interface.getSighash));
export const IERC721MetadataInterfaceId = interfaceId(
    IERC721MetadataInterface.fragments.filter((f) => !IERC721Sighashes.has(Interface.getSighash(f))),
);

export const IERC721EnumerableInterface =
    oz.token.erc721.extensions.IERC721EnumerableUpgradeable__factory.createInterface();
//const IERC721EnumerableSighashes = new Set(IERC721EnumerableInterface.fragments.map(Interface.getSighash));
export const IERC721EnumerableInterfaceId = interfaceId(
    IERC721EnumerableInterface.fragments.filter((f) => !IERC721Sighashes.has(Interface.getSighash(f))),
);

export const IERC721MintableInterface = contracts.assets.erc721.IERC721Mintable__factory.createInterface();
//const IERC721MintableSighashes = new Set(IERC721MintableInterface.fragments.map(Interface.getSighash));
export const IERC721MintableInterfaceId = interfaceId(IERC721MintableInterface.fragments);
export const ERC721MintableInterface = contracts.assets.erc721.ERC721Mintable__factory.createInterface();

export const IERC721MintableAutoIdInterface = contracts.assets.erc721.IERC721MintableAutoId__factory.createInterface();
export const IERC721MintableAutoIdInterfaceId = interfaceId(IERC721MintableAutoIdInterface.fragments);
export const ERC721MintableAutoIdInterface = contracts.assets.erc721.ERC721MintableAutoId__factory.createInterface();

export const IERC721ReceiverInterface = oz.token.erc721.IERC721ReceiverUpgradeable__factory.createInterface();
export const IERC721ReceiverInterfaceId = interfaceId(IERC721ReceiverInterface.fragments);

// ERC1155
export const IERC1155Interface = oz.token.erc1155.IERC1155Upgradeable__factory.createInterface();
const IERC1155Sighashes = new Set(IERC1155Interface.fragments.map(Interface.getSighash));
export const IERC1155InterfaceId = interfaceId(
    IERC1155Interface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IERC1155MetadataURIInterface =
    oz.token.erc1155.extensions.IERC1155MetadataURIUpgradeable__factory.createInterface();
export const IERC1155MetadataURIInterfaceId = interfaceId(
    IERC1155MetadataURIInterface.fragments.filter((f) => !IERC1155Sighashes.has(Interface.getSighash(f))),
);

export const IERC1155MintableInterface = contracts.assets.erc1155.IERC1155Mintable__factory.createInterface();
export const IERC1155MintableInterfaceId = interfaceId(IERC1155MintableInterface.fragments);

export const IERC1155ReceiverInterface = oz.token.erc1155.IERC1155ReceiverUpgradeable__factory.createInterface();
export const IERC1155ReceiverInterfaceId = interfaceId(
    IERC1155ReceiverInterface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IAccessControlInterface = oz.access.IAccessControlUpgradeable__factory.createInterface();
export const IAccessControlInterfaceId = interfaceId(IAccessControlInterface.fragments);

export const IContractURIInterface = contracts.common.IContractURI__factory.createInterface();
export const IContractURIInterfaceId = interfaceId(IContractURIInterface.fragments);

export const IRouterReceiverInterface = contracts.common.IRouterReceiver__factory.createInterface();
export const IRouterReceiverInterfaceId = interfaceId(IRouterReceiverInterface.fragments);

export const IAssetRouterCraftInterface = contracts.plugins.assetRouter.IAssetRouterCraft__factory.createInterface();
export const IAssetRouterCraftInterfaceId = interfaceId(IAssetRouterCraftInterface.fragments);

export const AssetRouterInputInterface = contracts.plugins.assetRouter.AssetRouterInput__factory.createInterface();
export const IAssetRouterInputInterface = contracts.plugins.assetRouter.IAssetRouterInput__factory.createInterface();
export const IAssetRouterInputInterfaceId = interfaceId(IAssetRouterInputInterface.fragments);

export const IAssetRouterOutputInterface = contracts.plugins.assetRouter.IAssetRouterOutput__factory.createInterface();
export const IAssetRouterOutputInterfaceId = interfaceId(IAssetRouterOutputInterface.fragments);

export const ITokenDnaInterface = contracts.plugins.tokenDna.ITokenDna__factory.createInterface();
export const ITokenDnaInterfaceId = interfaceId(ITokenDnaInterface.fragments);

export const ITokenConsumerInterface = contracts.plugins.tokenConsumer.ITokenConsumer__factory.createInterface();
export const ITokenConsumerInterfaceId = interfaceId(ITokenConsumerInterface.fragments);

export const interfaceIds = {
    [IERC165InterfaceId]: oz.utils.introspection.IERC165Upgradeable__factory.abi,
    [IERC1820InterfaceId]: oz.utils.introspection.IERC1820RegistryUpgradeable__factory.abi,
    [IAccessControlInterfaceId]: oz.access.IAccessControlUpgradeable__factory.abi,
    [IRouterReceiverInterfaceId]: contracts.common.IRouterReceiver__factory.abi,
    [IContractURIInterfaceId]: contracts.common.IContractURI__factory.abi,
    [IERC2981InterfaceId]: oz.interfaces.IERC2981Upgradeable__factory.abi,
    [IERC2981SetterInterfaceId]: contracts.plugins.erc2981.ERC2981Setter__factory.abi,
    [IERC20InterfaceId]: oz.token.erc20.IERC20Upgradeable__factory.abi,
    [IERC20MetadataInterfaceId]: oz.token.erc20.extensions.IERC20MetadataUpgradeable__factory.abi,
    [IERC20MintableInterfaceId]: contracts.assets.erc20.IERC20Mintable__factory.abi,
    [IERC721InterfaceId]: oz.token.erc721.IERC721Upgradeable__factory.abi,
    [IERC721MetadataInterfaceId]: oz.token.erc721.extensions.IERC721MetadataUpgradeable__factory.abi,
    [IERC721EnumerableInterfaceId]: oz.token.erc721.extensions.IERC721EnumerableUpgradeable__factory.abi,
    [IERC721MintableInterfaceId]: contracts.assets.erc721.IERC721Mintable__factory.abi,
    [IERC721MintableAutoIdInterfaceId]: contracts.assets.erc721.IERC721MintableAutoId__factory.abi,
    [IERC721ReceiverInterfaceId]: oz.token.erc721.IERC721ReceiverUpgradeable__factory.abi,
    [IERC1155InterfaceId]: oz.token.erc1155.IERC1155Upgradeable__factory.abi,
    [IERC1155MetadataURIInterfaceId]: oz.token.erc1155.extensions.IERC1155MetadataURIUpgradeable__factory.abi,
    [IERC1155MintableInterfaceId]: contracts.assets.erc1155.ERC1155Mintable__factory.abi,
    [IERC1155ReceiverInterfaceId]: oz.token.erc1155.IERC1155ReceiverUpgradeable__factory.abi,
    [IAssetRouterCraftInterfaceId]: contracts.plugins.assetRouter.IAssetRouterCraft__factory.abi,
    [IAssetRouterInputInterfaceId]: contracts.plugins.assetRouter.IAssetRouterInput__factory.abi,
    [IAssetRouterOutputInterfaceId]: contracts.plugins.assetRouter.IAssetRouterOutput__factory.abi,
    [ITokenDnaInterfaceId]: contracts.plugins.tokenDna.ITokenDna__factory.abi,
    [ITokenConsumerInterfaceId]: contracts.plugins.tokenConsumer.ITokenConsumer__factory.abi,
} as const;

export type InterfaceName = keyof typeof interfaces;
export const interfaceIdNames = {
    [IMulticall2InterfaceId]: "IMulticall2",
    [IERC165InterfaceId]: "IERC165",
    [IERC1820InterfaceId]: "IERC1820",
    [IAccessControlInterfaceId]: "IAccessControl",
    [IRouterReceiverInterfaceId]: "IRouterReceiver",
    [IContractURIInterfaceId]: "IContractURI",
    [IERC2981InterfaceId]: "IERC2981",
    [IERC2981SetterInterfaceId]: "IERC2981Setter",
    [IERC20InterfaceId]: "IERC20",
    [IERC20MetadataInterfaceId]: "IERC20Metadata",
    [IERC20MintableInterfaceId]: "IERC20Mintable",
    [IERC721InterfaceId]: "IERC721",
    [IERC721MetadataInterfaceId]: "IERC721Metadata",
    [IERC721EnumerableInterfaceId]: "IERC721Enumerable",
    [IERC721MintableInterfaceId]: "IERC721Mintable",
    [IERC721MintableAutoIdInterfaceId]: "IERC721MintableAutoId",
    [IERC721ReceiverInterfaceId]: "IERC721Receiver",
    [IERC1155InterfaceId]: "IERC1155",
    [IERC1155MetadataURIInterfaceId]: "IERC1155MetadataURI",
    [IERC1155MintableInterfaceId]: "IERC1155Mintable",
    [IERC1155ReceiverInterfaceId]: "IERC1155Receiver",
    [IAssetRouterCraftInterfaceId]: "IAssetRouterCraft",
    [IAssetRouterInputInterfaceId]: "IAssetRouterInput",
    [IAssetRouterOutputInterfaceId]: "IAssetRouterOutput",
    [ITokenDnaInterfaceId]: "ITokenDna",
    [ITokenConsumerInterfaceId]: "ITokenConsumer",
} as const;

export const interfaces = {
    IMulticall2: {
        interface: IMulticall2Interface,
        contract: contracts.utils.IMulticall2__factory.connect(constants.AddressZero, null as any),
        interfaceId: IMulticall2InterfaceId,
    },
    IERC165: {
        interface: IERC165Interface,
        interfaceId: IERC165InterfaceId,
        contract: oz.utils.introspection.IERC165Upgradeable__factory.connect(constants.AddressZero, null as any),
    },
    IERC1820: {
        interface: IERC1820Interface,
        interfaceId: IERC1820InterfaceId,
        contract: oz.utils.introspection.IERC1820RegistryUpgradeable__factory.connect(
            constants.AddressZero,
            null as any,
        ),
    },
    IAccessControl: {
        interface: IAccessControlInterface,
        interfaceId: IAccessControlInterfaceId,
        contract: oz.access.IAccessControlUpgradeable__factory.connect(constants.AddressZero, null as any),
    },
    IRouterReceiver: {
        interface: IRouterReceiverInterface,
        interfaceId: IRouterReceiverInterfaceId,
        contract: contracts.common.IRouterReceiver__factory.connect(constants.AddressZero, null as any),
    },
    IContractURI: {
        interface: IContractURIInterface,
        interfaceId: IContractURIInterfaceId,
        contract: contracts.common.IContractURI__factory.connect(constants.AddressZero, null as any),
    },
    IERC2981: {
        interface: IERC2981Interface,
        interfaceId: IERC2981InterfaceId,
        contract: oz.interfaces.IERC2981Upgradeable__factory.connect(constants.AddressZero, null as any),
    },
    IERC2981Setter: {
        interface: IERC2981SetterInterface,
        interfaceId: IERC2981SetterInterfaceId,
        contract: contracts.plugins.erc2981.IERC2981Setter__factory.connect(constants.AddressZero, null as any),
    },
    IERC20: {
        interface: IERC20Interface,
        interfaceId: IERC20InterfaceId,
        contract: oz.token.erc20.IERC20Upgradeable__factory.connect(constants.AddressZero, null as any),
    },
    IERC20Metadata: {
        interface: IERC20MetadataInterface,
        interfaceId: IERC20MetadataInterfaceId,
        contract: oz.token.erc20.extensions.IERC20MetadataUpgradeable__factory.connect(
            constants.AddressZero,
            null as any,
        ),
    },
    IERC20Mintable: {
        interface: IERC20MintableInterface,
        interfaceId: IERC20MintableInterfaceId,
        contract: contracts.assets.erc20.IERC20Mintable__factory.connect(constants.AddressZero, null as any),
    },
    IERC721: {
        interface: IERC721Interface,
        interfaceId: IERC721InterfaceId,
        contract: oz.token.erc721.IERC721Upgradeable__factory.connect(constants.AddressZero, null as any),
    },
    IERC721Metadata: {
        interface: IERC721MetadataInterface,
        interfaceId: IERC721MetadataInterfaceId,
        contract: oz.token.erc721.extensions.IERC721MetadataUpgradeable__factory.connect(
            constants.AddressZero,
            null as any,
        ),
    },
    IERC721Enumerable: {
        interface: IERC721EnumerableInterface,
        interfaceId: IERC721EnumerableInterfaceId,
        contract: oz.token.erc721.extensions.IERC721EnumerableUpgradeable__factory.connect(
            constants.AddressZero,
            null as any,
        ),
    },
    IERC721Mintable: {
        interface: IERC721MintableInterface,
        interfaceId: IERC721MintableInterfaceId,
        contract: contracts.assets.erc721.IERC721Mintable__factory.connect(constants.AddressZero, null as any),
    },
    IERC721MintableAutoId: {
        interface: IERC721MintableAutoIdInterface,
        interfaceId: IERC721MintableAutoIdInterfaceId,
        contract: contracts.assets.erc721.IERC721MintableAutoId__factory.connect(constants.AddressZero, null as any),
    },
    IERC721Receiver: {
        interface: IERC721ReceiverInterface,
        interfaceId: IERC721ReceiverInterfaceId,
        contract: oz.token.erc721.IERC721ReceiverUpgradeable__factory.connect(constants.AddressZero, null as any),
    },
    IERC1155: {
        interface: IERC1155Interface,
        interfaceId: IERC1155InterfaceId,
        contract: oz.token.erc1155.IERC1155Upgradeable__factory.connect(constants.AddressZero, null as any),
    },
    IERC1155MetadataURI: {
        interface: IERC1155MetadataURIInterface,
        interfaceId: IERC1155MetadataURIInterfaceId,
        contract: oz.token.erc1155.extensions.IERC1155MetadataURIUpgradeable__factory.connect(
            constants.AddressZero,
            null as any,
        ),
    },
    IERC1155Mintable: {
        interface: IERC1155MintableInterface,
        interfaceId: IERC1155MintableInterfaceId,
        contract: contracts.assets.erc1155.IERC1155Mintable__factory.connect(constants.AddressZero, null as any),
    },
    IERC1155Receiver: {
        interface: IERC1155ReceiverInterface,
        interfaceId: IERC1155ReceiverInterfaceId,
        contract: oz.token.erc1155.IERC1155ReceiverUpgradeable__factory.connect(constants.AddressZero, null as any),
    },
    IAssetRouterCraft: {
        interface: IAssetRouterCraftInterface,
        interfaceId: IAssetRouterCraftInterfaceId,
        contract: contracts.plugins.assetRouter.IAssetRouterCraft__factory.connect(constants.AddressZero, null as any),
    },
    IAssetRouterInput: {
        interface: IAssetRouterInputInterface,
        interfaceId: IAssetRouterInputInterfaceId,
        contract: contracts.plugins.assetRouter.IAssetRouterInput__factory.connect(constants.AddressZero, null as any),
    },
    IAssetRouterOutput: {
        interface: IAssetRouterOutputInterface,
        interfaceId: IAssetRouterOutputInterfaceId,
        contract: contracts.plugins.assetRouter.IAssetRouterOutput__factory.connect(constants.AddressZero, null as any),
    },
    ITokenDna: {
        interface: ITokenDnaInterface,
        interfaceId: ITokenDnaInterfaceId,
        contract: contracts.plugins.tokenDna.ITokenDna__factory.connect(constants.AddressZero, null as any),
    },
    ITokenConsumer: {
        interface: ITokenConsumerInterface,
        interfaceId: ITokenConsumerInterfaceId,
        contract: contracts.plugins.tokenConsumer.ITokenConsumer__factory.connect(constants.AddressZero, null as any),
    },
};
