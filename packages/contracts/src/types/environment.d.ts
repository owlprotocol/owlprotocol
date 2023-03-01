declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PRIVATE_KEY_ANVIL: string;
            PRIVATE_KEY_0: string;
            PRIVATE_KEY_1: string;
            PUBLIC_ADDRESS_0: string;
            PUBLIC_ADDRESS_1: string;
        }
    }
}

export { }
