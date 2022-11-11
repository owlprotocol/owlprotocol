//NodeJS Polyfills
import { config as defaultConfig } from '@owlprotocol/vite-config';
import { mergeConfig } from 'vite';
import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

export const storybookMainConfig = {
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
        //Remove React plugin
        defaultConfig.plugins = defaultConfig.plugins.slice(1)

        const overrideConfig = {
            resolve: {
                alias: {
                },
            },
            build: {
                resolve: {
                },
            }
        }
        const overrideConfig2 = mergeConfig(defaultConfig, overrideConfig)
        const finalConfig = mergeConfig(config, overrideConfig2)
        return finalConfig;
    }
};

export const storybookSetConfig = () => {
    addons.setConfig({
        isFullscreen: false,
        showNav: true,
        showPanel: true,
        panelPosition: 'right',
        enableShortcuts: true,
        isToolshown: true,
        theme: themes.dark,
        selectedPanel: undefined,
        initialActive: 'sidebar',
        sidebar: {
            showRoots: true,
            collapsedRoots: ['other'],
        },
        toolbar: {
            title: {
                hidden: false,
            },
            zoom: {
                hidden: false,
            },
            eject: {
                hidden: false,
            },
            copy: {
                hidden: false,
            },
            fullscreen: {
                hidden: false,
            },
        },
    });
}
