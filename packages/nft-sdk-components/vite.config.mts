import { mergeConfig } from 'vite';
import { config } from '@owlprotocol/vite-config';
import { resolve } from 'path';

//Dependency aliases
const alias = {};

const formats = {
    es: 'mjs',
    cjs: 'cjs',
};
const build = {
    lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'NFTSDKComponents',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${formats[format]}`,
    },
    rollupOptions: {
        //Library Mode
        ...config.build.rollupOptions,
        external: ['react', 'react-dom', '@chakra-ui/react', '@emotion/react', '@emotion/styled'],
        output: {
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                '@chakra-ui/react': '@chakra-ui/react',
                '@emotion/react': '@emotion/react',
                '@emotion/styled': '@emotion/styled',
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

// eslint-disable-next-line import/no-default-export
export default finalConfig;
