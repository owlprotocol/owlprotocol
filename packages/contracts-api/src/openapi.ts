import { generateOpenApiDocument } from "trpc-openapi";
import { OpenAPIV3 } from "openapi-types";

import { appRouter } from "./router.js";

// Generate OpenAPI schema document
export const openApiDocument: OpenAPIV3.Document = generateOpenApiDocument(
    appRouter,
    {
        title: "Owl Contract Api",
        description:
            "Specification for our API focused on contract interactions",
        version: "0.0.1",
        baseUrl: process.env.BASE_URL || "http://localhost:3000/api",
        docsUrl: "https://dev.owlprotocol.xyz",
        tags: ["contract", "deployment"],
        securitySchemes: {
            Authorization: {
                type: "apiKey",
                name: "x-api-key",
                in: "header",
            },
        },
    }
);
