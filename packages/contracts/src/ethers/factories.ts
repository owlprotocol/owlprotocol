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
    ERC1155Mintable as ERC1155MintableArtifact,
    AssetRouterInput as AssetRouterInputArtifact,
    AssetRouterOutput as AssetRouterOutputArtifact,
    BeaconProxy as BeaconProxyArtifact,
    UpgradeableBeacon as UpgradeableBeaconArtifact,
    Fallback as FallbackArtifact,
} from '../artifacts.js';

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

const ERC721TopDownDna = new ContractFactory(
    ERC721TopDownDnaArtifact.abi,
    ERC721TopDownDnaArtifact.bytecode,
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

const factories = {
    ERC1167Factory,
    BeaconProxy,
    UpgradeableBeacon,
    Fallback,
    ERC20Mintable,
    ERC721Mintable,
    ERC721MintableAutoId,
    ERC721TopDownDna,
    ERC1155Mintable,
    AssetRouterInput,
    AssetRouterOutput,
};

export function getFactories(signer: Signer) {
    return mapValues(factories, (f) => f.connect(signer)) as typeof factories;
}

export type Factories = ReturnType<typeof getFactories>;
