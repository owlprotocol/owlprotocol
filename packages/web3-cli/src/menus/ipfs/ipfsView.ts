import inquirer from "inquirer";
import { back, home, pageSize, quit } from "../constants.js";
import { clearTerminal } from "../../utils/index.js";
import { IPFSCacheDexie } from "@owlprotocol/web3-redux-2";

export async function ipfsViewMenu(): Promise<string> {
    clearTerminal();

    const files = await IPFSCacheDexie.all()

    const choices = [
        {
            name: back,
            value: "/ipfs",
        },
        new inquirer.Separator("- Content -"),
        ...files.map((f) => {
            const path: string | undefined = (f.paths ?? [])[0]
            const name = path ? `${path} (${f.contentId})` : f.contentId
            return {
                name,
                value: `/ipfs/view/${f.contentId}`
            }
        }),
        new inquirer.Separator("- Navigation -"),
        {
            name: home,
            value: "/home",
        },

        {
            name: quit,
            value: "/quit",
        },
    ]

    const { command } = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "IPFS",
        loop: choices.length > pageSize,
        pageSize: Math.min(choices.length, pageSize),
        choices
    });

    clearTerminal();

    return command;
}
