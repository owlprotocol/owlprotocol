import { InitializeFactories, NoInitFactories, ProxyInitializeFactories } from "./deterministicFactories.js";
import { ERC1167Factory } from "./types.js";
import { mapValues, omit } from "../lodash.js";
import { beaconProxyFactory } from "../utils/ERC1167Factory/getBeaconProxyFactory.js";

export function getBeaconProxyFactories(
    deterministicFactories: NoInitFactories,
    cloneFactory: ERC1167Factory,
    beaconFactory: InitializeFactories["UpgradeableBeacon"],
    msgSender: string,
) {
    const factories2 = omit(
        deterministicFactories,
        "ERC1167Factory",
        "BeaconProxy",
        "UpgradeableBeacon",
        "Fallback",
        "ERC721TopDownLib",
        "ERC721TopDownDnaLib",
        "Multicall2",
    ) as Omit<
        typeof deterministicFactories,
        "ERC1167Factory" | "BeaconProxy" | "UpgradeableBeacon" | "Fallback" | "ERC721TopDownLib" | "ERC721TopDownDnaLib"
    >;

    return mapValues(factories2, (f: any) => {
        const implementationAddress = f.getAddress() as string;
        const beaconAddress = beaconFactory.getAddress(msgSender, implementationAddress);

        return beaconProxyFactory({
            contractFactory: f,
            cloneFactory,
            msgSender,
            beaconAddress,
            initSignature: "initialize",
        });
    }) as any as ProxyInitializeFactories;
}
