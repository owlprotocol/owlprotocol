import { mapValues, omit } from '../lodash.js';
import { deterministicFactory } from '../utils/ERC1167Factory/getContractFactory.js';
import { factories, Factories } from './factories.js';
import { CustomFactory } from '../utils/ERC1167Factory/factory.js';
import { ERC1167FactoryAddress } from '../utils/ERC1167Factory/getAddress.js';
import { ERC1167Factory } from './types.js';

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

export function getDeterministicFactories(factories: Factories): NoInitFactories {
    const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddress);
    const factories2 = omit(factories, 'ERC1167Factory');

    return mapValues(factories2, (f: any) => {
        return deterministicFactory({
            contractFactory: f,
            cloneFactory,
        });
    }) as NoInitFactories;
}

export const implementationFactories = getDeterministicFactories(factories);
export const implementationAddresses = mapValues(implementationFactories, (f) => f.getAddress());

export function getDeterministicInitializeFactories(factories: Factories, cloneFactory: ERC1167Factory, msgSender: string): InitializeFactories {
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
