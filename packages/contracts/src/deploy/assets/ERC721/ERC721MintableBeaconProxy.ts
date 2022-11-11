import { logDeployment, RunTimeEnvironment } from '../../utils';
import { mapValues } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories';
import { getDeterministicFactories, getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories';
import { ERC721Mintable, BeaconProxy, BeaconProxy__factory, ERC721MintableInterface } from '../../../ethers/types';
import { ERC721MintableInitializeArgs, flattenInitArgsERC721Mintable } from '../../../utils/ERC721Mintable';
import { constants } from 'ethers';
import { deterministicFactory } from '../../../utils/ERC1167Factory/getContractFactory';
import { getInitDataEncoder } from '../../../utils/ERC1167Factory/getInitData';

const deploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const cloneFactory = await factories.ERC1167Factory.deploy();
    const deterministicFactories = getDeterministicFactories(signer, factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(signer, factories, signerAddress);

    const UpgradeableBeaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const implementationAddress = deterministicFactories.ERC721Mintable.getAddress();

    const ERC721MintableInitEncoder = getInitDataEncoder<ERC721Mintable, 'proxyInitialize'>(
        factories.ERC721Mintable.interface as ERC721MintableInterface,
        'proxyInitialize',
    );

    const beaconAddress = UpgradeableBeaconFactory.getAddress(signerAddress, implementationAddress);
    const BeaconProxyFactory = deterministicFactory<BeaconProxy__factory, BeaconProxy, 'initialize'>({
        contractFactory: factories.BeaconProxy,
        cloneFactory,
        initSignature: 'initialize',
        msgSender: signerAddress,
    });

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

    const promises = mapValues(deployments, async (proxyInitArgs) => {
        const proxyInitArgsFlat = flattenInitArgsERC721Mintable(proxyInitArgs);
        const initData = ERC721MintableInitEncoder(...proxyInitArgsFlat);
        const initArgs = [signerAddress, beaconAddress, initData] as [string, string, string];
        const address = BeaconProxyFactory.getAddress(...initArgs);

        try {
            //Compute Deployment Address
            if (await BeaconProxyFactory.exists(...initArgs)) {
                return {
                    address,
                    contract: BeaconProxyFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await BeaconProxyFactory.deploy(...initArgs, { nonce: nonce++, gasLimit: 10e6 }),
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

deploy.tags = ['ERC721MintableBeaconProxy'];
deploy.dependencies = ['Implementations', 'ERC1820', 'UpgradeableBeacon'];
export default deploy;
