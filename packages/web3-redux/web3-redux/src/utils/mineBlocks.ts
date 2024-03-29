import type Web3 from "web3";

export function mineBlock(web3: Web3) {
    return new Promise((resolve) => {
        //@ts-ignore
        web3?.currentProvider.send({ method: "evm_mine", params: [] }, resolve);
    });
}

export async function mineBlocks(web3: Web3, count = 1) {
    for (let i = 0; i < count; i++) {
        await mineBlock(web3);
    }
}
