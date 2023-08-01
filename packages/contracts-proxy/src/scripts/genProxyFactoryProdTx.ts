import { PRIVATE_KEY_FACTORY_DEPLOYER } from "@owlprotocol/envvars";
import { Wallet, utils } from "ethers";
import { ERC1167Factory__factory } from "../typechain/ethers/index.js";

async function proxyFactoryProdTx(chainId: number) {
    const pkey = PRIVATE_KEY_FACTORY_DEPLOYER;
    if (!pkey) {
        throw new Error(`PRIVATE_KEY_FACTORY_DEPLOYER ${PRIVATE_KEY_FACTORY_DEPLOYER}`);
    }
    const wallet = new Wallet(pkey);
    return wallet.signTransaction({
        data: ERC1167Factory__factory.bytecode,
        chainId,
        nonce: 0,
        gasPrice: utils.parseUnits("10", "gwei").toNumber(),
        gasLimit: 600000,
        type: 0,
    });
}

async function main() {
    //anvil
    const tx = await proxyFactoryProdTx(31337);
    console.debug(tx);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
