import inquirer from "inquirer";
import { ConfigDexie, NetworkDexie } from "@owlprotocol/web3-redux";
import { add, back, home, pageSize, quit } from "../constants.js";
import { clearTerminal } from "../../utils/index.js";

export async function networkMenu(): Promise<string> {
    clearTerminal();

    const config = await ConfigDexie.get({ id: "0" })
    const activeNetworkId = config?.networkId ?? "1";
    let networks = await NetworkDexie.all()
    if (!config?.showTestnets) networks = networks.filter((n) => !n.testnet);

    const choices = [
        {
            name: back,
            value: "/home",
        },
        new inquirer.Separator("- Networks -"),
        ...networks.map((n) => {
            const name = `${n.name} (${n.networkId})` ?? `Network ${n.networkId}`
            const activeSymbol = activeNetworkId === n.networkId ? "◉" : "◯"
            return {
                name: `${activeSymbol} ${name}`,
                value: `/networks/${n.networkId}`,
            };
        }),
        new inquirer.Separator("- Actions -"),
        {
            name: add,
            value: "/networks/add",
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

    const { command } = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "Networks",
        loop: choices.length > pageSize,
        pageSize: Math.min(choices.length, pageSize),
        choices,
    });

    clearTerminal();

    return command;
}
