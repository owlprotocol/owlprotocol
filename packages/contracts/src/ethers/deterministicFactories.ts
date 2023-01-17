import { mapValues, omit } from '../lodash.js';
import type { Signer } from 'ethers';
import { ERC1167FactoryImplementation, deterministicFactory } from '../utils/ERC1167Factory/getContractFactory.js';
import { Factories } from './factories.js';
import { CustomFactory } from '../utils/ERC1167Factory/factory.js';

export type F_Initialize = Omit<Factories, 'ERC1167Factory' | 'Fallback' | 'ERC721TopDownLib' | 'ERC721TopDownDnaLib'>;
export type F_ProxyInitialize = Omit<F_Initialize, 'UpgradeableBeacon' | 'BeaconProxy'>;

export type NoInitFactories = {
    [K in keyof Factories]: CustomFactory<ReturnType<Factories[K]['attach']>>;
};

export type InitializeFactories = {
    [K in keyof F_Initialize]: CustomFactory<ReturnType<F_Initialize[K]['attach']>, 'initialize'>;
};

export type ProxyInitializeFactories = {
    [K in keyof F_ProxyInitialize]: CustomFactory<ReturnType<F_ProxyInitialize[K]['attach']>, 'proxyInitialize'>;
};

export function getDeterministicFactories(signer: Signer, factories: Factories): NoInitFactories {
    const cloneFactory = ERC1167FactoryImplementation(signer);
    const factories2 = omit(factories, 'ERC1167Factory');

    return mapValues(factories2, (f: any) => {
        return deterministicFactory({
            contractFactory: f,
            cloneFactory,
        });
    }) as NoInitFactories;
}

export function getDeterministicInitializeFactories(
    signer: Signer,
    factories: Factories,
    msgSender: string,
): InitializeFactories {
    const cloneFactory = ERC1167FactoryImplementation(signer);
    const factories2 = omit(
        factories,
        'ERC1167Factory',
        'Fallback',
        'ERC721TopDownLib',
        'ERC721TopDownDnaLib',
    ) as F_Initialize;

    return mapValues(factories2, (f: any) => {
        return deterministicFactory({
            contractFactory: f,
            cloneFactory,
            initSignature: 'initialize',
            msgSender,
        });
    }) as InitializeFactories;
}
