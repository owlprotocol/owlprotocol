import yargs from 'yargs';
import path from 'path';
import check from 'check-types';
import fs from 'fs';

import { Argv, getProjectSubfolder, importCollectionClass } from '../utils/pathHandlers.js';

let debug = false;

export const command = 'generateItemNFT <itemJS>';

export const describe = `Generate the NFT item's JSON Schema.
Outputs to the folder "./output/items/" relative to the "projectFolder".
<itemJS> - path to the NFT item file, relative to the "projectFolder"
`;

export const example = '$0 generateItemNFT <itemJS> --projectFolder=<projectDir>';
export const exampleDescription = 'generate the JSON Schema of the NFT item at "<projectDir>/<itemJS>"';

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs
        .option('projectFolder', {
            alias: 'project',
            describe: `Root folder for the project.

            This is usually relative to the compiled src, by default we use a folder called "projects".
            e.g. "projects/acme"
            `,
            type: 'string',
        })
        .option('debug', {
            describe: 'Output debug statements',
            type: 'boolean',
        })
        .demandOption(['projectFolder']);
};

// TODO: this should have an option to import from JSON Schema
export const handler = async (argv: Argv & { itemJS?: string }) => {
    argvCheck(argv);

    debug = !!argv.debug || false;

    let projectFolder = argv.projectFolder!;
    const itemJS = argv.itemJS!;

    const nftItemFilename = path.parse(itemJS).name;

    let outputFolder = getProjectSubfolder(argv, 'output/items');

    // TODO: rename `importCollectionClass`
    const nftItemExport = await importCollectionClass(projectFolder, itemJS);
    const nftItem = nftItemExport.default;

    debug && console.debug(nftItem);

    fs.writeFileSync(
        path.resolve(outputFolder, `${nftItemFilename}.json`),
        JSON.stringify(nftItem.fullDnaWithChildren(), null, 2),
    );

    console.log('Done');
};

const argvCheck = (argv: Argv) => {
    if (!check.string(argv.itemJS) || (!check.undefined(argv.projectFolder) && !check.string(argv.projectFolder))) {
        console.error(`ERROR: Options "collectionJS" and "outputPath" must both be strings.`);
        process.exit();
    }
};
