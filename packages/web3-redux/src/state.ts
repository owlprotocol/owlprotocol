import { Config } from "./config/model/interface.js";
import { EthLogSubscribeWithObjects } from "./ethmodels/ethlogsubscribe/model/interface.js";
import { Network } from "./network/model/index.js";

export interface StateRoot {
    web3Redux: State;
}

/**
 * Redux State Interface for the `web3Redux` slice.
 */
export interface State {
    /** Redux ORM */
    ["@@_______REDUX_ORM_STATE_FLAG"]: boolean;
    /** Singleton global config */
    Config: {
        items: [0];
        itemsById: { [0]: Config };
    };
    /** Contracts event subscriptions indexed by id */
    EthLogSubscribe: {
        items: string[];
        itemsById: { [id: string]: EthLogSubscribeWithObjects };
    };
    /** Networks indexed by id */
    Network: {
        items: string[];
        itemsById: { [networkId: string]: Network };
    };
}
