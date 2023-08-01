import { ChildName } from "@owlprotocol/crud-models/test";
import { attr, Model as ORMModel } from "redux-orm";

export class ChildORMModel extends ORMModel {
    static options = {
        idAttribute: "id",
    };

    static modelName = ChildName;

    static fields = {
        id: attr(),
        firstName: attr(),
        lastName: attr(),
    };
}
