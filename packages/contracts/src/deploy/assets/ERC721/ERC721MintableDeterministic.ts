import { logDeployment, RunTimeEnvironment } from '../../utils';
import { mapValues } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories';
import { getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories';
import { ERC721MintableInitializeArgs, flattenInitArgsERC721Mintable } from '../../../utils/ERC721Mintable';
import { constants } from 'ethers';

const deploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const deterministicFactories = getDeterministicInitializeFactories(factories, signerAddress);
    const ERC721MintableFactory = deterministicFactories.ERC721Mintable;

    //Contracts
    const deployments: { [key: string]: ERC721MintableInitializeArgs } = {
        test: {
            admin: signerAddress,
            contractUri: '',
            gsnForwarder: constants.AddressZero,
            name: 'test',
            symbol: 'TEST',
            initBaseURI: '',
            feeReceiver: signerAddress,
            feeNumerator: 0,
        },
    };

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsERC721Mintable(initArgs);
        const address = ERC721MintableFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC721MintableFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC721MintableFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC721MintableFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
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
            logDeployment(network.name, k, r.address, 'deterministic', 'failed');
            console.error(r.error);
        } else {
            logDeployment(network.name, k, r.address, 'deterministic', r.deployed ? 'deployed' : 'exists');
        }
        return r;
    });
};

deploy.tags = ['ERC721MintableDeterministic'];
deploy.dependencies = ['ProxyFactory', 'ERC1820'];
export default deploy;
