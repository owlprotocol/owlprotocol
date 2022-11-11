# Shared Configs
Shared configs for various build systems used by Owl Protocol.
* ESBuild: ESM Bundler
* ESLint: Linting
* StorybookJS: UI Component prototyping
* Vite: UI ESM Bundler with HMR

## ESBuild
```ts
//TODO: Explain usage
```

## ESLint
```ts
//TODO: Explain usage
```

## Storybook
Our Storybook config is designed to easily configure Storybook to use the vite builder and our existing vite config, along with some additional necessary polyfills.
It includes a default for the `main.ts` and `manager.ts` Storybook configuration files.
```ts
//TODO: Explain usage
```

## Vite
To use our shared vite config, at the root of your React project, update the `vite.config.ts` to use our config as a base and override depending on your requirements.

```ts
//vite.config.ts
import { mergeConfig } from 'vite';
import { config } from '@owlprotocol/vite-config';

const overrideConfig = {
    //Additional overrides
};
const finalConfig = mergeConfig(config, overrideConfig);

// https://vitejs.dev/config/
export default finalConfig;
```

### Vite Component Lib
Note that our config is designed for building a web app bundle and **not** a UI Library. Overrides **will** be required to bundle a UI Library.

```ts
//vite.config.ts (component lib)
import { mergeConfig } from 'vite';
import { config } from '@owlprotocol/vite-config';

const formats = {
    es: 'mjs',
    cjs: 'cjs',
};
const build = {
    lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'MyLibrary',
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
const overrideConfig = {
    build,
};

const finalConfig = mergeConfig(config, overrideConfig);

export default finalConfig;

```
