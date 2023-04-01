import { EthLogCRUD } from "./crud.js";
import { ADDRESS_1, networkId } from "../../data.js";

//EthLog
export const event1 = EthLogCRUD.validate({
    networkId,
    address: ADDRESS_1,
    eventFormatFull: "NewValue(uint256 val)",
    blockNumber: 0,
    blockHash: "0x0",
    logIndex: 0,
    returnValues: { 0: 42, val: 42 },
});

export const event2 = EthLogCRUD.validate({
    networkId,
    address: ADDRESS_1,
    eventFormatFull: "NewValue(uint256 val, uint256 val2)",
    blockNumber: 0,
    blockHash: "0x0",
    logIndex: 1,
    returnValues: { 0: 42, 1: 69, val: 42, val2: 69 },
});
