import { ConfigName } from "@owlprotocol/web3-models";
import { attr, Model as ORMModel } from "redux-orm";

export class ConfigORMModel extends ORMModel {
    static options = {
        idAttribute: "id",
    };

    static modelName = ConfigName;

    static fields = {
        id: attr(),
        networkId: attr(),
        account: attr(),
    };
}
