import { Command } from "@oclif/core";
import { routeAll } from "../menus/index.js";

export default class IPFS extends Command {
    static description = "IPFS Menu";

    static examples = [`$ web3-cli ipfs`];

    static flags = {};

    static args = {};

    async run(): Promise<void> {
        await routeAll("/ipfs");
    }
}
