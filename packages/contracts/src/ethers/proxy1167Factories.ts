import { mapValues, omit } from '../lodash.js';
import type { Signer } from 'ethers';
import { ERC1167FactoryImplementation, proxy1167Factory } from '../utils/ERC1167Factory/getContractFactory.js';
import { NoInitFactories, InitializeFactories } from './deterministicFactories.js';

export function getProxy1167Factories(signer: Signer, factories: NoInitFactories, msgSender: string) {
    const cloneFactory = ERC1167FactoryImplementation(signer);
    const factories2 = omit(factories, 'ERC1167Factory');

    return mapValues(factories2, (f: any) => {
        return proxy1167Factory({
            contractFactory: f,
            implementationAddress: f.getAddress(),
            cloneFactory,
            msgSender,
        });
    }) as NoInitFactories;
}

export function getProxy1167InitializeFactories(signer: Signer, factories: NoInitFactories, msgSender: string) {
    const cloneFactory = ERC1167FactoryImplementation(signer);
    const factories2 = omit(factories, 'ERC1167Factory', 'Fallback', 'ERC721TopDownLib', 'ERC721TopDownDnaLib');

    return mapValues(factories2, (f: any) => {
        return proxy1167Factory({
            contractFactory: f,
            implementationAddress: f.getAddress(),
            cloneFactory,
            initSignature: 'initialize',
            msgSender,
        });
    }) as InitializeFactories;
}
