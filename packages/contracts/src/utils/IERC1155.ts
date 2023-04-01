import { utils } from "ethers";
import { IERC1155Interface } from "../ethers/interfaces.js";

export const TransferSingleFragment =
    IERC1155Interface.events["TransferSingle(address,address,address,uint256,uint256)"];
export const TransferSingle = JSON.parse(TransferSingleFragment.format(utils.FormatTypes.json));
export const TransferSingleSigHash = TransferSingleFragment.format(utils.FormatTypes.sighash);
export const TransferSingleTopic = IERC1155Interface.getEventTopic("TransferSingle");

export const TransferBatchFragment =
    IERC1155Interface.events["TransferBatch(address,address,address,uint256[],uint256[])"];
export const TransferBatch = JSON.parse(TransferBatchFragment.format(utils.FormatTypes.json));
export const TransferBatchSigHash = TransferBatchFragment.format(utils.FormatTypes.sighash);
export const TransferBatchTopic = IERC1155Interface.getEventTopic("TransferBatch");

export const ApprovalForAllFragment = IERC1155Interface.events["ApprovalForAll(address,address,bool)"];
export const ApprovalForAll = JSON.parse(ApprovalForAllFragment.format(utils.FormatTypes.json));
export const ApprovalForAllSigHash = ApprovalForAllFragment.format(utils.FormatTypes.sighash);
export const ApprovalForAllTopic = IERC1155Interface.getEventTopic("ApprovalForAll");
