// import { buildLib } from '@owlprotocol/esbuild-config';

// await buildLib();
import { buildAll, distConfigs } from '@owlprotocol/esbuild-config';

distConfigs.forEach((c) => {
    c.platform = 'node';
    c.plugins = [];
})

await buildAll();
