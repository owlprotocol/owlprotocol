import { ethers, providers, Signer, Wallet } from "ethers";
import { ANVIL_RPC, PRIVATE_KEY_0 } from "@owlprotocol/envvars";

const providersMap = new Map<string, providers.JsonRpcProvider>();
const networksSet = new Set<string>();

const testProvider = new providers.JsonRpcProvider(ANVIL_RPC);
const maticProvider = new providers.JsonRpcProvider(
    "https://rpc.ankr.com/polygon_mumbai"
);

// TODO: call setup
export async function setupProviders() {
    // Check if networksSet has already been generated
    if (networksSet.size > 0) return;

    networksSet.add("1");
    providersMap.set("1", testProvider);
}

export function getProvider(networkId: string): providers.JsonRpcProvider {
    // TODO: pick from providersMap
    let provider = providersMap.get(networkId);

    if (networkId == "80001" || networkId == "0x13881") {
        return maticProvider;
    }

    // TODO: replace when done
    provider = testProvider;
    return provider;
}

export function getSigner(networkId: string): Signer {
    if (networkId == "80001" || networkId == "0x13881") {
        if (!PRIVATE_KEY_0) {
            throw new Error("missing PRIVATE_KEY_0");
        }
        const signer = new ethers.Wallet(PRIVATE_KEY_0, maticProvider);
        return signer;
    }

    return testProvider.getSigner();
}
