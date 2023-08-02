import { utils } from "ethers";
import { Fragment } from "ethers/lib/utils";
import { uniq } from "lodash-es";
import { AbiItem } from "web3-utils";
/**
 *  Sort abi items alphabietically
 * @param abi
 */
export function abiDeterministic(abi: (string | Fragment | AbiItem)[]): AbiItem[] {
    const iface = new utils.Interface(abi as any);
    const fragments = uniq(iface.fragments.map((e) => e.format(utils.FormatTypes.full)).sort()).map((e) =>
        JSON.parse(utils.Fragment.from(e).format(utils.FormatTypes.json)),
    );

    return [...fragments];
}
