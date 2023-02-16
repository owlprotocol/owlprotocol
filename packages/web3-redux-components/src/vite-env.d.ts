/// <reference types="vite/client" />

export interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_INFURA_API_KEY: string;
    readonly VITE_OWL_RPC: string;
    readonly VITE_IPFS_URL: string;
    readonly VITE_CORS_PROXY: string;
    readonly VITE_MAGIC_CONNECT_PK: string;
}

export interface ImportMeta {
    readonly env: ImportMetaEnv;
}
