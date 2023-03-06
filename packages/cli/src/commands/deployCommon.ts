import yargs from 'yargs';
import config from 'config';
import { ethers } from 'ethers';
import { HD_WALLET_MNEMONIC, NETWORK } from '../utils/environment.js';
import { Deploy } from '@owlprotocol/contracts';

const jsonRpcEndpoint: string = config.get(`network.${NETWORK}.config.url`);
const provider = new ethers.providers.JsonRpcProvider(jsonRpcEndpoint);

export type DeployCommonResult = {
    proxyFactory?: any;
    deterministicDeployer?: any;
    implementations?: any;
    upgradeableBeacon?: any;
};

export const command = 'deployCommon';

export const describe = `Deploy the base smart contracts:

- Deterministic Deployer
- Proxy Factory
- Implementations of all our smart contracts
- UpgradeableBeacon

e.g. node dist/index.cjs deployCommon



`;

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs.option('debug', {
        describe: 'Outputs debug statements',
        type: 'boolean',
    });
};

export const handler = async (argv: yargs.ArgumentsCamelCase) => {
    const debug = argv.debug || false;

    console.log(`Deploying Common Beacons and Implementations to ${NETWORK}`);

    const signers: Array<ethers.Wallet> = [];
    const walletOne = ethers.Wallet.fromMnemonic(HD_WALLET_MNEMONIC);
    const network: Deploy.RunTimeEnvironment['network'] = config.get(`network.${NETWORK}`);

    signers[0] = walletOne.connect(provider);

    const deployCommonResult = await deployCommon({ provider, signers, network });
    debug && console.debug(deployCommonResult);

    console.log('Done');
};

export const deployCommon = async ({
    provider,
    signers,
    network,
}: Deploy.RunTimeEnvironment): Promise<DeployCommonResult> => {
    let deployCommonResult: DeployCommonResult = {};

    deployCommonResult.deterministicDeployer = await Deploy.deployDeterministicDeployer({
        provider,
        signers,
        network,
    });
    deployCommonResult.proxyFactory = await Deploy.deployProxyFactory({ provider, signers, network });
    deployCommonResult.implementations = await Deploy.deployImplementations({ provider, signers, network });
    deployCommonResult.upgradeableBeacon = await Deploy.deployUpgradeableBeacon({ provider, signers, network });

    return deployCommonResult;
};
