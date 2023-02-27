import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as generateSchemaJSON from './commands/generateSchemaJSON.js';
import * as generateRandomNFT from './commands/generateRandomNFT.js';
import * as deployTopDown from './commands/deployTopDown.js';
import * as detachTopDown from './commands/detachTopDown.js';
import * as viewTopDown from './commands/viewTopDown.js';
import * as deployCommon from './commands/deployCommon.js';

yargs(hideBin(process.argv))
    .command(generateSchemaJSON)
    .command(generateRandomNFT)
    .command(deployTopDown)
    .command(detachTopDown)
    .command(viewTopDown)
    .command(deployCommon)
    .demandCommand()
    .recommendCommands()
    .wrap(null)
    .help().argv;
