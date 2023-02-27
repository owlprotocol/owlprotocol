import { IERC20 } from "../artifacts.js";
import { utils } from 'ethers';

export const Transfer = IERC20.abi.find((a: any) => a.name === 'Transfer');
export const TransferFragment = utils.EventFragment.from(Transfer)
export const TransferTopic = TransferFragment.format(utils.FormatTypes.sighash)

export const Approval = IERC20.abi.find((a: any) => a.name === 'Approval');
export const ApprovalFragment = utils.EventFragment.from(Approval)
export const ApprovalTopic = ApprovalFragment.format(utils.FormatTypes.sighash)
