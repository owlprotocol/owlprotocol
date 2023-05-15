import inquirer from 'inquirer';
import { AbiInputTypeInt } from './types/web3.js';
import { toBN } from './utils/web3-utils.js';

export interface InquireOptions {
    prompt?: ReturnType<typeof inquirer.createPromptModule>;
}

export interface TxOptions {
    from: string;
    gas: number;
    gasPrice: string;
}

export const ZERO_BN = toBN('0');
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const MOCK_ADDRESS = [
    '0x0000000000000000000000000000000000000001',
    '0x0000000000000000000000000000000000000002',
];

export interface NetworkRegistry {
    [networkId: string]: {
        name: string;
        rpc: string;
        ws?: string;
        gas: string;
        gasPrice: string;
        contracts: {
            [address: string]: {
                name: string;
                [key: string]: any;
            };
        };
        [key: string]: any;
    };
}

export function isIntArray(x: any): x is AbiInputTypeInt {
    return (
        x === 'uint256[]' ||
        x === 'int256[]' ||
        x === 'uint128[]' ||
        x === 'int128[]' ||
        x === 'uint64[]' ||
        x === 'int64[]' ||
        x === 'uint32[]' ||
        x === 'int32[]' ||
        x === 'uint16[]' ||
        x === 'int16[]' ||
        x === 'uint8[]' ||
        x === 'int8[]'
    );
}

export function isInt(x: any): x is AbiInputTypeInt {
    return (
        x === 'uint256' ||
        x === 'int256' ||
        x === 'uint128' ||
        x === 'int128' ||
        x === 'uint64' ||
        x === 'int64' ||
        x === 'uint32' ||
        x === 'int32' ||
        x === 'uint16' ||
        x === 'int16' ||
        x === 'uint8' ||
        x === 'int8'
    );
}

export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
