import { END, eventChannel, EventChannel, TakeableChannel } from "redux-saga";
import { put, call, take, select } from "typed-redux-saga";
import { PromiEvent, TransactionReceipt } from "web3-core";
import { EthTransactionCRUDActions, WEB3_SEND, Web3SendAction, EthSendCRUDActions } from "@owlprotocol/web3-actions";
import { EthSend, EthSendStatus, validateEthSend } from "@owlprotocol/web3-models";
import { NetworkSelectors } from "@owlprotocol/web3-redux-orm";

const WEB3_SEND_HASH = `${WEB3_SEND}/HASH`;
const WEB3_SEND_RECEIPT = `${WEB3_SEND}/RECEIPT`;
const WEB3_SEND_CONFIRMATION = `${WEB3_SEND}/CONFIRMATION`;
const WEB3_SEND_ERROR = `${WEB3_SEND}/ERROR`;
//const WEB3_SEND_DONE = `${WEB3_SEND}/DONE`;
interface Web3SendChannelMessage {
    type: typeof WEB3_SEND_HASH | typeof WEB3_SEND_RECEIPT | typeof WEB3_SEND_CONFIRMATION | typeof WEB3_SEND_ERROR;
    error?: any;
    hash?: string;
    receipt?: TransactionReceipt;
    confirmations?: number;
}

function web3SendChannel(tx: PromiEvent<TransactionReceipt>): EventChannel<Web3SendChannelMessage> {
    return eventChannel((emitter) => {
        tx.on("transactionHash", (hash: string) => {
            emitter({ type: WEB3_SEND_HASH, hash });
        })
            .on("receipt", (receipt: TransactionReceipt) => {
                emitter({ type: WEB3_SEND_RECEIPT, receipt });
            })
            .on("confirmation", (confirmations: number) => {
                emitter({ type: WEB3_SEND_CONFIRMATION, confirmations });
                if (confirmations == 24) emitter(END);
            })
            .on("error", (error: any) => {
                emitter({
                    type: WEB3_SEND_ERROR,
                    error,
                });
                emitter(END);
            });
        // The subscriber must return an unsubscribe function
        return () => {}; //eslint-disable-line @typescript-eslint/no-empty-function
    });
}

export function* web3SendSaga<Args extends any[] = any[]>(action: Web3SendAction<Args>): Generator<any, any> {
    const { payload } = action;
    const { networkId, from, to, methodFormatFull, args, data, value, gas } = payload;

    const network = yield* select(NetworkSelectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);
    const web3 = network?.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3Sender`);

    const baseWeb3Send: EthSend = validateEthSend({
        networkId,
        from,
        to,
        methodFormatFull,
        args,
        data,
        value,
        gas,
    });

    yield* put(
        EthSendCRUDActions.actions.create({
            ...baseWeb3Send,
            status: EthSendStatus.PENDING_SIGNATURE,
        } as any),
    );

    const gasDefined = gas ?? (yield* call(web3.eth.estimateGas, { ...payload })); //default gas
    const txPromiEvent: PromiEvent<TransactionReceipt> = web3.eth.sendTransaction({
        from,
        to,
        data,
        gas: gasDefined,
    });

    const channel: TakeableChannel<Web3SendChannelMessage> = yield* call(web3SendChannel, txPromiEvent);
    let initialConfirm = false;
    while (true) {
        const message: Web3SendChannelMessage = yield* take(channel);
        const { type, hash, receipt, confirmations } = message;
        if (type === WEB3_SEND_HASH) {
            yield* put(EthTransactionCRUDActions.actions.upsert({ networkId, hash: hash! }));
            yield* put(
                EthSendCRUDActions.actions.update({
                    ...baseWeb3Send,
                    transactionHash: hash!,
                    status: EthSendStatus.PENDING_CONFIRMATION,
                } as any),
            );
        } else if (type === WEB3_SEND_RECEIPT) {
            yield* put(
                EthSendCRUDActions.actions.update({
                    ...baseWeb3Send,
                    receipt: receipt,
                    blockNumber: receipt?.blockNumber,
                    blockHash: receipt?.blockHash,
                    status: EthSendStatus.PENDING_CONFIRMATION,
                } as any),
            );
        } else if (type === WEB3_SEND_CONFIRMATION) {
            if (!initialConfirm && confirmations && confirmations > 0) {
                initialConfirm = true;
                const ethSend = {
                    ...baseWeb3Send,
                    confirmations: confirmations,
                    status: EthSendStatus.CONFIRMED,
                };
                yield* put(EthSendCRUDActions.actions.update(ethSend as any));
            }
        } else if (type === WEB3_SEND_ERROR) {
            throw new Error(message.error);
        }
    }
}
