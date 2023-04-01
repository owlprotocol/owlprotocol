import yargs from 'yargs';

import { Deploy } from '@owlprotocol/contracts';

import { getNetworkCfg } from '../utils/networkCfg.js';

export const command = 'deployCommon';

export const describe = `Deploy the base smart contracts:
- Deterministic Deployer
- Proxy Factory
- Implementations of all our smart contracts
- UpgradeableBeacon

`;

export const example = '$0 deployCommon';
export const exampleDescription = 'deploy the base smart contracts';

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs.option('debug', {
        describe: 'Output debug statements',
        type: 'boolean',
    });
};

export const handler = async (argv: yargs.ArgumentsCamelCase) => {
    const debug = argv.debug || false;

    const { network, signers, provider } = getNetworkCfg();

    console.log(`Deploying Common Beacons and Implementations to ${network.name}`);

    const deployCommonResult = await deployCommon({ provider, signers, network });
    debug && console.debug(deployCommonResult);

    console.log('Done');
};

export const deployCommon = async ({ provider, signers, network }: Deploy.RunTimeEnvironment): Promise<any> => {
    const deployCommonResult: any = {};

    deployCommonResult.deterministicDeployer = await Deploy.DeterministicDeployerDeploy({
        provider,
        signers,
        network,
    });
    deployCommonResult.proxyFactory = await Deploy.ProxyFactoryDeploy({ provider, signers, network });
    // this deploys everything in contracts/src/ethers/factories
    deployCommonResult.implementations = await Deploy.ImplementationsDeploy({ provider, signers, network });
    deployCommonResult.upgradeableBeacon = await Deploy.UpgradeableBeaconDeploy({ provider, signers, network });

    return deployCommonResult;
};
