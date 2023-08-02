import { assert } from "chai";
import type Web3 from "web3";
import type { Contract as Web3Contract } from "web3-eth-contract";
import { sleep } from "@owlprotocol/utils";

import { getTestNetwork } from "@owlprotocol/web3-test-utils";
import { ContractName } from "@owlprotocol/web3-models";
import { NetworkCRUDActions, contractSendAction, ContractCRUDActions } from "@owlprotocol/web3-actions";
import { createStore, StoreType } from "../store.js";
import {TypechainEthers} from "@owlprotocol/contracts";

describe(`${ContractName}/contractSend.test.ts`, () => {
    let networkId: string;
    let web3: Web3; //Web3 loaded from store
    let web3Sender: Web3;
    let accounts: string[];
    let store: StoreType;
    let web3Contract: Web3Contract;

    let address: string;

    before(async () => {
        const network = getTestNetwork();
        networkId = network.networkId;
        web3 = network.web3;
        web3Sender = network.web3;
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(NetworkCRUDActions.actions.reduxUpsert({ networkId, web3, web3Sender }));

        const tx = new web3.eth.Contract(TypechainEthers.BlockNumber__factory.abi as any).deploy({
            data: TypechainEthers.BlockNumber__factory.bytecode,
        });
        const gas = await tx.estimateGas();
        web3Contract = await tx.send({
            from: accounts[0],
            gas,
            gasPrice: "875000000",
        });
        address = web3Contract.options.address;

        store.dispatch(
            ContractCRUDActions.actions.create({
                networkId,
                address,
                abi: TypechainEthers.BlockNumber__factory.abi as any,
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
