import { attr, Model as ORMModel } from "redux-orm";
import { ConfigName } from "../common.js";

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
