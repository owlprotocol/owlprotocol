import { Artifacts } from "@owlprotocol/contracts";
import { coder } from "../utils/web3-eth-abi/index.js";

export const TransferERC20 = Artifacts.IERC20.abi.find((a: any) => a.name === 'Transfer'); //[Transfer, from, to] - [value] (ERC20) OR [Transfer, from, to, tokenId] (ERC721)
export const TransferERC721 = Artifacts.IERC721.abi.find((a: any) => a.name === 'Transfer');
export const TransferSingleERC1155 = Artifacts.IERC1155.abi.find((a: any) => a.name === 'TransferSingle'); //[TransferSingle, operator, from, to] - [tokenId, value]
export const TransferBatchERC1155 = Artifacts.IERC1155.abi.find((a: any) => a.name === 'TransferBatch'); //[TransferBatch, operator, from, to] - [tokenIds[], values[]]

//ERC20 or ERC721
export const TransferERC20Topic = coder.encodeEventSignature(TransferERC20 as any);
//ERC1155
export const TransferSingleERC1155Topic = coder.encodeEventSignature(TransferSingleERC1155 as any);
export const TransferBatchERC1155Topic = coder.encodeEventSignature(TransferBatchERC1155 as any);
