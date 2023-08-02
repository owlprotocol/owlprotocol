import inquirer from "inquirer";
import { back, home, pageSize, quit } from "../constants.js";
import { clearTerminal } from "../../utils/index.js";
import { IPFSCacheDexie } from "@owlprotocol/web3-redux";

export async function ipfsViewItemMenu(cid: string): Promise<string> {
    clearTerminal();

    const f = await IPFSCacheDexie.get({ contentId: cid })
    if (!f) return "/ipfs/view"

    const path: string | undefined = (f.paths ?? [])[0]
    const name = path ? `${path} (${f.contentId})` : f.contentId

    const data = f.dataJSON ?? f.dataTxt ?? f.data

    console.log(name + "\n")
    console.log(data + "\n")

    const choices = [
        new inquirer.Separator("- Navigation -"),
        {
            name: back,
            value: "/ipfs/view",
        },
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
        message: `IPFS ${name}`,
        loop: choices.length > pageSize,
        pageSize: Math.min(choices.length, pageSize),
        choices
    });

    clearTerminal();

    return command;
}
