/**
 * Typescript implementation of ERC1167 library pure functions
 */
import { ContractFactory, Overrides, constants } from "ethers";
import type { Signer } from "ethers";

import { getInitDataEncoder } from "./getInitData.js";

import { ContractParameters, ContractParametersWithOverrides, CustomFactory } from "./factory.js";
import { BeaconProxyFactory as BeaconProxyFactory } from "../../ethers/factories.js";
import type { BeaconProxy__factory } from "../../typechain/ethers/index.js";
import { DeterministicFactoryArgs, deployDeterministicFactory } from "./deployDeterministic.js";
import { DEFAULT_SALT } from "./getSalt.js";
import { ERC1167FactoryAddress } from "./getAddress.js";

/***** Beacon Proxy *****/
interface BeaconProxyFactoryArgs<
    Factory extends ContractFactory = ContractFactory,
    InitSignature extends keyof ReturnType<Factory["attach"]> | void = void,
> extends DeterministicFactoryArgs<Factory, InitSignature> {
    beaconAddress: string;
}
export function beaconProxyFactory<
    Factory extends ContractFactory = ContractFactory,
    InitSignature extends keyof ReturnType<Factory["attach"]> | void = void,
>(args: BeaconProxyFactoryArgs<Factory, InitSignature>, signer?: Signer) {
    const provider = signer?.provider
    // Assign Config
    const { contractFactory, initSignature, beaconAddress } = args;
    const salt = args.salt ?? DEFAULT_SALT
    const cloneFactoryAddress = args.cloneFactoryAddress ?? ERC1167FactoryAddress
    const msgSender = args.msgSender ?? constants.AddressZero

    // Init data fragment
    const contractInterface = contractFactory.interface;
    const initFragment = initSignature ? contractInterface.getFunction(initSignature as string) : undefined;
    const initArgsLen = initFragment ? initFragment.inputs.length : 0;

    const BeaconProxyDeterministicFactory = deployDeterministicFactory<BeaconProxy__factory, "initialize">({
        contractFactory: BeaconProxyFactory,
        cloneFactoryAddress,
        initSignature: "initialize",
        msgSender,
        salt,
    }, signer);

    //@ts-expect-error
    const encoder = getInitDataEncoder<ReturnType<Factory["attach"]>, InitSignature>(contractInterface, initSignature!);

    const deploy = async (...args: ContractParametersWithOverrides<ReturnType<Factory["attach"]>, InitSignature>) => {
        let initArgs: any;
        let overrides: Overrides | undefined;
        if (!initSignature) {
            overrides = args[0] as Overrides;
        } else if (args.length == initArgsLen + 1) {
            initArgs = args.slice(0, args.length - 1);
            overrides = args[args.length - 1] as Overrides;
        } else {
            initArgs = args;
        }
        //Compute init data, deploy beacon proxy
        const initData = encoder(...initArgs);
        //msgSender assumed to be same as beacon admin
        const initArgsBeaconProxy = [msgSender, beaconAddress, initData] as [string, string, string];
        const beacon = await BeaconProxyDeterministicFactory.deploy(...initArgsBeaconProxy, overrides);
        return contractFactory.attach(beacon.address) as ReturnType<Factory["attach"]>;
    };

    const getDeployTransaction = async (...args: ContractParametersWithOverrides<ReturnType<Factory["attach"]>, InitSignature>) => {
        let initArgs: any;
        let overrides: Overrides | undefined;
        if (!initSignature) {
            overrides = args[0] as Overrides;
        } else if (args.length == initArgsLen + 1) {
            initArgs = args.slice(0, args.length - 1);
            overrides = args[args.length - 1] as Overrides;
        } else {
            initArgs = args;
        }
        //Compute init data, deploy beacon proxy
        const initData = encoder(...initArgs);
        //msgSender assumed to be same as beacon admin
        const initArgsBeaconProxy = [msgSender, beaconAddress, initData] as [string, string, string];
        const tx = await BeaconProxyDeterministicFactory.getDeployTransaction(...initArgsBeaconProxy, overrides);
        return tx;
    };

    const getInitData2 = (...args: ContractParameters<ReturnType<Factory["attach"]>, InitSignature>) => {
        const initData = encoder(...args);
        return BeaconProxyDeterministicFactory.getInitData(msgSender!, beaconAddress, initData);
    };

    const getAddress = (...args: ContractParameters<ReturnType<Factory["attach"]>, InitSignature>) => {
        const initData = encoder(...args);
        return BeaconProxyDeterministicFactory.getAddress(msgSender!, beaconAddress, initData);
    };

    const exists = async (...args: ContractParameters<ReturnType<Factory["attach"]>, InitSignature>) => {
        if (!provider) throw new Error(`signer.provider ${provider}`)

        const address = getAddress(...args);
        if ((await provider.getCode(address)) != "0x") return true;
        return false;
    };

    //Create new factory with new signer
    const connect = (signer: Signer) => {
        return beaconProxyFactory(args, signer)
    }

    //New factory
    const factory = contractFactory.connect(signer as any) as CustomFactory<ReturnType<Factory["attach"]>, InitSignature>;
    factory.deploy = deploy;
    factory.getDeployTransaction = getDeployTransaction;
    factory.getInitData = getInitData2;
    factory.getAddress = getAddress;
    factory.exists = exists;
    factory.connect = connect;

    return factory;
}
