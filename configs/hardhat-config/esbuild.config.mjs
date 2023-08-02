import {
    buildLib,
    cjsLibConfig,
    esmLibConfig
} from '@owlprotocol/esbuild-config';

cjsLibConfig.platform = 'node'
cjsLibConfig.outdir = 'lib'
cjsLibConfig.outExtension = { '.js': '.cjs' }
esmLibConfig.platform = 'node'
esmLibConfig.outdir = 'lib'
esmLibConfig.outExtension = { '.js': '.mjs' }

await buildLib();
