import { FormatTypes } from "@ethersproject/abi";
import { writeFileSync } from "fs";
import { interfaces } from "./interfaces.js";

export function generateInterfaceIds() {
    Object.entries(interfaces).forEach(([name, value]) => {
        const abi = value.interface.format(FormatTypes.json) as any;
        if ((value as any).interfaceId) {
            generateInterfaceId((value as any).interfaceId, name, JSON.parse(abi));
        }
    });

    const interfaceIds = Object.values(interfaces)
        .filter((iface) => (iface as any).interfaceId != undefined)
        .map((iface) => (iface as any).interfaceId);
    writeFileSync("./interfaceId/index", JSON.stringify({ result: interfaceIds }));
}

export function generateInterfaceId(interfaceId: string, name: string, abi: any[]) {
    writeFileSync(`./interfaceId/${interfaceId}`, JSON.stringify({ name, interfaceId, abi }));
}

generateInterfaceIds();
