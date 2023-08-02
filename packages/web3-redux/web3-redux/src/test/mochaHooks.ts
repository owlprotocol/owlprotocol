import { Web3Dexie } from "@owlprotocol/web3-dexie";
import log from "loglevel";

const beforeAll = async () => { };

const beforeEach = async () => {
    await Promise.all([Web3Dexie.clear()]);
};

const afterAll = async () => {
    log.debug("Tests finished.");
};

const afterEach = async () => {
    await Promise.all([Web3Dexie.clear()]);
};

export const mochaHooks = {
    beforeAll,
    beforeEach,
    afterAll,
    afterEach,
};
