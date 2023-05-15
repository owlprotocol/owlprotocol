import inquirer from 'inquirer';
import type { AbiItem } from 'web3-utils';
import type { Contract } from 'web3-eth-contract';

import { AbiInputExtended } from './types/web3.js';
import { InquireOptions } from './utils.js';
import { inquireAbiInputList } from './inquireAbi.js';

export async function inquireMethodFromList(abi: AbiItem[], options?: InquireOptions) {
    const prompt = options?.prompt ?? inquirer.prompt;

    const fnList = abi.filter((item) => item.type == 'function');
    return prompt({
        type: 'list',
        name: 'fn',
        message: 'Select which function to call',
        choices: fnList.map((fn) => {
            const inputsName = fn.inputs?.map((x) => `${x.type} ${x.name}`).join(', ');
            return {
                name: `${fn.name}(${inputsName})`,
                value: fn,
            };
        }),
    }) as { fn: AbiItem };
}

interface InquireContractMethodOptions extends InquireOptions {
    override?: {
        inquireInputArray?: typeof inquireAbiInputList;
        [key: string]: any;
    };
}
export async function inquireContractMethodArgs(contract: Contract, options: InquireContractMethodOptions) {
    const override = options?.override ?? {};

    const inquireFunctionArgs = override.inquireInputArray ?? inquireAbiInputList;
    //@ts-ignore
    const { fn } = await inquireMethodFromList(contract._jsonInterface, options);
    //@ts-ignore
    const inputs: AbiInputExtended[] = fn.inputs!.map((x: AbiInputExtended) => {
        return { ...x, ...override![x.name] };
    });
    const { flatArgs: fnArgs } = await inquireFunctionArgs(inputs, options);
    const method = fnArgs.length > 0 ? contract.methods[fn.name!](...fnArgs) : contract.methods[fn.name!]();

    return method;

    /*
    Auto call/send
    if (fn.stateMutability == 'pure' || fn.stateMutability == 'view') {
        const result = await method.call();

        return result;
    } else if (fn.stateMutability == 'nonpayable' || fn.stateMutability == 'payable') {
        const result = await method.call();
        log.log(result);
        const gas = await method.estimateGas();
        return await addSpinnerListener(method.send({ ...txOptions, gas }));
    }
    */
}

/*
export async function inquireContract({
    name,
    existing,
    contract,
    txOptions,
    override,
}: {
    name: string;
    existing?: string[];
    contract: Contract;
    txOptions: SendOptions;
    override?: {
        inquireInputArray?: typeof inquireAbiInputList;
        [key: string]: any;
    };
}) {
    if (!override) override = {};
    if (!existing) existing = [];
    const inquireFunctionArgs = override.inquireInputArray ?? inquireAbiInputList;
    //Set/Deploy Contract
    const answers = await inquireAddressFromList(existing, { label: name, input: true, nonAddressChoices: ['deploy'] });
    if (answers.address == 'deploy') {
        //@ts-ignore
        const constructor = contract._jsonInterface.filter((x: any) => x.type == 'constructor')[0];
        //@ts-ignore
        const inputs: AbiInputExtended[] = constructor.inputs!.map((x: AbiInputExtended) => {
            return { ...x, ...override![x.name] };
        });
        const { flatArgs } = await inquireFunctionArgs(inputs);

        ///@ts-ignore
        const tx: any = await contract.deploy({
            arguments: flatArgs,
        });
        const gas = await tx.estimateGas();
        return (await addSpinnerListener(tx.send({ ...txOptions, gas }))) as Contract;
    } else {
        contract.options.address = answers.address;
        return contract;
    }
}

function addSpinnerListener(tx: any) {
    return tx
        .on('transactionHash', (hash: string) => {
            spinnies.add(`spinner-${hash}`, { text: `Sending transaction ${hash}` });
        })
        .on('receipt', (receipt: any) => {
            spinnies.succeed(`spinner-${receipt.transactionHash}`, {
                text: `Sent transaction ${receipt.transactionHash}`,
            });
        });
}

*/
