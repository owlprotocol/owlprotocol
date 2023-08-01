import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import * as readme from "readmeio";
import swaggerUi from "swagger-ui-express";
import { createOpenApiExpressMiddleware } from "trpc-openapi";

import { README_SECRET } from "@owlprotocol/envvars";

import { openApiDocument } from "../openapi.js";
import { appRouter } from "../router.js";
import { getOrCreateUserAccount, usersCol } from "../firestore.js";
import { User } from "../types/User.js";
import { createContext } from "../trpc.js";

export function runExpress() {
    const app = express();

    // Setup CORS
    app.use(cors());

    app.post(
        "/webhook",
        express.json({ type: "application/json" }),
        async (req, res) => {
            const secret = README_SECRET;
            if (!secret) {
                throw new Error("README_SECRET missing");
            }
            // Verify the request is legitimate and came from ReadMe.
            const signature = req.headers["readme-signature"] as string;

            try {
                readme.verifyWebhook(req.body, signature, secret);
            } catch (e) {
                // Handle invalid requests
                // @ts-ignore
                return res.status(401).json({ error: e.message });
            }

            let user: User;
            try {
                user = await getOrCreateUserAccount(usersCol, req.body.email);
            } catch (e) {
                console.error("Error calling getOrCreateUserAccount: ", e);
                throw e;
            }

            return res.json({
                // OAS Security variables
                Authorization: user.apiKey,
                ...user,
            });
        }
    );

    app.get("/api/openapi.json", (_, res) => {
        res.json(openApiDocument);
    });

    // Handle incoming tRPC requests
    app.use(
        "/api/trpc",
        createExpressMiddleware({ router: appRouter, createContext })
    );
    // Handle incoming OpenAPI requests
    app.use(
        "/api",
        createOpenApiExpressMiddleware({ router: appRouter, createContext })
    );

    // Serve Swagger UI with our OpenAPI schema
    app.use("/", swaggerUi.serve);
    app.get("/", swaggerUi.setup(openApiDocument));

    app.listen(3000, () => {
        console.log("Server started on http://localhost:3000");
    });
}

/*
//Common-JS
if (require.main === module) {
    runExpress();
}
*/

//ES-Module

runExpress();
