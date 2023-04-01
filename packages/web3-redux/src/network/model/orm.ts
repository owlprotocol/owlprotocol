import { attr, Model as ORMModel } from "redux-orm";
import { NetworkName } from "../common.js";

export class NetworkORMModel extends ORMModel {
    static options = {
        idAttribute: "networkId",
    };

    static modelName = NetworkName;

    static fields = {
        networkId: attr(),
        web3: attr(),
        web3Sender: attr(),
        multicallAddress: attr(),
        multicallContract: attr(),
        gasLimit: attr(),
        explorerUrl: attr(),
        explorerApiUrl: attr(),
        explorerApiKey: attr(),
        ens: attr(),
    };
}
