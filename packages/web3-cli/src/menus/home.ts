import inquirer from "inquirer";
import { clearTerminal } from "../utils/index.js";

export async function homeMenu(): Promise<string> {
    clearTerminal();

    const choices = [
        new inquirer.Separator("- Menus -"),
        {
            name: "Config",
            value: "/config",
        },
        {
            name: "Accounts",
            value: "/accounts",
        },
        {
            name: "Networks",
            value: "/networks",
        },
        {
            name: "IPFS",
            value: "/ipfs",
        },
        {
            name: "Contracts",
            value: "/contracts",
        },
        {
            name: "ERC20",
            value: "/erc20",
        },
        {
            name: "ERC721",
            value: "/erc721",
        },
        {
            name: "ERC1155",
            value: "/erc1155",
        },
        {
            name: "Transactions",
            value: "/transactions",
        },
        new inquirer.Separator("- Actions -"),
        {
            name: "❌ Quit",
            value: "/quit",
        },
    ];

    const { command } = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "Home",
        loop: false,
        pageSize: choices.length,
        choices,
    });

    clearTerminal();

    return command;
}
