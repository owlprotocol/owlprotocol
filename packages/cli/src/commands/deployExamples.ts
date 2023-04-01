import yargs from 'yargs';

import { Deploy } from '@owlprotocol/contracts';

import { getNetworkCfg } from '../utils/networkCfg.js';

export const command = 'deployExamples';

export const describe = `Deploys an new example smart contract using Owl Protocol's proxy/deterministic deployer construct.
Depends on deployCommon to be run first.
`;

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs.option('debug', {
        describe: 'Outputs debug statements',
        type: 'boolean',
    });
};

export const example = '$0 deployExamples';
export const exampleDescription = 'deploy example smart contracts';

export const handler = async (argv: yargs.ArgumentsCamelCase) => {
    const debug = argv.debug || false;

    const { network, signers, provider } = getNetworkCfg();

    console.log(`Deploying Examples to ${network.name}`);

    const deployExampleResult = await deployExamples({ provider, signers, network });
    debug && console.debug(deployExampleResult);

    console.log('Done');
};

export const deployExamples = async ({ provider, signers, network }: Deploy.RunTimeEnvironment): Promise<any> => {
    return await Deploy.ExamplesDeploy({ provider, signers, network });
};
