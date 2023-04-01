import '@nomiclabs/hardhat-web3';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@openzeppelin/hardhat-upgrades';

import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

import 'solidity-docgen';
import 'solidity-coverage';

import { ethers } from 'ethers';
import lodash from 'lodash';
import { PRIVATE_KEY_0, PRIVATE_KEY_1 } from './src/environment';

const { mapValues } = lodash;
const baseNetwork = {
    from: PRIVATE_KEY_0,
    accounts: [PRIVATE_KEY_0, PRIVATE_KEY_1],
};

const config = {
    paths: {
        sources: './contracts',
        tests: 'test/hardhat',
        artifacts: './src/artifacts',
        deploy: './lib/cjs/deploy-hre',
        deployments: './src/deployments'
    },
    solidity: {
        version: '0.8.14',
        settings: {
            viaIR: true,
            optimizer: {
                enabled: true,
                runs: 100,
            },
        },
    },
    namedAccounts: {
        deployer: 0,
        other: 1,
    },
    mocha: {
        timeout: 1000000,
    },
    docgen: {
        outputDir: './docs-contracts-reference/',
        pages: 'files',
        exclude: [],
        templates: './docs-templates/',
    },
    networks: {
        hardhat: {
            chainId: 1337,
        },
        localhost: {
            url: 'http://127.0.0.1:8545/',
        },
        ganache: {
            url: 'http://127.0.0.1:8545',
        },
        anvil: {
            chainId: 31337,
            url: 'http://127.0.0.1:8545/',
        },
        rinkeby: {
            url: process.env.RINKEBY_URL || 'https://rinkeby.infura.io/v3/feexxx',
        },
        mainnet: {
            url: process.env.MAINNET_URL || 'https://eth-mainnet.public.blastapi.io',
        },
        polygon: {
            url: process.env.POLYGON_URL || 'https://matic-mainnet.chainstacklabs.com',
            chainId: 137,
            maxFeePerGas: ethers.utils.parseUnits('0', 'gwei').toNumber(),
            maxPriorityFeePerGas: ethers.utils.parseUnits('80', 'gwei').toNumber(),
        },
        binance: {
            url: process.env.BINANCE_URL || 'https://rpc-bsc.bnb48.club',
        },
        arbitrum: {
            url: process.env.ARBITRUM_URL || 'https://arb1.arbitrum.io/rpc',
        },
        optimism: {
            url: process.env.OPTIMISM_URL || 'https://mainnet.optimism.io',
        },
        avalanche: {
            url: process.env.AVALANCHE_URL || 'https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc',
        },
        fantom: {
            url: process.env.FANTOM_URL || 'https://rpc.ankr.com/fantom',
        },
        harmony: {
            url: process.env.HARMONY_URL || 'https://rpc.heavenswail.one',
        },
        aurora: {
            url: process.env.AURORA_URL || 'https://mainnet.aurora.dev',
        },
        boba: {
            url: process.env.BOBA_URL || 'https://lightning-replica.boba.network',
        },
        // huobi: {
        //     url: process.env.HUOBI_URL || 'https://http-mainnet.hecochain.com',
        // },
        moonriver: {
            url: process.env.MOONRIVER_URL || 'https://moonriver.public.blastapi.io',
        },
        moonbeam: {
            url: process.env.MOONBEAM_URL || 'https://moonbeam.public.blastapi.io',
        },
        // theta: {
        //     url: process.env.THETA_URL || 'https://eth-rpc-api.thetatoken.org/rpc',
        // },
        owl: {
            url: process.env.OWL_URL || 'https://blockchain.istio.owlprotocol.xyz/poa/rpc',
        },
    },
    etherscan: {
        apiKey: {
            mainnet: process.env.MAINNET_API_KEY!,
            rinkeby: process.env.MAINNET_API_KEY!,
            polygon: process.env.POLYGON_API_KEY!,
            bsc: process.env.BINANCE_API_KEY!,
            arbitrumOne: process.env.ARBITRUM_API_KEY!,
            optimisticEthereum: process.env.OPTIMISM_API_KEY!,
            avalanche: process.env.AVAX_API_KEY!,
            opera: process.env.FANTOM_API_KEY!,
            aurora: process.env.AURORA_API_KEY!,
            moonriver: process.env.MOONRIVER_API_KEY!,
            moonbeam: process.env.MOONBEAM_API_KEY!,
        },
        //@ts-ignore
        customChains: [
            {
                network: 'polygon',
                chainId: 137,
                urls: {
                    apiURL: 'https://api.polygonscan.com/',
                    browserURL: 'https://polygonscan.com',
                },
            },
            {
                network: 'binance',
                chainId: 56,
                urls: {
                    apiURL: 'https://api.bscscan.com/',
                    browserURL: 'https://bscscan.com/',
                },
            },
            {
                network: 'arbitrum',
                chainId: 42161,
                urls: {
                    apiURL: 'https://api.arbiscan.com/',
                    browserURL: 'https://arbiscan.io/',
                },
            },
            {
                network: 'optimism',
                chainId: 10,
                urls: {
                    apiURL: 'https://api-optimistic.etherscan.io',
                    browserURL: 'https://optimistic.etherscan.io/',
                },
            },
            {
                network: 'avalanche',
                chainId: 43114,
                urls: {
                    apiURL: 'https://api.snowtrace.io',
                    browserURL: 'https://snowtrace.io/',
                },
            },
            {
                network: 'fantom',
                chainId: 250,
                urls: {
                    apiURL: 'https://api.ftmscan.com',
                    browserURL: 'https://ftmscan.com/',
                },
            },
            {
                network: 'aurora',
                chainId: 13113161554,
                urls: {
                    apiURL: 'https://explorer.mainnet.aurora.dev/api',
                    browserURL: 'https://aurorascan.dev/',
                },
            },
            {
                network: 'moonriver',
                chainId: 1285,
                urls: {
                    apiURL: 'https://blockscout.moonriver.moonbeam.network/api',
                    browserURL: 'https://moonriver.moonscan.io/',
                },
            },
            {
                network: 'moonbeam',
                chainId: 1284,
                urls: {
                    apiURL: 'https://api-moonbeam.moonscan.io',
                    browserURL: 'https://moonscan.io/',
                },
            },
        ],
    },
};

config.networks = mapValues(config.networks, (n, k) => {
    if (k != 'hardhat') return { ...n, ...baseNetwork };

    //hardhat network, set balances
    const START_BALANCE = ethers.utils.parseUnits('10', 'ether').toString();
    let accounts = [
        { balance: START_BALANCE, privateKey: baseNetwork.accounts[0] },
        { balance: START_BALANCE, privateKey: baseNetwork.accounts[1] },
    ];

    return { ...n, from: baseNetwork.from, accounts };
}) as any;

export default config;
