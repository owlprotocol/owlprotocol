import { assert } from 'chai';
import { inquireAddressFromList } from './inquireAddress.js';
import { sleep, ZERO_ADDRESS, MOCK_ADDRESS } from './utils.js';
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

describe('Inquire Address', () => {
    describe('inquireAddressFromList', () => {
        it('normal', async () => {
            const promise = inquireAddressFromList([ZERO_ADDRESS], { prompt });
            promise.ui.rl.emit('line');
            const { address } = await promise;
            assert.equal(address, ZERO_ADDRESS);
        });

        it('input', async () => {
            const promise = inquireAddressFromList([ZERO_ADDRESS], { prompt, input: true });
            //Select input
            promise.ui.rl.input.emit('keypress', '', { name: 'down' });
            promise.ui.rl.emit('line');
            await sleep(5);
            //Enter input
            promise.ui.rl.emit('line', MOCK_ADDRESS[0]);
            const { address } = await promise;
            assert.equal(address, MOCK_ADDRESS[0]);
        });

        it('custom', async () => {
            const promise = inquireAddressFromList([ZERO_ADDRESS], { prompt, nonAddressChoices: ['deploy'] });
            //Select choice
            promise.ui.rl.input.emit('keypress', '', { name: 'down' });
            promise.ui.rl.emit('line');
            const { address } = await promise;
            assert.equal(address, 'deploy');
        });
    });
});
