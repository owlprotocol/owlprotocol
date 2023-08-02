import type { UpgradeableBeacon } from "../../typechain/ethers/contracts/Beacon/UpgradeableBeacon.js";

export interface UpgradeableBeaconInitializeArgs {
    admin: Parameters<UpgradeableBeacon["initialize"]>[0];
    implementation: Parameters<UpgradeableBeacon["initialize"]>[1];
}

export function initializeUtil(args: UpgradeableBeaconInitializeArgs) {
    const { admin, implementation } = args;
    return [
        admin,
        implementation,
    ] as [
            Parameters<UpgradeableBeacon["initialize"]>[0],
            Parameters<UpgradeableBeacon["initialize"]>[1],
        ];
}
