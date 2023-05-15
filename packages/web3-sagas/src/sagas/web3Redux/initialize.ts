import { put, call, all } from "typed-redux-saga";
import { interfaceIdNames, interfaces } from "@owlprotocol/contracts";
import { Action } from "redux";
import { flatten, zip } from "lodash-es";
import { ConfigDexie, ContractDexie, ERC165Dexie, EthCallDexie } from "@owlprotocol/web3-dexie";
import { NetworkCRUDActions, fetchContractActions, inferInterfaceAction } from "@owlprotocol/web3-actions";
import { EthCallStatus, Network, defaultNetworks } from "@owlprotocol/web3-models";

export function* initializeSaga(): Generator<any, any, any> {
    //Load existing data to redux
    //Config
    const config = yield* call(ConfigDexie.get, { id: "0" });
    const account = config?.account;

    //Networks
    //Create default networks
    const networksCreate = Object.values(defaultNetworks) as Network[];
    yield* put(NetworkCRUDActions.actions.createBatched(networksCreate));

    //TODO: Config gets overriden by defaults
    //const networks = yield* call(NetworkCRUD.db.all);
    const networksUpsert = NetworkCRUDActions.actions.reduxUpsertBatched(networksCreate);
    yield* put(networksUpsert);

    const actions: Action[] = [];

    //Contracts
    const contracts = yield* call(ContractDexie.all);
    //Get contracts that have not yet been inferred (aka ERC165 supportsInterface has not been called yet)
    //Note: An erroring call likely means the contract does not support ERC165 but this also means the infer saga has been run
    const contractsSupports165 = yield* call(
        EthCallDexie.bulkGet,
        contracts.map(({ networkId, address }) => {
            return {
                networkId,
                to: address,
                data: interfaces.IERC165.interface.encodeFunctionData("supportsInterface", [
                    interfaces.IERC165.interfaceId,
                ]),
            };
        }),
    );

    actions.push(
        ...zip(contracts, contractsSupports165)
            .filter(([, ethcall]) => {
                //EthCall not sent yet
                return ethcall?.status != EthCallStatus.SUCCESS;
            })
            .map(([c]) => {
                //Infer
                const { networkId, address } = c!;
                return inferInterfaceAction({ networkId, address });
            }),
    );

    const erc165 = yield* call(ERC165Dexie.all);
    actions.push(
        ...flatten(
            erc165.map((e) => {
                const ifaceName = interfaceIdNames[e.interfaceId];
                return fetchContractActions(e.networkId, e.address, account, ifaceName);
            }),
        ),
    );

    yield* all(actions.map((a) => put(a)));

    //Eth Call
    /*
    //Retry errored out ethcalls?
    const ethcall = yield* call(EthCallCRUD.db.all)
    const ethcallLoading = ethcall.filter((f) => f.status === 'LOADING')
    */
    //Block subscriptions
    //TODO
}
