import { LOG_REDUX_ACTIONS } from '../environment.js';

//@ts-ignore
export const crashReporter = () => (next) => (action) => {
    try {
        const log = LOG_REDUX_ACTIONS()
        if (log === 'true' || log === '1') console.debug(action);
        else if (typeof log === 'string') {
            const prefixes = log.split(',')
            prefixes.forEach((p) => {
                if ((action.type as string).match(p)) {
                    console.debug(action)
                }
            })
        }
        return next(action); // dispatch
    } catch (err) {
        console.error('Redux middleware caught exception!', err);
        throw err; // re-throw error
    }
};
