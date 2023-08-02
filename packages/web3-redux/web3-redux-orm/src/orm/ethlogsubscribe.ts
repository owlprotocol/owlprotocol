import { EthLogSubscribeName } from "@owlprotocol/web3-models";
import { attr, Model as ORMModel } from "redux-orm";

export class EthLogSubscribeORMModel extends ORMModel {
    static options = {
        idAttribute: "id",
    };

    static modelName = EthLogSubscribeName;

    static fields = {
        networkId: attr(),
        address: attr(),
        topic0: attr(),
        topic1: attr(),
        topic2: attr(),
        topic3: attr(),
        eventName: attr(),
        filter: attr(),
        active: attr(),
        subscription: attr(),
    };
}
