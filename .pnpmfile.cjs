//WARNING: Editing this requires removing the pnpm-lock.yaml and running `pnpm run clean:node_modules` beforehand
module.exports = {
    hooks: {
        readPackage(pkg, context) {

            //Drop dependencies, uneeded or overriden globally
            const depsDrop = [
                "winston",
                "react",
                "react-dom",
                "@types/react",
                "@types/react-dom",
                "@algolia/client-search",
                "@docusaurus/core",
                "@docusaurus/preset-classic",
                "@docusaurus/theme-common",
                "@docusaurus/theme-live-codeblock"
            ]
            /*

            // Exception deps to not drop
            const exceptions = {
                // @opengsn/dev needs winston or @owlprotocol/contracts wont run tests
                "@opengsn/dev": ["winston"],
                "@opengsn/relay": ["winston"],
                "@opengsn/cli": ["winston"],
            }

            const dropExceptions = (deps, exceptions) => {
                if (exceptions !== undefined)
                    return deps.filter((v) => !exceptions.includes(v));
                return deps;
            }
            */

            if (!pkg.name?.startsWith('@owlprotocol')) {
                //const removable = dropExceptions(deps, exceptions[pkg.name]);
                depsDrop.forEach((p) => delete pkg.dependencies[p]);
                depsDrop.forEach((p) => delete pkg.devDependencies[p]);
            }

            //Global version overrides
            const depsOverrides = {
                "electron": "^11.0.0",
                "sqlite3": "^5.0.11",
                "typescript": "4.9.5",
                "luxon": "2.5.0",
                "web3": "1.8.0",
                "web3-core": "1.8.0",
                "web3-core-subscriptions": "1.8.0",
                "web3-eth": "1.8.0",
                "web3-eth-abi": "1.8.0",
                "web3-eth-contract": "1.8.0",
                "web3-utils": "1.8.0",
                "web3-providers-http": "1.8.0",
                "@types/react": "^17.0.40",
                "@types/react-dom": "^17.0.13",
                "@types/react-redux": "^7.1.24",
                "react": "^17.0.2",
                "react-redux": "^7.2.6",
                "redux": "4.1.2",
                "redux-saga": "1.2.1",
                "typed-redux-saga": "1.5.0",
                "lodash": "4.17.21",
                "lodash-es": "4.17.21",
                "@types/lodash": "4.14.188",
                "@types/lodash-es": "4.17.6",
                "typechain": "5.2.0",
                "@typechain/ethers-v5": "7.2.0",
                "@typechain/web3-v1": "3.1.0",
                "ethers": "5.7.2",
                "hardhat": "2.12.0"
            };

            Object.entries(depsOverrides).map(([name, version]) => {
                if (pkg.dependencies[name]) pkg.dependencies[name] = version;
                if (pkg.devDependencies[name]) pkg.devDependencies[name] = version;
                if (pkg.peerDependencies[name]) pkg.peerDependencies[name] = version;
            })

            return pkg;
        },
        afterAllResolved(lockfile) {
            return lockfile;
        }
    }
}
