/**
 * Typescript implementation of ERC1167 library pure functions
 */
import { constants } from "ethers";
import type { Signer, Overrides } from "ethers";
import {
    ERC1167FactoryAddress,
} from "./getAddress.js";
import { DEFAULT_SALT } from "./getSalt.js";
import { CustomFactory } from "./factory.js";
import { BEACON_ADMIN } from "@owlprotocol/envvars";
import { UpgradeableBeaconFactory } from "../../ethers/factories.js";
import { deployDeterministicFactory } from "./deployDeterministic.js";
import { UpgradeableBeacon } from "../../typechain/ethers/index.js";


/***** Beacon *****/
interface BeaconFactoryArgs {
    cloneFactoryAddress?: string;
    salt?: string;
    msgSender?: string;
    implementationAddress: string;
    beaconAdmin?: string;
}
export function beaconFactory(args: BeaconFactoryArgs, signer?: Signer) {
    // Assign Config
    const { implementationAddress } = args;
    const salt = args.salt ?? DEFAULT_SALT
    const cloneFactoryAddress = args.cloneFactoryAddress ?? ERC1167FactoryAddress
    const msgSender = args.msgSender ?? constants.AddressZero
    const beaconAdmin = args.beaconAdmin ?? BEACON_ADMIN;

    // Beacon Factory
    const UpgradeableBeaconFactoryDeterministic = deployDeterministicFactory({
        cloneFactoryAddress,
        salt,
        msgSender,
        initSignature: "initialize",
        contractFactory: UpgradeableBeaconFactory,
    }, signer);

    const deploy = async (overrides?: Overrides) => {
        return UpgradeableBeaconFactoryDeterministic.deploy(beaconAdmin, implementationAddress, overrides);
    };

    const getDeployTransaction = async (overrides?: Overrides) => {
        return UpgradeableBeaconFactoryDeterministic.getDeployTransaction(beaconAdmin, implementationAddress, overrides);
    }

    const getInitData2 = (overrides?: Overrides) => {
        return UpgradeableBeaconFactoryDeterministic.getInitData(beaconAdmin, implementationAddress, overrides);
    };

    const getAddress = () => {
        return UpgradeableBeaconFactoryDeterministic.getAddress(beaconAdmin, implementationAddress);
    };

    const exists = async () => {
        return UpgradeableBeaconFactoryDeterministic.exists(beaconAdmin, implementationAddress)
    };

    //Create new factory with new signer
    const connect = (signer: Signer) => {
        return beaconFactory(args, signer)
    }

    //New factory
    const factory = UpgradeableBeaconFactory.connect(signer as any) as CustomFactory<UpgradeableBeacon>;
    factory.deploy = deploy;
    factory.getDeployTransaction = getDeployTransaction;
    factory.getInitData = getInitData2;
    factory.getAddress = getAddress;
    factory.exists = exists;
    factory.connect = connect;

    return factory;
}
