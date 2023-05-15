import { buildLib, configs } from "@owlprotocol/esbuild-config";

const inject = [] //["./indexeddbshim-sqlite.mjs"];
configs.forEach((c) => {
    c.inject = inject;
});

await buildLib();
