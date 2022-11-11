import { utils } from 'ethers';
import type {
    IERC20Interface as IERC20InterfaceType,
    IERC20MetadataInterface as IERC20MetadataInterfaceType,
    IERC20MintableInterface as IERC20MintableInterfaceType,
    IERC2981Interface as IERC2981InterfaceType,
    IERC2981SetterInterface as IERC2981SetterInterfaceType,
    IERC721Interface as IERC721InterfaceType,
    IERC721MetadataInterface as IERC721MetadataInterfaceType,
    IERC721EnumerableInterface as IERC721EnumerableInterfaceType,
    IERC721MintableInterface as IERC721MintableInterfaceType,
    IERC721MintableAutoIdInterface as IERC721MintableAutoIdInterfaceType,
    IERC721TopDownInterface as IERC721TopDownInterfaceType,
    IERC721ReceiverInterface as IERC721ReceiverInterfaceType,
    IERC721DnaInterface as IERC721DnaInterfaceType,
    IERC1155Interface as IERC1155InterfaceType,
    IERC1155MetadataURIInterface as IERC1155MetadataURIInterfaceType,
    IERC1155MintableInterface as IERC1155MintableInterfaceType,
    IERC1155DnaInterface as IERC1155DnaInterfaceType,
    IERC1155ReceiverInterface as IERC1155ReceiverInterfaceType,
    IAccessControlInterface as IAccessControlInterfaceType,
    IContractURIInterface as IContractURIInterfaceType,
    IRouterReceiverInterface as IRouterReceiverInterfaceType,
    IBaseURIInterface as IBaseURIInterfaceType,
    IERC165Interface as IERC165InterfaceType,
    IAssetRouterInputInterface as IAssetRouterInputInterfaceType,
    IAssetRouterOutputInterface as IAssetRouterOutputInterfaceType,
} from './types';

import {
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
    IAssetRouterInput,
    IAssetRouterOutput,
} from '../artifacts.js';
import { interfaceId } from '../utils/IERC165.js';
import { Interface } from '@ethersproject/abi';

export const IERC165Interface = new utils.Interface(IERC165.abi) as IERC165InterfaceType;
const IERC165Sighashes = new Set(IERC165Interface.fragments.map(Interface.getSighash));
export const IERC165InterfaceId = interfaceId(IERC165Interface.fragments);

export const IERC20Interface = new utils.Interface(IERC20.abi) as IERC20InterfaceType;
const IERC20Sighashes = new Set(IERC20Interface.fragments.map(Interface.getSighash));
export const IERC20InterfaceId = interfaceId(
    IERC20Interface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IERC20MetadataInterface = new utils.Interface(IERC20Metadata.abi) as IERC20MetadataInterfaceType;
const IERC20MetadataSighashes = new Set(IERC20MetadataInterface.fragments.map(Interface.getSighash));
export const IERC20MetadataInterfaceId = interfaceId(
    IERC20MetadataInterface.fragments.filter((f) => !IERC20Sighashes.has(Interface.getSighash(f))),
);

export const IERC20MintableInterface = new utils.Interface(IERC20Mintable.abi) as IERC20MintableInterfaceType;
export const IERC20MintableInterfaceId = interfaceId(
    IERC20MintableInterface.fragments.filter((f) => !IERC20MetadataSighashes.has(Interface.getSighash(f))),
);

export const IERC2981Interface = new utils.Interface(IERC2981.abi) as IERC2981InterfaceType;
//const IERC2981Sighashes = new Set(IERC2981Interface.fragments.map(Interface.getSighash));
export const IERC2981InterfaceId = interfaceId(
    IERC2981Interface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IERC2981SetterInterface = new utils.Interface(IERC2981Setter.abi) as IERC2981SetterInterfaceType;
//const IERC2981SetterSighashes = new Set(IERC2981SetterInterface.fragments.map(Interface.getSighash));
export const IERC2981SetterInterfaceId = interfaceId(
    IERC2981SetterInterface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IERC721Interface = new utils.Interface(IERC721.abi) as IERC721InterfaceType;
const IERC721Sighashes = new Set(IERC721Interface.fragments.map(Interface.getSighash));
export const IERC721InterfaceId = interfaceId(
    IERC721Interface.fragments.filter((f) => !IERC165Sighashes.has(Interface.getSighash(f))),
);

export const IERC721MetadataInterface = new utils.Interface(IERC721Metadata.abi) as IERC721MetadataInterfaceType;
//const IERC721MetadataSighashes = new Set(IERC721MetadataInterface.fragments.map(Interface.getSighash));
export const IERC721MetadataInterfaceId = interfaceId(
    IERC721MetadataInterface.fragments.filter((f) => !IERC721Sighashes.has(Interface.getSighash(f))),
);

export const IERC721EnumerableInterface = new utils.Interface(IERC721Enumerable.abi) as IERC721EnumerableInterfaceType;
//const IERC721EnumerableSighashes = new Set(IERC721EnumerableInterface.fragments.map(Interface.getSighash));
export const IERC721EnumerableInterfaceId = interfaceId(
    IERC721EnumerableInterface.fragments.filter((f) => !IERC721Sighashes.has(Interface.getSighash(f))),
);

export const IERC721MintableInterface = new utils.Interface(IERC721Mintable.abi) as IERC721MintableInterfaceType;
//const IERC721MintableSighashes = new Set(IERC721MintableInterface.fragments.map(Interface.getSighash));
export const IERC721MintableInterfaceId = interfaceId(IERC721MintableInterface.fragments);

export const IERC721MintableAutoIdInterface = new utils.Interface(
    IERC721MintableAutoId.abi,
) as IERC721MintableAutoIdInterfaceType;
export const IERC721MintableAutoIdInterfaceId = interfaceId(IERC721MintableAutoIdInterface.fragments);

export const IERC721TopDownInterface = new utils.Interface(IERC721TopDown.abi) as IERC721TopDownInterfaceType;
export const IERC721TopDownInterfaceId = interfaceId(IERC721TopDownInterface.fragments);

export const IERC721DnaInterface = new utils.Interface(IERC721Dna.abi) as IERC721DnaInterfaceType;
export const IERC721DnaInterfaceId = interfaceId(IERC721DnaInterface.fragments);

export const IERC721ReceiverInterface = new utils.Interface(IERC721Receiver.abi) as IERC721ReceiverInterfaceType;
export const IERC721ReceiverInterfaceId = interfaceId(IERC721ReceiverInterface.fragments);

export const IERC1155Interface = new utils.Interface(IERC1155.abi) as IERC1155InterfaceType;
export const IERC1155InterfaceId = interfaceId(IERC1155Interface.fragments);

export const IERC1155MetadataURIInterface = new utils.Interface(
    IERC1155MetadataURI.abi,
) as IERC1155MetadataURIInterfaceType;
export const IERC1155MetadataURIInterfaceId = interfaceId(IERC1155MetadataURIInterface.fragments);

export const IERC1155MintableInterface = new utils.Interface(IERC1155Mintable.abi) as IERC1155MintableInterfaceType;
export const IERC1155MintableInterfaceId = interfaceId(IERC1155MintableInterface.fragments);

export const IERC1155DnaInterface = new utils.Interface(IERC1155Dna.abi) as IERC1155DnaInterfaceType;
export const IERC1155DnaInterfaceId = interfaceId(IERC1155DnaInterface.fragments);

export const IERC1155ReceiverInterface = new utils.Interface(IERC1155Receiver.abi) as IERC1155ReceiverInterfaceType;
export const IERC1155ReceiverInterfaceId = interfaceId(IERC1155ReceiverInterface.fragments);

export const IAccessControlInterface = new utils.Interface(IAccessControl.abi) as IAccessControlInterfaceType;
export const IAccessControlInterfaceId = interfaceId(IAccessControlInterface.fragments);

export const IContractURIInterface = new utils.Interface(IContractURI.abi) as IContractURIInterfaceType;
export const IContractURIInterfaceId = interfaceId(IContractURIInterface.fragments);

export const IRouterReceiverInterface = new utils.Interface(IRouterReceiver.abi) as IRouterReceiverInterfaceType;
export const IRouterReceiverInterfaceId = interfaceId(IRouterReceiverInterface.fragments);

export const IBaseURIInterface = new utils.Interface(IBaseURI.abi) as IBaseURIInterfaceType;
export const IBaseURIInterfaceId = interfaceId(IBaseURIInterface.fragments);

export const IAssetRouterInputInterface = new utils.Interface(IAssetRouterInput.abi) as IAssetRouterInputInterfaceType;
export const IAssetRouterInputInterfaceId = interfaceId(IAssetRouterInputInterface.fragments);

export const IAssetRouterOutputInterface = new utils.Interface(
    IAssetRouterOutput.abi,
) as IAssetRouterOutputInterfaceType;
export const IAssetRouterOutputInterfaceId = interfaceId(IAssetRouterOutputInterface.fragments);

export const interfaceIds = {
    [IERC165InterfaceId]: IERC165.abi,
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
    [IAssetRouterInputInterfaceId]: IAssetRouterInput.abi,
    [IAssetRouterOutputInterfaceId]: IAssetRouterOutput.abi,
};

export const interfaceIdNames = {
    [IERC165InterfaceId]: 'IERC165',
    [IAccessControlInterfaceId]: 'IAccessControl',
    [IRouterReceiverInterfaceId]: 'IRouterReceiver',
    [IContractURIInterfaceId]: 'IContractURI',
    [IBaseURIInterfaceId]: 'IBaseURI',
    [IERC2981InterfaceId]: 'IERC2981',
    [IERC2981SetterInterfaceId]: 'IERC2981Setter',
    [IERC20InterfaceId]: 'IERC20',
    [IERC20MetadataInterfaceId]: 'IERC20Metadata',
    [IERC20MintableInterfaceId]: 'IERC20Mintable',
    [IERC721InterfaceId]: 'IERC721',
    [IERC721MetadataInterfaceId]: 'IERC721Metadata',
    [IERC721EnumerableInterfaceId]: 'IERC721Enumerable',
    [IERC721MintableInterfaceId]: 'IERC721Mintable',
    [IERC721MintableAutoIdInterfaceId]: 'IERC721MintableAutoId',
    [IERC721TopDownInterfaceId]: 'IERC721TopDown',
    [IERC721ReceiverInterfaceId]: 'IERC721Receiver',
    [IERC1155InterfaceId]: 'IERC1155',
    [IERC1155MetadataURIInterfaceId]: 'IERC1155MetadataURI',
    [IERC1155MintableInterfaceId]: 'IERC1155Mintable',
    [IERC1155DnaInterfaceId]: 'IERC1155Dna',
    [IERC1155ReceiverInterfaceId]: 'IERC1155Receiver',
    [IAssetRouterInputInterfaceId]: 'IAssetRouterInput',
    [IAssetRouterOutputInterfaceId]: 'IAssetRouterOutput',
};

export const interfaces = {
    IERC165: {
        interface: IERC165Interface,
        interfaceId: IERC165InterfaceId,
    },
    IAccessControl: {
        interface: IAccessControlInterface,
        interfaceId: IAccessControlInterfaceId,
    },
    IRouterReceiver: {
        interface: IRouterReceiverInterface,
        interfaceId: IRouterReceiverInterfaceId,
    },
    IContractURI: {
        interface: IContractURIInterface,
        interfaceId: IContractURIInterfaceId,
    },
    IBaseURI: {
        interface: IBaseURIInterface,
        interfaceId: IBaseURIInterfaceId,
    },
    IERC2981: {
        interface: IERC2981Interface,
        interfaceId: IERC2981InterfaceId,
    },
    IERC2981Setter: {
        interface: IERC2981SetterInterface,
        interfaceId: IERC2981SetterInterfaceId,
    },
    IERC20: {
        interface: IERC20Interface,
        interfaceId: IERC20InterfaceId,
    },
    IERC20Metadata: {
        interface: IERC20MetadataInterface,
        interfaceId: IERC20MetadataInterfaceId,
    },
    IERC20Mintable: {
        interface: IERC20MintableInterface,
        interfaceId: IERC20MintableInterfaceId,
    },
    IERC721: {
        interface: IERC721Interface,
        interfaceId: IERC721InterfaceId,
    },
    IERC721Metadata: {
        interface: IERC721MetadataInterface,
        interfaceId: IERC721MetadataInterfaceId,
    },
    IERC721Enumerable: {
        interface: IERC721EnumerableInterface,
        interfaceId: IERC721EnumerableInterfaceId,
    },
    IERC721Mintable: {
        interface: IERC721MintableInterface,
        interfaceId: IERC721MintableInterfaceId,
    },
    IERC721MintableAutoId: {
        interface: IERC721MintableAutoIdInterface,
        interfaceId: IERC721MintableAutoIdInterfaceId,
    },
    IERC721TopDown: {
        interface: IERC721TopDownInterface,
        interfaceId: IERC721TopDownInterfaceId,
    },
    IERC721Receiver: {
        interface: IERC721ReceiverInterface,
        interfaceId: IERC721ReceiverInterfaceId,
    },
    IERC721Dna: {
        interface: IERC721DnaInterface,
        interfaceId: IERC721DnaInterfaceId,
    },
    IERC1155: {
        interface: IERC1155Interface,
        interfaceId: IERC1155InterfaceId,
    },
    IERC1155MetadataURI: {
        interface: IERC1155MetadataURIInterface,
        interfaceId: IERC1155MetadataURIInterfaceId,
    },
    IERC1155Mintable: {
        interface: IERC1155MintableInterface,
        interfaceId: IERC1155MintableInterfaceId,
    },
    IERC1155Dna: {
        interface: IERC1155DnaInterface,
        interfaceId: IERC1155DnaInterfaceId,
    },
    IERC1155Receiver: {
        interface: IERC1155ReceiverInterface,
        interfaceId: IERC1155ReceiverInterfaceId,
    },

    IAssetRouterInput: {
        interface: IAssetRouterInputInterface,
        interfaceId: IAssetRouterInputInterfaceId,
    },
    IAssetRouterOutput: {
        interface: IAssetRouterOutputInterface,
        interfaceId: IAssetRouterOutputInterfaceId,
    },
};
