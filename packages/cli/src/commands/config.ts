import { getNetworkCfg } from '../utils/networkCfg.js';

export const command = 'config';

export const describe = `Display the current CLI config.
The config/environment is managed by two files:
- networks.json
- .env.[NODE_ENV] - default [NODE_ENV] = "development"
`;

export const example = '$0 config';
export const exampleDescription = 'display the current config based on the current NODE_ENV.';

export const handler = async () => {
    const { network, signers, provider } = getNetworkCfg();

    console.log('CLI Config');
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`NETWORK: ${process.env.NETWORK}`);
    if (process.env.HD_WALLET_MNEMONIC) {
        console.log(`HD_WALLET_MNEMONIC: ${process.env.HD_WALLET_MNEMONIC}`);
    } else if (process.env.PRIVATE_KEY_0) {
        console.log(`PRIVATE_KEY_0: ${process.env.PRIVATE_KEY_0}`);
    }
    console.log('SIGNER: ', signers[0].address);
    console.log(network);
};
