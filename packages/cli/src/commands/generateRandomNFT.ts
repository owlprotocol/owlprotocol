import yargs from 'yargs';
import path from 'path';
import check from 'check-types';
import lodash from 'lodash';
import fs from 'fs';
import { NFTGenerativeItemClass } from '@owlprotocol/nft-sdk';
import { Argv, getProjectSubfolder, importCollectionClass } from '../utils/pathHandlers.js';

const { map } = lodash;

export const command = 'generateRandomNFT <collectionJS> <numItems>';

export const describe = `Devtool - Generates random instances for NFTGenerativeCollection

For now this always outputs to the folder "./output/items/" relative to the projectFolder

collectionJS - path to the collection's JS file, relative from the projectFolder

e.g. node dist/index.cjs generateRandomNFT collections.js 3 --project=projects/example-omo



`;

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs
        .option('projectFolder', {
            alias: 'project',
            describe: `Root folder for the project.

            This is usually relative to the compiled src, by default we use a folder called "projects".
            e.g. "projects/acme"
            `,
            type: 'string'
        })
        .demandOption(['projectFolder']);
};

// TODO: this should have an option to import from Schema JSON
export const handler = async (argv: Argv & { numItems?: number }) => {
    argvCheck(argv);

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

    const promises = map(nftItems, async (nftItem, i) => {
        await fs.writeFileSync(
            path.resolve(outputFolder, `collection-item-${i + 1}.json`),
            JSON.stringify(nftItem.fullDnaWithChildren(), null, 2),
        );
    });

    await Promise.all(promises);

    console.log('Done');
};

const argvCheck = (argv: Argv) => {
    if (!check.string(argv.collectionJS) || (!check.undefined(argv.outputFolder) && !check.string(argv.outputFolder))) {
        console.error(`Args collectionJS and outputPath must both be strings`);
        process.exit();
    }

    if (!check.undefined(argv.outputFolder) && fs.existsSync(argv.outputFolder)) {
        console.error(`Args collectionJS and outputPath must both be strings`);
    }

    if (!check.number(argv.numItems)) {
        console.error(`Arg <numItems> is not a number, passed in value "${argv.numItems}"`);
        process.exit();
    }
};
