import inquirer from "inquirer";
import { existsSync, lstatSync, readFileSync } from "fs"
import { readFile } from "fs/promises"
import pinataSDK, { PinataPinResponse } from "@pinata/sdk";
import { walkDir, asyncGeneratorToArray } from "@owlprotocol/utils";
import { PINATA_JWT } from "@owlprotocol/envvars"
import Spinnies from "spinnies"
import { clearTerminal } from "../../utils/index.js";
import { IPFSCacheDexie } from "@owlprotocol/web3-redux-2";
import { zip } from "lodash-es";


export async function ipfsPinPinataMenu(): Promise<string> {
    clearTerminal();

    const { path } = await inquirer.prompt({
        type: "input",
        name: "path",
        message: "Which file/folder would you like to pin?",
        validate: (val: string) => {
            if (!existsSync(val)) return `No file or directory at ${val}`

            const stats = lstatSync(val)
            if (!stats.isDirectory() && !stats.isFile()) {
                return `${val} must be File or Directory`
            }

            return true
        }
    });

    const spinnies = new Spinnies();
    spinnies.add('spinner-1', { text: `Uploading ${path} to Pinata` });

    const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT });
    await pinata.testAuthentication();

    //let paths: string[] = []
    let responses: PinataPinResponse[] = []
    let contents: string[] = []
    const stats = lstatSync(path)
    if (stats.isFile()) {
        const content = readFileSync(path)
        const pin = await pinata.pinFromFS(path, {
            pinataOptions: { cidVersion: 0 },
        });
        responses = [pin]
        contents = [content.toString("base64")]
    } else if (stats.isDirectory()) {
        const pathList = await asyncGeneratorToArray(walkDir(path));
        const contentsList = await Promise.all(pathList.map(async (path) => readFile(path)))
        responses = await Promise.all(pathList.map((path) => pinata.pinFromFS(path, {
            pinataOptions: { cidVersion: 0 },
        })))
        contents = contentsList.map((b) => b.toString("base64"))
    }

    await IPFSCacheDexie.bulkAdd(zip(responses, contents).map(([r, c]) => { return { contentId: r!.IpfsHash, data: c! } }))

    spinnies.succeed('spinner-1', { text: `Uploaded ${path} to Pinata` });

    clearTerminal();
    return "/ipfs";
}
