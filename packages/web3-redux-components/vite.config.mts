import { mergeConfig } from 'vite';
import { config } from '@owlprotocol/vite-config';
import { resolve } from 'path';

const alias = {
    web3: 'web3/dist/web3.min.js',
};

const formats = {
    es: 'mjs',
    cjs: 'cjs',
    umd: 'umd.js',
};
const build = {
    lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'Web3ReduxComponentsLib',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${formats[format]}`,
    },
    rollupOptions: {
        //Library Mode
        ...config.build.rollupOptions,
        external: [
            '@chakra-ui/react',
            '@emotion/react',
            '@emotion/styled',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/react-fontawesome',
            '@ipld/dag-cbor',
            '@ipld/dag-pb',
            '@owlprotocol/web3-redux',
            '@tanstack/react-table',
            '@walletconnect/encoding',
            '@walletconnect/ethereum-provider',
            '@walletconnect/jsonrpc-http-connection',
            '@walletconnect/jsonrpc-provider',
            '@web3-react/coinbase-wallet',
            '@web3-react/core',
            '@web3-react/eip1193',
            '@web3-react/empty',
            '@web3-react/gnosis-safe',
            '@web3-react/metamask',
            '@web3-react/network',
            '@web3-react/types',
            '@web3-react/url',
            '@web3-react/walletconnect',
            'chakra-react-select',
            'classnames',
            'copy-to-clipboard',
            'ethereum-qr-code',
            'framer-motion',
            'ipfs-http-client',
            'js-base64',
            ,
            'rc-pagination',
            'react',
            'react-dom',
            'react-hook-form',
            'react-hooks-compose',
            'react-redux',
            'react-router',
            'react-router-dom',
            'redux',
            'web3',
            'lodash-es',
        ],
        output: {
            globals: {
                '@chakra-ui/react': '@chakra-ui/react',
                '@emotion/react': '@emotion/react',
                '@emotion/styled': '@emotion/styled',
                '@owlprotocol/web3-redux': '@owlprotocol/web3-redux',
                '@web3-react/abstract-connector': '@web3-react/abstract-connector',
                '@web3-react/metamask': '@web3-react/metamask',
                '@web3-react/core': '@web3-react/core',
                '@web3-react/injected-connector': '@web3-react/injected-connector',
                '@fortawesome/react-fontawesome': '@fortawesome/react-fontawesome',
                '@fortawesome/free-solid-svg-icons': '@fortawesome/free-solid-svg-icons',
                '@tanstack/react-table': '@tanstack/react-table',
                classnames: 'classnames',
                'copy-to-clipboard': 'copy-to-clipboard',
                'ethereum-qr-code': 'ethereum-qr-code',
                'framer-motion': 'framer-motion',
                'js-base64': 'js-base64',
                'rc-pagination': 'rc-pagination',
                'react-hooks-compose': 'react-hooks-compose',
                'react-redux': 'react-redux',
                'react-router-dom': 'react-router-dom',
                web3: 'web3',
                react: 'React',
                'react-dom': 'ReactDOM',
                'lodash-es': 'lodash-es',
                'lodash': 'lodash'
            },
        },
    },
};
const configOverrides = {
    resolve: {
        alias,
    },
    build,
};

const finalConfig = mergeConfig(config, configOverrides);

export default finalConfig;
