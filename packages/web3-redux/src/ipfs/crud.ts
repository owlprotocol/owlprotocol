import { name } from './common.js';
import { IpfsId, Ipfs } from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';

export const IPFSCacheCRUD = createCRUDModel<
    typeof name,
    IpfsId,
    Ipfs,
    Ipfs,
    Ipfs,
    Web3ReduxDexie
>(name, getDB);
export default IPFSCacheCRUD;
