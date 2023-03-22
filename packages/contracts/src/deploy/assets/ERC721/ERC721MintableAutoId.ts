import { getContractURIs, logDeployment, RunTimeEnvironment } from '../../utils.js';
import { mapValues } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories.js';
import { getDeterministicFactories, getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories.js';
import { ERC721MintableAutoIdInitializeArgs, flattenInitArgsERC721MintableAutoId } from '../../../utils/ERC721MintableAutoId.js';
import { constants, utils } from 'ethers';
import { getBeaconProxyFactories } from '../../../ethers/beaconProxyFactories.js';
import { ERC1167FactoryAddress } from '../../../utils/ERC1167Factory/index.js';
import { TransactionReceipt } from '@ethersproject/providers';

interface Params extends RunTimeEnvironment {
    tokens: number,
    balanceTarget: number
}
export const ERC721MintableAutoIdDeploy = async ({ provider, signers, network, tokens, balanceTarget }: Params) => {
    const { awaitAllObj } = await import('@owlprotocol/utils')
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddress)
    const deterministicFactories = getDeterministicFactories(factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(factories, cloneFactory, signerAddress);
    const beaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const beconProxyFactories = getBeaconProxyFactories(deterministicFactories, cloneFactory, beaconFactory, signerAddress);
    const ERC721MintableAutoIdFactory = beconProxyFactories.ERC721MintableAutoId;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: ERC721MintableAutoIdInitializeArgs } = {}
    for (let i = 0; i < tokens; i++) {
        const name = `ERC721MintableAutoId-${i}`;

        deployments[name] = {
            admin: signerAddress,
            name,
            symbol: `NFT${i}`,
            initBaseURI: getContractURIs({ chainId, name, tokenId: i }).tokenUri,
            contractUri: getContractURIs({ chainId, name }).contractUri,
        }
    };

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsERC721MintableAutoId(initArgs);
        const address = ERC721MintableAutoIdFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC721MintableAutoIdFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC721MintableAutoIdFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC721MintableAutoIdFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error };
        }
    });

    const results = await awaitAllObj(promises)

    //Mint to balanceTarget
    const promisesMint = mapValues(results, async (r) => {
        if (!r.error) {
            const contract = r.contract!
            const balance = await contract.balanceOf(signerAddress)
            let deficit = balanceTarget - balance.toNumber()
            const txList: Promise<TransactionReceipt>[] = []
            while (deficit > 0) {
                try {
                    //Brute-force mints
                    const tx = await contract.mint(signerAddress, { nonce: nonce })
                    txList.push(tx.wait())
                    //No fail, decrement deficit, increment nonce
                    deficit--
                    nonce++
                } catch (error) {
                    //ignore
                }
            }
            return Promise.all(txList)
        }
    });
    await awaitAllObj(promisesMint)

    return mapValues(results, (r, k) => {
        if (r.error) {
            logDeployment(network.name, k, r.address, 'beacon-proxy', 'failed');
            console.error(r.error);
        } else {
            logDeployment(network.name, k, r.address, 'beacon-proxy', r.deployed ? 'deployed' : 'exists');
        }
        return r;
    });
};

ERC721MintableAutoIdDeploy.tags = ['ERC721MintableAutoId'];
ERC721MintableAutoIdDeploy.dependencies = ['Implementations', 'ERC1820', 'UpgradeableBeacon'];
export default ERC721MintableAutoIdDeploy;
