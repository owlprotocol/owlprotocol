import { mergeConfig } from 'vite';
import { config } from '@owlprotocol/vite-config';
import { resolve } from 'path';

//Dependency aliases
const alias = {};

const formats = {
    es: 'mjs',
    cjs: 'cjs'
};
const build = {
    lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'StarterReactLib',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${formats[format]}`,
    },
    rollupOptions: {
        //Library Mode
        ...config.build.rollupOptions,
        external: [
            'react',
            'react-dom',
        ],
        output: {
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
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
