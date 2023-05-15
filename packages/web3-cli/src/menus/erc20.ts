import inquirer from "inquirer";
import { add, back, quit } from "./constants.js";
import { clearTerminal } from "../utils/index.js";

export async function erc20Menu(): Promise<string> {
    clearTerminal();

    const { command } = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "ERC20 (Tokens)",
        choices: [
            new inquirer.Separator(),
            {
                name: add,
                value: "/erc20/add",
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
