import { assert } from "chai";
import type { Contract as Web3Contract } from "web3-eth-contract";
import * as Contracts from "@owlprotocol/contracts";
import { sleep } from "@owlprotocol/utils";
import { AbiItem } from "../../../utils/web3-utils/index.js";

import { EthCallName } from "../common.js";

import { createStore, StoreType } from "../../../store.js";
import { EthCallCRUD } from "../crud.js";
import { network1336 } from "../../../network/data.js";
import { NetworkCRUD } from "../../../network/crud.js";
import { web3CallAction } from "../actions/web3Call.js";
import { EthCallStatus } from "../model/interface.js";

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
            web3Contract = await new web3.eth.Contract(Contracts.Artifacts.BlockNumber.abi as AbiItem[])
                .deploy({
                    data: Contracts.Artifacts.BlockNumber.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: "875000000" });
            address = web3Contract.options.address.toLowerCase();

            store = createStore();
            store.dispatch(NetworkCRUD.actions.create({ networkId: networkId }));
            store.dispatch(NetworkCRUD.actions.reduxUpsert(network1336));
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
                const ethCall = await EthCallCRUD.db.get({
                    networkId,
                    to: address,
                    methodFormatFull: "getValue() returns (uint256)",
                });
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
                const ethCall = await EthCallCRUD.db.get({
                    networkId,
                    to: address,
                    methodFormatFull: "revertTx()",
                });
                assert.equal(ethCall?.status, EthCallStatus.ERROR);
            });
        });
    });
});
