import inquirer from "inquirer";
import { add, back, quit } from "./constants.js";
import { clearTerminal } from "../utils/index.js";

export async function accountsMenu(): Promise<string> {
    clearTerminal();

    const { command } = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "Accounts",
        choices: [
            new inquirer.Separator(),
            {
                name: add,
                value: "/accounts/add",
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
