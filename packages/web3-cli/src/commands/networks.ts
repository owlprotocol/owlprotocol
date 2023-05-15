import { Command } from "@oclif/core";
import { routeAll } from "../menus/index.js";

export default class Networks extends Command {
    static description = "Networks Menu";

    static examples = [`$ web3-cli networks`];

    static flags = {};

    static args = {};

    async run(): Promise<void> {
        await routeAll("/networks");
    }
}
