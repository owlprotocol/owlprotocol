import { buildLib, configs } from '@owlprotocol/esbuild-config';

const inject = ['./react-shim.mjs'];
configs.forEach((c) => {
    c.inject = inject;
});

await buildLib();
