import log from "loglevel";
import { Web3Dexie } from "../dbIndex.js";

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
