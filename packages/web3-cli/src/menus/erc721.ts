import inquirer from "inquirer";
import { add, back, quit } from "./constants.js";
import { clearTerminal } from "../utils/index.js";

export async function erc721Menu(): Promise<string> {
    clearTerminal();

    const { command } = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "ERC721 (NFTs)",
        choices: [
            new inquirer.Separator(),
            {
                name: add,
                value: "/erc721/add",
            },
            {
                name: back,
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
