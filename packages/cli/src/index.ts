import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as generateSchemaJSON from './commands/generateSchemaJSON.js';
import * as generateItemNFT from './commands/generateItemNFT.js';
import * as generateRandomNFT from './commands/generateRandomNFT.js';
import * as deployTopDown from './commands/deployTopDown.js';
import * as detachTopDown from './commands/detachTopDown.js';
import * as viewTopDown from './commands/viewTopDown.js';
import * as updateDnaNFT from './commands/updateDnaNFT.js';
import * as burnNFT from './commands/burnNFT.js';
import * as deployCommon from './commands/deployCommon.js';

yargs(hideBin(process.argv))
    .command(generateSchemaJSON)
    .command(generateItemNFT)
    .command(generateRandomNFT)
    .command(deployTopDown)
    .command(detachTopDown)
    .command(viewTopDown)
    .command(updateDnaNFT)
    .command(burnNFT)
    .command(deployCommon)
    .demandCommand()
    .recommendCommands()
    .wrap(null)
    .help().argv;
