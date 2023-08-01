import { getFactoriesWithSigner, getDeployFactories, getFactoryWithInitializeUtil, Utils as ProxyUtils } from "@owlprotocol/contracts-proxy";
import * as contracts from "../typechain/ethers/factories/contracts/index.js";
import * as Utils from "../utils/initializeUtils/index.js";
import { mapValues } from "../lodash.js"

//ERC1820 Registry
export const ERC1820RegistryFactory = new contracts.common.erc1820.erc1820Sol.ERC1820Registry__factory();
//Proxies
export const FallbackFactory = new contracts.utils.Fallback__factory();
export const Multicall2Factory = new contracts.utils.Multicall2__factory();
//Utils
export const BlockNumberFactory = new contracts.utils.BlockNumber__factory();

//WARNING: ONLY add contracts that support initialize pattern
export const factoryClasses =  {
    ERC20Mintable: contracts.assets.erc20.ERC20Mintable__factory,
    ERC721Mintable: contracts.assets.erc721.ERC721Mintable__factory,
    ERC721MintableAutoId: contracts.assets.erc721.ERC721MintableAutoId__factory,
    ERC1155Mintable: contracts.assets.erc1155.ERC1155Mintable__factory,
    TokenURI: contracts.plugins.tokenUri.TokenURI__factory,
    TokenURIBaseURI: contracts.plugins.tokenUri.TokenURIBaseURI__factory,
    TokenURIDna: contracts.plugins.tokenUri.TokenURIDna__factory,
    ERC2981Setter: contracts.plugins.erc2981.ERC2981Setter__factory,
    TokenDna: contracts.plugins.tokenDna.TokenDna__factory,
    AssetRouterCraft: contracts.plugins.assetRouter.AssetRouterCraft__factory,
    AssetRouterInput: contracts.plugins.assetRouter.AssetRouterInput__factory,
    AssetRouterOutput: contracts.plugins.assetRouter.AssetRouterOutput__factory
} as const

export const factories = mapValues(factoryClasses, (f) => new f()) as {
    [K in keyof typeof factoryClasses]: InstanceType<typeof factoryClasses[K]>
}

//Assets
export const ERC20MintableFactory = factories.ERC20Mintable;
export const ERC721MintableFactory = factories.ERC721Mintable;
export const ERC721MintableAutoIdFactory = factories.ERC721MintableAutoId;
export const ERC1155MintableFactory = factories.ERC1155Mintable;

//Metadata
export const TokenURIFactory = factories.TokenURI;
export const TokenURIBaseURIFactory = factories.TokenURIBaseURI;
export const TokenURIDnaFactory = factories.TokenURIDna;

//Royalty
export const ERC2981SetterFactory = factories.ERC2981Setter;

//Dna
export const TokenDnaFactory = factories.TokenDna;

export const AssetRouterCraftFactory = factories.AssetRouterCraft;
export const AssetRouterInputFactory = factories.AssetRouterInput;
export const AssetRouterOutputFactory = factories.AssetRouterOutput;

//Can't deploy with these but useful for getting addresses
const factories2 = getFactoriesWithSigner(factories);
const factoriesImplementationsBase = factories2.factoriesImplementations;
export const factoriesDeterministic = factories2.factoriesDeterministic;
export const factoriesClone = factories2.factoriesClone;
export const factoriesBeacons = factories2.factoriesBeacons;
export const factoriesBeaconProxies = factories2.factoriesBeaconProxies;

//Factories
//Add non-initializable contract implementations
export const factoriesImplementations = {
    ...factoriesImplementationsBase,
    ERC1820Registry: ProxyUtils.deployDeterministicFactory({ contractFactory: ERC1820RegistryFactory }),
    Multicall2: ProxyUtils.deployDeterministicFactory({ contractFactory: Multicall2Factory }),
    BlockNumber: ProxyUtils.deployDeterministicFactory({ contractFactory: BlockNumberFactory }),
} as const;

const factoriesWithInitializeUtils = {
    ERC20Mintable: { factory: ERC20MintableFactory, initializeUtil: Utils.ERC20Mintable.initializeUtil },
    ERC721Mintable: { factory: ERC721MintableFactory, initializeUtil: Utils.ERC721Mintable.initializeUtil },
    ERC721MintableAutoId: { factory: ERC721MintableAutoIdFactory, initializeUtil: Utils.ERC721MintableAutoId.initializeUtil },
    ERC1155Mintable: { factory: ERC1155MintableFactory, initializeUtil: Utils.ERC1155Mintable.initializeUtil },
    TokenURI: { factory: TokenURIFactory, initializeUtil: Utils.TokenURI.initializeUtil },
    TokenURIBaseURI: { factory: TokenURIBaseURIFactory, initializeUtil: Utils.TokenURIBaseURI.initializeUtil },
    TokenURIDna: { factory: TokenURIDnaFactory, initializeUtil: Utils.TokenURIDna.initializeUtil },
    ERC2981Setter: { factory: ERC2981SetterFactory, initializeUtil: Utils.ERC2981Setter.initializeUtil },
    TokenDna: { factory: TokenDnaFactory, initializeUtil: Utils.TokenDna.initializeUtil },
    AssetRouterCraft: { factory: AssetRouterCraftFactory, initializeUtil: Utils.AssetRouterCraft.initializeUtil },
    AssetRouterInput: { factory: AssetRouterInputFactory, initializeUtil: Utils.AssetRouterInput.initializeUtil },
    AssetRouterOutput: { factory: AssetRouterOutputFactory, initializeUtil: Utils.AssetRouterOutput.initializeUtil },
} as const;

export const factoriesAll = mapValues(factoriesWithInitializeUtils, ({ factory, initializeUtil }) => {
    return getFactoryWithInitializeUtil(getDeployFactories(factory), initializeUtil as any)
}) as {
        [K in keyof typeof factoriesWithInitializeUtils]:
        ReturnType<typeof getFactoryWithInitializeUtil<
            typeof factoriesWithInitializeUtils[K]["factory"],
            Parameters<typeof factoriesWithInitializeUtils[K]["initializeUtil"]>[0]
        >>
    }

export interface DeployedLinkReferences {
    [libraryFileName: string]: {
        [libraryName: string]: string;
    };
}

//Replace placeholders with libraries, numbers are 2x as bytes are represented as hex, offset by 2 for initial 0x
/*
export function linkLibraryBytecode(artifact: Artifact, deployedLinkReferences: DeployedLinkReferences) {
    let bytecode = artifact.bytecode;
    Object.entries(artifact.linkReferences).forEach(([linkRefFile, linkRef]) => {
        Object.entries(linkRef).forEach(([linkRefName, values]) => {
            values.forEach(({ length, start }) => {
                const linkDeployedAddress = deployedLinkReferences[linkRefFile][linkRefName];
                bytecode =
                    bytecode.substring(0, 2 + start * 2) +
                    linkDeployedAddress.replace("0x", "") +
                    bytecode.substring(2 + start * 2 + length * 2);
            });
        });
    });
    return bytecode;
}
*/

//Static Libraries
/*
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
    "contracts/assets/ERC721/ERC721TopDownLib.sol": { ERC721TopDownLib: ERC721TopDownLibAddress },
    "contracts/assets/ERC721/ERC721TopDownDnaLib.sol": { ERC721TopDownDnaLib: ERC721TopDownDnaLibAddress },
};

const ERC721TopDownMintableBytecode = linkLibraryBytecode(ERC721TopDownMintableArtifact, deployedLinkReferences);
const ERC721TopDownMintable = new ContractFactory(
    ERC721TopDownMintableArtifact.abi,
    ERC721TopDownMintableBytecode,
) as ERC721TopDownMintable__factory;
*/
