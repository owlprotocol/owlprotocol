import inquirer from 'inquirer';
import { InquireOptions, ZERO_ADDRESS } from './utils.js';
import { isAddress, toChecksumAddress } from './utils/web3-utils.js';


export function inquireAddressValidate(input: string) {
    if (!isAddress(input)) return `ERROR: Invalid address ${input}`;
    return true;
}

export function inquireAddressTransform(input: string) {
    if (isAddress(input)) return toChecksumAddress(input);
    return input;
}

export function inquireAddressBlock(input: { name: string;[key: string]: any }) {
    return {
        ...input,
        type: 'input',
        default: input.default ?? ZERO_ADDRESS,
        validate: input.validate ?? inquireAddressValidate,
        filter: input.filter ?? toChecksumAddress,
        transformer: input.transformer ?? inquireAddressTransform,
    };
}

export function inquireAddress(input: { name: string;[key: string]: any }, options?: InquireOptions) {
    const prompt = options?.prompt ?? inquirer.prompt;
    return prompt(inquireAddressBlock(input));
}

interface InquireAddressFromListOptions extends InquireOptions {
    label?: string;
    input?: boolean;
    nonAddressChoices?: string[];
}
export function inquireAddressFromList(choices: string[], options?: InquireAddressFromListOptions) {
    const { label, input, nonAddressChoices } = options ?? {};
    const prompt = options?.prompt ?? inquirer.prompt;

    let extraChoices = [];
    if (input) extraChoices.push({ name: 'Enter address', value: 'input' });
    if (nonAddressChoices) extraChoices.push(...nonAddressChoices);
    if (extraChoices.length > 0) extraChoices = [new inquirer.Separator(), ...extraChoices];

    return prompt([
        {
            type: 'list',
            name: 'address',
            message: `Select ${label ? `${label} ` : ''}address:`,
            choices: [...choices, ...extraChoices],
            validate: (input: string) => {
                if (input == 'input') return true;
                if (nonAddressChoices?.includes(input)) return true;
                return isAddress(input);
            },
            filter: (input: string) => {
                if (isAddress(input)) return toChecksumAddress(input);
                return input;
            },
        },
        {
            ...inquireAddressBlock({ name: 'address' }),
            when: (answers: any) => {
                return answers.address == 'input';
            },
            askAnswered: true,
        },
    ]);
}
