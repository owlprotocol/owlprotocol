import yargs from 'yargs';
import path from 'path';
import check from 'check-types';
import lodash from 'lodash';
import fs from 'fs';

import { NFTGenerativeItemClass } from '@owlprotocol/nft-sdk';

import { Argv, getProjectSubfolder, importCollectionClass } from '../utils/pathHandlers.js';

const { map } = lodash;

let debug = false;

export const command = 'generateRandomNFT <collectionJS> <numItems>';

export const describe = `Generate random instances for NFTGenerativeCollection.
Outputs to the "./output/items/" folder relative to the projectFolder.
<collectionJS> - path to the collection's JS file, relative from the projectFolder
`;

export const example = `$0 generateRandomNFT collections.js 3 --project=projects/example-omo`;
export const exampleDescription =
    'generate 3 NFT item instances of the collection at "projects/example-omo/collections.js"';

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs
        .option('projectFolder', {
            alias: 'project',
            describe: 'Root folder for the project as a relative path.',
            type: 'string',
        })
        .option('debug', {
            describe: 'Output debug statements',
            type: 'boolean',
        })
        .demandOption(['projectFolder']);
};

// TODO: this should have an option to import from JSON Schema
export const handler = async (argv: Argv & { numItems?: number }) => {
    argvCheck(argv);

    debug = !!argv.debug || false;

    let projectFolder = argv.projectFolder!;
    const collectionJS = argv.collectionJS!;

    let outputFolder = getProjectSubfolder(argv, 'output/items');

    console.log(`Generating NFTGenerativeItem Random JSON(s) for ${collectionJS} to folder: ${outputFolder}`);

    const nftGenerativeCollectionExport = await importCollectionClass(projectFolder, collectionJS);

    const collParent = nftGenerativeCollectionExport.default;
    const numItems: number = <number>argv.numItems;
    const nftItems: Array<NFTGenerativeItemClass> = Array.from({ length: numItems }, () =>
        collParent.generateInstance(),
    );

    debug && console.debug('nftItems', nftItems);

    map(nftItems, async (nftItem, i) => {
        fs.writeFileSync(
            path.resolve(outputFolder, `collection-item-${i + 1}.json`),
            JSON.stringify(nftItem.fullDnaWithChildren(), null, 2),
        );
    });

    console.log('Done');
};

const argvCheck = (argv: Argv) => {
    if (
        !check.string(argv.collectionJS) ||
        (!check.undefined(argv.projectFolder) && !check.string(argv.projectFolder))
    ) {
        console.error(`Args "collectionJS" and "projectFolder" must both be strings`);
        process.exit();
    }

    if (!check.number(argv.numItems)) {
        console.error(`Arg <numItems> is not a number, passed in value "${argv.numItems}"`);
        process.exit();
    }
};
