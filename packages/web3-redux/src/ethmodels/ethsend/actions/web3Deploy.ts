import { Artifacts, Utils } from "@owlprotocol/contracts";
import { utils } from "ethers";
import { web3SendAction } from "./web3Send.js";
import {
    getEthCallAbiAndFormatFull,
    isWithData,
    isWithMethodAbi,
    isWithMethodFormat,
    WithArgs,
    WithData,
    WithMethodAbi,
    WithMethodFormat,
} from "../../ethcall/model/interface.js";

import { EthSendName } from "../common.js";

/** @internal */
export const CONTRACT_DEPLOY = `${EthSendName}/CONTRACT_DEPLOY`;

//Deploy type, regular, initialize, ERC1167 Minimal Proxy, Upgradeable Beacon Proxy
export enum Web3DeployType {
    //REGULAR = 'REGULAR',
    INITIALIZE = "INITIALIZE", //CREATE2 Deploy
    INITIALIZE_PROXY_1167 = "INITIALIZE_PROXY_1167", //CREATE2 Deploy with 1167 Proxy
    INITIALIZE_BEACON = "PROXY_BEACON", //CREATE2 Deploy with Upgradeable Beacon Proxy
}

export interface Web3DeployActionInputBase {
    readonly networkId: string;
    readonly from: string;
    readonly value?: string;
    readonly gas?: number;
}

/*
export interface WithDeployInputRegular {
    readonly bytecode: string;
    readonly deployType: Web3DeployType.REGULAR;
}
*/
export interface WithDeployInputInitialize {
    readonly bytecode: string;
    readonly deployType: Web3DeployType.INITIALIZE;
    //Deploy salt for CREATE2 deployments
    readonly deploySalt?: string;
    //Deployment salt is determined by sender address
    readonly deploySaltSenderDeterministic?: boolean;
}
export interface WithDeployInputProxy1167 {
    readonly deployType: Web3DeployType.INITIALIZE_PROXY_1167;
    //Deploy salt for CREATE2 deployments
    readonly deploySalt?: string;
    //Deployment salt is determined by sender address
    readonly deploySaltSenderDeterministic?: boolean;
    //PROXY_1167 deployments
    readonly deployImplementationAddress: string;
}
export interface WithDeployInputProxyBeacon {
    readonly deployType: Web3DeployType.INITIALIZE_BEACON;
    //Deploy salt for CREATE2 deployments
    readonly deploySalt?: string;
    //Deployment salt is determined by sender address
    readonly deploySaltSenderDeterministic?: boolean;
    //PROXY_BEACON deployments
    readonly deployBeaconAddress: string;
}

/*
export function isWithDeployInputRegular(item: any): item is WithDeployInputRegular {
    return (item as WithDeployInputRegular).deployType === Web3DeployType.REGULAR
}
*/
export function isWithDeployInputInitialize(item: any): item is WithDeployInputInitialize {
    return (item as WithDeployInputInitialize).deployType === Web3DeployType.INITIALIZE;
}
export function isWithDeployInputProxy1167(item: any): item is WithDeployInputProxy1167 {
    return (item as WithDeployInputProxy1167).deployType === Web3DeployType.INITIALIZE_PROXY_1167;
}
export function isWithDeployInputProxyBeacon(item: any): item is WithDeployInputProxyBeacon {
    return (item as WithDeployInputProxyBeacon).deployType === Web3DeployType.INITIALIZE_BEACON;
}

export type Web3DeployActionInput<Args = any> =
    //TODO: Constructor params
    //WithDeployInputRegular |
    //Initialize singature assumed initialize(bytes data)
    Web3DeployActionInputBase &
        (WithDeployInputInitialize | WithDeployInputProxy1167 | WithDeployInputProxyBeacon) &
        (WithData | (WithArgs<Args> & (WithMethodAbi | WithMethodFormat)));

export function validateWeb3DeployActionInput<Args = any>(payload: Web3DeployActionInput<Args>) {
    //Interface
    let results: ReturnType<typeof getEthCallAbiAndFormatFull> | undefined;
    if (isWithMethodAbi(payload)) {
        results = getEthCallAbiAndFormatFull(payload.methodAbi);
    } else if (isWithMethodFormat(payload)) {
        results = getEthCallAbiAndFormatFull(payload.methodFormatFull);
    }
    const methodFragment = results?.methodFragment;
    const methodIface = results?.methodIface;

    //Args
    let data: string;
    if (isWithData(payload)) {
        data = payload.data;
    } else {
        //Interface MUST be defined if Args
        data = methodIface!.encodeFunctionData(methodFragment!, payload.args as any);
    }

    const initializeFormat = "initialize(bytes data)";
    const proxyInitializeFormat = "proxyInitialize(bytes)";
    //CREATE2
    const deployDeterministicFormat =
        "deployDeterministic(bytes32 salt, bytes codeData, bytes initData, address msgSender) returns (address)";
    //ERC11167
    const cloneDeterministicFormat =
        "cloneDeterministic(address implementation, bytes32 salt, bytes initData, address msgSender) returns (address)";
    //Beacon
    const beaconInitializeFormat = "initialize(address _admin, address _beaconAddress, bytes memory data)";
    const initializeIface = new utils.Interface([
        initializeFormat,
        proxyInitializeFormat,
        deployDeterministicFormat,
        cloneDeterministicFormat,
        beaconInitializeFormat,
    ]);

    //Reshape args based on deploy type
    let methodFormatFull: string;
    const from = payload.from.toLowerCase();
    if (payload.deployType === Web3DeployType.INITIALIZE) {
        methodFormatFull = deployDeterministicFormat;
        const initData = initializeIface.encodeFunctionData(initializeFormat, [data]);
        if (payload.deploySaltSenderDeterministic === false) {
            data = initializeIface.encodeFunctionData(deployDeterministicFormat, [
                payload.deploySalt,
                payload.bytecode,
                initData,
            ]);
        } else {
            data = initializeIface.encodeFunctionData(deployDeterministicFormat, [
                payload.deploySalt,
                payload.bytecode,
                initData,
                from,
            ]);
        }
    } else if (payload.deployType === Web3DeployType.INITIALIZE_PROXY_1167) {
        methodFormatFull = cloneDeterministicFormat;
        const initData = initializeIface.encodeFunctionData(initializeFormat, [data]);
        if (payload.deploySaltSenderDeterministic === false) {
            data = initializeIface.encodeFunctionData(cloneDeterministicFormat, [
                payload.deployImplementationAddress,
                payload.deploySalt,
                initData,
            ]);
        } else {
            data = initializeIface.encodeFunctionData(cloneDeterministicFormat, [
                payload.deployImplementationAddress,
                payload.deploySalt,
                initData,
                from,
            ]);
        }
    } else {
        methodFormatFull = deployDeterministicFormat;
        const proxyInitData = initializeIface.encodeFunctionData(proxyInitializeFormat, [data]);
        const initData = initializeIface.encodeFunctionData(beaconInitializeFormat, [
            from,
            payload.deployBeaconAddress,
            proxyInitData,
        ]);
        if (payload.deploySaltSenderDeterministic === false) {
            data = initializeIface.encodeFunctionData(deployDeterministicFormat, [
                payload.deploySalt,
                Artifacts.BeaconProxy.bytecode,
                initData,
            ]);
        } else {
            data = initializeIface.encodeFunctionData(deployDeterministicFormat, [
                payload.deploySalt,
                Artifacts.BeaconProxy.bytecode,
                initData,
                from,
            ]);
        }
    }

    const to = Utils.ERC1167Factory.ERC1167FactoryAddress.toLowerCase();
    const value = payload.value ?? "0";
    const { networkId, gas } = payload;
    return {
        networkId,
        from,
        to,
        methodFormatFull,
        data,
        gas,
        value,
    };
}

//Pseudo-action. Creates Web3SendAction
export function web3DeployAction<Args = any>(
    payload: Web3DeployActionInput<Args>,
    uuid?: string | undefined,
    ts?: number | undefined,
) {
    const payload2 = validateWeb3DeployActionInput(payload);
    return web3SendAction(payload2, uuid, ts);
}
