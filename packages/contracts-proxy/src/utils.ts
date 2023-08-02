import type { Signer } from "ethers";
import type { BaseProvider } from "@ethersproject/providers";
import log from "loglevel";

export interface RunTimeEnvironment {
    provider: BaseProvider;
    signers: Signer[];
    network: any; //Partial<HardhatRuntimeEnvironment['network']>
}

export function logDeployment(
    networkName: string,
    contractName: string,
    address: string,
    deploymentType: "nicks" | "deterministic" | "implementation" | "proxy" | "beacon" | "beacon-proxy" | "example",
    status: "exists" | "deployed" | "failed",
) {
    const msg = `${networkName.padEnd(20)}\t${contractName.padEnd(30)}\t${deploymentType.padEnd(20)}\t${status.padEnd(
        10,
    )}\t${address}`
    console.debug(msg)
    if (process.env.LOG_LEVEL != "info") {
        log.log(msg);
    }
}

interface Props {
    chainId: number;
    name: string;
    tokenId?: number;
}
export const getContractURIs = ({ chainId, name, tokenId }: Props) => ({
    contractUri: `http://localhost:3020/${chainId}/${name}/metadata`,
    tokenUri: `http://localhost:3020/${chainId}/${name}/metadata/${tokenId}`,
});
