import inquirer from "inquirer";
import { Config, ConfigDexie, NetworkDexie } from "@owlprotocol/web3-redux";
import { add, back, home, quit } from "../constants.js";
import { clearTerminal } from "../../utils/index.js";

export async function configMenu(): Promise<string> {
    clearTerminal();

    const config = await ConfigDexie.get({ id: "0" }) ?? {} as Config
    const choices = [
        {
            name: back,
            value: "/home",
        },
        new inquirer.Separator("- Config -"),
        {
            name: `${config.showTestnets ? "◉" : "◯"} Show Testnets`,
            value: "/showTestnets",
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
    ];

    let { command } = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "config",
        loop: false,
        pageSize: choices.length,
        choices,
    });

    if (command === "/showTestnets") {
        await ConfigDexie.upsert({ id: "0", showTestnets: !config.showTestnets })
        command = "/home"
    }

    clearTerminal();

    return command;
}
