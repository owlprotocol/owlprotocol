import { Artifacts } from "@owlprotocol/contracts";
import { coder } from "../utils/web3-eth-abi/index.js";

export const Transfer = Artifacts.IERC20.abi.find((a: any) => a.name === 'Transfer'); //[Transfer, from, to] - [value] (ERC20) OR [Transfer, from, to, tokenId] (ERC721)
export const TransferSingle = Artifacts.IERC1155.abi.find((a: any) => a.name === 'TransferSingle'); //[TransferSingle, operator, from, to] - [tokenId, value]
export const TransferBatch = Artifacts.IERC1155.abi.find((a: any) => a.name === 'TransferBatch'); //[TransferBatch, operator, from, to] - [tokenIds[], values[]]

//ERC20 or ERC721
export const TransferTopic = coder.encodeEventSignature(Transfer as any);
//ERC1155
export const TransferSingleTopic = coder.encodeEventSignature(TransferSingle as any);
export const TransferBatchTopic = coder.encodeEventSignature(TransferBatch as any);
