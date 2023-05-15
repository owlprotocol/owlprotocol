import { Command } from "@oclif/core";
import { routeAll } from "../menus/index.js";

export default class Accounts extends Command {
    static description = "Accounts Menu";

    static examples = [`$ web3-cli accounts`];

    static flags = {};

    static args = {};

    async run(): Promise<void> {
        await routeAll("/accounts");
    }
}
