/** Queries all interface implementers using InterfaceImplementerSet events */
import { put, call, select } from 'typed-redux-saga';
import * as Contracts from '@owlprotocol/contracts';
import { NetworkCRUD } from '../../network/crud.js';
import { fetchSaga as fetchNetwork } from '../../network/sagas/fetch.js'
import { GetInterfaceImplementersAction } from '../actions/index.js';
import { ERC1820RegistryAddress } from '../constants.js';
import { eventGetPastRaw } from '../../contract/sagas/eventGetPastRaw.js';
import eventGetPastRawAction from '../../contract/actions/eventGetPastRaw.js';
import ContractEvent from '../../contractevent/model/interface.js';


export function* getInterfaceImplementers(action: GetInterfaceImplementersAction, uuid?: string) {
    const id = action.meta.uuid ?? uuid;
    const { payload } = action;
    const { networkId, address } = payload;

    //loadContract
    const { network } = (yield* call(fetchNetwork, NetworkCRUD.actions.fetch({
        networkId,
    })));

    const web3 = network.web3!
    const fromBlock = 0;
    const toBlock = yield* call(web3.eth.getBlockNumber);
    const getEventsAction = eventGetPastRawAction(
        {
            networkId,
            address: ERC1820RegistryAddress,
            eventName: 'InterfaceImplementerSet',
            filter: { addr: address },
            fromBlock,
            toBlock,
        },
        id,
    );
    const events = yield* call(eventGetPastRaw, getEventsAction);
    if (!Array.isArray(events)) throw events;

    return events as ContractEvent<Contracts.Web3.InterfaceImplementerSetEvent['returnValues']>[];
}
