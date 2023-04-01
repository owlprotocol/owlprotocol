import { ContractFactory } from "ethers";
import type { Signer } from "ethers";
import {
    ERC1167Factory__factory,
    OwlTemplate__factory
} from './types.js';
import { mapValues } from "../lodash.js";
import {
    ERC1167Factory as ERC1167FactoryArtifact,
    OwlTemplate as OwlTemplateArtifact,
    OwlTemplateHelperLib as OwlTemplateHelperLibArtifact,
} from '../artifacts.js';
import { deployDeterministicAddress, ERC1167FactoryAddress } from "../utils/ERC1167Factory/getAddress.js";
import { DeployedLinkReferences, linkLibraryBytecode, Factories } from './factories.js'

//Static Libraries
const OwlTemplateHelperLib = new ContractFactory(OwlTemplateHelperLibArtifact.abi, OwlTemplateHelperLibArtifact.bytecode);
export const OwlTemplateHelperLibAddress = deployDeterministicAddress({
    contractInterface: OwlTemplateHelperLib.interface,
    bytecode: OwlTemplateHelperLib.bytecode,
    cloneFactoryAddress: ERC1167FactoryAddress,
});

export const deployedHelperLinkReferences: DeployedLinkReferences = {
    "contracts/helpers/OwlTemplateHelperLib.sol": { OwlTemplateHelperLib: OwlTemplateHelperLibAddress },
};

//Proxies
const ERC1167Factory = new ContractFactory(
    ERC1167FactoryArtifact.abi,
    ERC1167FactoryArtifact.bytecode,
) as ERC1167Factory__factory;

const OwlTemplateBytecode = linkLibraryBytecode(OwlTemplateArtifact, deployedHelperLinkReferences);
const OwlTemplate = new ContractFactory(
    OwlTemplateArtifact.abi,
    OwlTemplateBytecode,
) as OwlTemplate__factory;

export const examples = {
    ERC1167Factory,
    OwlTemplateHelperLib,
    OwlTemplate
};

// TODO: Factories type should only enforce certain contracts
export function getExamples(signer: Signer){
    return mapValues(examples, (f) => f.connect(signer)) as any as Factories;
}
