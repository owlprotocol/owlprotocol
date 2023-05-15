import inquirer from "inquirer";
import { ConfigDexie, NetworkDexie } from "@owlprotocol/web3-redux-2";
import { back, deleteDisplay, home, quit } from "../constants.js";
import { clearTerminal } from "../../utils/index.js";

export async function networkEditMenu(networkId: string | undefined): Promise<string> {
    clearTerminal();

    const config = await ConfigDexie.get({ id: "0" })
    const activeNetworkId = config?.networkId ?? "1";
    networkId = networkId ?? activeNetworkId

    const n = (await NetworkDexie.get({ networkId }))!;
    const name = `${n.name} (${n.networkId})` ?? `Network ${n.networkId}`
    const isActive = activeNetworkId === n.networkId;
    const syncBlocksSymbol = n.syncBlocks ? "◉" : "◯"
    const syncAssetsSymbol = n.syncAssets ? "◉" : "◯"
    const syncContractsSymbol = n.syncContracts ? "◉" : "◯"

    const activeSymbol = isActive ? "◉" : "◯"

    const displayKeys = new Set(["name", "web3Rpc", "explorerUrl", "explorerApiUrl", "explorerApiKey"]);
    const choices = [
        {
            name: back,
            value: "/networks",
        },
        {
            name: `${activeSymbol} Switch to Network`,
            value: "/switch"
        },
        {
            name: `${syncContractsSymbol} Sync to Contracts (background sync known contracts)`,
            value: "/syncContracts"
        },
        {
            name: `${syncAssetsSymbol} Sync to Assets (background sync assets for Accounts)`,
            value: "/syncAssets"
        },
        {
            name: `${syncBlocksSymbol} Sync Blocks (background block subscription)`,
            value: "/syncBlocks"
        },
        new inquirer.Separator("- Edit -"),
        ...Object.keys(n)
            .filter((f) => displayKeys.has(f))
            .map((k) => {
                //@ts-expect-error
                return { name: `${k}: ${n[k] ?? ""}`, value: "/networks" };
            }),
        new inquirer.Separator("- Actions -"),
        {
            name: deleteDisplay,
            value: "/delete",
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
        message: name,
        loop: false,
        pageSize: choices.length,
        choices,
    });

    if (command === "/delete") {
        await NetworkDexie.delete({ networkId })
        command = "/networks"
    } else if (command === "/switch") {
        if (!isActive) {
            await ConfigDexie.upsert({ id: "0", networkId })
        }
        command = `/networks/${networkId}`
    } else if (command === "/syncContracts") {
        await NetworkDexie.upsert({ networkId, syncContracts: !n.syncContracts })
        command = `/networks/${networkId}`
    } else if (command === "/syncAssets") {
        await NetworkDexie.upsert({ networkId, syncAssets: !n.syncAssets })
        command = `/networks/${networkId}`
    } else if (command === "/syncBlocks") {
        await NetworkDexie.upsert({ networkId, syncBlocks: !n.syncBlocks })
        command = `/networks/${networkId}`
    }

    clearTerminal();

    return command;
}
