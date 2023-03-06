import yargs from 'yargs';
import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import config from 'config';
import check from 'check-types';

const { mapValues } = lodash;

import { NFTGenerativeCollectionClass } from '@owlprotocol/nft-sdk';

import { Argv, getProjectFolder, getProjectSubfolder, importCollectionClass } from '../utils/pathHandlers.js';

export const command = 'generateSchemaJSON <collectionJS>';

export const describe = `Generates the Schema JSON from the default export of the specified JS file

The "collectionJS" file is relative to the required project folder option.

e.g. node dist/index.cjs generateSchemaJSON collections.js --project=projects/example-omo



`;

// TODO: override path options
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
        .option('outputFolder', {
            alias: ['overrideOutputFolder', 'overrideOutput'],
            describe: `Optional output folder, should be an absolute path.
            Otherwise this command defaults to a subfolder called "output" in the same folder as collectionJS`,
            type: 'string'
        })
        .demandOption(['projectFolder']);
};

export const handler = async (argv: yargs.ArgumentsCamelCase & Argv) => {
    argvCheck(argv);

    const projectFolder = argv.projectFolder!;
    const collectionJS = argv.collectionJS!;

    let outputFolder = getProjectSubfolder(argv, 'output');

    console.log(`Creating JSON(s) for ${collectionJS} to folder: ${outputFolder}`);

    const nftGenerativeCollectionClass = await importCollectionClass(projectFolder, collectionJS);

    const collParent = nftGenerativeCollectionClass.default;

    await fs.writeFileSync(path.resolve(outputFolder, 'collection-parent.json'), JSON.stringify(collParent, null, 2));

    const promises = mapValues(collParent.children, async (childColl: NFTGenerativeCollectionClass, key) => {
        await fs.writeFileSync(path.resolve(outputFolder, `collection-child-${key}.json`), JSON.stringify(childColl, null, 2));
    });

    await Promise.all(Object.values(promises));

    console.log('Done');
};

const argvCheck = (argv: Argv) => {
    if (!check.string(argv.collectionJS) || !check.string(argv.projectFolder) || (!check.undefined(argv.outputFolder) && !check.string(argv.outputFolder))) {
        console.error(`Args collectionJS, projectFolder, and outputFolder if defined, must all be strings`);
        process.exit();
    }

    if (!check.undefined(argv.outputFolder) && !fs.existsSync(argv.outputFolder)) {
        console.error(`Arg outputFolder ${argv.outputFolder} was not found in filesystem`);
    }
};
