/**
 * Environment variables. We use a hybrid solution that supports both `import.meta.env` for static
 * replacement used by client bundlers (Vite, Webpack...) and `process.env` for NodeJS libraries.
 * @module Environment
 */
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NODE_ENV?: 'development' | 'production' | 'test';
            readonly LOG_LEVEL?: "trace" | "debug" | "info" | "warn" | "error";
            readonly TITLE?: string;
            readonly CORS_PROXY?: string;
            readonly BEACON_ADMIN?: string;
            readonly PRIVATE_KEY_ANVIL?: string;
            readonly PRIVATE_KEY_0?: string;
            readonly PRIVATE_KEY_1?: string;
            readonly PRIVATE_KEY_FACTORY_DEPLOYER?: string;
            readonly PRIVATE_KEY_0_LOCAL?: string;
            readonly PRIVATE_KEY_1_LOCAL?: string;
            readonly PUBLIC_ADDRESS_0?: string;
            readonly PUBLIC_ADDRESS_1?: string;
            readonly PUBLIC_ADDRESS_FACTORY_DEPLOYER?: string;
            readonly PUBLIC_ADDRESS_0_LOCAL?: string;
            readonly PUBLIC_ADDRESS_1_LOCAL?: string;
            readonly PINATA_JWT?: string;
            readonly INFURA_API_KEY?: string
            readonly INFURA_IPFS_PROJECT_ID?: string;
            readonly INFURA_IPFS_PROJECT_SECRET?: string;
            readonly IPFS_URL?: string;
            readonly BYTE4_URL?: string;
            readonly ETHERSCAN_API_KEY?: string;
            readonly LOG_REDUX_ACTIONS?: string;
            readonly GANACHE_RPC?: string;
            readonly GANACHE_WS?: string;
            readonly ANVIL_RPC?: string;
            readonly ANVIL_WS?: string;
            readonly MAINNET_RPC?: string;
            readonly MAINNET_WS?: string;
            readonly MAINNET_EXPLORER?: string;
            readonly MAINNET_EXPLORER_API?: string;
            readonly MAINNET_EXPLORER_API_KEY?: string;
            readonly GOERLI_RPC?: string;
            readonly GOERLI_WS?: string;
            readonly GOERLI_EXPLORER?: string;
            readonly GOERLI_EXPLORER_API?: string;
            readonly GOERLI_EXPLORER_API_KEY?: string;
            readonly SEPOLIA_RPC?: string;
            readonly SEPOLIA_WS?: string;
            readonly SEPOLIA_EXPLORER?: string;
            readonly SEPOLIA_EXPLORER_API?: string;
            readonly SEPOLIA_EXPLORER_API_KEY?: string;
            readonly LINEA_RPC?: string;
            readonly LINEA_WS?: string;
            readonly LINEA_EXPLORER?: string;
            readonly LINEA_EXPLORER_API?: string;
            readonly LINEA_EXPLORER_API_KEY?: string;
            readonly LINEA_TESTNET_RPC?: string;
            readonly LINEA_TESTNET_WS?: string;
            readonly LINEA_TESTNET_EXPLORER?: string;
            readonly LINEA_TESTNET_EXPLORER_API?: string;
            readonly LINEA_TESTNET_EXPLORER_API_KEY?: string;
            readonly POLYGON_RPC?: string;
            readonly POLYGON_WS?: string;
            readonly POLYGON_EXPLORER?: string;
            readonly POLYGON_EXPLORER_API?: string;
            readonly POLYGON_EXPLORER_API_KEY?: string;
            readonly POLYGON_MUMBAI_RPC?: string;
            readonly POLYGON_MUMBAI_WS?: string;
            readonly POLYGON_MUMBAI_EXPLORER?: string;
            readonly POLYGON_MUMBAI_EXPLORER_API?: string;
            readonly POLYGON_MUMBAI_EXPLORER_API_KEY?: string;
            readonly ARBITRUM_RPC?: string;
            readonly ARBITRUM_WS?: string;
            readonly ARBITRUM_EXPLORER?: string;
            readonly ARBITRUM_EXPLORER_API?: string;
            readonly ARBITRUM_EXPLORER_API_KEY?: string;
            readonly OPTIMISM_RPC?: string;
            readonly OPTIMISM_WS?: string;
            readonly OPTIMISM_EXPLORER?: string;
            readonly OPTIMISM_EXPLORER_API?: string;
            readonly OPTIMISM_EXPLORER_API_KEY?: string;
            readonly AVALANCHE_RPC?: string;
            readonly AVALANCHE_WS?: string;
            readonly AVALANCHE_EXPLORER?: string;
            readonly AVALANCHE_EXPLORER_API?: string;
            readonly AVALANCHE_EXPLORER_API_KEY?: string;
            readonly BSC_RPC?: string;
            readonly BSC_WS?: string;
            readonly BSC_EXPLORER?: string;
            readonly BSC_EXPLORER_API?: string;
            readonly BSC_EXPLORER_API_KEY?: string;
            readonly BSC_TESTNET_RPC?: string;
            readonly BSC_TESTNET_WS?: string;
            readonly BSC_TESTNET_EXPLORER?: string;
            readonly BSC_TESTNET_EXPLORER_API?: string;
            readonly BSC_TESTNET_EXPLORER_API_KEY?: string;
            readonly BSC_OP_TESTNET_RPC?: string;
            readonly BSC_OP_TESTNET_WS?: string;
            readonly BSC_OP_TESTNET_EXPLORER?: string;
            readonly BSC_OP_TESTNET_EXPLORER_API?: string;
            readonly BSC_OP_TESTNET_EXPLORER_API_KEY?: string;
            readonly GNOSIS_RPC?: string;
            readonly GNOSIS_WS?: string;
            readonly GNOSIS_EXPLORER?: string;
            readonly GNOSIS_EXPLORER_API?: string;
            readonly ETC_RPC?: string;
            readonly ETC_WS?: string;
            readonly ETC_EXPLORER?: string;
            readonly ETC_EXPLORER_API?: string;
            readonly ETC_EXPLORER_API_KEY?: string;
            readonly BOBA_RPC?: string;
            readonly BOBA_WS?: string;
            readonly BOBA_EXPLORER?: string;
            readonly BOBA_EXPLORER_API?: string;
            readonly BOBA_EXPLORER_API_KEY?: string;
            readonly MOONRIVER_RPC?: string;
            readonly MOONRIVER_WS?: string;
            readonly MOONRIVER_EXPLORER?: string;
            readonly MOONRIVER_EXPLORER_API?: string;
            readonly MOONRIVER_EXPLORER_API_KEY?: string;
            readonly MOONBEAM_RPC?: string;
            readonly MOONBEAM_WS?: string;
            readonly MOONBEAM_EXPLORER?: string;
            readonly MOONBEAM_EXPLORER_API?: string;
            readonly MOONBEAM_EXPLORER_API_KEY?: string;
            readonly README_SECRET?: string;
            readonly FIREBASE_API_KEY?: string;
            readonly FIREBASE_AUTH_DOMAIN?: string;
            readonly FIREBASE_DATABASE_URL?: string;
            readonly FIREBASE_PROJECT_ID?: string;
            readonly FIREBASE_APP_ID?: string;
            readonly FIREBASE_MEASUREMENT_ID?: string;
        }
    }
}

declare global {
    interface ImportMetaEnv {
        readonly VITE_NODE_ENV?: 'development' | 'production' | 'test'
        readonly VITE_LOG_LEVEL?: "trace" | "debug" | "info" | "warn" | "error";
        readonly VITE_TITLE?: string;
        readonly VITE_CORS_PROXY?: string;
        readonly VITE_BEACON_ADMIN?: string;
        readonly VITE_PUBLIC_ADDRESS_0?: string;
        readonly VITE_PUBLIC_ADDRESS_1?: string;
        readonly VITE_PUBLIC_ADDRESS_FACTORY_DEPLOYER?: string;
        readonly VITE_PUBLIC_ADDRESS_0_LOCAL?: string;
        readonly VITE_PUBLIC_ADDRESS_1_LOCAL?: string;
        readonly VITE_INFURA_API_KEY?: string;
        readonly VITE_INFURA_IPFS_PROJECT_ID?: string;
        readonly VITE_INFURA_IPFS_PROJECT_SECRET?: string;
        readonly VITE_PINATA_JWT?: string;
        readonly VITE_IPFS_URL?: string;
        readonly VITE_BYTE4_URL?: string;
        readonly VITE_ETHERSCAN_API_KEY?: string;
        readonly VITE_LOG_REDUX_ACTIONS?: string;
        readonly VITE_GANACHE_RPC?: string;
        readonly VITE_GANACHE_WS?: string;
        readonly VITE_ANVIL_RPC?: string
        readonly VITE_ANVIL_WS?: string
        readonly VITE_MAINNET_RPC?: string;
        readonly VITE_MAINNET_WS?: string;
        readonly VITE_MAINNET_EXPLORER?: string;
        readonly VITE_MAINNET_EXPLORER_API?: string;
        readonly VITE_MAINNET_EXPLORER_API_KEY?: string;
        readonly VITE_GOERLI_RPC?: string;
        readonly VITE_GOERLI_WS?: string;
        readonly VITE_GOERLI_EXPLORER?: string;
        readonly VITE_GOERLI_EXPLORER_API?: string;
        readonly VITE_GOERLI_EXPLORER_API_KEY?: string;
        readonly VITE_SEPOLIA_RPC?: string;
        readonly VITE_SEPOLIA_WS?: string;
        readonly VITE_SEPOLIA_EXPLORER?: string;
        readonly VITE_SEPOLIA_EXPLORER_API?: string;
        readonly VITE_SEPOLIA_EXPLORER_API_KEY?: string;
        readonly VITE_LINEA_RPC?: string;
        readonly VITE_LINEA_WS?: string;
        readonly VITE_LINEA_EXPLORER?: string;
        readonly VITE_LINEA_EXPLORER_API?: string;
        readonly VITE_LINEA_EXPLORER_API_KEY?: string;
        readonly VITE_LINEA_TESTNET_RPC?: string;
        readonly VITE_LINEA_TESTNET_WS?: string;
        readonly VITE_LINEA_TESTNET_EXPLORER?: string;
        readonly VITE_LINEA_TESTNET_EXPLORER_API?: string;
        readonly VITE_LINEA_TESTNET_EXPLORER_API_KEY?: string;
        readonly VITE_POLYGON_RPC?: string;
        readonly VITE_POLYGON_WS?: string;
        readonly VITE_POLYGON_EXPLORER?: string;
        readonly VITE_POLYGON_EXPLORER_API?: string;
        readonly VITE_POLYGON_EXPLORER_API_KEY?: string;
        readonly VITE_POLYGON_MUMBAI_RPC?: string;
        readonly VITE_POLYGON_MUMBAI_WS?: string;
        readonly VITE_POLYGON_MUMBAI_EXPLORER?: string;
        readonly VITE_POLYGON_MUMBAI_EXPLORER_API?: string;
        readonly VITE_POLYGON_MUMBAI_EXPLORER_API_KEY?: string;
        readonly VITE_ARBITRUM_RPC?: string;
        readonly VITE_ARBITRUM_WS?: string;
        readonly VITE_ARBITRUM_EXPLORER?: string;
        readonly VITE_ARBITRUM_EXPLORER_API?: string;
        readonly VITE_ARBITRUM_EXPLORER_API_KEY?: string;
        readonly VITE_OPTIMISM_RPC?: string;
        readonly VITE_OPTIMISM_WS?: string;
        readonly VITE_OPTIMISM_EXPLORER?: string;
        readonly VITE_OPTIMISM_EXPLORER_API?: string;
        readonly VITE_OPTIMISM_EXPLORER_API_KEY?: string;
        readonly VITE_AVALANCHE_RPC?: string;
        readonly VITE_AVALANCHE_WS?: string;
        readonly VITE_AVALANCHE_EXPLORER?: string;
        readonly VITE_AVALANCHE_EXPLORER_API?: string;
        readonly VITE_AVALANCHE_EXPLORER_API_KEY?: string;
        readonly VITE_BSC_RPC?: string;
        readonly VITE_BSC_WS?: string;
        readonly VITE_BSC_EXPLORER?: string;
        readonly VITE_BSC_EXPLORER_API?: string;
        readonly VITE_BSC_EXPLORER_API_KEY?: string;
        readonly VITE_BSC_TESTNET_RPC?: string;
        readonly VITE_BSC_TESTNET_WS?: string;
        readonly VITE_BSC_TESTNET_EXPLORER?: string;
        readonly VITE_BSC_TESTNET_EXPLORER_API?: string;
        readonly VITE_BSC_TESTNET_EXPLORER_API_KEY?: string;
        readonly VITE_BSC_OP_TESTNET_RPC?: string;
        readonly VITE_BSC_OP_TESTNET_WS?: string;
        readonly VITE_BSC_OP_TESTNET_EXPLORER?: string;
        readonly VITE_BSC_OP_TESTNET_EXPLORER_API?: string;
        readonly VITE_BSC_OP_TESTNET_EXPLORER_API_KEY?: string;
        readonly VITE_GNOSIS_RPC?: string;
        readonly VITE_GNOSIS_WS?: string;
        readonly VITE_GNOSIS_EXPLORER?: string;
        readonly VITE_GNOSIS_EXPLORER_API?: string;
        readonly VITE_GNOSIS_EXPLORER_API_KEY?: string;
        readonly VITE_ETC_RPC?: string;
        readonly VITE_ETC_WS?: string;
        readonly VITE_ETC_EXPLORER?: string;
        readonly VITE_ETC_EXPLORER_API?: string;
        readonly VITE_ETC_EXPLORER_API_KEY?: string;
        readonly VITE_BOBA_RPC?: string;
        readonly VITE_BOBA_WS?: string;
        readonly VITE_BOBA_EXPLORER?: string;
        readonly VITE_BOBA_EXPLORER_API?: string;
        readonly VITE_BOBA_EXPLORER_API_KEY?: string;
        readonly VITE_MOONRIVER_RPC?: string;
        readonly VITE_MOONRIVER_WS?: string;
        readonly VITE_MOONRIVER_EXPLORER?: string;
        readonly VITE_MOONRIVER_EXPLORER_API?: string;
        readonly VITE_MOONRIVER_EXPLORER_API_KEY?: string;
        readonly VITE_MOONBEAM_RPC?: string;
        readonly VITE_MOONBEAM_WS?: string;
        readonly VITE_MOONBEAM_EXPLORER?: string;
        readonly VITE_MOONBEAM_EXPLORER_API?: string;
        readonly VITE_MOONBEAM_EXPLORER_API_KEY?: string;
        readonly VITE_README_SECRET?: string;
        readonly VITE_FIREBASE_API_KEY?: string;
        readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
        readonly VITE_FIREBASE_DATABASE_URL?: string;
        readonly VITE_FIREBASE_PROJECT_ID?: string;
        readonly VITE_FIREBASE_APP_ID?: string;
        readonly VITE_FIREBASE_MEASUREMENT_ID?: string;
    }
}

const isClient = () => typeof window !== 'undefined';

import dotenv from "dotenv";
if (!isClient()) {
    dotenv.config()
}

export const NODE_ENV = (import.meta.env ? import.meta.env.VITE_NODE_ENV : process.env.NODE_ENV) ?? "development"
export const LOG_LEVEL = (import.meta.env ? import.meta.env.VITE_LOG_LEVEL : process.env.LOG_LEVEL) ?? (
    (NODE_ENV === "development" || NODE_ENV === "test") ? "debug" : "warn"
)

/** CORS Proxy Endpoint */
export const TITLE = import.meta.env ? import.meta.env.VITE_TITLE : process.env.TITLE
export const CORS_PROXY = import.meta.env ? import.meta.env.VITE_CORS_PROXY : process.env.CORS_PROXY

//Default Public Keys Hard-coded
//WARNING: These keys are insecure and are meant for ease of use in a testing environment.
//WARNING: These keys are subject to deletion in the event of abuse.
export const INFURA_API_KEY_PUBLIC = "f47a5c2dfc1f4c4385f6372fade38618"
export const INFURA_IPFS_PROJECT_ID_PUBLIC = "2OAhenU1T1fxTGyQMTTFDwdyW5p"
export const INFURA_IPFS_PROJECT_SECRET_PUBLIC = "8ffddfdc95f32ea7aa43ee3ba9d2d603"
export const PINATA_JWT_PUBLIC = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlMzMxZDljZC05MDk4LTRkOTctOGI4Zi03ODY3NTFkZTQxYjgiLCJlbWFpbCI6Imxlby52aWduYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzZmYTgwY2I2ZWRmMTkxNTVjODUiLCJzY29wZWRLZXlTZWNyZXQiOiI2YTM1MTkxYThjOTMxMzU3MGFmOGU3NGEyZWQzZmVhYWYxYjFhZDUxY2FkY2ZkNGFhZTc1YjNjMmQ0YzQwMWI3IiwiaWF0IjoxNjgxMDk1ODM3fQ.As9jjfv7BoPF9pTY_Lqj67iMWZXp9EIoGs50zcXaF5Y"
export const BEACON_ADMIN_PUBLIC = "0xad839Bc20a349b2502468c9d6ba47531f435491f"

export const MAINNET_EXPLORER_API_KEY_PUBLIC = "BG78ZBIAH64QWA748MMNVVZEHW13JR4Z6I"
export const GOERLI_EXPLORER_API_KEY_PUBLIC = "BG78ZBIAH64QWA748MMNVVZEHW13JR4Z6I"
export const SEPOLIA_EXPLORER_API_KEY_PUBLIC = "BG78ZBIAH64QWA748MMNVVZEHW13JR4Z6I"
export const LINEA_EXPLORER_API_KEY_PUBLIC = ""
export const LINEA_TESTNET_EXPLORER_API_KEY_PUBLIC = ""
export const POLYGON_EXPLORER_API_KEY_PUBLIC = "R6G9K1EKZGBYYG528576GS5A6J4YF1WS6I"
export const POLYGON_MUMBAI_EXPLORER_API_KEY_PUBLIC = "R6G9K1EKZGBYYG528576GS5A6J4YF1WS6I"
export const BSC_EXPLORER_API_KEY_PUBLIC = "9TRND69HZABV4HU73SPTECP72S94Q8K5B7"
export const BSC_TESTNET_EXPLORER_API_KEY_PUBLIC = "9TRND69HZABV4HU73SPTECP72S94Q8K5B7"

//Admin address for beacons used by proxies
export const BEACON_ADMIN = (import.meta.env ? import.meta.env.VITE_BEACON_ADMIN : process.env.BEACON_ADMIN) ?? BEACON_ADMIN_PUBLIC
//Private keys for programmatic deployment (NodeJS only)
//Default anvil private key, used as source of funds in local development
export const PRIVATE_KEY_ANVIL = process.env.PRIVATE_KEY_ANVIL ?? "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
//Keys used in public environments (mainnets & public testnets)
export const PRIVATE_KEY_0 = process.env.PRIVATE_KEY_0;
export const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1;
export const PRIVATE_KEY_FACTORY_DEPLOYER = process.env.PRIVATE_KEY_FACTORY_DEPLOYER;
export const PUBLIC_ADDRESS_0 = (import.meta.env ? import.meta.env.VITE_PUBLIC_ADDRESS_0 : process.env.PUBLIC_ADDRESS_0) ?? "0x27a89D7D6ECd35aDF1799F995d958954b65D46bD";
export const PUBLIC_ADDRESS_1 = (import.meta.env ? import.meta.env.VITE_PUBLIC_ADDRESS_1 : process.env.PUBLIC_ADDRESS_1) ?? "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF";
//Used to deploy ERC1167ProxyFactory, for local development, use pre-signed transactions
export const PUBLIC_ADDRESS_FACTORY_DEPLOYER = (import.meta.env ? import.meta.env.VITE_PUBLIC_ADDRESS_FACTORY_DEPLOYER : process.env.VITE_PUBLIC_ADDRESS_FACTORY_DEPLOYER) ?? "0x9E6e5DfD101CF9a3f063D396Bbc92F67940cae4a";
//Keys used in local dev environments (hardhat / anvil).
//DO NOT USE IN PRODUCTION (INCLUDING TESTNETS)
export const PRIVATE_KEY_0_LOCAL = process.env.PRIVATE_KEY_0_LOCAL ?? "0x0000000000000000000000000000000000000000000000000000000000000001";
export const PRIVATE_KEY_1_LOCAL = process.env.PRIVATE_KEY_1_LOCAL ?? "0x0000000000000000000000000000000000000000000000000000000000000002";
export const PUBLIC_ADDRESS_0_LOCAL = (import.meta.env ? import.meta.env.VITE_PUBLIC_ADDRESS_0_LOCAL : process.env.PUBLIC_ADDRESS_0_LOCAL) ?? "0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf";
export const PUBLIC_ADDRESS_1_LOCAL = (import.meta.env ? import.meta.env.VITE_PUBLIC_ADDRESS_1_LOCAL : process.env.PUBLIC_ADDRESS_1_LOCAL) ?? "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF";
//defaults to address(privateKey(0x...3))
/**
 * Infura API Project Id.
 * Used to defive default Infura connection uri. */
//Default "Public" Infura Key
export const INFURA_API_KEY = (import.meta.env ? import.meta.env.VITE_INFURA_API_KEY : process.env.INFURA_API_KEY) ?? INFURA_API_KEY_PUBLIC
//Infura uses Basic Auth for IPFS
//https://infura.io/docs/ipfs#section/Getting-Started/Create-your-Infura-IPFS-project
//TODO: Add basic auth support
/** Infura Project Id for IPFS API */
//Default "Public" Infura Key
export const INFURA_IPFS_PROJECT_ID = (import.meta.env ? import.meta.env.VITE_INFURA_IPFS_PROJECT_ID : process.env.INFURA_IPFS_PROJECT_ID) ?? INFURA_IPFS_PROJECT_ID_PUBLIC
/** Infura Basic Auth for IPFS */
//Default "Public" Infura Key
export const INFURA_IPFS_PROJECT_SECRET = (import.meta.env ? import.meta.env.VITE_INFURA_IPFS_PROJECT_SECRET : process.env.INFURA_IPFS_PROJECT_SECRET) ?? INFURA_IPFS_PROJECT_SECRET_PUBLIC
export const PINATA_JWT = (import.meta.env ? import.meta.env.VITE_PINATA_JWT : process.env.PINATA_JWT) ?? PINATA_JWT_PUBLIC;

/** Etherscan API Key */
export const ETHERSCAN_API_KEY = import.meta.env ? import.meta.env.VITE_ETHERSCAN_API_KEY : process.env.ETHERSCAN_API_KEY
export const LOG_REDUX_ACTIONS = import.meta.env ? import.meta.env.VITE_LOG_REDUX_ACTIONS : process.env.LOG_REDUX_ACTIONS

/** Local Ganache Blockchain */
export const GANACHE_RPC = (import.meta.env ? import.meta.env.VITE_GANACHE_RPC : process.env.GANACHE_RPC) ?? "http://localhost:8545"
export const GANACHE_WS = (import.meta.env ? import.meta.env.VITE_GANACHE_WS : process.env.GANACHE_WS) ?? "ws://localhost:8545"
export const ANVIL_RPC = (import.meta.env ? import.meta.env.VITE_ANVIL_RPC : process.env.ANVIL_RPC) ?? "http://localhost:8545"
export const ANVIL_WS = (import.meta.env ? import.meta.env.VITE_ANVIL_WS : process.env.ANVIL_WS) ?? "ws://localhost:8545"

/** Ethereum Mainnet Blockchain */
export const MAINNET_RPC = (import.meta.env ? import.meta.env.VITE_MAINNET_RPC : process.env.MAINNET_RPC) ?? `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
export const MAINNET_WS = (import.meta.env ? import.meta.env.VITE_MAINNET_WS : process.env.MAINNET_WS) ?? `wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}`
export const MAINNET_EXPLORER = (import.meta.env ? import.meta.env.VITE_MAINNET_EXPLORER : process.env.MAINNET_EXPLORER) ?? "https://etherscan.io/";
export const MAINNET_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_MAINNET_EXPLORER_API : process.env.MAINNET_EXPLORER_API) ?? "https://api.etherscan.io/api";
export const MAINNET_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_MAINNET_EXPLORER_API_KEY : process.env.MAINNET_EXPLORER_API_KEY) ?? MAINNET_EXPLORER_API_KEY_PUBLIC;

export const GOERLI_RPC = (import.meta.env ? import.meta.env.VITE_GOERLI_RPC : process.env.GOERLI_RPC) ?? `https://goerli.infura.io/v3/${INFURA_API_KEY}`
export const GOERLI_WS = (import.meta.env ? import.meta.env.VITE_GOERLI_WS : process.env.GOERLI_WS) ?? `wss://goerli.infura.io/ws/v3/${INFURA_API_KEY}`
export const GOERLI_EXPLORER = (import.meta.env ? import.meta.env.VITE_GOERLI_EXPLORER : process.env.GOERLI_EXPLORER) ?? "https://goerli.etherscan.io/";
export const GOERLI_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_GOERLI_EXPLORER_API : process.env.GOERLI_EXPLORER_API) ?? "https://api-goerli.etherscan.io/api";
export const GOERLI_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_GOERLI_EXPLORER_API_KEY : process.env.GOERLI_EXPLORER_API_KEY) ?? GOERLI_EXPLORER_API_KEY_PUBLIC;

export const SEPOLIA_RPC = (import.meta.env ? import.meta.env.VITE_SEPOLIA_RPC : process.env.SEPOLIA_RPC) ?? `https://sepolia.infura.io/v3/${INFURA_API_KEY}`
export const SEPOLIA_WS = (import.meta.env ? import.meta.env.VITE_SEPOLIA_WS : process.env.SEPOLIA_WS) ?? `wss://sepolia.infura.io/ws/v3/${INFURA_API_KEY}`
export const SEPOLIA_EXPLORER = (import.meta.env ? import.meta.env.VITE_SEPOLIA_EXPLORER : process.env.SEPOLIA_EXPLORER) ?? "https://sepolia.etherscan.io/";
export const SEPOLIA_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_SEPOLIA_EXPLORER_API : process.env.SEPOLIA_EXPLORER_API) ?? "https://api-sepolia.etherscan.io/api";
export const SEPOLIA_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_SEPOLIA_EXPLORER_API_KEY : process.env.SEPOLIA_EXPLORER_API_KEY) ?? SEPOLIA_EXPLORER_API_KEY_PUBLIC;

export const LINEA_RPC = (import.meta.env ? import.meta.env.VITE_LINEA_RPC : process.env.LINEA_RPC) ?? `https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}`
export const LINEA_WS = (import.meta.env ? import.meta.env.VITE_LINEA_WS : process.env.LINEA_WS) ?? `wss://linea-mainnet.infura.io/ws/v3/${INFURA_API_KEY}`
export const LINEA_EXPLORER = (import.meta.env ? import.meta.env.VITE_LINEA_EXPLORER : process.env.LINEA_EXPLORER) ?? "https://lineascan.build/";
export const LINEA_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_LINEA_EXPLORER_API : process.env.LINEA_EXPLORER_API) ?? "https://api.lineascan.build/api";
export const LINEA_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_LINEA_EXPLORER_API_KEY : process.env.LINEA_EXPLORER_API_KEY) ?? LINEA_EXPLORER_API_KEY_PUBLIC;

export const LINEA_TESTNET_RPC = (import.meta.env ? import.meta.env.VITE_LINEA_TESTNET_RPC : process.env.LINEA_TESTNET_RPC) ?? `https://linea-goerli.infura.io/v3/${INFURA_API_KEY}`
export const LINEA_TESTNET_WS = (import.meta.env ? import.meta.env.VITE_LINEA_TESTNET_WS : process.env.LINEA_TESTNET_WS) ?? `wss://linea-goerli.infura.io/ws/v3/${INFURA_API_KEY}`
export const LINEA_TESTNET_EXPLORER = (import.meta.env ? import.meta.env.VITE_LINEA_TESTNET_EXPLORER : process.env.LINEA_TESTNET_EXPLORER) ?? "https://goerli.lineascan.build/";
export const LINEA_TESTNET_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_LINEA_TESTNET_EXPLORER_API : process.env.LINEA_TESTNET_EXPLORER_API) ?? "https://api-goerli.lineascan.build/api";
export const LINEA_TESTNET_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_LINEA_TESTNET_EXPLORER_API_KEY : process.env.LINEA_TESTNET_EXPLORER_API_KEY) ?? LINEA_TESTNET_EXPLORER_API_KEY_PUBLIC;

export const POLYGON_RPC = (import.meta.env ? import.meta.env.VITE_POLYGON_RPC : process.env.POLYGON_RPC) ?? `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`
export const POLYGON_WS = import.meta.env ? import.meta.env.VITE_POLYGON_WS : process.env.POLYGON_WS ?? `wss://polygon-mainnet.infura.io/ws/v3/${INFURA_API_KEY}`
export const POLYGON_EXPLORER = import.meta.env ? import.meta.env.VITE_POLYGON_EXPLORER : process.env.POLYGON_EXPLORER ?? "https://polygonscan.com/";
export const POLYGON_EXPLORER_API = import.meta.env ? import.meta.env.VITE_POLYGON_EXPLORER_API : process.env.POLYGON_EXPLORER_API ?? "https://api.polygonscan.com/api";
export const POLYGON_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_POLYGON_EXPLORER_API_KEY : process.env.POLYGON_EXPLORER_API_KEY) ?? POLYGON_EXPLORER_API_KEY_PUBLIC;

export const POLYGON_MUMBAI_RPC = (import.meta.env ? import.meta.env.VITE_POLYGON_MUMBAI_RPC : process.env.POLYGON_MUMBAI_RPC) ?? `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`
export const POLYGON_MUMBAI_WS = (import.meta.env ? import.meta.env.VITE_POLYGON_MUMBAI_WS : process.env.POLYGON_MUMBAI_WS) ?? `wss://polygon-mumbai.infura.io/ws/v3/${INFURA_API_KEY}`
export const POLYGON_MUMBAI_EXPLORER = (import.meta.env ? import.meta.env.VITE_POLYGON_MUMBAI_EXPLORER : process.env.POLYGON_MUMBAI_EXPLORER) ?? "https://testnet.polygonscan.com/";
export const POLYGON_MUMBAI_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_POLYGON_MUMBAI_EXPLORER_API : process.env.POLYGON_MUMBAI_EXPLORER_API) ?? "https://api-testnet.polygonscan.com/api";
export const POLYGON_MUMBAI_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_POLYGON_MUMBAI_EXPLORER_API_KEY : process.env.POLYGON_MUMBAI_EXPLORER_API_KEY) ?? POLYGON_MUMBAI_EXPLORER_API_KEY_PUBLIC;

export const ARBITRUM_RPC = (import.meta.env ? import.meta.env.VITE_ARBITRUM_RPC : process.env.ARBITRUM_RPC) ?? `https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}`
export const ARBITRUM_WS = (import.meta.env ? import.meta.env.VITE_ARBITRUM_WS : process.env.ARBITRUM_WS) ?? `wss://arbitrum-mainnet.infura.io/ws/v3/${INFURA_API_KEY}`
export const ARBITRUM_EXPLORER = (import.meta.env ? import.meta.env.VITE_ARBITRUM_EXPLORER : process.env.ARBITRUM_EXPLORER) ?? "https://arbiscan.io/";
export const ARBITRUM_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_ARBITRUM_EXPLORER_API : process.env.ARBITRUM_EXPLORER_API) ?? "https://api.arbiscan.io/api";
export const ARBITRUM_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_ARBITRUM_EXPLORER_API_KEY : process.env.ARBITRUM_EXPLORER_API_KEY);

export const OPTIMISM_RPC = (import.meta.env ? import.meta.env.VITE_OPTIMISM_RPC : process.env.OPTIMISM_RPC) ?? `https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`
export const OPTIMISM_WS = (import.meta.env ? import.meta.env.VITE_OPTIMISM_WS : process.env.OPTIMISM_WS) ?? `wss://optimism-mainnet.infura.io/ws/v3/${INFURA_API_KEY}`
export const OPTIMISM_EXPLORER = (import.meta.env ? import.meta.env.VITE_OPTIMISM_EXPLORER : process.env.OPTIMISM_EXPLORER) ?? "https://optimistic.etherscan.io/";
export const OPTIMISM_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_OPTIMISM_EXPLORER_API : process.env.OPTIMISM_EXPLORER_API) ?? "https://api-optimistic.etherscan.io/api";
export const OPTIMISM_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_OPTIMISM_EXPLORER_API_KEY : process.env.OPTIMISM_EXPLORER_API_KEY);

export const AVALANCHE_RPC = (import.meta.env ? import.meta.env.VITE_AVALANCHE_RPC : process.env.AVALANCHE_RPC) ?? "https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc"
export const AVALANCHE_WS = import.meta.env ? import.meta.env.VITE_AVALANCHE_WS : process.env.AVALANCHE_WS
export const AVALANCHE_EXPLORER = (import.meta.env ? import.meta.env.VITE_AVALANCHE_EXPLORER : process.env.AVALANCHE_EXPLORER) ?? "https://snowtrace.io";
export const AVALANCHE_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_AVALANCHE_EXPLORER_API : process.env.AVALANCHE_EXPLORER_API) ?? "https://api.snowtrace.io/api";
export const AVALANCHE_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_AVALANCHE_EXPLORER_API_KEY : process.env.AVALANCHE_EXPLORER_API_KEY);

export const BSC_RPC = (import.meta.env ? import.meta.env.VITE_BSC_RPC : process.env.BSC_RPC) ?? "https://rpc.ankr.com/bsc"
export const BSC_WS = import.meta.env ? import.meta.env.VITE_BSC_WS : process.env.BSC_WS
export const BSC_EXPLORER = (import.meta.env ? import.meta.env.VITE_BSC_EXPLORER : process.env.BSC_EXPLORER) ?? "https://bscscan.com";
export const BSC_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_BSC_EXPLORER_API : process.env.BSC_EXPLORER_API) ?? "https://api.bscscan.com/api";
export const BSC_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_BSC_EXPLORER_API_KEY : process.env.BSC_EXPLORER_API_KEY) ?? BSC_EXPLORER_API_KEY_PUBLIC;

export const BSC_TESTNET_RPC = (import.meta.env ? import.meta.env.VITE_BSC_TESTNET_RPC : process.env.BSC_TESTNET_RPC) ?? "https://data-seed-prebsc-1-s1.binance.org:8545"
export const BSC_TESTNET_WS = import.meta.env ? import.meta.env.VITE_BSC_TESTNET_WS : process.env.BSC_TESTNET_WS
export const BSC_TESTNET_EXPLORER = (import.meta.env ? import.meta.env.VITE_BSC_TESTNET_EXPLORER : process.env.BSC_TESTNET_EXPLORER) ?? "https://testnet.bscscan.com";
export const BSC_TESTNET_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_BSC_TESTNET_EXPLORER_API : process.env.BSC_TESTNET_EXPLORER_API) ?? "https://api-testnet.bscscan.com/api";
export const BSC_TESTNET_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_BSC_TESTNET_EXPLORER_API_KEY : process.env.BSC_TESTNET_EXPLORER_API_KEY) ?? BSC_TESTNET_EXPLORER_API_KEY_PUBLIC;

export const BSC_OP_TESTNET_RPC = (import.meta.env ? import.meta.env.VITE_BSC_OP_TESTNET_RPC : process.env.BSC_OP_TESTNET_RPC) ?? " https://opbnb-testnet-rpc.bnbchain.org"
export const BSC_OP_TESTNET_WS = import.meta.env ? import.meta.env.VITE_BSC_OP_TESTNET_WS : process.env.BSC_OP_TESTNET_WS
export const BSC_OP_TESTNET_EXPLORER = (import.meta.env ? import.meta.env.VITE_BSC_OP_TESTNET_EXPLORER : process.env.BSC_OP_TESTNET_EXPLORER) ?? "https://opbnbscan.com/";
export const BSC_OP_TESTNET_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_BSC_OP_TESTNET_EXPLORER_API : process.env.BSC_OP_TESTNET_EXPLORER_API);
export const BSC_OP_TESTNET_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_BSC_OP_TESTNET_EXPLORER_API_KEY : process.env.BSC_OP_TESTNET_EXPLORER_API_KEY);

export const GNOSIS_RPC = import.meta.env ? import.meta.env.VITE_GNOSIS_RPC : process.env.GNOSIS_RPC
export const GNOSIS_WS = import.meta.env ? import.meta.env.VITE_GNOSIS_WS : process.env.GNOSIS_WS
export const GNOSIS_EXPLORER = (import.meta.env ? import.meta.env.VITE_GNOSIS_EXPLORER : process.env.GNOSIS_EXPLORER) ?? "https://blockscout.com/xdai/mainnet";
export const GNOSIS_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_GNOSIS_EXPLORER_API : process.env.GNOSIS_EXPLORER_API) ?? "https://api.blockscout.com/xdai/mainnet/api";
export const GNOSIS_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_GNOSIS_EXPLORER_API_KEY : process.env.GNOSIS_EXPLORER_API_KEY);

export const ETC_RPC = import.meta.env ? import.meta.env.VITE_ETC_RPC : process.env.ETC_RPC
export const ETC_WS = import.meta.env ? import.meta.env.VITE_ETC_WS : process.env.ETC_WS
export const ETC_EXPLORER = (import.meta.env ? import.meta.env.VITE_ETC_EXPLORER : process.env.ETC_EXPLORER) ?? "https://blockscout.com/etc/mainnet";
export const ETC_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_ETC_EXPLORER_API : process.env.ETC_EXPLORER_API) ?? "https://api.blockscout.com/etc/mainnet/api";
export const ETC_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_ETC_EXPLORER_API_KEY : process.env.ETC_EXPLORER_API_KEY);

export const BOBA_RPC = (import.meta.env ? import.meta.env.VITE_BOBA_RPC : process.env.BOBA_RPC) ?? "https://lightning-replica.boba.network"
export const BOBA_WS = import.meta.env ? import.meta.env.VITE_BOBA_WS : process.env.BOBA_WS
export const BOBA_EXPLORER = (import.meta.env ? import.meta.env.VITE_BOBA_EXPLORER : process.env.BOBA_EXPLORER);
export const BOBA_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_BOBA_EXPLORER_API : process.env.BOBA_EXPLORER_API);
export const BOBA_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_BOBA_EXPLORER_API_KEY : process.env.BOBA_EXPLORER_API_KEY);

export const MOONRIVER_RPC = (import.meta.env ? import.meta.env.VITE_MOONRIVER_RPC : process.env.MOONRIVER_RPC) ?? "https://moonriver.public.blastapi.io"
export const MOONRIVER_WS = import.meta.env ? import.meta.env.VITE_MOONRIVER_WS : process.env.MOONRIVER_WS
export const MOONRIVER_EXPLORER = (import.meta.env ? import.meta.env.VITE_MOONRIVER_EXPLORER : process.env.MOONRIVER_EXPLORER) ?? "https://moonriver.moonscan.io/";
export const MOONRIVER_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_MOONRIVER_EXPLORER_API : process.env.MOONRIVER_EXPLORER_API) ?? "https://blockscout.moonriver.moonbeam.network/api";
export const MOONRIVER_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_MOONRIVER_EXPLORER_API_KEY : process.env.MOONRIVER_EXPLORER_API_KEY);

export const MOONBEAM_RPC = (import.meta.env ? import.meta.env.VITE_MOONBEAM_RPC : process.env.MOONBEAM_RPC) ?? "https://moonbeam.public.blastapi.io"
export const MOONBEAM_WS = import.meta.env ? import.meta.env.VITE_MOONBEAM_WS : process.env.MOONBEAM_WS
export const MOONBEAM_EXPLORER = (import.meta.env ? import.meta.env.VITE_MOONBEAM_EXPLORER : process.env.MOONBEAM_EXPLORER) ?? "https://moonscan.io/";
export const MOONBEAM_EXPLORER_API = (import.meta.env ? import.meta.env.VITE_MOONBEAM_EXPLORER_API : process.env.MOONBEAM_EXPLORER_API) ?? "https://api-moonbeam.moonscan.io";
export const MOONBEAM_EXPLORER_API_KEY = (import.meta.env ? import.meta.env.VITE_MOONBEAM_EXPLORER_API_KEY : process.env.MOONBEAM_EXPLORER_API_KEY);

//IPFS

/** IPFS RPC */
export const IPFS_URL = (import.meta.env ? import.meta.env.VITE_IPFS_URL : process.env.IPFS_URL) ?? "http://localhost:5001";
/** 4byte.directory API */
export const BYTE4_URL = (import.meta.env ? import.meta.env.VITE_BYTE4_URL : process.env.BYTE4_URL) ?? "https://www.4byte.directory/api/v1";

//README_SECRET
export const README_SECRET = import.meta.env ? import.meta.env.VITE_README_SECRET : process.env.README_SECRET

//FIREBASE
export const FIREBASE_API_KEY = import.meta.env ? import.meta.env.VITE_FIREBASE_API_KEY : process.env.FIREBASE_API_KEY
export const FIREBASE_AUTH_DOMAIN = import.meta.env ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN : process.env.FIREBASE_AUTH_DOMAIN
export const FIREBASE_DATABASE_URL = import.meta.env ? import.meta.env.VITE_FIREBASE_DATABASE_URL : process.env.FIREBASE_DATABASE_URL
export const FIREBASE_PROJECT_ID = import.meta.env ? import.meta.env.VITE_FIREBASE_PROJECT_ID : process.env.FIREBASE_PROJECT_ID
export const FIREBASE_APP_ID = import.meta.env ? import.meta.env.VITE_FIREBASE_APP_ID : process.env.FIREBASE_APP_ID
export const FIREBASE_MEASUREMENT_ID = import.meta.env ? import.meta.env.VITE_FIREBASE_MEASUREMENT_ID : process.env.FIREBASE_MEASUREMENT_ID
