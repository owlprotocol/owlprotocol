import inquirer from 'inquirer';
import { AbiInputExtended } from './types/web3.js';
import { toBN } from './utils/web3-utils.js';

import { inquireAddress, inquireAddressBlock } from './inquireAddress.js';
import { inquireList } from './inquireList.js';
import { ZERO_ADDRESS, isInt, isIntArray, InquireOptions } from './utils.js';

export function inquireAbiInput(input: AbiInputExtended, options?: InquireOptions) {
    const prompt = options?.prompt ?? inquirer.prompt;

    if (isInt(input.type)) {
        return prompt({
            ...input,
            type: 'number',
            default: input.default ?? 0,
            filter: toBN,
        });
    } else if (isIntArray(input.type)) {
        return inquireList(
            {
                ...input,
                type: 'number',
                default: input.default ?? 0,
                filter: toBN,
            },
            options,
        );
    } else if (input.type == 'string') {
        return prompt({
            ...input,
            type: 'input',
            default: input.default ?? '',
        });
    } else if (input.type == 'string[]') {
        return inquireList(
            {
                ...input,
                type: 'input',
                default: input.default ?? '',
            },
            options,
        );
    } else if (input.type == 'address') {
        return inquireAddress(
            {
                ...input,
                default: input.default ?? ZERO_ADDRESS,
            },
            options,
        );
    } else if (input.type == 'address[]') {
        return inquireList(
            inquireAddressBlock({
                ...input,
                default: input.default ?? ZERO_ADDRESS,
            }),
            options,
        );
    } else if (input.type == 'bool') {
        return prompt({
            ...input,
            type: 'confirm',
            default: input.default ?? true,
        });
    } else if (input.type == 'bool[]') {
        return inquireList(
            {
                ...input,
                type: 'confirm',
                default: input.default ?? true,
            },
            options,
        );
    }
}

export async function inquireAbiInputList(inputs: AbiInputExtended[], options?: InquireOptions) {
    const argsDict: any = {};
    for (const x of inputs) {
        Object.assign(argsDict, await inquireAbiInput(x, options));
    }

    const flatArgs: any[] = inputs.map((x: any) => argsDict[x.name]);

    return { argsDict, flatArgs };
}
