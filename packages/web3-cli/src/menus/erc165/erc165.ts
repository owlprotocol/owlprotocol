import inquirer from "inquirer";
import { back, home, pageSize, quit } from "../constants.js";
import { clearTerminal } from "../../utils/index.js";
import { ContractDexie, ERC165AbiDexie, ERC165Dexie, NetworkDexie } from "@owlprotocol/web3-redux";
import { zip, groupBy } from "lodash-es";

export async function erc165Menu(networkId: string): Promise<string> {
    clearTerminal();

    const network = (await NetworkDexie.get({ networkId }))!
    const networkName = `${network.name} (${network.networkId})` ?? `Network ${network.networkId}`

    const erc165 = (await ERC165Dexie.where({ networkId }));
    const addressWith165 = new Set(erc165.map((a) => a.address))
    const addressAll = new Set((await ContractDexie.where({ networkId })).map((a) => a.address))
    const addressUnknown = new Set([...addressAll].filter(x => !addressWith165.has(x)));

    const erc165ByInterfaceId = Object.entries(groupBy(erc165, (a) => a.interfaceId))
        .map(([interfaceId, addressList]) => [interfaceId, addressList.length] as [string, number])
    const erc165abi = await ERC165AbiDexie.bulkGet(erc165ByInterfaceId.map(([interfaceId]) => { return { interfaceId } }))
    const erc165choices = zip(erc165ByInterfaceId, erc165abi).map(([iface, ifaceMeta]) => {
        const [interfaceId, count] = iface!
        const name = ifaceMeta?.name ?? interfaceId
        return {
            name: `${name} (${count})`,
            value: `/contracts/${networkId}/${interfaceId}`
        }
    })

    const choices = [
        {
            name: back,
            value: "/home",
        },
        new inquirer.Separator("- Interfaces -"),
        ...erc165choices,
        {
            name: `Other (${addressUnknown.size})`,
            value: `/contracts/${networkId}/other`
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
