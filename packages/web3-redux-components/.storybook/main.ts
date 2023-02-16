//@ts-nocheck
//NodeJS Polyfills
const defaultConfig = require("@owlprotocol/vite-config").config;
const path = require("path");
const mergeConfig = require("vite").mergeConfig;

module.exports = {
    framework: "@storybook/react",
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    core: {
        builder: "@storybook/builder-vite",
    },
    features: {
        storyStoreV7: true,
        interactionsDebugger: true,
    },
    async viteFinal(config, { configType }) {
        const production = configType === "PRODUCTION";
        //Remove React plugin
        defaultConfig.plugins = defaultConfig.plugins.slice(1);

        const overrideConfig = {
            resolve: {
                alias: {
                    web3: "web3/dist/web3.min.js",
                    "ipfs-http-client": production
                        ? path.resolve(
                              "node_modules/ipfs-http-client/index.min.js"
                          )
                        : "ipfs-http-client",
                    "@remix-run/router":
                        "node_modules/@remix-run/router/dist/router.js",
                    "magic-sdk": path.resolve(
                        "node_modules/magic-sdk/dist/es/index.js"
                    ),
                    "@magic-ext/connect": path.resolve(
                        "node_modules/@magic-ext/connect/dist/es/index.js"
                    ),
                },
            },
            commonjsOptions: {
                transformMixedEsModules: false,
            },
            build: {
                resolve: {
                    "ipfs-http-client": path.resolve(
                        "node_modules/ipfs-http-client/index.min.js"
                    ),
                    "magic-sdk": path.resolve(
                        "node_modules/magic-sdk/dist/es/index.js"
                    ),
                    "@magic-ext/connect": path.resolve(
                        "node_modules/@magic-ext/connect/dist/es/index.js"
                    ),
                },
            },
            optimizeDeps: {
                include: ["magic-sdk", "@magic-ext/connect"],
                exclude: ["@magic-sdk/commons"],
            },
        };
        const overrideConfig2 = mergeConfig(defaultConfig, overrideConfig);
        const finalConfig = mergeConfig(config, overrideConfig2);

        return finalConfig;
    },
};
