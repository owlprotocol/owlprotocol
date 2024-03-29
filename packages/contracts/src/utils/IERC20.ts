import { utils } from "ethers";
import { IERC20Interface } from "../ethers/interfaces.js";

export const TransferFragment = IERC20Interface.getEvent("Transfer");
export const Transfer = JSON.parse(TransferFragment.format(utils.FormatTypes.json));
export const TransferSigHash = TransferFragment.format(utils.FormatTypes.sighash);
export const TransferTopic = IERC20Interface.getEventTopic("Transfer");

export const ApprovalFragment = IERC20Interface.getEvent("Approval");
export const Approval = JSON.parse(ApprovalFragment.format(utils.FormatTypes.json));
export const ApprovalSigHash = ApprovalFragment.format(utils.FormatTypes.sighash);
export const ApprovalTopic = IERC20Interface.getEventTopic("Approval");

export const balanceOfFragment = IERC20Interface.getFunction("balanceOf");
export const balanceOfSigHash = balanceOfFragment.format(utils.FormatTypes.sighash);
export const balanceOfJSON = JSON.parse(balanceOfFragment.format(utils.FormatTypes.json));
export const balanceOfMinimal = balanceOfFragment.format(utils.FormatTypes.full);
export const balanceOf4Byte = IERC20Interface.getSighash("balanceOf");
