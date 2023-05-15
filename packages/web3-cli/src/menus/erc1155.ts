import inquirer from "inquirer";
import { add, back, quit } from "./constants.js";
import { clearTerminal } from "../utils/index.js";

export async function erc1155Menu(): Promise<string> {
    clearTerminal();

    const { command } = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "ERC1155 (NFTs)",
        choices: [
            new inquirer.Separator(),
            {
                name: add,
                value: "/erc1155/add",
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
