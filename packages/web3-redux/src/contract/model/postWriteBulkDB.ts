import { pick, zip } from "lodash-es";
import { utils } from "ethers";
import { Contract } from "./interface.js";
import { EthLogCRUD } from "../../ethmodels/ethlog/crud.js";
import { EthLog, validateId as logId } from "../../ethmodels/ethlog/model/interface.js";

export async function postWriteBulkDB(items: Contract[]): Promise<any> {
    const EthLogUpserts: EthLog[] = [];

    const contractIds = items.map((c) => pick(c, "networkId", "address"));

    //Decode ethlogs if contract has abi
    const ethlogsArr = await EthLogCRUD.db.bulkWhere(contractIds);
    zip(items, ethlogsArr).forEach(([c, ethlogs]) => {
        const abi = c?.abi;
        if (abi) {
            const iface = new utils.Interface(abi as any);
            ethlogs?.forEach((l) => {
                if (l.topic0) {
                    try {
                        const fragment = iface.getEvent(l.topic0);
                        const fragmentFormatFull = fragment.format(utils.FormatTypes.full);
                        if (l.eventFormatFull != fragmentFormatFull) {
                            EthLogUpserts.push({
                                ...logId(l),
                                eventFormatFull: fragmentFormatFull,
                            } as EthLog);
                        }
                        // eslint-disable-next-line no-empty
                    } catch (error) {}
                }
            });
        }
    });

    return Promise.all([EthLogCRUD.db.bulkUpdateUnchained(EthLogUpserts)]);
}
