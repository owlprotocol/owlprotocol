import inquirer from "inquirer";
import { add, back, home, pageSize, quit } from "../constants.js";
import { clearTerminal } from "../../utils/index.js";
import { ContractDexie, ERC165Dexie, NetworkDexie } from "@owlprotocol/web3-redux-2";
import { compact } from "lodash-es";

export async function contractMenu(networkId: string, interfaceId: string): Promise<string> {
    clearTerminal();

    const network = (await NetworkDexie.get({ networkId }))!
    const networkName = `${network.name} (${network.networkId})` ?? `Network ${network.networkId}`

    let addressList: string[]
    if (interfaceId != "other") {
        const erc165 = (await ERC165Dexie.where({ networkId, interfaceId }));
        addressList = [...new Set(erc165.map((a) => a.address))]

    } else {
        const erc165 = (await ERC165Dexie.where({ networkId }));
        const addressWith165 = new Set(erc165.map((a) => a.address))
        const addressAll = new Set((await ContractDexie.where({ networkId })).map((a) => a.address))
        addressList = [...new Set([...addressAll].filter(x => !addressWith165.has(x)))];
    }
    const contracts = compact(await ContractDexie.bulkGet(addressList.map((address) => { return { networkId, address } })))
        .filter((c) => !(c.tags ?? [])?.find((t) => t === "Implementation"));

    const choices = [
        {
            name: back,
            value: `/contracts/${networkId}`,
        },
        new inquirer.Separator("- Contracts -"),
        ...contracts.map((c) => {
            const address = c.address //TODO: Checksum
            const name = c.label ? `${c.label} (${address})` : address
            return {
                name: name,
                value: `/contracts/${networkId}/${interfaceId}/${address}`,
            };
        }),
        new inquirer.Separator("- Actions -"),
        {
            name: add,
            value: "/contracts/add",
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
        message: `${networkName} Contracts`,
        loop: choices.length > pageSize,
        pageSize: Math.min(choices.length, pageSize),
        choices: choices,
    });

    clearTerminal();

    return command;
}
