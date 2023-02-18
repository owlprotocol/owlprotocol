import { attr, Model as ORMModel } from 'redux-orm';
import { name } from '../common.js';

export class ContractEventSubscribeORMModel extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = name;

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
        subscription: attr()
    };
}
