import { Command } from "@oclif/core";
import { routeAll } from "../menus/index.js";

export default class Transactions extends Command {
    static description = "Transactions Menu";

    static examples = [`$ web3-cli transactions`];

    static flags = {};

    static args = {};

    async run(): Promise<void> {
        await routeAll("/transactions");
    }
}
