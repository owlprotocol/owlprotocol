/**
 * Typescript implementation of ERC1167 library pure functions
 */
import { ContractFactory, Overrides } from "ethers";
import type { BaseContract } from "ethers";

import { getInitDataEncoder } from "./getInitData.js";

import { deterministicFactory, DeterministicFactoryArgs } from "./getContractFactory.js";
import { ContractParameters, ContractParametersWithOverrides, CustomFactory } from "./factory.js";
import { BeaconProxy as BeaconProxyArtifact } from "../../artifacts.js";
import { BeaconProxy, BeaconProxy__factory } from "../../ethers/types.js";

/***** Beacon Proxy *****/
interface BeaconProxyFactoryArgs<
    Factory extends ContractFactory = ContractFactory,
    //@ts-expect-error
    ContractTyped extends BaseContract = ReturnType<Factory["attach"]>,
    InitSignature extends keyof ContractTyped | void = void,
> extends DeterministicFactoryArgs<Factory, ContractTyped, InitSignature> {
    beaconAddress: string;
}
export function beaconProxyFactory<
    Factory extends ContractFactory = ContractFactory,
    //@ts-expect-error
    ContractTyped extends BaseContract = ReturnType<Factory["attach"]>,
    InitSignature extends keyof ContractTyped | void = void,
>(args: BeaconProxyFactoryArgs<Factory, ContractTyped, InitSignature>) {
    const { salt, initSignature, contractFactory, msgSender, beaconAddress } = args;
    const cloneFactory = args.cloneFactory;
    const contractInterface = contractFactory.interface;
    const initFragment = initSignature ? contractInterface.getFunction(initSignature as string) : undefined;
    const initArgsLen = initFragment ? initFragment.inputs.length : 0;

    const BeaconProxyFactory = new ContractFactory(
        BeaconProxyArtifact.abi,
        BeaconProxyArtifact.bytecode,
    ) as BeaconProxy__factory;
    BeaconProxyFactory.connect(contractFactory.signer);

    const BeaconProxyDeterministicFactory = deterministicFactory<BeaconProxy__factory, BeaconProxy, "initialize">({
        contractFactory: BeaconProxyFactory,
        cloneFactory,
        initSignature: "initialize",
        msgSender,
        salt,
    });

    const encoder = getInitDataEncoder<ContractTyped, InitSignature>(contractInterface, initSignature!);

    const deploy = async (...args: ContractParametersWithOverrides<ContractTyped, InitSignature>) => {
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
        const initArgsBeaconProxy = [msgSender, beaconAddress, initData] as [string, string, string];
        const beacon = await BeaconProxyDeterministicFactory.deploy(...initArgsBeaconProxy, overrides);
        return contractFactory.attach(beacon.address) as ContractTyped;
    };

    const getInitData2 = (...args: ContractParameters<ContractTyped, InitSignature>) => {
        const initData = encoder(...args);
        return BeaconProxyDeterministicFactory.getInitData(msgSender!, beaconAddress, initData);
    };

    const getAddress = (...args: ContractParameters<ContractTyped, InitSignature>) => {
        const initData = encoder(...args);
        return BeaconProxyDeterministicFactory.getAddress(msgSender!, beaconAddress, initData);
    };

    const exists = async (...args: ContractParameters<ContractTyped, InitSignature>) => {
        const address = getAddress(...args);
        if ((await cloneFactory.provider.getCode(address)) != "0x") return true;
        return false;
    };

    //New factory
    const factory = contractFactory.connect(contractFactory.signer) as CustomFactory<ContractTyped, InitSignature>;
    factory.deploy = deploy;
    factory.getDeployTransaction = () => {
        throw new Error("Beacon Proxy Factory getDeployTransaction() Unimplemented!");
    };
    factory.getInitData = getInitData2;
    factory.getAddress = getAddress;
    factory.exists = exists;

    return factory;
}
