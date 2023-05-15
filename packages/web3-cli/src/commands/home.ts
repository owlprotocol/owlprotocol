import { Command } from "@oclif/core";
import { routeAll } from "../menus/index.js";

export default class Home extends Command {
    static description = "Home Menu";

    static examples = [`$ web3-cli home`];

    static flags = {};

    static args = {};

    async run(): Promise<void> {
        await routeAll("/home");
    }
}
