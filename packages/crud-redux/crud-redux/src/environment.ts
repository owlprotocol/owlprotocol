/**
 * Environment variable utilities.
 * @module Environment
 */
import { isClient } from "@owlprotocol/utils";

interface Environment {
    [k: string]: string | undefined;
}

let environment: Environment = {};

//Avoid crashing if in browser context
if (!isClient()) {
    /*
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path');
    //Pass custom env file arg
    const args = process.argv;
    const envfileName = args.length > 2 ? args[2] : '.env';
    const envfile = path.resolve(process.cwd(), envfileName);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({ path: envfile });
    */
    //Set local NodeJS env
    environment = process.env;
}

export const setEnvironment = (env: Partial<Environment>) => {
    //Merge
    environment = { ...environment, ...env };
};

export const getEnvironment = () => {
    return environment;
};

/**
 * Get an environment variable in one of the following formants:
 * - `name`
 * - `REACT_APP_name`
 * - `NEXT_PUBLIC_name`
 */
export function getEnvVar(name: string): string | undefined {
    const prefixes = ["", "REACT_APP_", "NEXT_PUBLIC_", "VITE_"];
    for (const p of prefixes) {
        const fullName = `${p}${name}`;
        if (environment[fullName]) return environment[fullName];
    }
}

export const LOG_REDUX_ACTIONS = () => getEnvVar("LOG_REDUX_ACTIONS");
