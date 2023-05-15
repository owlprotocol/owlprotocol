import inquirer from "inquirer";
import { ConfigDexie, ContractDexie, getERC165Abi, NetworkDexie } from "@owlprotocol/web3-redux-2";
import { utils } from "ethers";
import { back, deleteDisplay, home, pageSize, quit } from "../constants.js";
import { clearTerminal } from "../../utils/index.js";
import { ethcallMenu } from "../ethcall/ethcall.js";

export async function contractEditMenu(networkId: string, interfaceId: string, address: string): Promise<string> {
    clearTerminal();


    const contract = (await ContractDexie.get({ networkId, address }))!
    const name = contract.label ? `${contract.label} (${address})` : address

    const abi = contract.abi ?? await getERC165Abi(networkId, address)
    const abiCall = abi.filter((a) => a.type === "function" && a.constant)
    const abiSend = abi.filter((a) => a.type === "function" && !a.constant)
    const abiEvent = abi.filter((a) => a.type === "event")

    const displayKeys = new Set(["label"]);
    const choices = [
        {
            name: back,
            value: `/contracts/${networkId}/${interfaceId}`,
        },
        new inquirer.Separator("- Read  -"),
        ...abiCall.map((a) => {
            const methodFormatFull = utils.FunctionFragment.from(a as any)
                .format(utils.FormatTypes.full)
                .replace("function ", "")
            return {
                name: methodFormatFull,
                value: {
                    type: "ethcall",
                    methodFormatFull
                }
            }
        }),
        new inquirer.Separator("- Write -"),
        ...abiSend.map((a) => {
            const methodFormatFull = utils.FunctionFragment.from(a as any)
                .format(utils.FormatTypes.full)
                .replace("function ", "")
            return {
                name: methodFormatFull,
                value: {
                    type: "ethsend",
                    methodFormatFull
                }
            }
        }),
        new inquirer.Separator("- Events -"),
        ...abiEvent.map((a) => {
            const eventFormatFull = utils.EventFragment.from(a as any)
                .format(utils.FormatTypes.full)
                .replace("event ", "")
            return {
                name: eventFormatFull,
                value: {
                    type: "event",
                    eventFormatFull
                }
            }
        }),
        new inquirer.Separator("- Metadata -"),
        ...Object.keys(contract)
            .filter((f) => displayKeys.has(f))
            .map((k) => {
                //@ts-expect-error
                return { name: `${k}: ${contract[k] ?? ""}`, value: "/contracts" };
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
        loop: choices.length > pageSize,
        pageSize: Math.min(choices.length, pageSize),
        choices,
    });

    if (command === "/delete") {
        await ContractDexie.delete({ networkId, address })
        command = "/contracts"
    } else if (typeof command != "string") {
        if (command.type === "ethcall") {
            command = await ethcallMenu(networkId, address, command.methodFormatFull)
        } else if (command.type === "ethsend") {
            command = "/contracts"
        } else if (command.type === "event") {
            command = "/contracts"
        }
    }

    clearTerminal();

    return command;
}
