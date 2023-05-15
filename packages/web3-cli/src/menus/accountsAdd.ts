import inquirer from "inquirer";
import { back, quit } from "./constants.js";
import { clearTerminal } from "../utils/index.js";

export async function accountsAddMenu(): Promise<string> {
    clearTerminal();

    const { command } = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "Add Account",
        choices: [
            new inquirer.Separator(),
            {
                name: back,
                value: "/accounts",
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
