import { createCRUDDB } from "@owlprotocol/crud-dexie";
import {
    Contract,
    EthLog,
    EthLogName,
    validateIdEthLog,
    toPrimaryKeyEthLog,
    indexedTopicsLengthMatch,
    mapDeepBigNumberToString,
    AssetRouterInputBasket,
    AssetRouterOutputBasket,
    ERC1155Balance,
    ERC20Allowance,
    ERC20Balance,
    ERC721,
    ERC165,
} from "@owlprotocol/web3-models";
import { utils } from "ethers";
import { compact, pick } from "lodash-es";
import { getEthLogAbiDexie } from "./ethlogabi.js";
import {
    EthLogKeyId,
    EthLogKeyIdEq,
    EthLogKeyIdx,
    EthLogKeyIdxEq,
    EthLogKeyIdxEqAny,
} from "../../tables/ethmodels/ethlog.js";
import { Web3Dexie } from "../../dbIndex.js";
import { getContractDexie } from "../contract.js";
import { getERC165Dexie } from "../contractmodels/erc165.js";
import { getERC165AbiDexie } from "../contractmodels/erc165abi.js";
import { interfaces } from "@owlprotocol/contracts";
import { AssetRouterInputBasketDexie, AssetRouterOutputBasketDexie, ERC1155BalanceDexie, ERC20AllowanceDexie, ERC20BalanceDexie, ERC721Dexie } from "../contractmodels/index.js";

export function getEthLogDexie() {
    return createCRUDDB<
        typeof EthLogName,
        EthLog,
        EthLogKeyId,
        EthLogKeyIdEq,
        EthLogKeyIdx,
        EthLogKeyIdxEq,
        EthLogKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[EthLogName], {
        validateId: validateIdEthLog,
        toPrimaryKey: toPrimaryKeyEthLog,
        preWriteBulkDB: preWriteBulkDBEthLog,
        postWriteBulkDB: postWriteBulkDBEthLog,
    });
}
export const EthLogDexie = getEthLogDexie();

const ContractDexie = getContractDexie();
const ERC165Dexie = getERC165Dexie();
const ERC165AbiDexie = getERC165AbiDexie();
const EthLogAbiDexie = getEthLogAbiDexie();

export async function preWriteBulkDBEthLog(items: EthLog[]): Promise<EthLog[]> {
    const promises = items.map(async (e) => {
        const { data, topics, topic0 } = e!;
        let eventFormatFull = e!.eventFormatFull;
        let returnValues = e!.returnValues;

        if (topic0 && (!eventFormatFull || !returnValues)) {
            //ERC165
            const erc165 = await ERC165Dexie.where(pick(e, "networkId", "address"));
            const erc165Abi = compact(await ERC165AbiDexie.bulkGet(erc165.map((e) => pick(e, "interfaceId"))));
            for (const abi of erc165Abi) {
                try {
                    const iface = new utils.Interface(abi as any);
                    const fragment = iface.getEvent(topic0);
                    if (indexedTopicsLengthMatch(topics, fragment)) {
                        //Decode
                        if (!eventFormatFull) {
                            eventFormatFull = fragment.format(utils.FormatTypes.full).replace("event ", "");
                        }
                        if (!returnValues) {
                            const iface = new utils.Interface([fragment]);
                            returnValues = iface.decodeEventLog(fragment, data, topics);
                            returnValues = mapDeepBigNumberToString(returnValues);
                        }
                        return {
                            ...e!,
                            eventFormatFull,
                            returnValues,
                        };
                    }
                    // eslint-disable-next-line no-empty
                } catch (error) { }
            }
            const contract = await ContractDexie.get(pick(e, "networkId", "address"));
            //Contract
            const abi = contract?.abi;
            if (abi) {
                try {
                    const iface = new utils.Interface(abi as any);
                    const fragment = iface.getEvent(topic0);
                    if (indexedTopicsLengthMatch(topics, fragment)) {
                        //Decode
                        if (!eventFormatFull) {
                            eventFormatFull = fragment.format(utils.FormatTypes.full).replace("event ", "");
                        }
                        if (!returnValues) {
                            const iface = new utils.Interface([fragment]);
                            returnValues = iface.decodeEventLog(fragment, data, topics);
                            returnValues = mapDeepBigNumberToString(returnValues);
                        }
                        return {
                            ...e!,
                            eventFormatFull,
                            returnValues,
                        };
                    }
                    // eslint-disable-next-line no-empty
                } catch (error) { }
            }

            //EthLog Abis
            const ethlogabis = await EthLogAbiDexie.where({ eventSighash: topic0 });
            const eventFragments: utils.EventFragment[] = [];
            eventFragments.push(...ethlogabis!.map((e) => utils.EventFragment.from(e.eventFormatFull)));

            for (const fragment of eventFragments) {
                if (indexedTopicsLengthMatch(topics, fragment)) {
                    //Decode
                    if (!eventFormatFull) {
                        eventFormatFull = fragment.format(utils.FormatTypes.full).replace("event ", "");
                    }
                    if (!returnValues) {
                        const iface = new utils.Interface([fragment]);
                        returnValues = iface.decodeEventLog(fragment, data, topics);
                        returnValues = mapDeepBigNumberToString(returnValues);
                    }
                    return {
                        ...e!,
                        eventFormatFull,
                        returnValues,
                    };
                }
            }
            return e!;
        }
        return e!;
    });

    return Promise.all(promises);
}

export async function postWriteBulkDBEthLog(items: EthLog[]) {
    const ContractUpserts: Contract[] = [];
    const ERC165Upserts: ERC165[] = [];
    const ERC20AllowanceUpserts: ERC20Allowance[] = [];
    const ERC20BalanceUpserts: ERC20Balance[] = [];
    const ERC721Upserts: ERC721[] = [];
    const ERC1155BalanceUpserts: ERC1155Balance[] = [];
    const AssetRouterInputBasketUpserts: AssetRouterInputBasket[] = [];
    const AssetRouterOutputBasketUpserts: AssetRouterOutputBasket[] = [];

    items.forEach((e) => {
        const { networkId, address } = e;
        if (
            e.eventFormatFull ===
            interfaces.IERC1820.interface
                .getEvent("InterfaceImplementerSet")
                .format(utils.FormatTypes.full)
                .replace("event ", "")
        ) {
            const returnValues = e.returnValues;
            if (returnValues) {
                const { implementer, interfaceHash } = returnValues as { implementer: string; interfaceHash: string };
                //0x01ffc9a7ffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                let interfaceId: string;
                if (interfaceHash.slice(10) === "ffffffffffffffffffffffffffffffffffffffffffffffffffffffff") {
                    //ERC165
                    interfaceId = interfaceHash.slice(0, 10);
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    interfaceId = interfaceHash;
                }

                //log.debug({ networkId, address: implementer, interfaceId, x: x++ });

                //New contract with known interface
                ContractUpserts.push({ networkId, address: implementer, interfaceCheckedAt: Date.now() });
                //ERC165Upserts.push({ networkId, address: implementer, interfaceId });
            }
        } else {
            //Register any contract that emits an event
            ContractUpserts.push({ networkId, address });
        }

        const returnValues = e.returnValues;
        if (returnValues) {
            if (
                e.eventFormatFull ===
                interfaces.IERC20.interface.getEvent("Approval").format(utils.FormatTypes.full).replace("event ", "")
            ) {
                const [account, spender] = returnValues;
                ERC20AllowanceUpserts.push({
                    networkId,
                    address,
                    account,
                    spender,
                });
            } else if (
                e.eventFormatFull ===
                interfaces.IERC20.interface.getEvent("Transfer").format(utils.FormatTypes.full).replace("event ", "")
            ) {
                const [from, to] = returnValues;
                ERC20BalanceUpserts.push({
                    networkId,
                    address,
                    account: from,
                });
                ERC20BalanceUpserts.push({
                    networkId,
                    address,
                    account: to,
                });
            } else if (
                e.eventFormatFull ===
                interfaces.IERC721.interface.getEvent("Transfer").format(utils.FormatTypes.full).replace("event ", "")
            ) {
                const [, , tokenId] = returnValues;
                ERC721Upserts.push({
                    networkId,
                    address,
                    tokenId,
                });
            } else if (
                e.eventFormatFull ===
                interfaces.IERC1155.interface
                    .getEvent("TransferSingle")
                    .format(utils.FormatTypes.full)
                    .replace("event ", "")
            ) {
                const [, from, to, id] = returnValues;
                ERC1155BalanceUpserts.push({
                    networkId,
                    address,
                    id,
                    account: from,
                });
                ERC1155BalanceUpserts.push({
                    networkId,
                    address,
                    id,
                    account: to,
                });
            } else if (
                e.eventFormatFull ===
                interfaces.IERC1155.interface
                    .getEvent("TransferBatch")
                    .format(utils.FormatTypes.full)
                    .replace("event ", "")
            ) {
                const [, from, to, ids] = returnValues;
                (ids as string[]).forEach((id) => {
                    ERC1155BalanceUpserts.push({
                        networkId,
                        address,
                        id,
                        account: from,
                    });
                    ERC1155BalanceUpserts.push({
                        networkId,
                        address,
                        id,
                        account: to,
                    });
                });
            } else if (
                e.eventFormatFull ===
                interfaces.IAssetRouterInput.interface
                    .getEvent("SupportsInputAsset")
                    .format(utils.FormatTypes.full)
                    .replace("event ", "")
            ) {
                const [assetAddress, assetId, basketId] = returnValues;
                AssetRouterInputBasketUpserts.push({
                    networkId,
                    address,
                    basketId,
                    assetAddress: assetAddress,
                    erc1155Id: assetId,
                });
            } else if (
                e.eventFormatFull ===
                interfaces.IAssetRouterOutput.interface
                    .getEvent("SupportsOutputAsset")
                    .format(utils.FormatTypes.full)
                    .replace("event ", "")
            ) {
                const [assetAddress, assetId, basketId] = returnValues;
                AssetRouterOutputBasketUpserts.push({
                    networkId,
                    address,
                    basketId,
                    assetAddress: assetAddress,
                    erc1155Id: assetId,
                });
            }
        }
    });

    return Promise.all([
        ContractDexie.bulkUpsertUnchained(ContractUpserts),
        ERC165Dexie.bulkUpdateUnchained(ERC165Upserts),
        ERC20AllowanceDexie.bulkUpsertUnchained(ERC20AllowanceUpserts),
        ERC20BalanceDexie.bulkUpsertUnchained(ERC20BalanceUpserts),
        ERC721Dexie.bulkUpsertUnchained(ERC721Upserts),
        ERC1155BalanceDexie.bulkUpsertUnchained(ERC1155BalanceUpserts),
        AssetRouterInputBasketDexie.bulkUpsertUnchained(AssetRouterInputBasketUpserts),
        AssetRouterOutputBasketDexie.bulkUpsertUnchained(AssetRouterOutputBasketUpserts),
    ]);
}
