import { IERC1155 } from "../artifacts.js";
import { utils } from 'ethers';

export const TransferSingle = IERC1155.abi.find((a: any) => a.name === 'TransferSingle');
export const TransferSingleFragment = utils.EventFragment.from(TransferSingle)
export const TransferSingleTopic = TransferSingleFragment.format(utils.FormatTypes.sighash)

export const TransferBatch = IERC1155.abi.find((a: any) => a.name === 'TransferBatch');
export const TransferBatchFragment = utils.EventFragment.from(TransferBatch)
export const TransferBatchTopic = TransferBatchFragment.format(utils.FormatTypes.sighash)

export const ApprovalForAll = IERC1155.abi.find((a: any) => a.name === 'ApprovalForAll');
export const ApprovalForAllFragment = utils.EventFragment.from(ApprovalForAll)
export const ApprovalForAllTopic = ApprovalForAllFragment.format(utils.FormatTypes.sighash)
