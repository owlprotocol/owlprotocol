import { logDeployment, RunTimeEnvironment } from '../../utils';
import { mapValues } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories';
import { getDeterministicFactories, getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories';
import { ERC20MintableInitializeArgs, flattenInitArgsERC20Mintable } from '../../../utils/ERC20Mintable';
import { constants, utils } from 'ethers';
import { getBeaconProxyFactories } from '../../../ethers/beaconProxyFactories';
import { ERC1167FactoryAddress } from '../../../utils/ERC1167Factory';

interface Params extends RunTimeEnvironment {
    tokens: number,
    balanceTarget: number
}
export const ERC20MintableDeploy = async ({ provider, signers, network, tokens, balanceTarget }: Params) => {
    const { awaitAllObj } = await import('@owlprotocol/utils')
    const balanceTargetWei = utils.parseUnits(`${balanceTarget}`)

    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddress)
    const deterministicFactories = getDeterministicFactories(factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(factories, cloneFactory, signerAddress);
    const beaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const beaconProxyFactories = getBeaconProxyFactories(deterministicFactories, cloneFactory, beaconFactory, signerAddress);
    const ERC20MintableFactory = beaconProxyFactories.ERC20Mintable;

    //Contracts
    const deployments: { [key: string]: ERC20MintableInitializeArgs } = {}
    for (let i = 0; i < tokens; i++) {
        deployments[`ERC20Mintable-${i}`] = {
            admin: signerAddress,
            contractUri: '',
            gsnForwarder: constants.AddressZero,
            name: `ERC20Mintable-${i}`,
            symbol: `TOK${i}`,
        }
    }

    //Deploy
    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsERC20Mintable(initArgs);
        const address = ERC20MintableFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC20MintableFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC20MintableFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC20MintableFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error, deployed: false };
        }
    });

    const results = await awaitAllObj(promises)

    //Mint to balanceTarget
    const promisesMint = mapValues(results, async (r) => {
        if (!r.error) {
            const contract = r.contract!
            const balance = await contract.balanceOf(signerAddress)
            const deficit = balanceTargetWei.sub(balance)
            if (deficit.gt(utils.parseUnits('0'))) {
                const tx = await contract.mint(signerAddress, deficit, { nonce: nonce++ })
                return tx.wait();
            }
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

ERC20MintableDeploy.tags = ['ERC20Mintable'];
ERC20MintableDeploy.dependencies = ['Implementations', 'ERC1820', 'UpgradeableBeacon'];
