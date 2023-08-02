import { mapValues } from "../lodash.js";
import { BeaconProxyFactory, UpgradeableBeaconFactory, factories } from "./factories.js";
import { getFactoriesWithSigner } from "./getFactoriesWithSigner.js";
import { getDeployFactories } from "./getFactory.js";
import * as Utils from "../utils/initializeUtils/index.js";
import { getFactoryWithInitializeUtil } from "./getFactoryWithInitializeUtil.js";

//Can't deploy with these but useful for getting addresses
const factories2 = getFactoriesWithSigner(factories);
export const factoriesImplementations = factories2.factoriesImplementations
export const factoriesDeterministic = factories2.factoriesDeterministic
export const factoriesClone = factories2.factoriesClone
export const factoriesBeacons = factories2.factoriesBeacons
export const factoriesBeaconProxies = factories2.factoriesBeaconProxies

const factoriesWithInitializeUtils = {
    BeaconProxy: { factory: BeaconProxyFactory, initializeUtil: Utils.BeaconProxy.initializeUtil },
    UpgradeableBeacon: { factory: UpgradeableBeaconFactory, initializeUtil: Utils.UpgradeableBeacon.initializeUtil }
} as const;

export const factoriesAll = mapValues(factoriesWithInitializeUtils, ({ factory, initializeUtil }) => {
    return getFactoryWithInitializeUtil(getDeployFactories(factory), initializeUtil as any)
}) as {
        [K in keyof typeof factoriesWithInitializeUtils]:
        ReturnType<typeof getFactoryWithInitializeUtil<
            typeof factoriesWithInitializeUtils[K]["factory"],
            Parameters<typeof factoriesWithInitializeUtils[K]["initializeUtil"]>[0]
        >>
    }
