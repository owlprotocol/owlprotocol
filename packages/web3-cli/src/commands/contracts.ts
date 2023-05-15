import { Command } from "@oclif/core";
import { routeAll } from "../menus/index.js";

export default class Contracts extends Command {
    static description = "Contracts Menu";

    static examples = [`$ web3-cli contracts`];

    static flags = {};

    static args = {};

    async run(): Promise<void> {
        await routeAll("/contracts");
    }
}
