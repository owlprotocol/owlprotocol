import { buildLib, cjsLibConfig } from '@owlprotocol/esbuild-config';

//Disabled for hardhat-deploy support
cjsLibConfig.sourcemap = false;

await buildLib();
