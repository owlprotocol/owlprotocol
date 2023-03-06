import { buildAll, distConfigs } from '@owlprotocol/esbuild-config';

distConfigs.forEach((c) => {
    c.platform = 'node';
    c.plugins = [];
})

await buildAll();
