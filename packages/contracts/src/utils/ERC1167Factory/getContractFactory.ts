/**
 * Typescript implementation of ERC1167 library pure functions
 */
import { ContractFactory, Overrides } from 'ethers';
import type { BaseContract, Signer } from 'ethers';

import { ERC1167Factory } from '../../ethers/types.js';
import { getFactories } from '../../ethers/factories.js';
import { cloneDeterministicAddress, deployDeterministicAddress, ERC1167FactoryAddress } from './getAddress.js';
import { cloneDeterministic, deployDeterministic } from './deploy.js';
import { getInitData } from './getInitData.js';
import { ContractParameters, ContractParametersWithOverrides, CustomFactory } from './factory.js';

export const ERC1167FactoryImplementation = (ethers: Signer) => {
    const factory = getFactories(ethers).ERC1167Factory;
    return factory.attach(ERC1167FactoryAddress);
};

/***** Deterministic Deployment *****/
export interface DeterministicFactoryArgs<
    Factory extends ContractFactory = ContractFactory,
    //@ts-expect-error
    ContractTyped extends BaseContract = ReturnType<Factory['attach']>,
    InitSignature extends keyof ContractTyped | void = void,
> {
    contractFactory: Factory;
    cloneFactory: ERC1167Factory;
    salt?: string;
    initSignature?: InitSignature;
    msgSender?: string;
}
export function deterministicFactory<
    Factory extends ContractFactory = ContractFactory,
    //@ts-expect-error
    ContractTyped extends BaseContract = ReturnType<Factory['attach']>,
    InitSignature extends keyof ContractTyped | void = void,
>(args: DeterministicFactoryArgs<Factory, ContractTyped, InitSignature>) {
    const { contractFactory, salt, initSignature, msgSender } = args;
    const cloneFactory = args.cloneFactory;
    const contractInterface = contractFactory.interface;
    const initFragment = initSignature ? contractInterface.getFunction(initSignature as string) : undefined;
    const initArgsLen = initFragment ? initFragment.inputs.length : 0;

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
        //Clone contract
        const initOptions = initSignature ? ({ initSignature, initArgs } as any) : undefined;
        const { contract } = await deployDeterministic<ContractTyped, InitSignature>(
            {
                cloneFactory,
                contractInterface,
                bytecode: contractFactory.bytecode,
                salt,
                initOptions,
                msgSender,
            },
            cloneFactory.signer,
            overrides,
        );
        return contract;
    };

    const getInitData2 = (...args: ContractParameters<ContractTyped, InitSignature>) => {
        const initOptions = initSignature ? ({ initSignature, initArgs: args } as any) : undefined;
        return getInitData(contractInterface, initOptions);
    };

    const getAddress = (...args: ContractParameters<ContractTyped, InitSignature>) => {
        const initOptions = initSignature ? ({ initSignature, initArgs: args } as any) : undefined;
        const address = deployDeterministicAddress<ContractTyped, InitSignature>({
            contractInterface,
            bytecode: contractFactory.bytecode,
            cloneFactoryAddress: cloneFactory.address,
            salt,
            initOptions,
            msgSender,
        });
        return address;
    };

    const exists = async (...args: ContractParameters<ContractTyped, InitSignature>) => {
        const address = getAddress(...args);
        if ((await cloneFactory.provider.getCode(address)) != '0x') return true;
        return false;
    };

    //New factory
    const factory = contractFactory.connect(contractFactory.signer) as CustomFactory<ContractTyped, InitSignature>;
    factory.deploy = deploy;
    factory.getDeployTransaction = () => {
        throw new Error('Deterministic Factory getDeployTransaction() Unimplemented!');
    };
    factory.getInitData = getInitData2;
    factory.getAddress = getAddress;
    factory.exists = exists;

    return factory;
}

/***** EIP1167 Proxy *****/

interface ProxyFactoryArgs<
    Factory extends ContractFactory = ContractFactory,
    //@ts-expect-error
    ContractTyped extends BaseContract = ReturnType<Factory['attach']>,
    InitSignature extends keyof ContractTyped | void = void,
> extends DeterministicFactoryArgs<Factory, ContractTyped, InitSignature> {
    implementationAddress: string;
}
export function proxy1167Factory<
    Factory extends ContractFactory = ContractFactory,
    //@ts-expect-error
    ContractTyped extends BaseContract = ReturnType<Factory['attach']>,
    InitSignature extends keyof ContractTyped | void = void,
>(args: ProxyFactoryArgs<Factory, ContractTyped, InitSignature>) {
    const { contractFactory, implementationAddress, salt, initSignature, msgSender } = args;
    const cloneFactory = args.cloneFactory;
    const contractInterface = contractFactory.interface;
    const initFragment = initSignature ? contractInterface.getFunction(initSignature as string) : undefined;
    const initArgsLen = initFragment ? initFragment.inputs.length : 0;

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
        //Clone contract
        const initOptions = initSignature ? ({ initSignature, initArgs } as any) : undefined;
        const { contract } = await cloneDeterministic<ContractTyped, InitSignature>(
            {
                cloneFactory,
                contractInterface,
                implementationAddress,
                salt,
                initOptions,
                msgSender,
            },
            cloneFactory.signer,
            overrides,
        );
        return contract;
    };

    const getInitData2 = (...args: ContractParameters<ContractTyped, InitSignature>) => {
        const initOptions = initSignature ? ({ initSignature, initArgs: args } as any) : undefined;
        return getInitData(contractInterface, initOptions);
    };

    const getAddress = (...args: ContractParameters<ContractTyped, InitSignature>) => {
        const initOptions = initSignature ? ({ initSignature, initArgs: args } as any) : undefined;
        const address = cloneDeterministicAddress<ContractTyped, InitSignature>({
            contractInterface,
            implementationAddress,
            cloneFactoryAddress: cloneFactory.address,
            salt,
            initOptions,
            msgSender,
        });
        return address;
    };

    const exists = async (...args: ContractParameters<ContractTyped, InitSignature>) => {
        const address = getAddress(...args);
        if ((await cloneFactory.provider.getCode(address)) != '0x') return true;
        return false;
    };

    //New factory
    const factory = contractFactory.connect(contractFactory.signer) as CustomFactory<ContractTyped, InitSignature>;
    factory.deploy = deploy;
    factory.getDeployTransaction = () => {
        throw new Error('EIP1167 Proxy Factory getDeployTransaction() Unimplemented!');
    };
    factory.getInitData = getInitData2;
    factory.getAddress = getAddress;
    factory.exists = exists;

    return factory;
}
