//Query contract interfaces in db
//Merge ABIs
//Create contract action

import { put, call } from 'typed-redux-saga';
import { getInterfaceImplementers } from './getInterfaceImplementers.js';
import {
    getInterfaceImplementers as getInterfaceImplementersAction,
    SetInterfaceImplementersAction,
} from '../actions/index.js';
import { ContractInterfaceCRUD } from '../crud.js';
import { compact, concat } from 'lodash-es';
import { ContractCRUD } from '../../contract/crud.js';


export function* setInterfaceImplementers(action: SetInterfaceImplementersAction, uuid?: string) {
    const id = action.meta.uuid ?? uuid;
    const { payload } = action;
    const { networkId, address } = payload;

    //Get interface ids
    const events = yield* call(
        getInterfaceImplementers,
        getInterfaceImplementersAction({ networkId, address }, id),
    );
    if (!Array.isArray(events)) throw events;

    //Concatenate interfaces
    const interfaceIds = events.map((e) => e.returnValues!.interfaceHash);
    const interfaces = yield* call(ContractInterfaceCRUD.db.bulkGet, interfaceIds);
    const abis = compact(interfaces).map((i) => i.abi);
    const abi = concat(...abis);

    //Set interface
    yield* put(
        ContractCRUD.actions.update(
            {
                networkId,
                address,
                abi,
                interfaceIds,
            },
            id,
        ),
    );
}
