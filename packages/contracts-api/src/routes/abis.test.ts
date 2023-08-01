import { createOpenApiExpressMiddleware } from "trpc-openapi";
import { abiFunctionWithZod } from "@owlprotocol/zod-sol";
import { ContractFactory } from "ethers";
import { generatePOSTForAbiFunctionWrite } from "./abis.js";
import { t } from "../trpc.js";

describe("abiRouteTest", function () {
    const fnAbis = {
        empty: {
            inputs: [],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        uint256: {
            inputs: [
                {
                    name: "value",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        nonTuple: {
            inputs: [
                {
                    name: "from",
                    type: "address",
                    internalType: "address",
                },
            ],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        nonTupleUnnamed: {
            inputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address",
                },
            ],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        nonTupleArray: {
            inputs: [
                {
                    name: "from",
                    type: "address[]",
                    internalType: "address[]",
                },
            ],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        tuple: {
            inputs: [
                {
                    name: "target",
                    type: "tuple",
                    internalType: "struct Target",
                    components: [
                        {
                            name: "from",
                            type: "address",
                            internalType: "address",
                        },
                    ],
                },
            ],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        tupleArray: {
            inputs: [
                {
                    name: "target",
                    type: "tuple[]",
                    internalType: "struct Target[]",
                    components: [
                        {
                            name: "from",
                            type: "address",
                            internalType: "address",
                        },
                    ],
                },
            ],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
    } as const;

    it("empty", () => {
        const factory = new ContractFactory([fnAbis.empty], "0x");
        const proc = generatePOSTForAbiFunctionWrite("MyFunction", factory, abiFunctionWithZod(fnAbis.empty));
        const router = t.router({ proc });
        const middleware = createOpenApiExpressMiddleware({ router });
    });

    /*
    it("uint256", () => {
        const proc = generatePOSTForAbiFunction("MyFunction", abiFunctionWithZod(fnAbis.uint256));
        const router = t.router({ proc });
        const middleware = createOpenApiExpressMiddleware({ router });
        const openApiDocument: OpenAPIV3.Document = generateOpenApiDocument(
            router,
            {
                title: "Owl Contract Api",
                description:
                    "Specification for our API focused on contract interactions",
                version: "0.0.1",
                baseUrl: "http://localhost:3000/api",
                docsUrl: "https://dev.owlprotocol.xyz",
                tags: ["contract", "deployment"],
            }
        );
    });

    it("non-tuple", () => {
        const proc = generatePOSTForAbiFunction("MyFunction", abiFunctionWithZod(fnAbis.nonTuple));
        const router = t.router({ proc });
        const middleware = createOpenApiExpressMiddleware({ router });
    });

    it.skip("non-tuple array", () => {
        const proc = generatePOSTForAbiFunction("MyFunction", abiFunctionWithZod(fnAbis.nonTupleArray));
        const router = t.router({ proc });
        const middleware = createOpenApiExpressMiddleware({ router });
    });

    it("non-tuple array, POST", () => {
        const proc = generatePOSTForAbiFunction(
            "MyFunction",
            abiFunctionWithZod(fnAbis.nonTupleArray)
        );
        const router = t.router({ proc });
        const middleware = createOpenApiExpressMiddleware({ router });
    });
    */
});
