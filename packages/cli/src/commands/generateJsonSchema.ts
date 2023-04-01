import yargs from 'yargs';
import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import check from 'check-types';

import { NFTGenerativeCollectionClass } from '@owlprotocol/nft-sdk';

import { Argv, getProjectSubfolder, importCollectionClass } from '../utils/pathHandlers.js';

const { mapValues } = lodash;

export const command = 'generateJsonSchema <collectionJS>';

export const describe = `Generate the JSON Schema from the default export of the specified JS file.
The <collectionJS> file is relative to the required project folder option.
`;

export const example = `$0 generateJsonSchema collections.js --project=projects/example-omo`;
export const exampleDescription = 'generate the JSON Schema of the collection at "projects/example-omo/collections.js"';

// TODO: override path options
export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs
        .option('projectFolder', {
            alias: 'project',
            describe: 'Root folder for the project as a relative path.',
            type: 'string',
        })
        .option('outputFolder', {
            alias: ['overrideOutputFolder', 'overrideOutput'],
            describe: `Output folder, can be an absolute path.
            Default: a sub-folder "output" in the directory of <collectionJS>`,
            type: 'string',
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

    fs.writeFileSync(path.resolve(outputFolder, 'collection-parent.json'), JSON.stringify(collParent, null, 2));

    const promises = mapValues(collParent.children, async (childColl: NFTGenerativeCollectionClass, key) => {
        fs.writeFileSync(
            path.resolve(outputFolder, `collection-child-${key}.json`),
            JSON.stringify(childColl, null, 2),
        );
    });

    await Promise.all(Object.values(promises));

    console.log('Done');
};

const argvCheck = (argv: Argv) => {
    if (
        !check.string(argv.collectionJS) ||
        !check.string(argv.projectFolder) ||
        (!check.undefined(argv.outputFolder) && !check.string(argv.outputFolder))
    ) {
        console.error(`Args collectionJS, projectFolder, and outputFolder if defined, must all be strings`);
        process.exit();
    }

    if (!check.undefined(argv.outputFolder) && !fs.existsSync(argv.outputFolder)) {
        console.error(`Arg outputFolder ${argv.outputFolder} was not found in filesystem`);
    }
};
