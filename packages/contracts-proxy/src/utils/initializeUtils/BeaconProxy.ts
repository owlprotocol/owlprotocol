import type { BeaconProxy } from "../../typechain/ethers/contracts/Beacon/BeaconProxy.js";

export interface BeaconProxyInitializeArgs {
    admin: Parameters<BeaconProxy["initialize"]>[0];
    beaconAddress: Parameters<BeaconProxy["initialize"]>[1];
    data: Parameters<BeaconProxy["initialize"]>[2];
}

export function initializeUtil(args: BeaconProxyInitializeArgs) {
    const { admin, beaconAddress, data } = args;
    return [
        admin,
        beaconAddress,
        data
    ] as [
            Parameters<BeaconProxy["initialize"]>[0],
            Parameters<BeaconProxy["initialize"]>[1],
            Parameters<BeaconProxy["initialize"]>[2],
        ];
}
