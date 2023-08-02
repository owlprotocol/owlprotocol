import {
    ETHERSCAN_API_KEY,
    ANVIL_RPC,
    GANACHE_RPC,
    MAINNET_RPC,
    MAINNET_EXPLORER,
    MAINNET_EXPLORER_API,
    GOERLI_RPC,
    GOERLI_EXPLORER,
    GOERLI_EXPLORER_API,
    POLYGON_RPC,
    POLYGON_EXPLORER,
    POLYGON_EXPLORER_API,
    POLYGON_MUMBAI_RPC,
    POLYGON_MUMBAI_EXPLORER,
    POLYGON_MUMBAI_EXPLORER_API,
    ARBITRUM_RPC,
    ARBITRUM_EXPLORER,
    ARBITRUM_EXPLORER_API,
    OPTIMISM_RPC,
    AVALANCHE_RPC,
    AVALANCHE_EXPLORER,
    AVALANCHE_EXPLORER_API,
    BSC_RPC,
    BSC_EXPLORER,
    BSC_EXPLORER_API,
    GNOSIS_RPC,
    GNOSIS_EXPLORER,
    GNOSIS_EXPLORER_API,
    ETC_RPC,
    ETC_EXPLORER,
    ETC_EXPLORER_API,
} from "@owlprotocol/envvars";
import { Network } from "./interface.js";

const ETHER = {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
};

const MATIC = {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
};

const xDAI = {
    name: "xDAI",
    symbol: "xDAI",
    decimals: 18,
};

const AVAX = {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18,
};

const BNB = {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
};

const KOT = {
    name: "Kotti Ether",
    symbol: "KOT",
    decimals: 18,
};

const ETC = {
    name: "Ethereum Clasic Ether",
    symbol: "ETC",
    decimals: 18,
};

export const defaultNetworks = {
    "31337": {
        networkId: "31337",
        name: "anvil",
        currency: ETHER,
        web3Rpc: ANVIL_RPC,
        syncContracts: false,
        syncBlocks: false,
        testnet: true,
    },
    "1337": {
        networkId: "1337",
        name: "ganache",
        currency: ETHER,
        web3Rpc: GANACHE_RPC,
        syncContracts: false,
        syncBlocks: false,
        testnet: true,
    },
    "1336": {
        networkId: "1336",
        name: "ganache2",
        currency: ETHER,
        web3Rpc: GANACHE_RPC,
        testnet: true,
    },
    "1": {
        networkId: "1",
        name: "Mainnet",
        currency: ETHER,
        web3Rpc: MAINNET_RPC,
        explorerUrl: MAINNET_EXPLORER,
        explorerApiUrl: MAINNET_EXPLORER_API,
        explorerApiKey: ETHERSCAN_API_KEY,
    },
    "5": {
        networkId: "5",
        name: "Goerli",
        web3Rpc: GOERLI_RPC,
        explorerUrl: GOERLI_EXPLORER,
        explorerApiUrl: GOERLI_EXPLORER_API,
        explorerApiKey: ETHERSCAN_API_KEY,
        testnet: true
    },
    "137": {
        networkId: "137",
        name: "Polygon",
        currency: MATIC,
        web3Rpc: POLYGON_RPC,
        explorerUrl: POLYGON_EXPLORER,
        explorerApiUrl: POLYGON_EXPLORER_API,
        explorerApiKey: ETHERSCAN_API_KEY,
    },
    "80001": {
        networkId: "80001",
        name: "Polygon Mumbai Testnet",
        currency: ETHER,
        web3Rpc: POLYGON_MUMBAI_RPC,
        explorerUrl: POLYGON_MUMBAI_EXPLORER,
        explorerApiUrl: POLYGON_MUMBAI_EXPLORER_API,
        explorerApiKey: ETHERSCAN_API_KEY,
        testnet: true,
    },
    "42161": {
        networkId: "42161",
        name: "Arbitrum One",
        currency: ETHER,
        web3Rpc: ARBITRUM_RPC,
        explorerUrl: ARBITRUM_EXPLORER,
        explorerApiUrl: ARBITRUM_EXPLORER_API,
        explorerApiKey: ETHERSCAN_API_KEY,
    },
    "10": {
        networkId: "10",
        name: "Optimism",
        currency: ETHER,
        web3Rpc: OPTIMISM_RPC,
    },
    "43114": {
        networkId: "43114",
        name: "Avalanche",
        currency: AVAX,
        web3Rpc: AVALANCHE_RPC,
        explorerUrls: AVALANCHE_EXPLORER,
        explorerApiUrls: AVALANCHE_EXPLORER_API,
        explorerApiKey: ETHERSCAN_API_KEY,
    },
    "56": {
        networkId: "56",
        name: "BSC Mainnet",
        currency: BNB,
        web3Rpc: BSC_RPC,
        explorerUrls: BSC_EXPLORER,
        explorerApiUrls: BSC_EXPLORER_API,
        explorerApiKey: ETHERSCAN_API_KEY,
    },
    "100": {
        networkId: "100",
        name: "Gnosis Chain",
        currency: xDAI,
        web3Rpc: GNOSIS_RPC,
        explorerUrl: GNOSIS_EXPLORER,
        explorerApiUrl: GNOSIS_EXPLORER_API,
        explorerApiKey: ETHERSCAN_API_KEY,
    },
    "61": {
        networkId: "1",
        name: "ETC Mainnet",
        currency: ETC,
        web3Rpc: ETC_RPC,
        explorerUrl: ETC_EXPLORER,
        explorerApiUrl: ETC_EXPLORER_API,
        explorerApiKey: ETHERSCAN_API_KEY,
    },
} as { [networkId: string]: Network };
