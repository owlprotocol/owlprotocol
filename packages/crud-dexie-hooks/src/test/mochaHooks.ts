import { TestDexie } from "@owlprotocol/crud-dexie/test";
import { JSDOM } from "jsdom";

//TODO: Stop using in-memory db
const beforeAll = async () => {
    const { window } = new JSDOM("", { url: "http://localhost:8080" });
    //@ts-expect-error
    global.window = window;
    global.document = window.document;
};

const beforeEach = async () => {
    await TestDexie.clear();
};

const afterAll = async () => {
    console.debug("Tests finished.");
};

const afterEach = async () => {
    await TestDexie.clear();
};

export const mochaHooks = {
    beforeAll,
    beforeEach,
    afterAll,
    afterEach,
};
