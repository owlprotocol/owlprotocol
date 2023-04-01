import { LOG_REDUX_ACTIONS } from "../environment.js";

//@ts-ignore
export const crashReporter = () => (next) => (action) => {
    try {
        const log = LOG_REDUX_ACTIONS();
        if (log === "true" || log === "1") console.debug(action);
        else if (typeof log === "string") {
            const prefixes = log.split(",");
            const prefixesNeg = prefixes.filter((p) => p.startsWith("!")).map((p) => new RegExp(p.substring(1)));
            const prefixesPos = prefixes.filter((p) => !p.startsWith("!")).map((p) => new RegExp(p));
            //console.debug({ prefixesNeg, prefixesPos })
            let neg = false;
            if (!action.type) console.debug({ action });
            for (const p of prefixesNeg) {
                if ((action.type as string).match(p)) {
                    neg = true;
                    break;
                }
            }
            if (!neg) {
                for (const p of prefixesPos) {
                    if ((action.type as string).match(p)) {
                        console.debug(action);
                        break;
                    }
                }
            }
        }
        return next(action); // dispatch
    } catch (err) {
        console.error("Redux middleware caught exception!", err);
        throw err; // re-throw error
    }
};
