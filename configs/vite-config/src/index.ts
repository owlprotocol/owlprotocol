import { defineConfig, Plugin, UserConfig } from 'vite';

//ESBuild Plugins
//https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2
import { NodeGlobalsPolyfillPlugin as esbuildGlobals } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin as esbuildPolyfills } from '@esbuild-plugins/node-modules-polyfill';

//Rollup Plugins
import rollupPolyfills from 'rollup-plugin-node-polyfills'
import rollupInject from '@rollup/plugin-inject';

//Vite Plugins
import ReactPlugin from '@vitejs/plugin-react';
import CheckerPlugin from 'vite-plugin-checker';
import SVGRPlugin from 'vite-plugin-svgr';
import DTSPlugin from 'vite-dts';

const NODE_ENV = process.env.NODE_ENV ?? 'development' /// process.env.MODE
export const define = {
    //patch ipfs utils
    'globalThis.process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    //pathc @storybook/theming
    'process.env.FORCE_SIMILAR_INSTEAD_OF_MAP': JSON.stringify(false)
}

export const plugins = [
    ReactPlugin(),
    SVGRPlugin({
        svgrOptions: {
            icon: '100%',
        },
    }),
    DTSPlugin(),
    CheckerPlugin({
        typescript: true, //TODO: Disable for now
        overlay: true,
        /*
        eslint: {
            lintCommand: 'eslint .  --ext .ts,.tsx',
        },
        */
    })
] as Plugin[]

export const esbuildPlugins = [
    esbuildGlobals({
        process: true,
        buffer: true,
    }),
    esbuildPolyfills()
] as any[]

export const rollupPlugins = [
    rollupPolyfills(),
    rollupInject({
        Buffer: ['buffer', 'Buffer'],
    })
] as any[]

export const alias = {
    buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    events: 'rollup-plugin-node-polyfills/polyfills/events',
    http: 'rollup-plugin-node-polyfills/polyfills/http',
    https: 'rollup-plugin-node-polyfills/polyfills/http',
    process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
    stream: 'rollup-plugin-node-polyfills/polyfills/stream',
    util: 'rollup-plugin-node-polyfills/polyfills/util',
    querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
    url: 'rollup-plugin-node-polyfills/polyfills/url',
    path: 'rollup-plugin-node-polyfills/polyfills/path',
    'string_decoder/': 'rollup-plugin-node-polyfills/polyfills/string-decoder',
    string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
    punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
}

export const manualChunks = (id) => {
    const vendors = [
        { match: /web3@/, chunk: 'web3' },
        { match: /@web3-react/, chunk: 'web3-react' },
        { match: /@walletconnect/, chunk: 'walletconnect' },
        { match: /@fortawesome/, chunk: '@fortawesome' },
        { match: /lodash@/, chunck: 'lodash' },
        { match: /ipfs-http-client@/, chunk: 'ipfs-http-client' },
        /*
        { match: /react@/, chunk: 'react' },
        { match: /react-dom@/, chunk: 'react-dom' },
        { match: /@emotion/, chunk: 'emotion' },
        { match: /@chakra-ui/, chunk: 'chakra-ui' },
        { match: /@storybook/, chunk: 'storybook' },
        */
    ]
    for (let v of vendors) {
        if (id.match(v.match)) return v.chunk;
    }

    if (id.includes('node_modules')) {
        return 'vendor';
    }
}

export const config = defineConfig({
    define,
    plugins,
    resolve: {
        alias
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: []//esbuildPlugins
        }
    },
    build: {
        rollupOptions: {
            plugins: [],//rollupPlugins,
            output: {
                manualChunks,
                inlineDynamicImports: false
            }
        }
    }
}) as UserConfig;
