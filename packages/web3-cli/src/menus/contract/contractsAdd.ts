import inquirer from "inquirer";
import { back, quit } from "../constants.js";
import { clearTerminal } from "../../utils/index.js";

export async function contractsAddMenu(): Promise<string> {
    clearTerminal();

    const { command } = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "Add Contract",
        choices: [
            new inquirer.Separator(),
            {
                name: back,
                value: "/contracts",
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
