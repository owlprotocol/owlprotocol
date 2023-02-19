import { ContractFactory } from 'ethers';
import type { Signer } from 'ethers';
import { mapValues } from '../lodash.js';
import {
    ERC1167Factory__factory,
    ERC20Mintable__factory,
    ERC721Mintable__factory,
    ERC721MintableAutoId__factory,
    ERC721Dna__factory,
    ERC721TopDownMintable__factory,
    ERC721TopDownMintableAutoId__factory,
    ERC721TopDownDna__factory,
    ERC1155Mintable__factory,
    ERC1155Dna__factory,
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
    ERC721Dna as ERC721DnaArtifact,
    ERC721TopDownMintable as ERC721TopDownMintableArtifact,
    ERC721TopDownMintableAutoId as ERC721TopDownMintableAutoIdArtifact,
    ERC721TopDownDna as ERC721TopDownDnaArtifact,
    ERC721TopDownLib as ERC721TopDownLibArtifact,
    ERC721TopDownDnaLib as ERC721TopDownDnaLibArtifact,
    ERC1155Mintable as ERC1155MintableArtifact,
    ERC1155Dna as ERC1155DnaArtifact,
    AssetRouterInput as AssetRouterInputArtifact,
    AssetRouterOutput as AssetRouterOutputArtifact,
    BeaconProxy as BeaconProxyArtifact,
    UpgradeableBeacon as UpgradeableBeaconArtifact,
    Fallback as FallbackArtifact,
} from '../artifacts.js';
import { deployDeterministicAddress, ERC1167FactoryAddress } from '../utils/ERC1167Factory/getAddress.js';
import type { Artifact, LinkReferences } from 'hardhat/types/artifacts.js';

export interface DeployedLinkReferences {
    [libraryFileName: string]: {
        [libraryName: string]: string
    };
}

//Replace placeholders with libraries, numbers are 2x as bytes are represented as hex, offset by 2 for initial 0x
export function linkLibraryBytecode(artifact: Artifact, deployedLinkReferences: DeployedLinkReferences) {
    let bytecode = artifact.bytecode
    Object.entries(artifact.linkReferences).forEach(([linkRefFile, linkRef]) => {
        Object.entries(linkRef).forEach(([linkRefName, values]) => {
            values.forEach(({ length, start }) => {
                const linkDeployedAddress = deployedLinkReferences[linkRefFile][linkRefName]
                bytecode =
                    bytecode.substring(0, 2 + start * 2) +
                    linkDeployedAddress.replace('0x', '') +
                    bytecode.substring(2 + start * 2 + length * 2);
            })
        })
    })
    return bytecode;
}

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

export const deployedLinkReferences: DeployedLinkReferences = {
    'contracts/assets/ERC721/ERC721TopDownLib.sol': { 'ERC721TopDownLib': ERC721TopDownLibAddress },
    'contracts/assets/ERC721/ERC721TopDownDnaLib.sol': { 'ERC721TopDownDnaLib': ERC721TopDownDnaLibAddress }
}

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

const ERC721Dna = new ContractFactory(
    ERC721DnaArtifact.abi,
    ERC721DnaArtifact.bytecode,
) as ERC721Dna__factory;

let ERC721TopDownMintableBytecode = linkLibraryBytecode(ERC721TopDownMintableArtifact, deployedLinkReferences);
const ERC721TopDownMintable = new ContractFactory(
    ERC721TopDownMintableArtifact.abi,
    ERC721TopDownMintableBytecode,
) as ERC721TopDownMintable__factory;

let ERC721TopDownMintableAutoIdBytecode = linkLibraryBytecode(ERC721TopDownMintableAutoIdArtifact, deployedLinkReferences);
const ERC721TopDownMintableAutoId = new ContractFactory(
    ERC721TopDownMintableAutoIdArtifact.abi,
    ERC721TopDownMintableAutoIdBytecode,
) as ERC721TopDownMintableAutoId__factory;

let ERC721TopDownDnaBytecode = linkLibraryBytecode(ERC721TopDownDnaArtifact, deployedLinkReferences);
const ERC721TopDownDna = new ContractFactory(
    ERC721TopDownDnaArtifact.abi,
    ERC721TopDownDnaBytecode,
) as ERC721TopDownDna__factory;

const ERC1155Mintable = new ContractFactory(
    ERC1155MintableArtifact.abi,
    ERC1155MintableArtifact.bytecode,
) as ERC1155Mintable__factory;

const ERC1155Dna = new ContractFactory(ERC1155DnaArtifact.abi, ERC1155DnaArtifact.bytecode) as ERC1155Dna__factory;

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
    ERC721Dna,
    ERC721TopDownLib,
    ERC721TopDownDnaLib,
    ERC721TopDownMintable,
    ERC721TopDownMintableAutoId,
    ERC721TopDownDna,
    ERC1155Mintable,
    ERC1155Dna,
    AssetRouterInput,
    AssetRouterOutput,
};

//export const implementationFactories = omit(factories, 'ERC1167Factory', 'BeaconProxy', 'UpgradeableBeacon')

export function getFactories(signer: Signer) {
    return mapValues(factories, (f) => f.connect(signer)) as typeof factories;
}

export type Factories = ReturnType<typeof getFactories>;
