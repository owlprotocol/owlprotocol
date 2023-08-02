import inquirer from "inquirer";
import { existsSync, lstatSync, readFileSync } from "fs"
import { sleep } from "@owlprotocol/utils";
import { INFURA_IPFS_PROJECT_ID, INFURA_IPFS_PROJECT_SECRET } from "@owlprotocol/envvars"
import Spinnies from "spinnies"
import { clearTerminal } from "../../utils/index.js";
import { create as createIPFSClient } from "ipfs-http-client"

export async function ipfsPinMenu(): Promise<string> {
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
    spinnies.add('spinner-1', { text: `Uploading ${path} to IPFS` });

    const auth = `Basic ${Buffer.from(INFURA_IPFS_PROJECT_ID + ":" + INFURA_IPFS_PROJECT_SECRET).toString("base64")}`;
    const client = createIPFSClient({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
            authorization: auth
        }
    })

    const cwd = process.cwd()
    const pin = await client.add({ content: readFileSync(path) }, { pin: true })
    console.debug(pin)

    await sleep(10000)

    //await IPFSCacheDexie.bulkAdd(zip(responses, contents).map(([r, c]) => { return { contentId: r!.IpfsHash, data: c! } }))

    spinnies.succeed('spinner-1', { text: `Uploaded ${path} to IPFS` });

    clearTerminal();
    return "/ipfs";
}
