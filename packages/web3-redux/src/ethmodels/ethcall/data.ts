import { EthCallCRUD } from "./crud.js";
import { ADDRESS_0, ADDRESS_1, networkId } from "../../data.js";

export const ethCall1 = EthCallCRUD.validate({
    networkId,
    from: ADDRESS_0,
    to: ADDRESS_1,
    args: [],
    methodFormatFull: "getValue() returns (uint256 val)",
    returnValue: { 0: "66", val: "66" },
});
