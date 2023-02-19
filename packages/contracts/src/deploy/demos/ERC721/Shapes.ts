import { constants, utils } from 'ethers';
import { mapValues, zipObject } from '../../../lodash.js';

import { logDeployment, RunTimeEnvironment } from '../../utils.js';
import { factories, getFactories } from '../../../ethers/factories.js';
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
import { ERC1167FactoryAddress } from '../../../utils/ERC1167Factory/index.js';

const deploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const SDK = await import('@owlprotocol/nft-sdk');
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddress);
    const deterministicFactories = getDeterministicFactories(factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(factories, cloneFactory, signerAddress);

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
    const shapesChild = {
        admin: signerAddress,
        contractUri: 'http://localhost:3000/shapesNested/collection-child.json',
        gsnForwarder: constants.AddressZero,
        name: 'Shapes NFT Child Collection',
        symbol: 'SHP-Child',
        initBaseURI: '',
        feeReceiver: signerAddress,
        feeNumerator: 0,
        childContracts721: [],
        childContracts1155: [],
    } as ERC721TopDownDna.ERC721TopDownDnaInitializeArgs;

    const initArgsChild = ERC721TopDownDna.flattenInitArgsERC721TopDownDna(shapesChild);
    const initDataChild = ERC721TopDownDnaInitEncoder(...initArgsChild);
    const initArgsChildBeacon = [signerAddress, beaconAddress, initDataChild] as [string, string, string];
    const addressChild = BeaconProxyFactory.getAddress(...initArgsChildBeacon);

    const shapes = {
        admin: signerAddress,
        contractUri: 'http://localhost:3000/shapesNested/collection.json',
        gsnForwarder: constants.AddressZero,
        name: 'Shapes NFT Collection',
        symbol: 'SHP',
        initBaseURI: '',
        feeReceiver: signerAddress,
        feeNumerator: 0,
        childContracts721: [addressChild],
        childContracts1155: [],
    } as ERC721TopDownDna.ERC721TopDownDnaInitializeArgs;
    const initArgs = ERC721TopDownDna.flattenInitArgsERC721TopDownDna(shapes);
    const initData = ERC721TopDownDnaInitEncoder(...initArgs);
    const initArgsBeacon = [signerAddress, beaconAddress, initData] as [string, string, string];
    const address = BeaconProxyFactory.getAddress(...initArgsBeacon);

    const deployments = {
        shapesChild: { address: addressChild, initArgs: initArgsChildBeacon },
        shapes: { address, initArgs: initArgsBeacon },
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

    //Mint tokens
    const tokens = {
        shapesChild: {
            [1]: {
                to: signerAddress,
                dna: SDK.Collections.circleOnSquareNestedItem.children.fg.dna(),
            },
        },
        shapes: {
            [1]: {
                to: signerAddress,
                dna: SDK.Collections.circleOnSquareNestedItem.dna(),
            },
        },
    };

    const promisesMints = mapValues(tokens, async (tokens, k) => {
        const contract = contracts[k].contract!;
        const collection =
            k == 'shapesChild' ? SDK.Collections.collectionShapesNestedChild : SDK.Collections.collectionShapesNested;

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
};

deploy.tags = ['Shapes'];
deploy.dependencies = ['Implementations', 'ERC1820', 'UpgradeableBeacon'];
export default deploy;
