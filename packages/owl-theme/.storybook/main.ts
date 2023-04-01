//@ts-nocheck
//NodeJS Polyfills
const defaultConfig = require('@owlprotocol/vite-config').config;
const path = require('path');
const mergeConfig = require('vite').mergeConfig

module.exports = {
    framework: "@storybook/react",
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    core: {
        builder: "@storybook/builder-vite"
    },
    features: {
        storyStoreV7: true,
        interactionsDebugger: true,
    },
    async viteFinal(config, { configType }) {
        //Remove React plugin, already included in default storybook builder config
        defaultConfig.plugins = defaultConfig.plugins.slice(1)

        const overrideConfig = {}
        const overrideConfig2 = mergeConfig(defaultConfig, overrideConfig)
        const finalConfig = mergeConfig(config, overrideConfig2)
        return finalConfig;
    }
};
