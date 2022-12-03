import { logDeployment, RunTimeEnvironment } from '../../utils';
import { mapValues } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories';
import { getDeterministicFactories, getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories';
import { ERC1155MintableInitializeArgs, flattenInitArgsERC1155Mintable } from '../../../utils/ERC1155Mintable';
import { constants } from 'ethers';
import { getBeaconProxyFactories } from '../../../ethers/beaconProxyFactories';

const deploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const deterministicFactories = getDeterministicFactories(signer, factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(signer, factories, signerAddress);
    const beaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const beconProxyFactories = getBeaconProxyFactories(signer, deterministicFactories, beaconFactory, signerAddress);
    const ERC1155MintableFactory = beconProxyFactories.ERC1155Mintable;

    //Contracts
    const deployments: { [key: string]: ERC1155MintableInitializeArgs } = {
        erc1155_0: {
            admin: signerAddress,
            contractUri: '',
            gsnForwarder: constants.AddressZero,
            uri: '',
            feeReceiver: signerAddress,
            feeNumerator: 0,
        },
    };

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsERC1155Mintable(initArgs);
        const address = ERC1155MintableFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC1155MintableFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC1155MintableFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC1155MintableFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error };
        }
    });

    await Promise.all(Object.values(promises));

    return mapValues(promises, async (p, k) => {
        const r = await p;
        if (r.error) {
            logDeployment(network.name, k, r.address, 'beacon-proxy', 'failed');
            console.error(r.error);
        } else {
            logDeployment(network.name, k, r.address, 'beacon-proxy', r.deployed ? 'deployed' : 'exists');
        }
        return r;
    });
};

deploy.tags = ['ERC1155MintableBeaconProxy'];
deploy.dependencies = ['Implementations', 'ERC1820', 'UpgradeableBeacon'];
export default deploy;
