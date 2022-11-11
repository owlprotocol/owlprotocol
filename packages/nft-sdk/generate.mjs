import * as url from 'node:url';
import { exec } from 'child_process';
import { promisify } from 'util';

/*
//Unable to run programmatically https://github.com/vega/ts-json-schema-generator/issues/1303
function main() {
    // @type {import('ts-json-schema-generator/dist/src/Config').Config}
const config = {
    path: "./types/NFTCollection.ts",
    type: "*", // Or <type-name> if you want to generate schema for that one type only
};

const output_path = "./schemas/schemas.json";

const schema = tsj.createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema, null, 2);

writeFile(output_path, schemaString, (err) => {
    if (err) throw err;
});

}
*/

async function main() {
    const schemas = [
        'IPFSImageUpload.ts',
        'NFTAsset.ts',
        'NFTTrait.ts',
        'NFTCollection.ts',
        'NFTGenerativeTrait/index.ts',
        'NFTGenerativeCollection.ts',
    ];

    const promises = schemas.map((schema) => {
        const cmd = `./node_modules/.bin/ts-json-schema-generator --path src/types/${schema} > src/schemas/${schema.replace(
            '.ts',
            '.json',
        )}`;
        return promisify(exec)(cmd);
    });

    await Promise.all(promises);
}

//https://2ality.com/2022/07/nodejs-esm-main.html
/*
if (require.main === module) {
    // Main CommonJS module
    main()
}
*/

if (import.meta.url.startsWith('file:')) {
    // (A)
    const modulePath = url.fileURLToPath(import.meta.url);
    if (process.argv[1] === modulePath) {
        // (B)
        // Main ESM module
        await main();
    }
}
