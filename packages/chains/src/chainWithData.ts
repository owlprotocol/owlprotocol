import { THIRDWEB_API_KEY, INFURA_API_KEY, ANKR_API_KEY, ALCHEMY_API_KEY } from "@owlprotocol/envvars";
import { Chain } from "./types.js";

export interface ChainWithData extends Chain {

    readonly rpcThirdWeb?: string;
    readonly rpcAlchemy?: string;
    readonly rpcInfura?: string;
    readonly rpcPublic?: string;
    readonly rpcDefault?: string;

    readonly wsThirdWeb?: string;
    readonly wsAlchemy?: string;
    readonly wsInfura?: string;
    readonly wsPublic?: string;
    readonly wsDefault?: string;

    readonly explorerEtherscan?: string;
    readonly explorerBlockscout?: string;
}

export function getChainWithData(chain: Chain) {
    let rpcThirdWeb = chain.rpc.find((r) => {
        return THIRDWEB_API_KEY && r.startsWith("https://") && r.includes("${THIRDWEB_API_KEY}")
    })
    if (rpcThirdWeb && THIRDWEB_API_KEY) rpcThirdWeb = rpcThirdWeb.replace("${THIRDWEB_API_KEY}", THIRDWEB_API_KEY)

    let wsThirdWeb = chain.rpc.find((r) => {
        return THIRDWEB_API_KEY && r.startsWith("wss://") && r.includes("${THIRDWEB_API_KEY}")
    })
    if (wsThirdWeb && THIRDWEB_API_KEY) wsThirdWeb = wsThirdWeb.replace("${THIRDWEB_API_KEY}", THIRDWEB_API_KEY)

    let rpcInfura = chain.rpc.find((r) => {
        return INFURA_API_KEY && r.startsWith("https://") && r.includes("${INFURA_API_KEY}")
    })
    if (rpcInfura && INFURA_API_KEY) rpcInfura = rpcInfura.replace("${INFURA_API_KEY}", INFURA_API_KEY)

    let wsInfura = chain.rpc.find((r) => {
        return INFURA_API_KEY && r.startsWith("wss://") && r.includes("${INFURA_API_KEY}")
    })
    if (wsInfura && INFURA_API_KEY) wsInfura = wsInfura.replace("${INFURA_API_KEY}", INFURA_API_KEY)

    let rpcAnkr = chain.rpc.find((r) => {
        return ANKR_API_KEY && r.startsWith("https://") && r.includes("${ANKR_API_KEY}")
    })
    if (rpcAnkr && ANKR_API_KEY) rpcAnkr = rpcAnkr.replace("${ANKR_API_KEY}", ANKR_API_KEY)

    let wsAnkr = chain.rpc.find((r) => {
        return ANKR_API_KEY && r.startsWith("wss://") && r.includes("${ANKR_API_KEY}")
    })
    if (wsAnkr && ANKR_API_KEY) wsAnkr = wsAnkr.replace("${ANKR_API_KEY}", ANKR_API_KEY)

    //TODO: Alchemy API Keys are per-app (network) selected string will only be template string
    let rpcAlchemy = chain.rpc.find((r) => {
        return ALCHEMY_API_KEY && r.startsWith("https://") && r.includes("${ALCHEMY_API_KEY}")
    })
    if (rpcAlchemy && ALCHEMY_API_KEY) rpcAlchemy = rpcAlchemy.replace("${ALCHEMY_API_KEY}", ALCHEMY_API_KEY)

    let wsAlchemy = chain.rpc.find((r) => {
        return ALCHEMY_API_KEY && r.startsWith("wss://") && r.includes("${ALCHEMY_API_KEY}")
    })
    if (wsAlchemy && ALCHEMY_API_KEY) wsAlchemy = wsAlchemy.replace("${ALCHEMY_API_KEY}", ALCHEMY_API_KEY)

    let rpcPublic = chain.rpc.find((r) => {
        return r.startsWith("https://") &&
            !r.includes("${THIRDWEB_API_KEY}") &&
            !r.includes("${INFURA_API_KEY}") &&
            !r.includes("${ANKR_API_KEY}") &&
            !r.includes("${ALCHEMY_API_KEY}")
    })

    let wsPublic = chain.rpc.find((r) => {
        return r.startsWith("wss://") &&
            !r.includes("${THIRDWEB_API_KEY}") &&
            !r.includes("${INFURA_API_KEY}") &&
            !r.includes("${ANKR_API_KEY}") &&
            !r.includes("${ALCHEMY_API_KEY}")
    })

    const rpcDefault = rpcInfura ?? rpcThirdWeb ?? rpcAnkr ?? rpcAlchemy ?? rpcPublic
    const wsDefault = wsInfura ?? wsThirdWeb ?? wsAnkr ?? wsAlchemy ?? wsPublic

    let explorerEtherscan = chain.explorers?.find((r) => {
        return r.name.toLowerCase().includes("scan")
    })
    let explorerBlockscout = chain.explorers?.find((r) => {
        return r.name.toLowerCase().includes("scout")
    })
    const explorerDefault = explorerEtherscan ?? explorerBlockscout

    return {
        ...chain,
        rpcThirdWeb,
        wsThirdWeb,
        rpcInfura,
        wsInfura,
        rpcAnkr,
        wsAnkr,
        rpcAlchemy,
        wsAlchemy,
        rpcPublic,
        wsPublic,
        rpcDefault,
        wsDefault,
        explorerEtherscan,
        explorerBlockscout,
        explorerDefault
    } as ChainWithData
}
