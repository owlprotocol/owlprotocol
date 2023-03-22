import yargs from 'yargs';
import path from 'path';
import fs from 'fs';
import check from 'check-types';

export type Argv = yargs.ArgumentsCamelCase & {
    collectionJS?: string;
    numItems?: number;
    projectFolder?: string;
    outputFolder?: string;
    itemsFolder?: string;
};

/**
 * Get Project Folder
 *
 * Creates the outputFolder if it does not exist
 *
 * @param argv - requires argv.collectionJS, we use this folder as the base
 * @param subFolder - OPTIONAL - overrides the outputFolder, and must already exist
 */
export const getProjectFolder = (argv: Argv): string => {
    if (!check.string(argv.projectFolder)) {
        console.error(`getProjectFolder - project folder required, but not passed in`);
        process.exit();
    }

    if (argv.projectFolder.substring(0, 1) === '/' || argv.projectFolder.substring(0, 1) === '\\') {
        console.error(
            `getProjectFolder - project folder cannot be an absolute path - passed in: ${argv.projectFolder}`,
        );
        process.exit();
    }

    const projectFolder = path.resolve(argv.projectFolder);

    if (!fs.existsSync(projectFolder)) {
        fs.mkdirSync(projectFolder, { recursive: true });
    }

    return projectFolder;
};

/**
 * Simple wrapper to create output folder if it does not exist
 *
 * - Also respects an "overrideOutputFolder" option
 */
export const getProjectSubfolder = (argv: Argv, subfolder: string) => {
    let projectSubfolder;

    if (argv.outputFolder) {
        // override if passed in
        projectSubfolder = argv.outputFolder;
        if (!fs.existsSync(projectSubfolder!)) {
            console.error(`Requested output folder ${projectSubfolder} not found - required`);
            process.exit();
        }
    } else {
        const projectFolder = getProjectFolder(argv);

        projectSubfolder = path.resolve(projectFolder, subfolder);
        console.debug(`getProjectSubfolder ${projectSubfolder}`);
        if (!fs.existsSync(projectSubfolder)) {
            fs.mkdirSync(projectSubfolder, { recursive: true });
        }
    }
    return projectSubfolder;
};

/**
 * TODO: it's not obvious that we use the generated JS, perhaps use ts-node or make this more foolproof
 * @param projectFolder
 * @param collectionJS
 */
export const importCollectionClass = async (projectFolder: string, collectionJS: string): Promise<{ default: any }> => {
    console.debug(projectFolder, collectionJS);
    return await import(path.join(process.cwd(), projectFolder, collectionJS));
};
