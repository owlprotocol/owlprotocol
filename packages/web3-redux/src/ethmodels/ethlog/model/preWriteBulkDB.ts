import { utils } from "ethers";
import { compact, pick } from "lodash-es";
import { EthLog, indexedTopicsLengthMatch } from "./interface.js";
import { mapDeepBigNumberToString } from "../../../utils/mapDeepBigNumberToString.js";
import { EthLogAbiCRUD } from "../../ethlogabi/crud.js";
import { getContractCRUD } from "../../../contract/crudGet.js";
import { ERC165AbiCRUD } from "../../../contractmodels/erc165abi/crud.js";
import { getERC165CRUD } from "../../../contractmodels/erc165/crudGet.js";

const ContractCRUD = getContractCRUD();
const ERC165CRUD = getERC165CRUD();

export async function preWriteBulkDB(items: EthLog[]): Promise<EthLog[]> {
    const promises = items.map(async (e) => {
        const { data, topics, topic0 } = e!;
        let eventFormatFull = e!.eventFormatFull;
        let returnValues = e!.returnValues;

        if (topic0 && (!eventFormatFull || !returnValues)) {
            //ERC165
            const erc165 = await ERC165CRUD.db.where(pick(e, "networkId", "address"));
            const erc165Abi = compact(await ERC165AbiCRUD.db.bulkGet(erc165.map((e) => pick(e, "interfaceId"))));
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
            const contract = await ContractCRUD.db.get(pick(e, "networkId", "address"));
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
            const ethlogabis = await EthLogAbiCRUD.db.where({ eventSighash: topic0 });
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
