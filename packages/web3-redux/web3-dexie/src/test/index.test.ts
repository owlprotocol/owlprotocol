import { assert } from "chai"
import { ContractDexie, ERC165AbiDexie, ERC165Dexie, EthCallAbiDexie, EthLogAbiDexie, NetworkDexie } from "../crud/index.js"

describe("Initialize Dexie", () => {
    it("ERC165Abi", async () => {
        const result = await ERC165AbiDexie.all()
        assert.isAbove(result.length, 0, 'result.length')
    })

    it("EthCallAbi", async () => {
        const result = await EthCallAbiDexie.all()
        assert.isAbove(result.length, 0, 'result.length')
    })

    it("EthLogAbi", async () => {
        const result = await EthLogAbiDexie.all()
        assert.isAbove(result.length, 0, 'result.length')
    })

    it("Network", async () => {
        const result = await NetworkDexie.all()
        assert.isAbove(result.length, 0, 'result.length')
    })

    it("Contract", async () => {
        const result = await ContractDexie.all()
        assert.isAbove(result.length, 0, 'result.length')
    })

    it("ERC165", async () => {
        const result = await ERC165Dexie.all()
        assert.isAbove(result.length, 0, 'result.length')
    })
})

export { }
