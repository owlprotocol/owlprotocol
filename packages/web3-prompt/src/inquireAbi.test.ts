import { assert } from 'chai';
import { inquireAbiInput, inquireAbiInputList } from './inquireAbi.js';
import { ZERO_ADDRESS, sleep, MOCK_ADDRESS, ZERO_BN } from './utils.js';
import inquirer from 'inquirer';
import { stdio } from 'stdio-mock';
import { toBN } from './utils/web3-utils.js';
const { stdout, stdin } = stdio();
stdin.pipe(stdout);

//Create custom IO prompt module to silence CLI logs
const prompt = inquirer.createPromptModule({
    skipTTYChecks: true,
    input: stdin,
    output: stdout,
});

describe('inquireAbi', () => {
    describe('inquireAbiInput', () => {
        it('number - default', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'uint256' }, { prompt });
            promise.ui.rl.emit('line');
            const { value } = await promise;
            assert.isTrue(ZERO_BN.eq(value));
        });

        it('number - 42', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'uint256' }, { prompt });
            promise.ui.rl.emit('line', '42');
            const { value } = await promise;
            assert.isTrue(toBN('42').eq(value));
        });

        it('string - default', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'string' }, { prompt });
            promise.ui.rl.emit('line');
            const { value } = await promise;
            assert.equal(value, '');
        });

        it('string - 42', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'string' }, { prompt });
            promise.ui.rl.emit('line', '42');
            const { value } = await promise;
            assert.equal(value, '42');
        });

        it('bool - default', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'bool' }, { prompt });
            promise.ui.rl.emit('line');
            const { value } = await promise;
            assert.equal(value, true);
        });

        it('address - default', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'address' }, { prompt });
            promise.ui.rl.emit('line');
            const { value } = await promise;
            assert.equal(value, ZERO_ADDRESS);
        });

        it('address - MOCK_ADDRESS[0]', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'address' }, { prompt });
            promise.ui.rl.emit('line', MOCK_ADDRESS[0]);
            const { value } = await promise;
            assert.equal(value, MOCK_ADDRESS[0]);
        });

        it('number[] - default', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'uint256[]' }, { prompt });
            //Set Array length
            //Array length
            stdin.write('\n');
            //Result empty array
            const { value } = await promise;
            assert.deepEqual(value, []);
        });

        it('number[] - [default,2,3]', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'uint256[]' }, { prompt });
            //Set Array length
            //Array length
            stdin.write('3\n');
            await sleep(5);
            //Array items
            stdin.write('\n');
            await sleep(5);
            stdin.write('2\n');
            await sleep(5);
            stdin.write('3\n');
            //Result [1,2,3]
            const { value } = await promise;
            assert.deepEqual(value, [ZERO_BN, toBN('2'), toBN('3')]);
        });

        it('string[] - default', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'string[]' }, { prompt });
            //Set Array length
            //Array length
            stdin.write('\n');
            //Result empty array
            const { value } = await promise;
            assert.deepEqual(value, []);
        });

        it('string[] - [default,A,B]', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'string[]' }, { prompt });
            //Set Array length
            //Array length
            stdin.write('3\n');
            await sleep(5);
            //Array items
            stdin.write('\n');
            await sleep(5);
            stdin.write('A\n');
            await sleep(5);
            stdin.write('B\n');
            //Result [1,2,3]
            const { value } = await promise;
            assert.deepEqual(value, ['', 'A', 'B']);
        });

        it('bool[] - default', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'bool[]' }, { prompt });
            //Set Array length
            //Array length
            stdin.write('\n');
            //Result empty array
            const { value } = await promise;
            assert.deepEqual(value, []);
        });

        it('bool[] - [default,false,true]', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'bool[]' }, { prompt });
            //Set Array length
            //Array length
            stdin.write('3\n');
            await sleep(5);
            //Array items
            stdin.write('\n');
            await sleep(5);
            stdin.write('n\n');
            await sleep(5);
            stdin.write('y\n');
            //Result [true,false,true]
            const { value } = await promise;
            assert.deepEqual(value, [true, false, true]);
        });

        it('address[] - default', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'address[]' }, { prompt });
            //Set Array length
            //Array length
            stdin.write('\n');
            //Result empty array
            const { value } = await promise;
            assert.deepEqual(value, []);
        });

        it('address[] - [default,2,3]', async () => {
            const promise = inquireAbiInput({ name: 'value', type: 'address[]' }, { prompt });
            //Set Array length
            //Array length
            stdin.write('3\n');
            await sleep(5);
            //Array items
            stdin.write('\n');
            await sleep(5);
            stdin.write(`${MOCK_ADDRESS[0]}\n`);
            await sleep(5);
            stdin.write(`${MOCK_ADDRESS[1]}\n`);
            //Result [1,2,3]
            const { value } = await promise;
            assert.deepEqual(value, [ZERO_ADDRESS, MOCK_ADDRESS[0], MOCK_ADDRESS[1]]);
        });
    });

    describe('inquireAbiInputList', () => {
        it('(number, string, address, number[], string[], address[])', async () => {
            const promise = inquireAbiInputList(
                [
                    { name: 'a', type: 'uint256' },
                    { name: 'b', type: 'string' },
                    { name: 'c', type: 'address' },
                    { name: 'd', type: 'uint256[]' },
                    { name: 'e', type: 'string[]' },
                    { name: 'f', type: 'address[]' },
                ],
                { prompt },
            );

            stdin.write('\n');
            await sleep(5);
            stdin.write('\n');
            await sleep(5);
            stdin.write('\n');
            await sleep(5);
            stdin.write('\n');
            await sleep(5);
            stdin.write('\n');
            await sleep(5);
            stdin.write('\n');
            await sleep(5);

            const { argsDict } = await promise;
            const { a, b, c, d, e, f } = argsDict;
            assert.isTrue(ZERO_BN.eq(a));
            assert.equal(b, '');
            assert.equal(c, ZERO_ADDRESS);
            assert.deepEqual(d, []);
            assert.deepEqual(e, []);
            assert.deepEqual(f, []);
        });
    });
});
