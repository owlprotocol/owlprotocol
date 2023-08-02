import { utils } from "ethers";
import { IERC721Interface } from "../ethers/interfaces.js";

export const TransferFragment = IERC721Interface.getEvent("Transfer");
export const Transfer = JSON.parse(TransferFragment.format(utils.FormatTypes.json));
export const TransferSigHash = TransferFragment.format(utils.FormatTypes.sighash);
export const TransferTopic = IERC721Interface.getEventTopic("Transfer");

export const ApprovalFragment = IERC721Interface.getEvent("Approval");
export const Approval = JSON.parse(ApprovalFragment.format(utils.FormatTypes.json));
export const ApprovalSigHash = ApprovalFragment.format(utils.FormatTypes.sighash);
export const ApprovalTopic = IERC721Interface.getEventTopic("Approval");

export const ApprovalForAllFragment = IERC721Interface.getEvent("ApprovalForAll");
export const ApprovalForAll = JSON.parse(ApprovalForAllFragment.format(utils.FormatTypes.json));
export const ApprovalForAllSigHash = ApprovalForAllFragment.format(utils.FormatTypes.sighash);
export const ApprovalForAllTopic = IERC721Interface.getEventTopic("ApprovalForAll");
