import { Web3Dexie } from "../dbIndex.js";

const beforeAll = async () => { };

const beforeEach = async () => {
    await Promise.all([Web3Dexie.clear()]);
};

const afterAll = async () => {
    console.debug("Tests finished.");
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
