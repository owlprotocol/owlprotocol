import { constants, utils } from 'ethers';
import { mapValues, zipObject } from '../../../lodash.js';

import { logDeployment, RunTimeEnvironment } from '../../utils.js';
import { getFactories } from '../../../ethers/factories.js';
import {
    getDeterministicFactories,
    getDeterministicInitializeFactories,
} from '../../../ethers/deterministicFactories.js';
import {
    ERC721TopDownDna as ERC721TopDownDnaContract,
    BeaconProxy,
    BeaconProxy__factory,
    ERC721TopDownDnaInterface,
} from '../../../ethers/types.js';
import { ERC721TopDownDna, ERC1167Factory } from '../../../utils/index.js';

const deploy = async ({ provider, signers, network }: RunTimeEnvironment) => {

    const SDK = await import('@owlprotocol/nft-sdk');
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const cloneFactory = factories.ERC1167Factory.attach(ERC1167Factory.ERC1167FactoryAddress);
    const deterministicFactories = getDeterministicFactories(signer, factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(signer, factories, signerAddress);

    const UpgradeableBeaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const implementationAddress = deterministicFactories.ERC721TopDownDna.getAddress();

    const ERC721TopDownDnaInitEncoder = ERC1167Factory.getInitDataEncoder<ERC721TopDownDnaContract, 'proxyInitialize'>(
        factories.ERC721TopDownDna.interface as ERC721TopDownDnaInterface,
        'proxyInitialize',
    );

    const beaconAddress = UpgradeableBeaconFactory.getAddress(signerAddress, implementationAddress);
    const BeaconProxyFactory = ERC1167Factory.deterministicFactory<BeaconProxy__factory, BeaconProxy, 'initialize'>({
        contractFactory: factories.BeaconProxy,
        cloneFactory,
        initSignature: 'initialize',
        msgSender: signerAddress,
    });

    //Contracts
    const thGlassesChild = {
        admin: signerAddress,
        contractUri: 'http://localhost:3000/threadhaus/collection-child-glasses.json',
        gsnForwarder: constants.AddressZero,
        name: 'Thread Haus - Innovot NFT Glasses Sub-Collection',
        symbol: 'ThreadHaus-Child-Glasses',
        initBaseURI: '',
        feeReceiver: signerAddress,
        feeNumerator: 0,
        childContracts: [],
    } as ERC721TopDownDna.ERC721TopDownDnaInitializeArgs;

    const thHatsChild = {
        admin: signerAddress,
        contractUri: 'http://localhost:3000/threadhaus/collection-child-hats.json',
        gsnForwarder: constants.AddressZero,
        name: 'Thread Haus - Innovot NFT Hats Sub-Collection',
        symbol: 'ThreadHaus-Child-Glasses',
        initBaseURI: '',
        feeReceiver: signerAddress,
        feeNumerator: 0,
        childContracts: [],
    } as ERC721TopDownDna.ERC721TopDownDnaInitializeArgs;

    const thDressChild = {
        admin: signerAddress,
        contractUri: 'http://localhost:3000/threadhaus/collection-child-dress.json',
        gsnForwarder: constants.AddressZero,
        name: 'Thread Haus - Innovot NFT Glasses Sub-Collection',
        symbol: 'ThreadHaus-Child-Glasses',
        initBaseURI: '',
        feeReceiver: signerAddress,
        feeNumerator: 0,
        childContracts: [],
    } as ERC721TopDownDna.ERC721TopDownDnaInitializeArgs;

    const thFacialHairChild = {
        admin: signerAddress,
        contractUri: 'http://localhost:3000/threadhaus/collection-child-facial_hair.json',
        gsnForwarder: constants.AddressZero,
        name: 'Thread Haus - Innovot NFT Glasses Sub-Collection',
        symbol: 'ThreadHaus-Child-Glasses',
        initBaseURI: '',
        feeReceiver: signerAddress,
        feeNumerator: 0,
        childContracts: [],
    } as ERC721TopDownDna.ERC721TopDownDnaInitializeArgs;

    const initArgsGlassesChild = ERC721TopDownDna.flattenInitArgsERC721TopDownDna(thGlassesChild);
    const initDataGlassesChild = ERC721TopDownDnaInitEncoder(...initArgsGlassesChild);
    const initArgsGlassesChildBeacon = [signerAddress, beaconAddress, initDataGlassesChild] as [string, string, string];
    const addressGlassesChild = BeaconProxyFactory.getAddress(...initArgsGlassesChildBeacon);

    const initArgsHatsChild = ERC721TopDownDna.flattenInitArgsERC721TopDownDna(thHatsChild);
    const initDataHatsChild = ERC721TopDownDnaInitEncoder(...initArgsHatsChild);
    const initArgsHatsChildBeacon = [signerAddress, beaconAddress, initDataHatsChild] as [string, string, string];
    const addressHatsChild = BeaconProxyFactory.getAddress(...initArgsHatsChildBeacon);

    const initArgsDressChild = ERC721TopDownDna.flattenInitArgsERC721TopDownDna(thDressChild);
    const initDataDressChild = ERC721TopDownDnaInitEncoder(...initArgsDressChild);
    const initArgsDressChildBeacon = [signerAddress, beaconAddress, initDataDressChild] as [string, string, string];
    const addressDressChild = BeaconProxyFactory.getAddress(...initArgsDressChildBeacon);

    const initArgsFacialHairChild = ERC721TopDownDna.flattenInitArgsERC721TopDownDna(thFacialHairChild);
    const initDataFacialHairChild = ERC721TopDownDnaInitEncoder(...initArgsFacialHairChild);
    const initArgsFacialHairChildBeacon = [signerAddress, beaconAddress, initDataFacialHairChild] as [string, string, string];
    const addressFacialHairChild = BeaconProxyFactory.getAddress(...initArgsFacialHairChildBeacon);

    const thColl = {
        admin: signerAddress,
        contractUri: 'http://localhost:3000/threadhaus/collection.json',
        gsnForwarder: constants.AddressZero,
        name: 'Thread Haus - Innovot NFT Collection',
        symbol: 'ThreadHaus',
        initBaseURI: '',
        feeReceiver: signerAddress,
        feeNumerator: 0,
        childContracts: [addressGlassesChild, addressHatsChild, addressDressChild, addressFacialHairChild],
    } as ERC721TopDownDna.ERC721TopDownDnaInitializeArgs;
    const initArgs = ERC721TopDownDna.flattenInitArgsERC721TopDownDna(thColl);
    const initData = ERC721TopDownDnaInitEncoder(...initArgs);
    const initArgsBeacon = [signerAddress, beaconAddress, initData] as [string, string, string];
    const address = BeaconProxyFactory.getAddress(...initArgsBeacon);

    const deployments = {
        thGlassesChild: {address: addressGlassesChild, initArgs: initArgsGlassesChildBeacon},
        thHatsChild: {address: addressHatsChild, initArgs: initArgsHatsChildBeacon},
        thDressChild: {address: addressDressChild, initArgs: initArgsDressChildBeacon},
        thFacialHairChild: {address: addressFacialHairChild, initArgs: initArgsFacialHairChildBeacon},
        thColl: {address, initArgs: initArgsBeacon},
    };

    const promises = mapValues(deployments, async ({ address, initArgs }) => {
        try {
            //Compute Deployment Address
            if (await BeaconProxyFactory.exists(...initArgs)) {
                return {
                    address,
                    contract: factories.ERC721TopDownDna.attach(address),
                    deployed: false,
                };
            } else {
                await BeaconProxyFactory.deploy(...initArgs, { nonce: nonce++, gasLimit: 10e6 });

                return {
                    address,
                    contract: factories.ERC721TopDownDna.attach(address),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error };
        }
    });

    const contracts = zipObject(Object.keys(promises), await Promise.all(Object.values(promises)));
    mapValues(promises, async (p, k) => {
        const r = await p;
        if (r.error) {
            logDeployment(network.name, k, r.address, 'beacon-proxy', 'failed');
            console.error(r.error);
        } else {
            logDeployment(network.name, k, r.address, 'beacon-proxy', r.deployed ? 'deployed' : 'exists');
        }
        return r;
    });

    // TODO: here we need to generate the different tokens
    //Mint tokens
    const tokens = {
        thGlassesChild: {
            [1]: {
                to: signerAddress,
                dna: SDK.Collections.thTestNestedItem.children.glasses.dna(),
            },
        },
        thHatsChild: {
            [1]: {
                to: signerAddress,
                dna: SDK.Collections.thTestNestedItem.children.dress.dna(),
            },
        },
        thDressChild: {
            [1]: {
                to: signerAddress,
                dna: SDK.Collections.thTestNestedItem.children.hats.dna(),
            },
        },
        thFacialHairChild: {
            [1]: {
                to: signerAddress,
                dna: SDK.Collections.thTestNestedItem.children.facial_hair.dna(),
            },
        },
        thColl: {
            [1]: {
                to: signerAddress,
                dna: SDK.Collections.thTestNestedItem.dna(),
            },
        },
    };




    const promisesMints = mapValues(tokens, async (tokens, k) => {

        const contract = contracts[k].contract!;
        let collection: any;

        switch (k) {
            case 'thGlassesChild':
                collection = SDK.Collections.thTestNestedItemChildGlasses;
                break;
            case 'thHatsChild':
                collection = SDK.Collections.thTestNestedItemChildDress;
                break;
            case 'thDressChild':
                collection = SDK.Collections.thTestNestedItemChildHats;
                break;
            case 'thFacialHairChild':
                collection = SDK.Collections.thTestNestedItemChildFacialHair;
                break;
            default:
                collection = SDK.Collections.thTestNestedItem;
        }

        const mints = mapValues(tokens, async ({ to, dna }, tokenId) => {
            try {
                const owner = await contract.ownerOf(tokenId);
                console.debug(`${k} ${tokenId} exists, owned: ${owner}`);
                const fullDna = await contract.getDna(tokenId);
                const [dna, fullDnaChildren] = utils.defaultAbiCoder.decode(['bytes', 'bytes[]'], fullDna);
                const item = collection.createFromFullDna(fullDna);
                return {
                    owner,
                    fullDna,
                    dna,
                    fullDnaChildren,
                    item,
                };
            } catch (error) {
                //console.error(error);
                //Not minted
                const tx = await contract.safeMintWithDna(to, dna, {
                    nonce: nonce++,
                    type: 2,
                });
                const receipt = await tx.wait(1);

                return {
                    owner: to,
                    dna,
                    tx,
                    receipt,
                };
            }
        });

        return zipObject(Object.keys(mints), await Promise.all(Object.values(mints)));
    });

    const mints = zipObject(Object.keys(promisesMints), await Promise.all(Object.values(promisesMints)));

    console.debug(mints);

    return { contracts, mints };
}

deploy.tags = ['ThreadHaus'];
deploy.dependencies = ['Implementations', 'ERC1820', 'UpgradeableBeacon'];
export default deploy;
