/**
 * EVM smart contract module.
 * Used to query balances, call smart contracts, send transactions and sync events.
 * Common pre-configured abstractions include ERC20, ERC721, ERC1155, and ERC165.
 * @module Contract
 */

import * as Actions from "./actions/index.js";
import { ContractCRUD } from "./crud.js";
import * as Sagas from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const Contract = {
    name: ContractCRUD.name,
    actions: {
        ...ContractCRUD.actions,
        call: Actions.contractCallAction,
        callSynced: Actions.contractCallSynced,
        deploy: Actions.contractDeployAction,
        fetchAbi: Actions.fetchAbi,
        fetchTransactions: Actions.fetchTransactions,
        getBalance: Actions.getBalanceAction,
        getCode: Actions.getCodeAction,
        getNonce: Actions.getNonceAction,
        getNonceSynced: Actions.getNonceSynced,
        send: Actions.contractSendAction,
    },
    actionTypes: ContractCRUD.actionTypes,
    db: ContractCRUD.db,
    hooks: {
        ...ContractCRUD.hooks,
        useContract: Hooks.useContract,
        useContractCall: Hooks.useContractCall,
        useContractWithInterfaceIds: Hooks.useContractsWithInterfaceIds,
        useFetchAbi: Hooks.useFetchAbi,
        useFetchTransactions: Hooks.useFetchTransactions,
        useGetBalance: Hooks.useGetBalance,
        useGetCode: Hooks.useGetCode,
        useGetNonce: Hooks.useGetCode,
    },
    sagas: {
        ...ContractCRUD.sagas,
        rootSaga: Sagas.contractSaga,
    },
    selectors: ContractCRUD.selectors,
    isAction: ContractCRUD.isAction,
    reducer: ContractCRUD.reducer,
    validate: ContractCRUD.validate,
    validateId: ContractCRUD.validateId,
    validateWithRedux: ContractCRUD.validateWithRedux,
    encode: ContractCRUD.encode,
};
