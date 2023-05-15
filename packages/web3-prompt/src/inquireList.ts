import inquirer from 'inquirer';
import { InquireOptions } from './utils.js';

export async function inquireList(
    inquiry: { name: string; defaultArray?: any[];[key: string]: any },
    options?: InquireOptions,
) {
    const prompt = options?.prompt ?? inquirer.prompt;

    const result = await prompt({
        type: 'number',
        name: `${inquiry.name}.length`,
        message: `Select ${inquiry.name}[] length:`,
        default: inquiry.defaultArray ? inquiry.defaultArray.length : 0,
    });
    if (result[inquiry.name].length == 0) return Promise.resolve({ [inquiry.name]: [] });

    const inquiries = [];
    for (let i = 0; i < result[inquiry.name].length; i++) {
        inquiries.push({
            ...inquiry,
            name: `${inquiry.name}.${i}`,
            default:
                inquiry.defaultArray && i < inquiry.defaultArray.length ? inquiry.defaultArray[i] : inquiry.default,
        });
    }

    return prompt(inquiries);
}
