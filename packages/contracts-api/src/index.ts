import { runExpress } from "./runtimes/express.js";

export { appRouter } from "./router.js";

if (require.main === module) {
    if (process.argv.length == 2) {
        const runtime = process.argv[1];
        if (runtime == "express") {
            runExpress();
        }
    }
}
