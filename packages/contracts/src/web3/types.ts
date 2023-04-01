/* eslint-disable import/no-unresolved */

import type { BaseContract } from "../typechain/web3/types.js";

/****** Web3 *****/
export type {
    NonPayableTx,
    NonPayableTransactionObject,
    PayableTx,
    PayableTransactionObject,
} from "../typechain/web3/types.js";

/***** Owl Protocol *****/
type Await<T> = T extends PromiseLike<infer U> ? U : T;
export type Web3ContractMethod<T extends BaseContract, K extends keyof T["methods"]> = T["methods"][K];
export type Web3ContractMethodParams<T extends BaseContract, K extends keyof T["methods"]> = Parameters<
    Web3ContractMethod<T, K>
>;
export type Web3ContractMethodCall<T extends BaseContract, K extends keyof T["methods"]> = Await<
    ReturnType<ReturnType<Web3ContractMethod<T, K>>["call"]>
>;
