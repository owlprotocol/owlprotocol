import { assert } from "chai";
import type { Contract as Web3Contract } from "web3-eth-contract";
import { sleep } from "@owlprotocol/utils";

import { EthCallName, validateIdPartialEthCall } from "@owlprotocol/web3-models";
import { NetworkCRUDActions, web3CallAction } from "@owlprotocol/web3-actions";
import { EthCallStatus } from "@owlprotocol/web3-models";
import { EthCallDexie } from "@owlprotocol/web3-dexie";
import { getTestNetwork } from "@owlprotocol/web3-test-utils";

import { createStore, StoreType } from "../../store.js";
import {TypechainEthers} from "@owlprotocol/contracts";

const network1336 = getTestNetwork();
const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${EthCallName}/sagas/call.ts`, () => {
    let accounts: string[];
    let store: StoreType;

    let web3Contract: Web3Contract;
    let address: string;

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    describe("store", () => {
        beforeEach(async () => {
            web3Contract = await new web3.eth.Contract(TypechainEthers.BlockNumber__factory.abi as any)
                .deploy({
                    data: TypechainEthers.BlockNumber__factory.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: "875000000" });
            address = web3Contract.options.address.toLowerCase();

            store = createStore();
            store.dispatch(NetworkCRUDActions.actions.create({ networkId: networkId }));
            store.dispatch(NetworkCRUDActions.actions.reduxUpsert(network1336));
        });

        describe("web3Call", () => {
            it("(): success", async () => {
                const tx2 = await web3Contract.methods.setValue(42);
                const gas2 = await tx2.estimateGas();
                await tx2.send({ from: accounts[0], gas: gas2, gasPrice: "875000000" });

                store.dispatch(
                    web3CallAction({
                        networkId,
                        to: address,
                        methodFormatFull: "getValue() returns (uint256)",
                        args: [],
                        maxCacheAge: Number.MAX_SAFE_INTEGER,
                    }),
                );
                await sleep(1000);

                //Selector
                const ethCall = await EthCallDexie.get(
                    validateIdPartialEthCall({
                        networkId,
                        to: address,
                        methodFormatFull: "getValue() returns (uint256)",
                        args: [],
                    }),
                );
                assert.equal(ethCall?.status, EthCallStatus.SUCCESS);
                assert.equal(ethCall?.returnValue, 42);
            });

            it("(): revertTx", async () => {
                const tx2 = await web3Contract.methods.setValue(42);
                const gas2 = await tx2.estimateGas();
                await tx2.send({ from: accounts[0], gas: gas2, gasPrice: "875000000" });

                store.dispatch(
                    web3CallAction({
                        networkId,
                        to: address,
                        methodFormatFull: "revertTx()",
                        args: [],
                        maxCacheAge: Number.MAX_SAFE_INTEGER,
                    }),
                );
                await sleep(2000);

                //Selector
                const ethCall = await EthCallDexie.get(
                    validateIdPartialEthCall({
                        networkId,
                        to: address,
                        methodFormatFull: "revertTx()",
                        args: [],
                    }),
                );
                assert.equal(ethCall?.status, EthCallStatus.ERROR);
            });
        });
    });
});
