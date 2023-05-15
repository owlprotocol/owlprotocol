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
import {
    ANVIL_RPC,
    GANACHE_RPC,
    MAINNET_RPC, MAINNET_EXPLORER_API_KEY,
    ARBITRUM_RPC, ARBITRUM_EXPLORER, ARBITRUM_EXPLORER_API, ARBITRUM_EXPLORER_API_KEY,
    POLYGON_RPC, POLYGON_EXPLORER, POLYGON_EXPLORER_API, POLYGON_EXPLORER_API_KEY,
    OPTIMISM_RPC, OPTIMISM_EXPLORER, OPTIMISM_EXPLORER_API, OPTIMISM_EXPLORER_API_KEY,
    BSC_RPC, BSC_EXPLORER, BSC_EXPLORER_API, BSC_EXPLORER_API_KEY,
    PRIVATE_KEY_0, PRIVATE_KEY_1
} from '@owlprotocol/envvars'

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
        ganache: {
            url: GANACHE_RPC,
        },
        anvil: {
            chainId: 31337,
            url: ANVIL_RPC,
        },
        mainnet: {
            url: MAINNET_RPC || 'https://eth-mainnet.public.blastapi.io',
        },
        polygon: {
            url: POLYGON_RPC || 'https://matic-mainnet.chainstacklabs.com',
            chainId: 137,
            maxFeePerGas: ethers.utils.parseUnits('0', 'gwei').toNumber(),
            maxPriorityFeePerGas: ethers.utils.parseUnits('80', 'gwei').toNumber(),
        },
        binance: {
            url: BSC_RPC || 'https://rpc-bsc.bnb48.club',
        },
        arbitrum: {
            url: ARBITRUM_RPC || 'https://arb1.arbitrum.io/rpc',
        },
        optimism: {
            url: OPTIMISM_RPC || 'https://mainnet.optimism.io',
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
            mainnet: MAINNET_EXPLORER_API_KEY,
            polygon: POLYGON_EXPLORER_API_KEY,
            bsc: BSC_EXPLORER_API_KEY,
            arbitrumOne: ARBITRUM_EXPLORER_API_KEY,
            optimisticEthereum: OPTIMISM_EXPLORER_API_KEY,
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
                    apiURL: POLYGON_EXPLORER_API,
                    browserURL: POLYGON_EXPLORER,
                },
            },
            {
                network: 'binance',
                chainId: 56,
                urls: {
                    apiURL: BSC_EXPLORER_API,
                    browserURL: BSC_EXPLORER,
                },
            },
            {
                network: 'arbitrum',
                chainId: 42161,
                urls: {
                    apiURL: ARBITRUM_EXPLORER_API,
                    browserURL: ARBITRUM_EXPLORER,
                },
            },
            {
                network: 'optimism',
                chainId: 10,
                urls: {
                    apiURL: OPTIMISM_EXPLORER_API,
                    browserURL: OPTIMISM_EXPLORER,
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
