//Import interface
//Compute interfaceId + check with IERC165
import { Fragment, Interface } from "@ethersproject/abi";
import { zip } from "../lodash.js";

export function hexTo4ByteBinary(hex: string) {
    return parseInt(hex, 16).toString(2).padStart(32, "0");
}

export function binaryTo4ByteHex(binary: string) {
    return "0x" + parseInt(binary, 2).toString(16).padStart(8, "0");
}

//assumes input is in binary
export function xor(bin1: string, bin2: string): string {
    return zip(bin1.split(""), bin2.split(""))
        .map(([a, b]) => {
            if (a! !== b!) return "1";
            return "0";
        })
        .join("");
}

export function interfaceId(fragments: readonly Fragment[]) {
    const fragmentIds = fragments.filter((f) => f.type == "function").map((f) => Interface.getSighash(f));
    const fragmentIdsBin = fragmentIds.map(hexTo4ByteBinary);

    const interfaceIdBin = fragmentIdsBin.reduce((interfaceId, fragmentId) => {
        return xor(interfaceId, fragmentId);
    });
    return binaryTo4ByteHex(interfaceIdBin);
}
