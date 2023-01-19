import { ContractFactory } from 'ethers';
import type { Signer } from 'ethers';
import { mapValues } from '../lodash.js';
import {
    ERC1167Factory__factory,
    ERC20Mintable__factory,
    ERC721Mintable__factory,
    ERC721MintableAutoId__factory,
    ERC721TopDownDna__factory,
    ERC1155Mintable__factory,
    AssetRouterInput__factory,
    AssetRouterOutput__factory,
    BeaconProxy__factory,
    UpgradeableBeacon__factory,
    Fallback__factory,
} from './types';
import {
    ERC1167Factory as ERC1167FactoryArtifact,
    ERC20Mintable as ERC20MintableArtifact,
    ERC721Mintable as ERC721MintableArtifact,
    ERC721MintableAutoId as ERC721MintableAutoIdArtifact,
    ERC721TopDownDna as ERC721TopDownDnaArtifact,
    ERC721TopDownLib as ERC721TopDownLibArtifact,
    ERC721TopDownDnaLib as ERC721TopDownDnaLibArtifact,
    ERC1155Mintable as ERC1155MintableArtifact,
    AssetRouterInput as AssetRouterInputArtifact,
    AssetRouterOutput as AssetRouterOutputArtifact,
    BeaconProxy as BeaconProxyArtifact,
    UpgradeableBeacon as UpgradeableBeaconArtifact,
    Fallback as FallbackArtifact,
} from '../artifacts.js';
import { deployDeterministicAddress, ERC1167FactoryAddress } from '../utils/ERC1167Factory/getAddress.js';

//Static Libraries
const ERC721TopDownLib = new ContractFactory(ERC721TopDownLibArtifact.abi, ERC721TopDownLibArtifact.bytecode);
export const ERC721TopDownLibAddress = deployDeterministicAddress({
    contractInterface: ERC721TopDownLib.interface,
    bytecode: ERC721TopDownLib.bytecode,
    cloneFactoryAddress: ERC1167FactoryAddress,
});

const ERC721TopDownDnaLib = new ContractFactory(ERC721TopDownDnaLibArtifact.abi, ERC721TopDownDnaLibArtifact.bytecode);
export const ERC721TopDownDnaLibAddress = deployDeterministicAddress({
    contractInterface: ERC721TopDownDnaLib.interface,
    bytecode: ERC721TopDownDnaLib.bytecode,
    cloneFactoryAddress: ERC1167FactoryAddress,
});

//console.debug({ ERC721TopDownLibAddress, ERC721TopDownDnaLibAddress });

//Proxies
const ERC1167Factory = new ContractFactory(
    ERC1167FactoryArtifact.abi,
    ERC1167FactoryArtifact.bytecode,
) as ERC1167Factory__factory;
const BeaconProxy = new ContractFactory(BeaconProxyArtifact.abi, BeaconProxyArtifact.bytecode) as BeaconProxy__factory;
const UpgradeableBeacon = new ContractFactory(
    UpgradeableBeaconArtifact.abi,
    UpgradeableBeaconArtifact.bytecode,
) as UpgradeableBeacon__factory;
const Fallback = new ContractFactory(FallbackArtifact.abi, FallbackArtifact.bytecode) as Fallback__factory;

//Assets
const ERC20Mintable = new ContractFactory(
    ERC20MintableArtifact.abi,
    ERC20MintableArtifact.bytecode,
) as ERC20Mintable__factory;

const ERC721Mintable = new ContractFactory(
    ERC721MintableArtifact.abi,
    ERC721MintableArtifact.bytecode,
) as ERC721Mintable__factory;

const ERC721MintableAutoId = new ContractFactory(
    ERC721MintableAutoIdArtifact.abi,
    ERC721MintableAutoIdArtifact.bytecode,
) as ERC721MintableAutoId__factory;

//Replace placeholders with libraries, numbers are 2x as bytes are represented as hex, offset by 2 for initial 0x
let ERC721TopDownDnaBytecode = ERC721TopDownDnaArtifact.bytecode;

ERC721TopDownDnaArtifact.linkReferences['contracts/assets/ERC721/ERC721TopDownLib.sol']['ERC721TopDownLib'].forEach(
    ({ length, start }: { length: number; start: number }) => {
        //console.debug({ length, start });
        //console.debug(ERC721TopDownDnaBytecode.substring(2 + start * 2, 2 + start * 2 + length * 2));
        ERC721TopDownDnaBytecode =
            ERC721TopDownDnaBytecode.substring(0, 2 + start * 2) +
            ERC721TopDownLibAddress.replace('0x', '') +
            ERC721TopDownDnaBytecode.substring(2 + start * 2 + length * 2);
    },
);
ERC721TopDownDnaArtifact.linkReferences['contracts/assets/ERC721/ERC721TopDownDnaLib.sol'][
    'ERC721TopDownDnaLib'
].forEach(({ length, start }: { length: number; start: number }) => {
    //console.debug({ length, start });
    //console.debug(ERC721TopDownDnaBytecode.substring(2 + start * 2, 2 + start * 2 + length * 2));
    ERC721TopDownDnaBytecode =
        ERC721TopDownDnaBytecode.substring(0, 2 + start * 2) +
        ERC721TopDownDnaLibAddress.replace('0x', '') +
        ERC721TopDownDnaBytecode.substring(2 + start * 2 + length * 2);
});

const ERC721TopDownDna = new ContractFactory(
    ERC721TopDownDnaArtifact.abi,
    ERC721TopDownDnaBytecode,
) as ERC721TopDownDna__factory;

const ERC1155Mintable = new ContractFactory(
    ERC1155MintableArtifact.abi,
    ERC1155MintableArtifact.bytecode,
) as ERC1155Mintable__factory;

const AssetRouterInput = new ContractFactory(
    AssetRouterInputArtifact.abi,
    AssetRouterInputArtifact.bytecode,
) as AssetRouterInput__factory;

const AssetRouterOutput = new ContractFactory(
    AssetRouterOutputArtifact.abi,
    AssetRouterOutputArtifact.bytecode,
) as AssetRouterOutput__factory;

export const factories = {
    ERC1167Factory,
    BeaconProxy,
    UpgradeableBeacon,
    Fallback,
    ERC20Mintable,
    ERC721Mintable,
    ERC721MintableAutoId,
    ERC721TopDownLib,
    ERC721TopDownDnaLib,
    ERC721TopDownDna,
    ERC1155Mintable,
    AssetRouterInput,
    AssetRouterOutput,
};

export function getFactories(signer: Signer) {
    return mapValues(factories, (f) => f.connect(signer)) as typeof factories;
}

export type Factories = ReturnType<typeof getFactories>;
