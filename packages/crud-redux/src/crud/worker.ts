import { channel } from '../channel.js';
import { getDB } from '../db.js';
import { ReduxErrorCRUD } from '../error/crud.js';
import { createStore } from '../store.js';

//TODO: Use real db for testing (bc no shared memory)
//const store = createStore()

console.debug(getDB())

//Shared messages across ALL workers
//Receivers _POST messages
channel.onmessage = (e) => {
    console.debug('shared', e.data);
};

//On send message to parent
self.onmessage = async (e) => {
    //console.debug('test0')
    //console.debug(e.data)
    //console.debug('test')
    const item1Dexie = await ReduxErrorCRUD.db.get({ id: '1' });
    console.debug({ item1Dexie })
    //postMessage({ item1Dexie })

    /*
    store.dispatch(e.data)
    const item2Dexie = await ReduxErrorCRUD.db.get({ id: '1' });
    console.debug({ item2Dexie })
    */

};

//On send error to parent
self.onerror = (e) => {
    console.error(e)
}
