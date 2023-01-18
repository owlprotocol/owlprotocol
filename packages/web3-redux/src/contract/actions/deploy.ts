import { createAction2 } from '@owlprotocol/crud-redux';
import { AbiItem } from '../../utils/web3-utils/index.js';

import { name } from '../common.js';
import * as Contracts from '@owlprotocol/contracts';
import type { TransactionReceipt } from 'web3-core';

/** @internal */
export const DEPLOY = `${name}/DEPLOY`;

//Deploy type, regular, initialize, ERC1167 Minimal Proxy, Upgradeable Beacon Proxy
export enum DeployType {
    REGULAR = 'REGULAR',
    INITIALIZE = 'INITIALIZE', //CREATE2 Deploy
    PROXY_1167 = 'PROXY_1167', //CREATE2 Deploy with 1167 Proxy
    PROXY_BEACON = 'PROXY_BEACON' //CREATE2 Deploy with Upgradeable Beacon Proxy
}

export interface DeployActionInputBase {
    networkId: string;
    abi: AbiItem[];
    args: any[];
    from: string;
    label?: string;
    tags?: string[];
    onSuccess?: (address: string, receipt?: TransactionReceipt) => void;
    onError?: (error: Error) => void;
}

export interface DeployActionInputRegular extends DeployActionInputBase {
    bytecode: string;
    deployType: DeployType.REGULAR;
}

export interface DeployActionInputInitialize extends DeployActionInputBase {
    bytecode: string;
    deployType: DeployType.INITIALIZE;
    //Deploy salt for CREATE2 deployments
    deploySalt?: string;
    //Deployment salt is determined by sender address
    deploySaltSenderDeterministic?: boolean;
}

export interface DeployActionInputProxy1167 extends DeployActionInputBase {
    deployType: DeployType.PROXY_1167;
    //Deploy salt for CREATE2 deployments
    deploySalt?: string;
    //Deployment salt is determined by sender address
    deploySaltSenderDeterministic?: boolean;
    //PROXY_1167 deployments
    deployImplementationAddress: string;
}

export interface DeployActionInputProxyBeacon extends DeployActionInputBase {
    deployType: DeployType.PROXY_BEACON;
    //Deploy salt for CREATE2 deployments
    deploySalt?: string;
    //Deployment salt is determined by sender address
    deploySaltSenderDeterministic?: boolean;
    //PROXY_BEACON deployments
    deployBeaconAddress: string;
}


/** @internal */
export type DeployActionInput = DeployActionInputRegular | DeployActionInputInitialize | DeployActionInputProxy1167 | DeployActionInputProxyBeacon

export function isDeployRegular(input: DeployActionInput): input is DeployActionInputRegular {
    return input.deployType === DeployType.REGULAR;
}
export function isDeployInitialize(input: DeployActionInput): input is DeployActionInputInitialize {
    return input.deployType === DeployType.INITIALIZE;
}
export function isDeployProxy1167(input: DeployActionInput): input is DeployActionInputProxy1167 {
    return input.deployType === DeployType.PROXY_1167;
}
export function isDeployProxyBeacon(input: DeployActionInput): input is DeployActionInputProxyBeacon {
    return input.deployType === DeployType.PROXY_BEACON;
}

/**
/** @category Actions */
export const deployAction = createAction2(DEPLOY, (payload: DeployActionInput) => {
    if (isDeployInitialize(payload)) {
        return {
            ...payload,
            from: payload.from?.toLowerCase(),
            deploySalt: payload.deploySalt ?? Contracts.Utils.ERC1167Factory.DEFAULT_SALT,
            deploySaltSenderDeterministic: true,
        } as DeployActionInputInitialize
    } else if (isDeployProxy1167(payload)) {
        return {
            ...payload,
            from: payload.from?.toLowerCase(),
            deploySalt: payload.deploySalt ?? Contracts.Utils.ERC1167Factory.DEFAULT_SALT,
            deploySaltSenderDeterministic: true,
        } as DeployActionInputProxy1167
    } else if (isDeployProxyBeacon(payload)) {
        return {
            ...payload,
            from: payload.from?.toLowerCase(),
            deploySalt: payload.deploySalt ?? Contracts.Utils.ERC1167Factory.DEFAULT_SALT,
            deploySaltSenderDeterministic: true,
        } as DeployActionInputProxyBeacon
    } else {
        return {
            ...payload,
            from: payload.from?.toLowerCase()
        } as DeployActionInputRegular
    }
});
/** @internal */
export type DeployAction = ReturnType<typeof deployAction>;
/** @internal */
export const isDeployAction = deployAction.match;

export default deployAction;
