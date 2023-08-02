import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";

import "hardhat-deploy";
import "hardhat-deploy-ethers";

import "solidity-docgen";
import "solidity-coverage";

import { ethers } from "ethers";
import lodash from "lodash";
import {
    ANVIL_RPC,
    GANACHE_RPC,
    MAINNET_RPC,
    MAINNET_EXPLORER_API_KEY,
    ARBITRUM_RPC,
    ARBITRUM_EXPLORER,
    ARBITRUM_EXPLORER_API,
    ARBITRUM_EXPLORER_API_KEY,
    POLYGON_RPC,
    POLYGON_EXPLORER,
    POLYGON_EXPLORER_API,
    POLYGON_EXPLORER_API_KEY,
    POLYGON_MUMBAI_RPC,
    OPTIMISM_RPC,
    OPTIMISM_EXPLORER,
    OPTIMISM_EXPLORER_API,
    OPTIMISM_EXPLORER_API_KEY,
    BSC_RPC,
    BSC_EXPLORER,
    BSC_EXPLORER_API,
    BSC_EXPLORER_API_KEY,
    PRIVATE_KEY_0,
    PRIVATE_KEY_1,
    POLYGON_MUMBAI_EXPLORER,
    POLYGON_MUMBAI_EXPLORER_API,
    POLYGON_MUMBAI_EXPLORER_API_KEY,
    GOERLI_RPC,
    SEPOLIA_RPC,
    AVALANCHE_RPC,
    BOBA_RPC,
    MOONBEAM_RPC,
    MOONRIVER_RPC,
    AVALANCHE_EXPLORER_API,
    MOONBEAM_EXPLORER,
    MOONBEAM_EXPLORER_API,
    MOONRIVER_EXPLORER_API,
    AVALANCHE_EXPLORER,
    MOONRIVER_EXPLORER,
    BOBA_EXPLORER_API,
    BOBA_EXPLORER_API_KEY,
    MOONRIVER_EXPLORER_API_KEY,
    MOONBEAM_EXPLORER_API_KEY,
    PRIVATE_KEY_0_LOCAL,
    PRIVATE_KEY_1_LOCAL,
    BSC_TESTNET_EXPLORER,
    BSC_TESTNET_EXPLORER_API,
    BSC_OP_TESTNET_EXPLORER_API,
    BSC_OP_TESTNET_EXPLORER,
    BSC_TESTNET_EXPLORER_API_KEY,
    BSC_TESTNET_RPC,
    BSC_OP_TESTNET_RPC,
    LINEA_RPC,
    LINEA_TESTNET_RPC,
    LINEA_EXPLORER_API_KEY,
    LINEA_TESTNET_EXPLORER_API_KEY,
    LINEA_EXPLORER,
    LINEA_EXPLORER_API,
    LINEA_TESTNET_EXPLORER,
    LINEA_TESTNET_EXPLORER_API,
} from "@owlprotocol/envvars";

const { mapValues } = lodash;
//Do NOT add PRIVATE_KEY_FACTORY_DEPLOYER to avoid accidental usage
//PRIVATE_KEY_FACTORY_DEPLOYER MUST ONLY BE USED TO DEPLOY ERC1167PROXYFACTORY
const publicNetwork = {
    from: PRIVATE_KEY_0,
    accounts: [PRIVATE_KEY_0, PRIVATE_KEY_1],
};

const localNetwork = {
    from: PRIVATE_KEY_0_LOCAL,
    accounts: [PRIVATE_KEY_0_LOCAL, PRIVATE_KEY_1_LOCAL]
}

const config = {
    defaultNetwork: "anvil",
    paths: {
        sources: "./contracts",
        tests: "test/hardhat",
        artifacts: "./src/artifacts",
        deploy: "./lib/cjs/deploy-hre",
        deployments: "./src/deployments",
        scripts: "./lib/cjs/scripts",
    },
    solidity: {
        version: "0.8.14",
        settings: {
            viaIR: true,
            optimizer: {
                enabled: true,
                runs: 100,
            },
        },
    },
    mocha: {
        timeout: 1000000,
    },
    docgen: {
        outputDir: "./docs-contracts-reference/",
        pages: "files",
        exclude: [],
        templates: "./docs-templates/",
    },
    networks: {
        ganache: {
            chainId: 1337,
            url: GANACHE_RPC,
            local: true,
            testnet: true,
            eip1559: true,
        },
        anvil: {
            chainId: 31337,
            url: ANVIL_RPC,
            local: true,
            testnet: true,
            eip1559: true,
        },
        mainnet: {
            chainId: 1,
            url: MAINNET_RPC,
            local: false,
            testnet: false,
            eip1559: true
        },
        goerli: {
            chainId: 5,
            url: GOERLI_RPC,
            local: false,
            testnet: true,
            eip1559: true,
        },
        sepolia: {
            chainId: 11155111,
            url: SEPOLIA_RPC,
            local: false,
            testnet: true,
            eip1559: true,
        },
        linea: {
            chainId: 59144,
            url: LINEA_RPC,
            local: false,
            testnet: true,
            eip1559: true
        },
        lineaTestnet: {
            chainId: 59140,
            url: LINEA_TESTNET_RPC,
            local: false,
            testnet: true,
            eip1559: true,
            maxFeePerGas: ethers.utils.parseUnits("4000", "gwei").toNumber(),
            maxPriorityFeePerGas: ethers.utils.parseUnits("4000", "gwei").toNumber(),
        },
        polygon: {
            chainId: 137,
            url: POLYGON_RPC,
            local: false,
            testnet: false,
            eip1559: true,
            maxFeePerGas: ethers.utils.parseUnits("80", "gwei").toNumber(),
            maxPriorityFeePerGas: ethers.utils.parseUnits("80", "gwei").toNumber(),
        },
        mumbai: {
            chainId: 80001,
            url: POLYGON_MUMBAI_RPC,
            local: false,
            testnet: true,
            eip1559: true,
            maxFeePerGas: ethers.utils.parseUnits("80", "gwei").toNumber(),
            maxPriorityFeePerGas: ethers.utils.parseUnits("80", "gwei").toNumber(),
        },
        bnb: {
            chainId: 56,
            url: BSC_RPC,
            local: false,
            testnet: false,
            eip1559: false,
            gasPrice: ethers.utils.parseUnits("5", "gwei").toNumber(),
        },
        bnbTestnet: {
            chainId: 97,
            url: BSC_TESTNET_RPC,
            local: false,
            testnet: true,
            eip1559: false,
            gasPrice: ethers.utils.parseUnits("10", "gwei").toNumber(),
        },
        bnbOpTestnet: {
            chainId: 5611,
            url: BSC_OP_TESTNET_RPC,
            local: false,
            testnet: true,
            eip1559: false,
            gasPrice: ethers.utils.parseUnits("5", "gwei").toNumber(),
        },
        arbitrum: {
            chainId: 42161,
            url: ARBITRUM_RPC,
            local: false,
            testnet: false,
            eip1559: true
        },
        optimism: {
            chainId: 10,
            url: OPTIMISM_RPC,
            local: false,
            testnet: false,
            eip1559: true
        },
        avalanche: {
            chainId: 43114,
            url: AVALANCHE_RPC,
            local: false,
            testnet: false,
            eip1559: false
        },
        boba: {
            chainId: 288,
            url: BOBA_RPC,
            local: false,
            testnet: false,
            eip1559: false
        },
        moonriver: {
            chainId: 1285,
            url: MOONRIVER_RPC,
            local: false,
            testnet: false,
            eip1559: false
        },
        moonbeam: {
            chainId: 1284,
            url: MOONBEAM_RPC,
            local: false,
            testnet: false,
            eip1559: false
        },
    },
    etherscan: {
        apiKey: {
            mainnet: MAINNET_EXPLORER_API_KEY,
            linea: LINEA_EXPLORER_API_KEY,
            lineaTestnet: LINEA_TESTNET_EXPLORER_API_KEY,
            polygon: POLYGON_EXPLORER_API_KEY,
            mumbai: POLYGON_MUMBAI_EXPLORER_API_KEY,
            bnb: BSC_EXPLORER_API_KEY,
            bnbTestnet: BSC_TESTNET_EXPLORER_API_KEY,
            bnbOpTestnet: BSC_TESTNET_EXPLORER_API_KEY,
            arbitrumOne: ARBITRUM_EXPLORER_API_KEY,
            optimisticEthereum: OPTIMISM_EXPLORER_API_KEY,
            boba: BOBA_EXPLORER_API_KEY,
            moonriver: MOONRIVER_EXPLORER_API_KEY,
            moonbeam: MOONBEAM_EXPLORER_API_KEY
        },
        //@ts-ignore
        customChains: [
            {
                network: "linea",
                chainId: 59144,
                urls: {
                    apiURL: LINEA_EXPLORER_API,
                    browserURL: LINEA_EXPLORER
                }
            },
            {
                network: "lineaTestnet",
                chainId: 59140,
                urls: {
                    apiURL: LINEA_TESTNET_EXPLORER_API,
                    browserURL: LINEA_TESTNET_EXPLORER
                }
            },
            {
                network: "polygon",
                chainId: 137,
                urls: {
                    apiURL: POLYGON_EXPLORER_API,
                    browserURL: POLYGON_EXPLORER,
                },
            },
            {
                network: "mumbai",
                chainId: 80001,
                urls: {
                    apiURL: POLYGON_MUMBAI_EXPLORER_API,
                    browserURL: POLYGON_MUMBAI_EXPLORER,
                },
            },
            {
                network: "bnb",
                chainId: 56,
                urls: {
                    apiURL: BSC_EXPLORER_API,
                    browserURL: BSC_EXPLORER,
                },
            },
            {
                network: "bnbTestnet",
                urls: {
                    apiURL: BSC_TESTNET_EXPLORER_API,
                    browserURL: BSC_TESTNET_EXPLORER,
                },
            },
            {
                network: "bnbOpTestnet",
                urls: {
                    apiURL: BSC_OP_TESTNET_EXPLORER_API,
                    browserURL: BSC_OP_TESTNET_EXPLORER,
                },
            },
            {
                network: "arbitrum",
                chainId: 42161,
                urls: {
                    apiURL: ARBITRUM_EXPLORER_API,
                    browserURL: ARBITRUM_EXPLORER,
                },
            },
            {
                network: "optimism",
                chainId: 10,
                urls: {
                    apiURL: OPTIMISM_EXPLORER_API,
                    browserURL: OPTIMISM_EXPLORER,
                },
            },
            {
                network: "avalanche",
                chainId: 43114,
                urls: {
                    apiURL: AVALANCHE_EXPLORER_API,
                    browserURL: AVALANCHE_EXPLORER,
                },
            },
            {
                network: "boba",
                urls: {
                    apiURL: BOBA_EXPLORER_API,
                    browserURL: BOBA_EXPLORER_API
                }
            },
            {
                network: "moonriver",
                chainId: 1285,
                urls: {
                    apiURL: MOONRIVER_EXPLORER_API,
                    browserURL: MOONRIVER_EXPLORER,
                },
            },
            {
                network: "moonbeam",
                chainId: 1284,
                urls: {
                    apiURL: MOONBEAM_EXPLORER_API,
                    browserURL: MOONBEAM_EXPLORER,
                },
            },
        ],
    },
};

config.networks = mapValues(config.networks, (n, k) => {
    if (k === "anvil") {
        //Add local accounts, funding is done in later stage using anvil pkey
        return { ...n, ...localNetwork }
    } else if (k === "hardhat") {
        //Add local accounts, funding is done using config
        const START_BALANCE = ethers.utils.parseUnits("10", "ether").toString();
        const accounts = [
            { balance: START_BALANCE, privateKey: localNetwork.accounts[0] },
            { balance: START_BALANCE, privateKey: localNetwork.accounts[1] },
            { balance: START_BALANCE, privateKey: localNetwork.accounts[2] }
        ];
        return { ...n, from: localNetwork.from, accounts };
    } else {
        //Public network
        return { ...n, ...publicNetwork }
    }
}) as any;

export default config;
