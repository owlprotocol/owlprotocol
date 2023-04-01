/* eslint-disable */
import { ERC20CRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ERC20CRUD.actions.dbCreating>): Generator<any, any> { }

export function* dbUpdatingSaga(action: ReturnType<typeof ERC20CRUD.actions.dbUpdating>): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(action: ReturnType<typeof ERC20CRUD.actions.dbDeleting>): Generator<any, any> { }
