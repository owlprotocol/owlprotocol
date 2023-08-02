import { ethers, utils } from "ethers";
import { PRIVATE_KEY_ANVIL, PUBLIC_ADDRESS_FACTORY_DEPLOYER } from "@owlprotocol/envvars";
import { RunTimeEnvironment } from "../utils.js";

/**
 * Deployment is always the same regardless of contract.
 * We get the bytecode & name for a deterministic deployment from the Proxy Factory.
 */
export const BalancesDeploy = async ({ provider, network }: RunTimeEnvironment) => {
    if (network.name == "anvil") {
        const anvil = new ethers.Wallet(PRIVATE_KEY_ANVIL, provider);
        //Fund accounts on anvil
        const accounts = network.config.accounts;
        const addressList = [PUBLIC_ADDRESS_FACTORY_DEPLOYER];

        for (const pKey of accounts) {
            const address = await new ethers.Wallet(pKey, provider).getAddress();
            addressList.push(address);
        }

        for (const address of addressList) {
            const balance = await provider.getBalance(address);
            if (balance.lt(ethers.utils.parseEther("10.0"))) {
                const tx = await anvil.sendTransaction({
                    to: address,
                    value: utils.parseEther("10.0").sub(balance),
                    gasLimit: 21000,
                    type: ((network.config as any).eip1559 as boolean) ? 2 : 0,
                });
                await tx.wait(1);
            }
        }
    }
};

BalancesDeploy.tags = ["Balances"];
BalancesDeploy.dependencies = [] as string[];
