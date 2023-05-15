import { assert } from 'chai';
import { inquireMethodFromList } from './inquireContract.js';
import { sleep } from './utils.js';
import inquirer from 'inquirer';
import { stdio } from 'stdio-mock';
const { stdout, stdin } = stdio();
stdin.pipe(stdout);

//Create custom IO prompt module to silence CLI logs
const prompt = inquirer.createPromptModule({
    skipTTYChecks: true,
    input: stdin,
    output: stdout,
});

describe('Inquire FunctionSignature', () => {
    it('inquireMethodFromList', async () => {
        const abi = [
            {
                inputs: [
                    {
                        name: '_spender',
                        type: 'address',
                    },
                    {
                        name: '_value',
                        type: 'uint256',
                    },
                ],
                name: 'approve',
                type: 'function',
            },
            {
                inputs: [],
                name: 'totalSupply',
                type: 'function',
            },
        ];

        const promise = inquireMethodFromList(abi as any, { prompt });
        stdin.write('\n');
        await sleep(5);
        const { fn } = await promise;

        assert.deepEqual(fn, abi[0] as any);
    });
});
