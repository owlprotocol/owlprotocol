import log from "loglevel";
import { LOG_REDUX_ACTIONS } from "../environment.js";

//@ts-ignore
export const crashReporter = () => (next) => (action) => {
    try {
        //TODO: Fix log level
        log.setLevel("debug");
        const logLevel = LOG_REDUX_ACTIONS();
        if (logLevel === "true" || logLevel === "1") log.debug(action);
        else if (typeof logLevel === "string") {
            const prefixes = logLevel.split(",");
            const prefixesNeg = prefixes.filter((p) => p.startsWith("!")).map((p) => new RegExp(p.substring(1)));
            const prefixesPos = prefixes.filter((p) => !p.startsWith("!")).map((p) => new RegExp(p));
            //log.debug({ prefixesNeg, prefixesPos })
            let neg = false;
            if (!action.type) log.debug({ action });
            for (const p of prefixesNeg) {
                if ((action.type as string).match(p)) {
                    neg = true;
                    break;
                }
            }
            if (!neg) {
                for (const p of prefixesPos) {
                    if ((action.type as string).match(p)) {
                        log.debug(action);
                        break;
                    }
                }
            }
        }
        return next(action); // dispatch
    } catch (err) {
        log.error("Redux middleware caught exception!", err);
        throw err; // re-throw error
    }
};
