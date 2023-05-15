export { };
/*
import { assert } from "chai";
import type { Contract as Web3Contract } from "web3-eth-contract";
import { testSaga } from "redux-saga-test-plan";
import * as Contracts from "@owlprotocol/contracts";
import { sleep } from "@owlprotocol/utils";
import { ReduxError } from "@owlprotocol/crud-redux";
import { contractCallSaga } from "./contractCall.js";
import { AbiItem } from "../../utils/web3-utils/index.js";

import { ContractName } from "@owlprotocol/web3-models";

import { createStore, StoreType } from "../../store.js";
import { contractSendAction as callAction } from "@owlprotocol/web3-actions";
import { EthCallCRUDActions} from "../../ethmodels/ethcall/crud.js";
import { ContractCRUDActions} from "../crud.js";
import { getContractCall } from "../db/getContractCall.js";
import { getContractCall } from "../db/getContractCall.js";
import { network1336 } from "../../network/data.js";
import { ADDRESS_0 } from "../../data.js";
import { NetworkCRUDActions} from "../../network/crud.js";

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${ContractName}/sagas/call.ts`, () => {
    let accounts: string[];
    let store: StoreType;

    let web3Contract: Web3Contract;
    let address: string;

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    describe("unit", () => {
        beforeEach(async () => {
            address = ADDRESS_0;
            web3Contract = await new web3.eth.Contract(Contracts.Artifacts.BlockNumber.abi as AbiItem[], address);
        });

        it.skip("call - success", async () => {
            const tx = web3Contract.methods.getValue();
            const data = tx.encodeABI();
            const gas = await tx.estimateGas();

            const action = callAction({
                networkId,
                address,
                method: "getValue",
            });
            const ethCall = EthCallCRUD.validate({
                networkId,
                to: address,
                data,
            });
            const returnValue = 0;
            testSaga(contractCallSaga, action)
                .next()
                .next({ web3Contract, address })
                .call(EthCallDexie.get, { networkId, to: address, data })
                .next(undefined)
                .put(EthCallCRUDActions.actions.create({ ...ethCall, status: "LOADING" }, action.meta.uuid))
                .next()
                //.call(tx.estimateGas)
                .next(gas)
                //.call(tx.call, { ...ethCall, gas })
                .next(returnValue)
                .put(
                    EthCallCRUDActions.actions.update(
                        {
                            ...ethCall,
                            returnValue: returnValue,
                            status: "SUCCESS",
                        },
                        action.meta.uuid,
                    ),
                )
                .next()
                .isDone();
        });
    });

    describe("store", () => {
        beforeEach(async () => {
            web3Contract = await new web3.eth.Contract(Contracts.Artifacts.BlockNumber.abi as AbiItem[])
                .deploy({
                    data: Contracts.Artifacts.BlockNumber.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: "875000000" });
            address = web3Contract.options.address.toLowerCase();

            store = createStore();
            store.dispatch(NetworkCRUDActions.actions.create({ networkId: networkId }));
            store.dispatch(NetworkCRUDActions.actions.reduxUpsert(network1336));
            store.dispatch(
                ContractCRUDActions.actions.create({
                    networkId,
                    address,
                    abi: Contracts.Artifacts.BlockNumber.abi as AbiItem[],
                }),
            );
        });

        describe("call", () => {
            it.skip("(): error contract revert", async () => {
                //Error caused by contract revert
                const action = callAction({
                    networkId,
                    address,
                    method: "revertTx",
                });
                store.dispatch(action);
                await sleep(300);

                //Call an invalid function
                const ethCall = await getContractCall(store.getState(), networkId, address, "revertTx");
                const value = ethCall?.returnValue;
                //TODO: Fix bug
                const error = await ReduxError.db.get(action.meta.uuid);

                assert.isUndefined(value, "returnValue");
                assert.isDefined(error, "error");
                assert.equal(
                    error?.errorMessage,
                    "VM Exception while processing transaction: reverted with reason string 'Transaction reverted'",
                    "error.message",
                );
            });

            it("(): success", async () => {
                //const ethCallInitial = ethCall;
                //const rpcBatchInitial = rpcBatch;

                const tx2 = await web3Contract.methods.setValue(42);
                const gas2 = await tx2.estimateGas();
                await tx2.send({ from: accounts[0], gas: gas2, gasPrice: "875000000" });

                store.dispatch(
                    callAction({
                        networkId,
                        address,
                        method: "getValue",
                        maxCacheAge: Number.MAX_SAFE_INTEGER,
                    }),
                );
                await sleep(300);

                //Selector
                const value = await getContractCall(store.getState(), networkId, address, "getValue");

                assert.equal(value, 42, "getValue");
                assert.strictEqual(value, "42", "getValue");

                const ethCall = await EthCallDexie.get({
                    networkId,
                    to: address,
                    methodSignature: "getValue()",
                });
                log.debug(ethCall);
                //assert.equal(rpcBatch - rpcBatchInitial, 0, 'rpc_batch rpc calls != expected');
                //assert.equal(ethCall - ethCallInitial, 1, 'eth_call rpc calls != expected');
            });
        });
    });
});
*/
