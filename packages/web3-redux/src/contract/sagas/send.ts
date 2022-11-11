import { END, eventChannel, EventChannel, TakeableChannel } from 'redux-saga';
import { put, call, take, select } from 'typed-redux-saga';
import { PromiEvent, TransactionReceipt } from 'web3-core';
import { fetchSaga } from './fetch.js';
import ConfigCRUD from '../../config/crud.js';
import ContractSendCRUD from '../../contractsend/crud.js';
import { ContractSendStatus } from '../../contractsend/model/index.js';
import TransactionCRUD from '../../transaction/crud.js';
import { SEND, SendAction } from '../actions/index.js';
import ContractCRUD from '../crud.js';
import { ContractWithObjects } from '../model/interface.js';
import { NetworkWithObjects } from '../../network/model/interface.js';

const CONTRACT_SEND_HASH = `${SEND}/HASH`;
const CONTRACT_SEND_RECEIPT = `${SEND}/RECEIPT`;
const CONTRACT_SEND_CONFIRMATION = `${SEND}/CONFIRMATION`;
const CONTRACT_SEND_ERROR = `${SEND}/ERROR`;
const CONTRACT_SEND_DONE = `${SEND}/DONE`;
interface ContractSendChannelMessage {
    type:
    | typeof CONTRACT_SEND_HASH
    | typeof CONTRACT_SEND_RECEIPT
    | typeof CONTRACT_SEND_CONFIRMATION
    | typeof CONTRACT_SEND_ERROR;
    error?: any;
    hash?: string;
    receipt?: TransactionReceipt;
    confirmations?: number;
}

function sendChannel(tx: PromiEvent<TransactionReceipt>): EventChannel<ContractSendChannelMessage> {
    return eventChannel((emitter) => {
        tx.on('transactionHash', (hash: string) => {
            emitter({ type: CONTRACT_SEND_HASH, hash });
        })
            .on('receipt', (receipt: TransactionReceipt) => {
                emitter({ type: CONTRACT_SEND_RECEIPT, receipt });
            })
            .on('confirmation', (confirmations: number) => {
                emitter({ type: CONTRACT_SEND_CONFIRMATION, confirmations });
                if (confirmations == 24) emitter(END);
            })
            .on('error', (error: any) => {
                emitter({
                    type: CONTRACT_SEND_ERROR,
                    error,
                });
                emitter(END);
            });
        // The subscriber must return an unsubscribe function
        return () => { }; //eslint-disable-line @typescript-eslint/no-empty-function
    });
}

export function* sendSaga(action: SendAction): Generator<
    any,
    {
        network: NetworkWithObjects;
        contract: ContractWithObjects;
    }
> {
    const { payload } = action;
    const { networkId, address, args, onSuccess, onError } = payload;
    console.debug(payload);

    const { network, contract } = yield* call(fetchSaga, ContractCRUD.actions.fetch({ networkId, address }));
    //Make sure required parameters defined
    if (!payload.method) throw new Error('method undefined');

    const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, { id: '0' });
    const defaultFrom = config?.account;
    const from = payload.from ?? defaultFrom;
    if (!from) throw new Error('from undefined');

    const web3Contract = contract.web3SenderContract;
    if (!web3Contract)
        throw new Error(`Contract ${ContractCRUD.validateId({ networkId, address })} has no web3 contract`);

    const method = web3Contract.methods[payload.method];
    if (!method)
        throw new Error(
            `Contract ${ContractCRUD.validateId({ networkId, address })} has no such method ${payload.method}`,
        );

    const gasPrice = payload.gasPrice ?? 0;
    const value = payload.value ?? 0;

    let tx: any;
    if (!args || args.length == 0) {
        tx = method();
    } else {
        tx = method(...args);
    }

    //Before calling web3 estimateGas() and send(), first save the contractSend object to store any error messages
    const baseContractSend = {
        networkId,
        address,
        methodName: payload.method,
        args,
        from,
        value,
        uuid: action.meta.uuid,
    };

    console.debug(baseContractSend);

    yield* put(
        ContractSendCRUD.actions.upsert({
            ...baseContractSend,
            status: ContractSendStatus.PENDING_SIGNATURE,
        }),
    );

    //console.log(tx)
    const gas = payload.gas ?? (yield* call(tx.estimateGas, { from, value }));
    //console.log({ gas })
    const txPromiEvent: PromiEvent<TransactionReceipt> = tx.send({ from, gas, gasPrice, value });

    const channel: TakeableChannel<ContractSendChannelMessage> = yield* call(sendChannel, txPromiEvent);
    let initialConfirm = false;
    while (true) {
        const message: ContractSendChannelMessage = yield* take(channel);
        const { type, hash, receipt, confirmations } = message;
        if (type === CONTRACT_SEND_HASH) {
            yield* put(TransactionCRUD.actions.upsert({ networkId, hash: hash! }));
            yield* put(
                ContractSendCRUD.actions.update({
                    ...baseContractSend,
                    transactionHash: hash!,
                    status: ContractSendStatus.PENDING_CONFIRMATION,
                }),
            );
        } else if (type === CONTRACT_SEND_RECEIPT) {
            yield* put(
                ContractSendCRUD.actions.update({
                    ...baseContractSend,
                    receipt: receipt,
                    blockNumber: receipt?.blockNumber,
                    blockHash: receipt?.blockHash,
                    status: ContractSendStatus.PENDING_CONFIRMATION,
                }),
            );
        } else if (type === CONTRACT_SEND_CONFIRMATION) {
            if (!initialConfirm && confirmations && confirmations > 0) {
                initialConfirm = true;
                onSuccess && onSuccess(hash!);
                yield* put(
                    ContractSendCRUD.actions.update({
                        ...baseContractSend,
                        confirmations: confirmations,
                        status: ContractSendStatus.CONFIRMED,
                    }),
                );
            }

            return { network, contract };
        } else if (type === CONTRACT_SEND_ERROR) {
            console.error(message);
            const { error } = message;
            //handle metamask reject or other errors
            yield* put(
                ContractSendCRUD.actions.update({
                    ...baseContractSend,
                    error,
                    status: ContractSendStatus.ERROR,
                }),
            );

            onError && onError(error as Error);
            throw error;
        }
    }
}

export default sendSaga;
