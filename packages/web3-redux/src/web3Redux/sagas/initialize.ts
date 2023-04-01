import { put, call, all } from "typed-redux-saga";
import { interfaceIdNames, interfaces } from "@owlprotocol/contracts";
import { Action } from "redux";
import { flatten, zip } from "lodash-es";
import { ContractCRUD } from "../../contract/crud.js";
import { fetchContractActions } from "../../contractmodels/actions/fetchContractActions.js";
import { NetworkCRUD } from "../../network/crud.js";
import { defaultNetworks } from "../../network/defaults.js";
import { Network } from "../../network/model/interface.js";
import { ConfigCRUD } from "../../config/crud.js";
import { ERC165CRUD } from "../../contractmodels/erc165/crud.js";
import { inferInterfaceAction } from "../../contractmodels/erc165/actions/inferInterface.js";
import { EthCallCRUD } from "../../ethmodels/ethcall/crud.js";
import { EthCallStatus } from "../../ethmodels/ethcall/model/interface.js";

export function* initializeSaga(): Generator<any, any, any> {
    //Load existing data to redux
    //Config
    const config = yield* call(ConfigCRUD.db.get, "0");
    const account = config?.account;

    //Networks
    //Create default networks
    const networksCreate = Object.values(defaultNetworks()) as Network[];
    yield* put(NetworkCRUD.actions.createBatched(networksCreate));

    //TODO: Config gets overriden by defaults
    //const networks = yield* call(NetworkCRUD.db.all);
    const networksUpsert = NetworkCRUD.actions.reduxUpsertBatched(networksCreate);
    yield* put(networksUpsert);

    const actions: Action[] = [];

    //Contracts
    const contracts = yield* call(ContractCRUD.db.all);
    //Get contracts that have not yet been inferred (aka ERC165 supportsInterface has not been called yet)
    //Note: An erroring call likely means the contract does not support ERC165 but this also means the infer saga has been run
    const contractsSupports165 = yield* call(
        EthCallCRUD.db.bulkGet,
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

    const erc165 = yield* call(ERC165CRUD.db.all);
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
