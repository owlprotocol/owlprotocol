import { buildLib, cjsLibConfig } from '@owlprotocol/esbuild-config';

/*
let plugin = {
    name: 'env',
    setup(build) {
        build.onResolve({ filter: /\.\/src\/artifacts.ts/, namespace: 'file' }, () => {
            return {
                path: resolve('./src/artifacts-js.ts'),
                namespace: 'file',
            };
        });
    },
};

libConfigs.map((c) => {
    c.plugins = [plugin, ...c.plugins];
});
*/

//Disabled for hardhat-deploy support
cjsLibConfig.sourcemap = false;

await buildLib();
