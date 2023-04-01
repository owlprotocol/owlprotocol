import { NoInitFactories, InitializeFactories } from "./deterministicFactories.js";
import { mapValues, omit } from "../lodash.js";
import { proxy1167Factory } from "../utils/ERC1167Factory/getContractFactory.js";
import { ERC1167FactoryAddress } from "../utils/ERC1167Factory/getAddress.js";

export function getProxy1167Factories(factories: NoInitFactories, msgSender: string) {
    const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddress);
    const factories2 = omit(factories, "ERC1167Factory");

    return mapValues(factories2, (f: any) => {
        return proxy1167Factory({
            contractFactory: f,
            implementationAddress: f.getAddress(),
            cloneFactory,
            msgSender,
        });
    }) as NoInitFactories;
}

export function getProxy1167InitializeFactories(factories: NoInitFactories, msgSender: string) {
    const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddress);
    const factories2 = omit(
        factories,
        "ERC1167Factory",
        "Fallback",
        "ERC721TopDownLib",
        "ERC721TopDownDnaLib",
        "Multicall2",
    );

    return mapValues(factories2, (f: any) => {
        return proxy1167Factory({
            contractFactory: f,
            implementationAddress: f.getAddress(),
            cloneFactory,
            initSignature: "initialize",
            msgSender,
        });
    }) as InitializeFactories;
}
