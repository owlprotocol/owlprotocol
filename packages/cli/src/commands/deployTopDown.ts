import yargs from 'yargs';
import path from 'path';
import config from 'config';
import fs from 'fs';
import _ from 'lodash';
import check from 'check-types';
import { constants, ethers, Signer, utils } from 'ethers';
import { NFTGenerativeItemInterface, NFTGenerativeCollectionClass, NFTGenerativeItemClass } from '@owlprotocol/nft-sdk';
import { Deploy, Ethers, Utils, Artifacts } from '@owlprotocol/contracts';
import { Argv, getProjectFolder, getProjectSubfolder } from '../utils/pathHandlers.js';
import { HD_WALLET_MNEMONIC, NETWORK } from '../utils/environment.js';
import {
    OwlProject,
    InitArgs,
    ContractConfig,
    DeployNFTResult,
    FactoriesResult,
    MintNFTResult,
} from '../classes/owlProject.js';

const { map, mapValues, omit } = _;

import { deployCommon } from './deployCommon.js';
import { deployERC721TopDownDna } from '../deploy/ERC721TopDownDna.js';
import { ERC721TopDownDna__factory } from '@owlprotocol/contracts/lib/types/typechain/ethers';
import { awaitAllObj } from '@owlprotocol/utils';
import {
    BeaconProxy,
    BeaconProxy__factory,
    ERC721TopDownDna as ERC721TopDownDnaContract,
} from '@owlprotocol/contracts/src/typechain/ethers';
import { ERC721TopDownDnaInterface } from '@owlprotocol/contracts/src/typechain/ethers/ERC721TopDownDna';

const jsonRpcEndpoint: string = config.get(`network.${NETWORK}.config.url`);
const provider = new ethers.providers.JsonRpcProvider(jsonRpcEndpoint);
let debug = false;

export const command = 'deployTopDown';

export const describe = `Deploy the collection defined by the metadataIPFS to the configured chain

For now this always expects the nftItems in the folder "./output/items/" relative to the projectFolder

e.g. node dist/index.cjs deployTopDown --projectFolder=projects/example-omo --deployCommon=true --debug=true



`;

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs
        .option('debug', {
            describe: 'Outputs debug statements',
            type: 'boolean',
        })
        .option('deployCommon', {
            describe: `Deploy the base common contracts - deployer, proxy, beacons, and implementations

            Required for the first deployment on a new chain, especially on a local ephemeral chain.
            `,
            type: 'boolean',
        })
        .option('projectFolder', {
            alias: 'project',
            describe: `Root folder for the project.

            This is usually relative to the compiled src, by default we use a folder called "projects".
            e.g. "projects/acme"
            `,
            type: 'string'
        })
        .demandOption(['projectFolder']);
};

export const handler = async (argv: Argv) => {
    console.log(`Deploying ERC721TopDownDna to ${NETWORK}`);

    argvCheck(argv);
    debug = !!argv.debug || false;

    const itemsFolder = getProjectSubfolder(argv, 'output/items');

    const owlProjectPath = path.resolve(getProjectFolder(argv), 'owlproject.json');

    const owlProject = await getOwlProject(owlProjectPath);

    console.log(`Creating JSON(s) from folder: ${itemsFolder} with IPFS metadata defined at ${owlProjectPath}`);

    const collMetadata = NFTGenerativeCollectionClass.fromData(owlProject.metadata);

    const nftItemResults = await getNftItems(collMetadata, itemsFolder);

    const signers = new Array<ethers.Wallet>(ethers.Wallet.fromMnemonic(HD_WALLET_MNEMONIC).connect(provider));
    const network: Deploy.RunTimeEnvironment['network'] = config.get(`network.${NETWORK}`);

    if (argv.deployCommon) {
        await deployCommon({ provider, signers, network });
    }

    const factories = await initializeFactories(signers[0]);


    // TODO: consider making owlProject its own class
    // this initializes the args on the members of owlProject
    initializeArgs(owlProject, factories);

    debug && console.debug('owlProjectRoot:', owlProject.rootContract.initArgs?.contractInit);


    const contracts = await deployContracts(owlProject, factories);

    await setApprovalsForChildren(signers[0], contracts);

    // TODO: this is synchronous for now, nonce handling can be improved
    // const mintPromises = map(nftItemResults, async (nft, i) => {
    const mintsAll = [];
    for (let i = 0; i < nftItemResults.length; i++){
        debug && console.debug(`Deploying NFT: ${i + 1}`);
        const nft = nftItemResults[i];
        const nftItem = nft.nftItem;
        const nftJsonFilePath = nft.nftJsonFilePath;

        const mints = await deployERC721TopDownDna({ provider, signers, network }, owlProject, nftItem, contracts, factories);

        nft.nftJson.deployments = {};
        nft.nftJson.deployments[NETWORK] = {
            root: {
                contractAddress: mints.root.contractAddress,
                tokenId: mints.root.tokenId,
            },
            children: mapValues(omit(mints, 'root'), (m, k) => ({
                key: k,
                contractAddress: m.contractAddress,
                tokenId: m.tokenId,
                dna: m.dna
            })),
        };

        fs.writeFile(nftJsonFilePath, JSON.stringify(nft.nftJson, null, 2), () => {});

        mintsAll.push(mints);
    }

    let i = 0;
    map(mintsAll, (mint) => {

        console.log(`

Minted ${nftItemResults[i].nftJsonFilePath}`);

        mapValues(mint, (token: any, k) => {
            console.log(`Mint: ${k} at ${token.contractAddress} - tokenId: ${token.tokenId} & dna: ${token.dna}`);
        });

        i++;
    });

    console.log('Done');
};

/**
 *
 * @param collectionClass - loaded from JS file collectionJS
 * @param itemsFolder
 */
const getNftItems = async (
    collectionClass: NFTGenerativeCollectionClass,
    itemsFolder: string,
): Promise<{nftJsonFilePath: string, nftJson: any, nftItem: NFTGenerativeItemInterface}[]> => {
    const nftItemFiles = fs.readdirSync(itemsFolder);

    const nftItems = map(nftItemFiles, async (nftItemFile) => {
        const nftJsonFilePath = path.resolve(itemsFolder, nftItemFile);
        const nftItemDnaWithChildren = JSON.parse(fs.readFileSync(path.resolve(itemsFolder, nftItemFile)).toString());
        return {
            nftJsonFilePath,
            nftJson: nftItemDnaWithChildren,
            nftItem: collectionClass.createFromFullDna(nftItemDnaWithChildren.fullDna),
        }
    });

    return await Promise.all(nftItems);
};

/**
 * This expects that the metadata JSON is accessible via IPFS
 *
 * TODO: define return type
 * TODO: should be a way to use either collectionJS or metadata
 *
 * @param owlProjectFilepath
 */
const getOwlProject = async (owlProjectFilepath: string): Promise<OwlProject> => {
    const owlProject: OwlProject = JSON.parse(fs.readFileSync(owlProjectFilepath).toString());

    if (
        !check.number(owlProject.rootContract.tokenIdStart) ||
        map(owlProject.children, (c) => check.number(c.tokenIdStart)).indexOf(false) > -1
    ) {
        console.error(`owlProject is missing a tokenIdStart on the parent or children`);
        process.exit();
    }

    const rootCfg = owlProject.rootContract.cfg;

    const schemaJsonUrl = new URL(
        path.join(rootCfg.ipfsPath, rootCfg.schemaJsonIpfs!),
        rootCfg.ipfsEndpoint,
    );

    // TODO: add fetch-retry handling from nft-sdk-api
    const collMetadataRes = await fetch(schemaJsonUrl);

    if (!collMetadataRes.ok) {
        console.error(`Error fetching ${schemaJsonUrl}`);
        process.exit();
    }

    owlProject.metadata = await collMetadataRes.json();

    return owlProject;
};

const argvCheck = (argv: Argv) => {
    if (!check.undefined(argv.itemsFolder) && fs.existsSync(argv.itemsFolder)) {
        console.error(`Arg outputFolder ${argv.outputFolder} was not found`);
    }
};

const initializeFactories = async (signer: Signer): Promise<any> => {
    const signerAddress = await signer.getAddress();

    const factories = Ethers.getFactories(signer);
    const cloneFactory = factories.ERC1167Factory.attach(Utils.ERC1167Factory.ERC1167FactoryAddress);
    const deterministicFactories = Ethers.getDeterministicFactories(factories);
    const deterministicInitializeFactories = Ethers.getDeterministicInitializeFactories(
        factories,
        cloneFactory,
        signerAddress,
    );

    const UpgradeableBeaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const implementationAddress = deterministicFactories.ERC721TopDownDna.getAddress();

    const ERC721TopDownDnaInitEncoder = Utils.ERC1167Factory.getInitDataEncoder<ERC721TopDownDnaContract, 'proxyInitialize'>(
        factories.ERC721TopDownDna.interface as ERC721TopDownDnaInterface,
        'proxyInitialize',
    );

    const beaconAddress = UpgradeableBeaconFactory.getAddress(signerAddress, implementationAddress);
    const BeaconProxyFactory = Utils.ERC1167Factory.deterministicFactory<BeaconProxy__factory, BeaconProxy, 'initialize'>({
        //@ts-ignore
        contractFactory: factories.BeaconProxy,
        cloneFactory,
        initSignature: 'initialize',
        msgSender: signerAddress,
    });

    return {
        msgSender: signerAddress,
        ERC721TopDownDna: factories.ERC721TopDownDna,
        ERC721TopDownDnaInitEncoder,
        BeaconProxyFactory,
        beaconAddress,
        initialized: true,
    };
};

/**
 * Deployment initialize args
 *
 * We must compute deterministic addresses here for TopDown children
 *
 * @param owlProject
 * @param factories - current output from initializeFactories
 */
const initializeArgs = (owlProject: OwlProject, factories: any) => {

    const rootCfg = owlProject.rootContract.cfg;

    // For each child, generate the initialization args
    mapValues(owlProject.children, (c, k) => {
        const metadata = owlProject.metadata;

        const schemaJsonUrl = new URL(
            path.join(rootCfg.ipfsPath, c.cfg.schemaJsonIpfs!),
            rootCfg.ipfsEndpoint,
        );
        const baseUri = new URL(
            path.join(rootCfg.apiPath!, c.cfg.schemaJsonIpfs!),
            rootCfg.apiEndpoint,
        );
        const contractInit = {
            admin: factories.msgSender,
            contractUri: schemaJsonUrl.toString(),
            name: metadata.children[k].name,
            symbol: metadata.children[k].name.substring(0, 12),
            initBaseURI: `${baseUri}/`,
            feeReceiver: metadata.fee_recipient,
        } as Utils.ERC721TopDownDna.ERC721TopDownDnaInitializeArgs;

        const args = Utils.ERC721TopDownDna.flattenInitArgsERC721TopDownDna(contractInit);
        const data = factories.ERC721TopDownDnaInitEncoder(...args);
        const argsBeacon = [factories.msgSender, factories.beaconAddress, data] as [string, string, string];

        c.cfg.address = factories.BeaconProxyFactory.getAddress(...argsBeacon)

        owlProject.children[k].initArgs = {
            args: argsBeacon,
            contractInit,
        };
    });

    const schemaJsonUrl = new URL(
        path.join(rootCfg.ipfsPath, rootCfg.schemaJsonIpfs!),
        rootCfg.ipfsEndpoint,
    );
    const baseUri = new URL(
        path.join(rootCfg.apiPath!, rootCfg.schemaJsonIpfs!),
        rootCfg.apiEndpoint,
    );
    const parentInit = {
        admin: factories.msgSender,
        contractUri: schemaJsonUrl.toString(),
        name: owlProject.metadata.name,
        symbol: owlProject.metadata.name.substring(0, 12),
        initBaseURI: `${baseUri}/`,
        feeReceiver: owlProject.metadata.fee_recipient,
        childContracts721: map(owlProject.children, (c) => c.cfg.address),
        childContracts1155: [],
    } as Utils.ERC721TopDownDna.ERC721TopDownDnaInitializeArgs;

    const parentArgs = Utils.ERC721TopDownDna.flattenInitArgsERC721TopDownDna(parentInit);
    const parentData = factories.ERC721TopDownDnaInitEncoder(...parentArgs);
    const parentArgsBeacon = [factories.msgSender, factories.beaconAddress, parentData] as [string, string, string];

    owlProject.rootContract.cfg.address = factories.BeaconProxyFactory.getAddress(...parentArgsBeacon);

    owlProject.rootContract.initArgs = {
        args: parentArgsBeacon,
        contractInit: parentInit,
    };

};

const deployContracts = async (owlProject: OwlProject, factories: any) => {

    const { awaitAllObj } = await import('@owlprotocol/utils');

    let nonce = await provider.getTransactionCount(factories.msgSender);

    const deployments: Record<string, { tokenSymbol?: string; cfg: ContractConfig; initArgs?: InitArgs }> = {
        ...owlProject.children,
        root: owlProject.rootContract,
    };

    const contractPromises = mapValues(deployments, async ({ cfg, initArgs }): Promise<any> => {
        const args = initArgs!.args;
        const address = cfg.address!;

        if (!args) {
            return {
                address: undefined,
                error: new Error(`address: ${cfg.address} is missing args`),
            };
        }

        try {
            //Compute Deployment Address
            if (await factories.BeaconProxyFactory.exists(...args)) {
                return {
                    address,
                    contract: factories.ERC721TopDownDna.attach(address),
                    deployed: false,
                };
            } else {

                await factories.BeaconProxyFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 });

                return {
                    address,
                    contract: factories.ERC721TopDownDna.attach(address),
                    deployed: true,
                };
            }
        } catch (error: any) {
            return { address, error };
        }
    });

    const contracts = await awaitAllObj(contractPromises);

    mapValues(contracts, async (p: DeployNFTResult, k): Promise<DeployNFTResult> => {
        const r = await p;
        if (r.error) {
            Deploy.logDeployment(NETWORK, k, r.address, 'beacon-proxy', 'failed');
            console.error(r.error);
        } else {
            Deploy.logDeployment(NETWORK, k, r.address, 'beacon-proxy', r.deployed ? 'deployed' : 'exists');
        }
        return r;
    });

    return contracts;
};

/**
 * We grant approval to the parent NFT to transfer the children to itself
 * @param signer
 * @param contracts
 */
const setApprovalsForChildren = async (signer: ethers.Wallet, contracts: Record<string, any>) => {
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);
    const rootContractAddr = contracts.root.address;

    const approvalPromises = mapValues(contracts, async (mint: any, k) => {
        if (k === 'root') {
            return; // new Promise(() => Promise.resolve());
        }

        debug && console.debug(`setApprovalForAll: ${mint.address} - ${k} `);

        const childContract = new ethers.Contract(mint.address, Artifacts.ERC721TopDownDna.abi, signer);

        await childContract.setApprovalForAll(rootContractAddr, true, {
            nonce: nonce++,
            // gasPrice: 2e9,
            gasLimit: 10e6,
        });
    });

    return await awaitAllObj(approvalPromises);
};
