import inquirer from "inquirer";
import { back, home, quit } from "../constants.js";
import { clearTerminal } from "../../utils/index.js";

export async function ipfsMenu(): Promise<string> {
    clearTerminal();

    const { command } = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "IPFS",
        choices: [
            {
                name: back,
                value: "/home",
            },
            new inquirer.Separator("- Actions -"),
            {
                name: "View",
                value: "/ipfs/view",
            },
            {
                name: "Upload",
                value: "/ipfs/pin",
            },
            new inquirer.Separator("- Navigation -"),
            {
                name: home,
                value: "/home",
            },

            {
                name: quit,
                value: "/quit",
            },
        ],
    });

    clearTerminal();

    return command;
}
