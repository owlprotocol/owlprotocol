import { Ethers, Utils } from '@owlprotocol/contracts';
import { ERC721TopDownDna__factory } from '@owlprotocol/contracts/lib/types/typechain/ethers';

export type ContractConfig = {
    address?: string;
    ipfsEndpoint: string;
    ipfsPath: string;
    apiEndpoint?: string;
    apiPath?: string;
    schemaJsonIpfs?: string;
};

export type InitArgs = {
    contractInit: Utils.ERC721TopDownDna.ERC721TopDownDnaInitializeArgs;
    args?: Array<any>;
    argsBeacon?: [string, string, string];
};

export type OwlProject = {
    rootContract: {
        tokenSymbol: string;
        tokenIdStart: number;
        cfg: ContractConfig;
        initArgs?: InitArgs;
    };
    children: Record<
        string,
        {
            tokenIdStart: number;
            cfg: ContractConfig;
            initArgs?: InitArgs;
        }
    >;
    metadata?: any;
};

export type FactoriesResult = {
    signerAddress: string;
    factories: any;
    beaconProxyFactories: Ethers.ProxyInitializeFactories;
    ERC721TopDownDnaFactory: ERC721TopDownDna__factory;
    initialized: boolean;
};

export type DeployNFTResult = {
    address: string;
    childKey?: string;
    contract?: typeof Utils.ERC721TopDownDna;
    deployed?: boolean;
    error?: string;
};

export type MintNFTResult = {
    owner: string;
    contractAddress: string;
    tokenId: number;
    dna: any;
    tx?: any;
    receipt?: any;
    deployed: boolean;
};
