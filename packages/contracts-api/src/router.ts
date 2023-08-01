// import { contractRouter } from "./routes/contracts.js";
// import { collectionRouter } from "./routes/deployments.js";
import { abiRouter } from "./routes/abis.js";
import { deployRouter } from "./routes/deploy.js";
import { t } from "./trpc.js";

export const appRouter: AppRouter = t.router({
    abi: abiRouter,
    deploy: deployRouter,
    // contract: contractRouter,
    // collection: collectionRouter,
});

export type AppRouter = ReturnType<typeof t.router<{
    abi: typeof abiRouter,
    deploy: typeof deployRouter,
    // contract: typeof contractRouter,
    // collection: typeof collectionRouter
}>>;
