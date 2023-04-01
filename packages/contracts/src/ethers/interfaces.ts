import { constants, ethers, utils } from "ethers";
import { Interface } from "@ethersproject/abi";
import type { AbiItem } from "web3-utils";
import type {
    IERC1167Factory as IERC1167FactoryInterfaceType,
    IMulticall2 as IMulticall2InterfaceType,
    IERC20 as IERC20InterfaceType,
    IERC20Metadata as IERC20MetadataInterfaceType,
    IERC20Mintable as IERC20MintableInterfaceType,
    IERC2981 as IERC2981InterfaceType,
    IERC2981Setter as IERC2981SetterInterfaceType,
    IERC721 as IERC721InterfaceType,
    IERC721Metadata as IERC721MetadataInterfaceType,
    IERC721Enumerable as IERC721EnumerableInterfaceType,
    IERC721Mintable as IERC721MintableInterfaceType,
    IERC721MintableAutoId as IERC721MintableAutoIdInterfaceType,
    IERC721TopDown as IERC721TopDownInterfaceType,
    IERC721Receiver as IERC721ReceiverInterfaceType,
    IERC721Dna as IERC721DnaInterfaceType,
    IERC1155 as IERC1155InterfaceType,
    IERC1155MetadataURI as IERC1155MetadataURIInterfaceType,
    IERC1155Mintable as IERC1155MintableInterfaceType,
    IERC1155Dna as IERC1155DnaInterfaceType,
    IERC1155Receiver as IERC1155ReceiverInterfaceType,
    IAccessControl as IAccessControlInterfaceType,
    IContractURI as IContractURIInterfaceType,
    IRouterReceiver as IRouterReceiverInterfaceType,
    IBaseURI as IBaseURIInterfaceType,
    IERC165 as IERC165InterfaceType,
    IAssetRouterCraft as IAssetRouterCraftInterfaceType,
    IAssetRouterInput as IAssetRouterInputInterfaceType,
    IAssetRouterOutput as IAssetRouterOutputInterfaceType,
    IERC1820Registry as IERC1820RegistryInterfaceType,
} from "./types";

import {
    IERC1167Factory,
    IMulticall2,
    IERC20,
    IERC20Metadata,
    IERC20Mintable,
    IERC2981,
    IERC2981Setter,
    IERC721,
    IERC721Metadata,
    IERC721Enumerable,
    IERC721Mintable,
    IERC721MintableAutoId,
    IERC721TopDown,
    IERC721Receiver,
    IERC721Dna,
    IERC1155,
    IERC1155MetadataURI,
    IERC1155Mintable,
    IERC1155Dna,
    IERC1155Receiver,
    IAccessControl,
    IContractURI,
    IRouterReceiver,
    IBaseURI,
    IERC165,
    IAssetRouterCraft,
    IAssetRouterInput,
    IAssetRouterOutput,
    IERC1820Registry,
} from "../artifacts.js";
import { interfaceId } from "../utils/IERC165.js";

// ERC1667Factory
export const IERC1167FactoryInterface = new utils.Interface(
    IERC1167Factory.abi,
) as IERC1167FactoryInterfaceType["interface"];
export const IERC1167FactoryInterfaceId = interfaceId(IERC1167FactoryInterface.fragments);

export const IMulticall2Interface = new utils.Interface(IMulticall2.abi) as IMulticall2InterfaceType["interface"];
export const IMulticall2InterfaceInterfaceId = interfaceId(IMulticall2Interface.fragments);

// ERC165
export const IERC165Interface = new utils.Interface(IERC165.abi) as IERC165InterfaceType["interface"];
const IERC165Sighashes = new Set(IERC165Interface.fragments.map(Interface.getSighash));
export const IERC165InterfaceId = interfaceId(IERC165Interface.fragments);

// ERC1820
export const IERC1820Interface = new utils.Interface(
    IERC1820Registry.abi,
) as IERC1820RegistryInterfaceType["interface"];
export const IERC1820InterfaceId = interfaceId(IERC1820Interface.fragments);

// ERC20
export const IERC20Interface = new utils.Interface(IERC20.abi) as IERC20InterfaceType["interface"];
const IERC20Sighashes = new Set(IERC20Interface.fragments.map(Interface.getSighash));
export const IERC20InterfaceId = interfaceId(
    IERC20Interface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IERC20MetadataInterface = new utils.Interface(
    IERC20Metadata.abi,
) as IERC20MetadataInterfaceType["interface"];
const IERC20MetadataSighashes = new Set(IERC20MetadataInterface.fragments.map(Interface.getSighash));
export const IERC20MetadataInterfaceId = interfaceId(
    IERC20MetadataInterface.fragments.filter((f) => !IERC20Sighashes.has(Interface.getSighash(f))),
);

export const IERC20MintableInterface = new utils.Interface(
    IERC20Mintable.abi,
) as IERC20MintableInterfaceType["interface"];
export const IERC20MintableInterfaceId = interfaceId(
    IERC20MintableInterface.fragments.filter((f) => !IERC20MetadataSighashes.has(Interface.getSighash(f))),
);

// ERC2981
export const IERC2981Interface = new utils.Interface(IERC2981.abi) as IERC2981InterfaceType["interface"];
//const IERC2981Sighashes = new Set(IERC2981Interface.fragments.map(Interface.getSighash));
export const IERC2981InterfaceId = interfaceId(
    IERC2981Interface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IERC2981SetterInterface = new utils.Interface(
    IERC2981Setter.abi,
) as IERC2981SetterInterfaceType["interface"];
//const IERC2981SetterSighashes = new Set(IERC2981SetterInterface.fragments.map(Interface.getSighash));
export const IERC2981SetterInterfaceId = interfaceId(
    IERC2981SetterInterface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

// ERC721
export const IERC721Interface = new utils.Interface(IERC721.abi) as IERC721InterfaceType["interface"];
const IERC721Sighashes = new Set(IERC721Interface.fragments.map(Interface.getSighash));
export const IERC721InterfaceId = interfaceId(
    IERC721Interface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IERC721MetadataInterface = new utils.Interface(
    IERC721Metadata.abi,
) as IERC721MetadataInterfaceType["interface"];
//const IERC721MetadataSighashes = new Set(IERC721MetadataInterface.fragments.map(Interface.getSighash));
export const IERC721MetadataInterfaceId = interfaceId(
    IERC721MetadataInterface.fragments.filter((f) => !IERC721Sighashes.has(Interface.getSighash(f))),
);

export const IERC721EnumerableInterface = new utils.Interface(
    IERC721Enumerable.abi,
) as IERC721EnumerableInterfaceType["interface"];
//const IERC721EnumerableSighashes = new Set(IERC721EnumerableInterface.fragments.map(Interface.getSighash));
export const IERC721EnumerableInterfaceId = interfaceId(
    IERC721EnumerableInterface.fragments.filter((f) => !IERC721Sighashes.has(Interface.getSighash(f))),
);

export const IERC721MintableInterface = new utils.Interface(
    IERC721Mintable.abi,
) as IERC721MintableInterfaceType["interface"];
//const IERC721MintableSighashes = new Set(IERC721MintableInterface.fragments.map(Interface.getSighash));
export const IERC721MintableInterfaceId = interfaceId(IERC721MintableInterface.fragments);

export const IERC721MintableAutoIdInterface = new utils.Interface(
    IERC721MintableAutoId.abi,
) as IERC721MintableAutoIdInterfaceType["interface"];
export const IERC721MintableAutoIdInterfaceId = interfaceId(IERC721MintableAutoIdInterface.fragments);

export const IERC721TopDownInterface = new utils.Interface(
    IERC721TopDown.abi,
) as IERC721TopDownInterfaceType["interface"];
export const IERC721TopDownInterfaceId = interfaceId(IERC721TopDownInterface.fragments);

export const IERC721DnaInterface = new utils.Interface(IERC721Dna.abi) as IERC721DnaInterfaceType["interface"];
export const IERC721DnaInterfaceId = interfaceId(IERC721DnaInterface.fragments);

export const IERC721ReceiverInterface = new utils.Interface(
    IERC721Receiver.abi,
) as IERC721ReceiverInterfaceType["interface"];
export const IERC721ReceiverInterfaceId = interfaceId(IERC721ReceiverInterface.fragments);

// ERC1155
export const IERC1155Interface = new utils.Interface(IERC1155.abi) as IERC1155InterfaceType["interface"];
const IERC1155Sighashes = new Set(IERC1155Interface.fragments.map(Interface.getSighash));
export const IERC1155InterfaceId = interfaceId(
    IERC1155Interface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IERC1155MetadataURIInterface = new utils.Interface(
    IERC1155MetadataURI.abi,
) as IERC1155MetadataURIInterfaceType["interface"];
export const IERC1155MetadataURIInterfaceId = interfaceId(
    IERC1155MetadataURIInterface.fragments.filter((f) => !IERC1155Sighashes.has(Interface.getSighash(f))),
);

export const IERC1155MintableInterface = new utils.Interface(
    IERC1155Mintable.abi,
) as IERC1155MintableInterfaceType["interface"];
export const IERC1155MintableInterfaceId = interfaceId(IERC1155MintableInterface.fragments);

export const IERC1155DnaInterface = new utils.Interface(IERC1155Dna.abi) as IERC1155DnaInterfaceType["interface"];
export const IERC1155DnaInterfaceId = interfaceId(IERC1155DnaInterface.fragments);

export const IERC1155ReceiverInterface = new utils.Interface(
    IERC1155Receiver.abi,
) as IERC1155ReceiverInterfaceType["interface"];
export const IERC1155ReceiverInterfaceId = interfaceId(
    IERC1155ReceiverInterface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IAccessControlInterface = new utils.Interface(
    IAccessControl.abi,
) as IAccessControlInterfaceType["interface"];
export const IAccessControlInterfaceId = interfaceId(IAccessControlInterface.fragments);

export const IContractURIInterface = new utils.Interface(IContractURI.abi) as IContractURIInterfaceType["interface"];
export const IContractURIInterfaceId = interfaceId(IContractURIInterface.fragments);

export const IRouterReceiverInterface = new utils.Interface(
    IRouterReceiver.abi,
) as IRouterReceiverInterfaceType["interface"];
export const IRouterReceiverInterfaceId = interfaceId(IRouterReceiverInterface.fragments);

export const IBaseURIInterface = new utils.Interface(IBaseURI.abi) as IBaseURIInterfaceType["interface"];
export const IBaseURIInterfaceId = interfaceId(IBaseURIInterface.fragments);

export const IAssetRouterCraftInterface = new utils.Interface(
    IAssetRouterCraft.abi,
) as IAssetRouterCraftInterfaceType["interface"];
export const IAssetRouterCraftInterfaceId = interfaceId(IAssetRouterCraftInterface.fragments);

export const IAssetRouterInputInterface = new utils.Interface(
    IAssetRouterInput.abi,
) as IAssetRouterInputInterfaceType["interface"];
export const IAssetRouterInputInterfaceId = interfaceId(IAssetRouterInputInterface.fragments);

export const IAssetRouterOutputInterface = new utils.Interface(
    IAssetRouterOutput.abi,
) as IAssetRouterOutputInterfaceType["interface"];
export const IAssetRouterOutputInterfaceId = interfaceId(IAssetRouterOutputInterface.fragments);

export const interfaceIds: { [k: string]: AbiItem[] } = {
    [IERC1167FactoryInterfaceId]: IERC1167Factory.abi,
    [IERC165InterfaceId]: IERC165.abi,
    [IERC1820InterfaceId]: IERC1820Registry.abi,
    [IAccessControlInterfaceId]: IAccessControl.abi,
    [IRouterReceiverInterfaceId]: IBaseURI.abi,
    [IContractURIInterfaceId]: IContractURI.abi,
    [IBaseURIInterfaceId]: IBaseURI.abi,
    [IERC2981InterfaceId]: IERC2981.abi,
    [IERC2981SetterInterfaceId]: IERC2981Setter.abi,
    [IERC20InterfaceId]: IERC20.abi,
    [IERC20MetadataInterfaceId]: IERC20Metadata.abi,
    [IERC20MintableInterfaceId]: IERC20Mintable.abi,
    [IERC721InterfaceId]: IERC721.abi,
    [IERC721MetadataInterfaceId]: IERC721Metadata.abi,
    [IERC721EnumerableInterfaceId]: IERC721Enumerable.abi,
    [IERC721MintableInterfaceId]: IERC721Mintable.abi,
    [IERC721MintableAutoIdInterfaceId]: IERC721MintableAutoId.abi,
    [IERC721TopDownInterfaceId]: IERC721TopDown.abi,
    [IERC721ReceiverInterfaceId]: IERC721Receiver.abi,
    [IERC1155InterfaceId]: IERC1155.abi,
    [IERC1155MetadataURIInterfaceId]: IERC1155MetadataURI.abi,
    [IERC1155MintableInterfaceId]: IERC1155Mintable.abi,
    [IERC1155DnaInterfaceId]: IERC1155Dna.abi,
    [IERC1155ReceiverInterfaceId]: IERC1155Receiver.abi,
    [IAssetRouterCraftInterfaceId]: IAssetRouterCraft.abi,
    [IAssetRouterInputInterfaceId]: IAssetRouterInput.abi,
    [IAssetRouterOutputInterfaceId]: IAssetRouterOutput.abi,
};

export type InterfaceName = keyof typeof interfaces;
export const interfaceIdNames: { [k: string]: InterfaceName } = {
    [IERC1167FactoryInterfaceId]: "IERC1167Factory",
    [IERC165InterfaceId]: "IERC165",
    [IERC1820InterfaceId]: "IERC1820",
    [IAccessControlInterfaceId]: "IAccessControl",
    [IRouterReceiverInterfaceId]: "IRouterReceiver",
    [IContractURIInterfaceId]: "IContractURI",
    [IBaseURIInterfaceId]: "IBaseURI",
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
    [IERC721TopDownInterfaceId]: "IERC721TopDown",
    [IERC721ReceiverInterfaceId]: "IERC721Receiver",
    [IERC1155InterfaceId]: "IERC1155",
    [IERC1155MetadataURIInterfaceId]: "IERC1155MetadataURI",
    [IERC1155MintableInterfaceId]: "IERC1155Mintable",
    [IERC1155DnaInterfaceId]: "IERC1155Dna",
    [IERC1155ReceiverInterfaceId]: "IERC1155Receiver",
    [IAssetRouterCraftInterfaceId]: "IAssetRouterCraft",
    [IAssetRouterInputInterfaceId]: "IAssetRouterInput",
    [IAssetRouterOutputInterfaceId]: "IAssetRouterOutput",
};

export const interfaces = {
    IERC1167Factory: {
        interface: IERC1167FactoryInterface,
        interfaceId: IERC1167FactoryInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC1167FactoryInterface) as IERC1167FactoryInterfaceType,
    },
    IMulticall2: {
        interface: IMulticall2Interface,
        interfaceId: IMulticall2InterfaceInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IMulticall2Interface) as IMulticall2InterfaceType,
    },
    IERC165: {
        interface: IERC165Interface,
        interfaceId: IERC165InterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC165Interface) as IERC165InterfaceType,
    },
    IERC1820: {
        interface: IERC1820Interface,
        interfaceId: IERC1820InterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC1820Interface) as IERC1820RegistryInterfaceType,
    },
    IAccessControl: {
        interface: IAccessControlInterface,
        interfaceId: IAccessControlInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IAccessControlInterface) as IAccessControlInterfaceType,
    },
    IRouterReceiver: {
        interface: IRouterReceiverInterface,
        interfaceId: IRouterReceiverInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IRouterReceiverInterface) as IRouterReceiverInterfaceType,
    },
    IContractURI: {
        interface: IContractURIInterface,
        interfaceId: IContractURIInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IContractURIInterface) as IContractURIInterfaceType,
    },
    IBaseURI: {
        interface: IBaseURIInterface,
        interfaceId: IBaseURIInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IBaseURIInterface) as IBaseURIInterfaceType,
    },
    IERC2981: {
        interface: IERC2981Interface,
        interfaceId: IERC2981InterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC2981Interface) as IERC2981InterfaceType,
    },
    IERC2981Setter: {
        interface: IERC2981SetterInterface,
        interfaceId: IERC2981SetterInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC2981SetterInterface) as IERC2981SetterInterfaceType,
    },
    IERC20: {
        interface: IERC20Interface,
        interfaceId: IERC20InterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC20Interface) as IERC20InterfaceType,
    },
    IERC20Metadata: {
        interface: IERC20MetadataInterface,
        interfaceId: IERC20MetadataInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC20MetadataInterface) as IERC20MetadataInterfaceType,
    },
    IERC20Mintable: {
        interface: IERC20MintableInterface,
        interfaceId: IERC20MintableInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC20MintableInterface) as IERC20MintableInterfaceType,
    },
    IERC721: {
        interface: IERC721Interface,
        interfaceId: IERC721InterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC721Interface) as IERC721InterfaceType,
    },
    IERC721Metadata: {
        interface: IERC721MetadataInterface,
        interfaceId: IERC721MetadataInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC721MetadataInterface) as IERC721MetadataInterfaceType,
    },
    IERC721Enumerable: {
        interface: IERC721EnumerableInterface,
        interfaceId: IERC721EnumerableInterfaceId,
        contract: new ethers.Contract(
            constants.AddressZero,
            IERC721EnumerableInterface,
        ) as IERC721EnumerableInterfaceType,
    },
    IERC721Mintable: {
        interface: IERC721MintableInterface,
        interfaceId: IERC721MintableInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC721MintableInterface) as IERC721MintableInterfaceType,
    },
    IERC721MintableAutoId: {
        interface: IERC721MintableAutoIdInterface,
        interfaceId: IERC721MintableAutoIdInterfaceId,
        contract: new ethers.Contract(
            constants.AddressZero,
            IERC721MintableAutoIdInterface,
        ) as IERC721MintableAutoIdInterfaceType,
    },
    IERC721TopDown: {
        interface: IERC721TopDownInterface,
        interfaceId: IERC721TopDownInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC721TopDownInterface) as IERC721TopDownInterfaceType,
    },
    IERC721Receiver: {
        interface: IERC721ReceiverInterface,
        interfaceId: IERC721ReceiverInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC721ReceiverInterface) as IERC721ReceiverInterfaceType,
    },
    IERC721Dna: {
        interface: IERC721DnaInterface,
        interfaceId: IERC721DnaInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC721DnaInterface) as IERC721DnaInterfaceType,
    },
    IERC1155: {
        interface: IERC1155Interface,
        interfaceId: IERC1155InterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC1155Interface) as IERC1155InterfaceType,
    },
    IERC1155MetadataURI: {
        interface: IERC1155MetadataURIInterface,
        interfaceId: IERC1155MetadataURIInterfaceId,
        contract: new ethers.Contract(
            constants.AddressZero,
            IERC1155MetadataURIInterface,
        ) as IERC1155MetadataURIInterfaceType,
    },
    IERC1155Mintable: {
        interface: IERC1155MintableInterface,
        interfaceId: IERC1155MintableInterfaceId,
        contract: new ethers.Contract(
            constants.AddressZero,
            IERC1155MintableInterface,
        ) as IERC1155MintableInterfaceType,
    },
    IERC1155Dna: {
        interface: IERC1155DnaInterface,
        interfaceId: IERC1155DnaInterfaceId,
        contract: new ethers.Contract(constants.AddressZero, IERC1155DnaInterface) as IERC1155DnaInterfaceType,
    },
    IERC1155Receiver: {
        interface: IERC1155ReceiverInterface,
        interfaceId: IERC1155ReceiverInterfaceId,
        contract: new ethers.Contract(
            constants.AddressZero,
            IERC1155ReceiverInterface,
        ) as IERC1155ReceiverInterfaceType,
    },
    IAssetRouterCraft: {
        interface: IAssetRouterCraftInterface,
        interfaceId: IAssetRouterCraftInterfaceId,
        contract: new ethers.Contract(
            constants.AddressZero,
            IAssetRouterCraftInterface,
        ) as IAssetRouterCraftInterfaceType,
    },
    IAssetRouterInput: {
        interface: IAssetRouterInputInterface,
        interfaceId: IAssetRouterInputInterfaceId,
        contract: new ethers.Contract(
            constants.AddressZero,
            IAssetRouterInputInterface,
        ) as IAssetRouterInputInterfaceType,
    },
    IAssetRouterOutput: {
        interface: IAssetRouterOutputInterface,
        interfaceId: IAssetRouterOutputInterfaceId,
        contract: new ethers.Contract(
            constants.AddressZero,
            IAssetRouterOutputInterface,
        ) as IAssetRouterOutputInterfaceType,
    },
};
