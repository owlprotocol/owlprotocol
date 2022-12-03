import { mapValues, omit } from '../lodash.js';
import type { Signer } from 'ethers';
import { ERC1167FactoryImplementation } from '../utils/ERC1167Factory/getContractFactory.js';
import { InitializeFactories, NoInitFactories, ProxyInitializeFactories } from './deterministicFactories.js';
import { beaconProxyFactory } from '../utils/ERC1167Factory/getBeaconProxyFactory.js';

export function getBeaconProxyFactories(
    signer: Signer,
    deterministicFactories: NoInitFactories,
    beaconFactory: InitializeFactories['UpgradeableBeacon'],
    msgSender: string,
) {
    const cloneFactory = ERC1167FactoryImplementation(signer);
    const factories2 = omit(
        deterministicFactories,
        'ERC1167Factory',
        'BeaconProxy',
        'UpgradeableBeacon',
        'Fallback',
    ) as Omit<typeof deterministicFactories, 'ERC1167Factory' | 'BeaconProxy' | 'UpgradeableBeacon' | 'Fallback'>;

    return mapValues(factories2, (f: any, k) => {
        const implementationAddress = f.getAddress() as string;
        const beaconAddress = beaconFactory.getAddress(msgSender, implementationAddress);
        //console.debug(k);

        return beaconProxyFactory({
            contractFactory: f,
            cloneFactory,
            msgSender,
            beaconAddress,
            initSignature: 'proxyInitialize',
        });
    }) as any as ProxyInitializeFactories;
}
