import type { Signer } from "ethers";
import type { BaseProvider } from "@ethersproject/providers";

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
    if (process.env.LOG_LEVEL != "info") {
        console.log(
            `${networkName.padEnd(20)}\t${contractName.padEnd(30)}\t${deploymentType.padEnd(20)}\t${status.padEnd(
                10,
            )}\t${address}`,
        );
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
