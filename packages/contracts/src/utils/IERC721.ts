import { IERC721 } from "../artifacts.js";
import { utils } from 'ethers';

export const Transfer = IERC721.abi.find((a: any) => a.name === 'Transfer');
export const TransferFragment = utils.EventFragment.from(Transfer)
export const TransferTopic = TransferFragment.format(utils.FormatTypes.sighash)

export const Approval = IERC721.abi.find((a: any) => a.name === 'Approval');
export const ApprovalFragment = utils.EventFragment.from(Approval)
export const ApprovalTopic = ApprovalFragment.format(utils.FormatTypes.sighash)

export const ApprovalForAll = IERC721.abi.find((a: any) => a.name === 'ApprovalForAll');
export const ApprovalForAllFragment = utils.EventFragment.from(ApprovalForAll)
export const ApprovalForAllTopic = ApprovalForAllFragment.format(utils.FormatTypes.sighash)
