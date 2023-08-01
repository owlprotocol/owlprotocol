import { map, mapValues } from "lodash-es";
import { mapValuesDeep } from "deepdash-es/standalone";

export function mapDeepBigNumberToString(x: any): any {
    if (x._isBigNumber) return x.toString();

    if (Array.isArray(x)) {
        if (x.length === Object.keys(x).length) {
            return map(x, mapDeepBigNumberToString);
        } else {
            return mapValues(x, mapDeepBigNumberToString);
        }
    }

    return mapValuesDeep(
        x,
        (v: any) => {
            if (v._isBigNumber) {
                return v.toString();
            } else if (Array.isArray(v)) {
                return v;
            }
            return v;
        },
        { leavesOnly: false, includeRoot: true },
    );
}
