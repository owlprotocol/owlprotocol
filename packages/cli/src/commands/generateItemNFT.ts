import yargs from 'yargs';
import path from 'path';
import check from 'check-types';
import lodash from 'lodash';
import fs from 'fs';
import { NFTGenerativeItemClass } from '@owlprotocol/nft-sdk';
import { Argv, getProjectSubfolder, importCollectionClass } from '../utils/pathHandlers.js';

const { map } = lodash;

let debug = false;

export const command = 'generateItemNFT <nftItemJS>';

export const describe = `Devtool - Generates the NFT Item's JS

For now this always outputs to the folder "./output/items/" relative to the projectFolder

nftItemJS - path to the NFT item file, relative from the projectFolder

e.g. node dist/index.cjs generateItemNFT items/collection-item-1.js --project=projects/example-omo



`;

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
            describe: 'Outputs debug statements',
            type: 'boolean',
        })
        .demandOption(['projectFolder']);
};

// TODO: this should have an option to import from Schema JSON
export const handler = async (argv: Argv & { nftItemJS?: string }) => {
    argvCheck(argv);

    debug = !!argv.debug || false;

    let projectFolder = argv.projectFolder!;
    const nftItemJS = argv.nftItemJS!;

    const nftItemFilename = path.parse(nftItemJS).name;

    let outputFolder = getProjectSubfolder(argv, 'output/items');

    // TODO: rename `importCollectionClass`
    const nftItemExport = await importCollectionClass(projectFolder, nftItemJS);
    const nftItem = nftItemExport.default;

    debug && console.debug(nftItem);

    fs.writeFileSync(
        path.resolve(outputFolder, `${nftItemFilename}.json`),
        JSON.stringify(nftItem.fullDnaWithChildren(), null, 2),
    );

    console.log('Done');
};

const argvCheck = (argv: Argv) => {
    if (!check.string(argv.nftItemJS) || (!check.undefined(argv.projectFolder) && !check.string(argv.projectFolder))) {
        console.error(`ERROR: Options "collectionJS" and "outputPath" must both be strings.`);
        process.exit();
    }
};
