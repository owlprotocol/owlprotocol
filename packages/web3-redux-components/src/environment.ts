import type { ImportMetaEnv } from "./vite-env";

let environment = {
    VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
    VITE_INFURA_API_KEY: import.meta.env.VITE_INFURA_API_KEY,
    VITE_OWL_RPC: import.meta.env.VITE_OWL_RPC,
    VITE_IPFS_URL: import.meta.env.VITE_IPFS_URL,
    VITE_CORS_PROXY: import.meta.env.VITE_CORS_PROXY,
    VITE_MAGIC_CONNECT_PK: import.meta.env.VITE_MAGIC_CONNECT_PK,
    VITE_PUBLIC_ADDRESS_0: import.meta.env.VITE_PUBLIC_ADDRESS_0.toLowerCase(),
    VITE_PUBLIC_ADDRESS_1: import.meta.env.VITE_PUBLIC_ADDRESS_1.toLowerCase()
} as ImportMetaEnv;

export const setEnvironment = (env: Partial<ImportMetaEnv>) => {
    //Merge
    environment = { ...environment, ...env };
};

export const getEnvironment = () => {
    return environment;
};
