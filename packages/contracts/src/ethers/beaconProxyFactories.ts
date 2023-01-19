import { mapValues, omit } from '../lodash.js';
import { InitializeFactories, NoInitFactories, ProxyInitializeFactories } from './deterministicFactories.js';
import { beaconProxyFactory } from '../utils/ERC1167Factory/getBeaconProxyFactory.js';
import { ERC1167FactoryAddress } from '../utils/ERC1167Factory/getAddress.js';

export function getBeaconProxyFactories(
    deterministicFactories: NoInitFactories,
    beaconFactory: InitializeFactories['UpgradeableBeacon'],
    msgSender: string,
) {
    const cloneFactory = deterministicFactories.ERC1167Factory.attach(ERC1167FactoryAddress);
    const factories2 = omit(
        deterministicFactories,
        'ERC1167Factory',
        'BeaconProxy',
        'UpgradeableBeacon',
        'Fallback',
        'ERC721TopDownLib',
        'ERC721TopDownDnaLib',
    ) as Omit<
        typeof deterministicFactories,
        'ERC1167Factory' | 'BeaconProxy' | 'UpgradeableBeacon' | 'Fallback' | 'ERC721TopDownLib' | 'ERC721TopDownDnaLib'
    >;

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
