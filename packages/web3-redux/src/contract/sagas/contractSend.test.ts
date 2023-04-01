import { assert } from "chai";
import Web3 from "web3";
import type { Contract as Web3Contract } from "web3-eth-contract";
import { cloneDeep } from "lodash-es";
import * as Contracts from "@owlprotocol/contracts";
import { sleep } from "@owlprotocol/utils";
import { AbiItem } from "../../utils/web3-utils/index.js";

import { getWeb3Provider } from "../../test/index.js";
import { ContractName } from "../common.js";
import { networkId } from "../../test/data.js";

import { createStore, StoreType } from "../../store.js";
import { NetworkCRUD } from "../../network/crud.js";
import { contractSendAction } from "../actions/index.js";
import { ContractCRUD } from "../crud.js";

describe(`${ContractName}/sagas/contractSend.test.ts`, () => {
    let web3: Web3; //Web3 loaded from store
    let web3Sender: Web3;
    let accounts: string[];
    let store: StoreType;
    let web3Contract: Web3Contract;

    let address: string;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        //@ts-ignore
        web3Sender = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(NetworkCRUD.actions.reduxUpsert({ networkId, web3, web3Sender }));

        const tx = new web3.eth.Contract(cloneDeep(Contracts.Artifacts.BlockNumber.abi) as AbiItem[]).deploy({
            data: Contracts.Artifacts.BlockNumber.bytecode,
        });
        const gas = await tx.estimateGas();
        web3Contract = await tx.send({
            from: accounts[0],
            gas,
            gasPrice: "875000000",
        });
        address = web3Contract.options.address;

        store.dispatch(
            ContractCRUD.actions.create({
                networkId,
                address,
                abi: cloneDeep(Contracts.Artifacts.BlockNumber.abi) as AbiItem[],
            }),
        );
    });

    describe("send", () => {
        it("send()", async () => {
            store.dispatch(
                contractSendAction({
                    networkId,
                    from: accounts[0],
                    to: address,
                    method: "setValue",
                    args: [42],
                }),
            );

            await sleep(300);

            const value = await web3Contract.methods.getValue().call();
            assert.equal(value, 42, "setValue() did not work!");
        });
    });
});
