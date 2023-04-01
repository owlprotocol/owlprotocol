import Web3 from "web3";
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import { Config } from "@owlprotocol/web3-redux";

// CONFIG
const locale = "en_US";
const API_KEY = "";

export function useMagicConnect(): any {
    const networks = [
        {
            rpcUrl: "https://rpc.ankr.com/eth",
            chainId: 1,
        },
        {
            rpcUrl: "https://polygon-rpc.com",
            chainId: 137,
        },
        {
            rpcUrl: "https://mainnet.optimism.io",
            chainId: 10,
        },
    ];

    // Ethereum Instance
    const magicEthereum = new Magic(API_KEY, {
        locale,
        network: networks[0],
        extensions: [new ConnectExtension() as any],
    });
    //@ts-expect-error
    magicEthereum.network = "ethereum";

    // Polygon Instance
    const magicPolygon = new Magic(API_KEY, {
        locale,
        network: networks[1],
        extensions: [new ConnectExtension() as any],
    });
    //@ts-expect-error
    magicPolygon.network = "polygon";

    // Optimism Instance
    const magicOptimism = new Magic(API_KEY, {
        locale,
        network: networks[2],
        extensions: [new ConnectExtension() as any],
    });
    //@ts-expect-error
    magicOptimism.network = "optimism";

    const magic = {
        magicEthereum,
        magicPolygon,
        magicOptimism,
    };

    // Web3 Providers
    const web3Ethereum = new Web3(magicEthereum.rpcProvider);
    const web3Polygon = new Web3(magicPolygon.rpcProvider);
    const web3Optimism = new Web3(magicOptimism.rpcProvider);
    const web3 = { web3Ethereum, web3Polygon, web3Optimism };

    return { web3, magic, Config };
}

export default useMagicConnect;
