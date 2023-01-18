import { put, call } from 'typed-redux-saga';
import * as Contracts from '@owlprotocol/contracts';

import { fetchSaga } from './fetch.js';
import { CallAction } from '../actions/index.js';
import { ContractCRUD } from '../crud.js';
import { EthCallCRUD } from '../../ethcall/crud.js';
import { NetworkWithObjects } from '../../network/model/interface.js';
import { ContractWithObjects } from '../model/interface.js';
import { EthCall } from '../../ethcall/model/interface.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';

export function* callSaga(action: CallAction): Generator<
    any,
    {
        network: NetworkWithObjects;
        contract: ContractWithObjects;
        ethcall: EthCall
    }
> {
    const { payload } = action;
    const { networkId, address, args, method, gas, from, defaultBlock, maxCacheAge } = payload;

    const { network, contract } = yield* call(fetchSaga, ContractCRUD.actions.fetch({ networkId, address }, action.meta.uuid));
    //Make sure required parameters defined
    if (!payload.method) throw new Error('method undefined');

    const web3Contract = contract.web3Contract!;
    const methodFn = web3Contract.methods[method];
    if (!methodFn) throw new Error(`Contract ${ContractCRUD.toPrimaryKey(payload)} has no such method ${payload.method}`);

    let tx: Contracts.Web3.NonPayableTransactionObject<any>;
    if (!args || args.length == 0) tx = methodFn();
    else tx = methodFn(...args);
    const data = tx.encodeABI();

    const dbSelected = yield* call(EthCallCRUD.db.get, { networkId, to: contract.address, data });
    if (dbSelected?.updatedAt && Date.now() - dbSelected.updatedAt < maxCacheAge) {
        return { network, contract, ethcall: dbSelected }
    }
    const fromDefined = from ?? ADDRESS_0;
    const ethcallLoading = {
        networkId,
        to: contract.address,
        data,
        methodName: method,
        args,
        from: fromDefined,
        status: 'LOADING' as const,
    }
    yield* put(
        EthCallCRUD.actions.upsert(ethcallLoading),
    );

    const gasDefined = gas ?? (yield* call(tx.estimateGas, { from: fromDefined })); //default gas
    //@ts-ignore
    const returnValue: any = yield* call(
        tx.call,
        { gas: gasDefined, from: fromDefined },
        defaultBlock ?? 'latest',
    );

    const ethcall = {
        networkId,
        to: contract.address,
        data,
        methodName: method,
        args,
        from: fromDefined,
        gas: gasDefined,
        returnValue,
        status: 'SUCCESS' as const,
    }

    yield* put(
        EthCallCRUD.actions.upsert(ethcall),
    );

    return { network, contract, ethcall }
}
