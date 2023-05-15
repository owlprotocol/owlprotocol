import { mergeConfig } from 'vite';
import { config } from '@owlprotocol/vite-config';

const overrideConfig = {
    define: {
        global: 'globalThis',
    },
    resolve: {
        alias: {
            web3: 'web3/dist/web3.min.js',
            '@remix-run/router': 'node_modules/@remix-run/router/dist/router.js',
        },
    },
    commonjsOptions: {
        transformMixedEsModules: false,
    },
    build: {
        rollupOptions: {
            external: ["fs/promises"],
        },
    }
};
const finalConfig = mergeConfig(config, overrideConfig);

// https://vitejs.dev/config/
export default finalConfig;
