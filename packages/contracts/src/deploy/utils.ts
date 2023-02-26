import type { Signer } from 'ethers';
import type { BaseProvider } from '@ethersproject/providers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';

export interface RunTimeEnvironment {
    provider: BaseProvider;
    signers: Signer[];
    network: any //Partial<HardhatRuntimeEnvironment['network']>
}

export function logDeployment(
    networkName: string,
    contractName: string,
    address: string,
    deploymentType: 'nicks' | 'deterministic' | 'implementation' | 'proxy' | 'beacon' | 'beacon-proxy',
    status: 'exists' | 'deployed' | 'failed',
) {
    if (process.env.LOG_LEVEL != 'info') {
        console.log(
            `${networkName.padEnd(20)}\t${contractName.padEnd(30)}\t${deploymentType.padEnd(20)}\t${status.padEnd(
                10,
            )}\t${address}`,
        );
    }
}
