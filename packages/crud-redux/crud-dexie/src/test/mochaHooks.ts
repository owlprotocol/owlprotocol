import log from "loglevel";

//TODO: Stop using in-memory db
const beforeAll = async () => { };

const beforeEach = async () => {
    //await TestDexie.clear();
};

const afterAll = async () => {
    log.debug("Tests finished.");
};

const afterEach = async () => {
    //await TestDexie.clear();
};

export const mochaHooks = {
    beforeAll,
    beforeEach,
    afterAll,
    afterEach,
};
