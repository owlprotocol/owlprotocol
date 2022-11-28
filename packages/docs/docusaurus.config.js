// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/vsLight"); //github
const darkCodeTheme = require("prism-react-renderer/themes/vsDark"); //dracula
const webPackPlugin = require("./docusaurusWebpack5Plugin");
require("dotenv").config();

const { announcementConfig } = require("./config/announcement");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Owl Protocol",
    tagline: "Dynamic NFT & Smart Contract Tooling",
    url: "https://owlprotocol.github.io",
    baseUrl: "/",
    deploymentBranch: "gh-pages",
    onBrokenLinks: "warn",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "owlprotocol", // Usually your GitHub org/user name.
    plugins: [
        //@ts-expect-error
        webPackPlugin,
        ["docusaurus-plugin-sass", {}],
        //https://github.com/tgreyuk/typedoc-plugin-markdown/tree/master/packages/docusaurus-plugin-typedoc
        [
            "docusaurus-plugin-typedoc",
            {
                id: "web3-redux",
                entryPoints: ["../web3-redux/src"],
                out: "./docs-web3-redux/web3-redux-reference",
                tsconfig: "../web3-redux/tsconfig.json",
                watch:
                    process.env.TYPEDOC_WATCH === "true" ||
                    process.env.TYPEDOC_WATCH === "1",
                readme: "none",
                sidebar: {
                    categoryLabel: "Reference",
                },
            },
        ],
        [
            "docusaurus-plugin-typedoc",
            {
                id: "web3-redux-components",
                entryPoints: ["../web3-redux-components/src"],
                out: "./docs-web3-redux/web3-redux-components-reference",
                tsconfig: "../web3-redux-components/tsconfig.json",
                watch:
                    process.env.TYPEDOC_WATCH === "true" ||
                    process.env.TYPEDOC_WATCH === "1",
                readme: "none",
                sidebar: {
                    categoryLabel: "Web3 Redux Components Reference",
                },
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "web3-redux",
                path: "docs-web3-redux",
                routeBasePath: "web3-redux",
                sidebarPath: require.resolve("./sidebars.js"),
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "contracts",
                path: "docs-contracts",
                routeBasePath: "contracts",
                sidebarPath: require.resolve("./sidebars.js"),
            },
        ],
    ],
    projectName: "web3-redux",
    themes: ["@docusaurus/theme-live-codeblock"],
    presets: [
        [
            "@docusaurus/preset-classic",
            //'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                theme: {
                    customCss: require.resolve("./src/css/custom.scss"),
                },
            }),
        ],
    ],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            announcementBar: announcementConfig,
            navbar: {
                title: "Owl Protocol",
                logo: {
                    alt: "Owl Protocol Logo",
                    src: "img/logo_on_purple.svg",
                },
                items: [
                    {
                        type: "doc",
                        docsPluginId: "web3-redux",
                        docId: "index",
                        position: "left",
                        label: "Web3 Redux",
                    },
                    {
                        type: "doc",
                        docsPluginId: "contracts",
                        docId: "index",
                        position: "left",
                        label: "Dynamic NFT Contracts",
                    },
                    /*
                    {
                        type: 'docsVersionDropdown',
                    },
                    */
                    {
                        href: "https://github.com/owlprotocol/owlprotocol",
                        label: "GitHub",
                        position: "right",
                    },
                ],
            },
            algolia: {
                apiKey: process.env.ALGOLIA_API_KEY || "owl",
                indexName: "owlprotocol",
                appId: process.env.ALGOLIA_APP_ID || "owl", // Optional, if you run the DocSearch crawler on your own
                algoliaOptions: {}, // Optional, if provided by Algolia
            },
            footer: {
                style: "dark",
                links: [
                    {
                        title: "Projects",
                        items: [
                            {
                                label: "Web3 Redux",
                                to: "/web3-redux",
                            },
                            {
                                label: "Dynamic NFT Contracts",
                                to: "/contracts",
                            },
                        ],
                    },
                    {
                        title: "Community",
                        items: [
                            /*
                            {
                                label: 'Discord',
                                href: 'https://discordapp.com/invite/owlprotocol',
                            },
                            */
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/owlprotocol_xyz',
                            },
                        ],
                    },
                    {
                        title: "More",
                        items: [
                            {
                                label: "GitHub",
                                href: "https://github.com/owlprotocol/owlprotocol",
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Owl Labs. Built with Docusaurus.`,
            },
            prism: {
                theme: darkCodeTheme,
                darkTheme: darkCodeTheme,
            },
            colorMode: {
                defaultMode: "dark",
                disableSwitch: false,
                respectPrefersColorScheme: true,
            },
        }),
};

module.exports = config;
