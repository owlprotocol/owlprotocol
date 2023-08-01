import { initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { OpenApiMeta } from "trpc-openapi";
import { getUserByApiKey, usersCol } from "./firestore.js";
import { User } from "./types/User.js";

export type Context = {
    user?: User;
};

export const t = initTRPC
    .context<Context>()
    .meta<OpenApiMeta>()
    .create({
        errorFormatter: ({ error, shape }) => {
            if (
                error.code === "INTERNAL_SERVER_ERROR" &&
                process.env.NODE_ENV === "production"
            ) {
                return { ...shape, message: "Internal server error" };
            }
            return shape;
        },
    });

export const createContext = async ({
    req,
}: // eslint-disable-next-line @typescript-eslint/require-await
CreateExpressContextOptions): Promise<Context> => {
    let user: User | undefined = undefined;

    // const { authorization } = req.headers;
    // if (!authorization) {
    //     return {};
    // }
    // const apiKey = authorization.split(" ")[1];
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
        return {};
    }

    try {
        user = await getUserByApiKey(usersCol, apiKey);
    } catch (e) {
        const errorMessage = `Error getting user by API key: ${e}`;
        console.error(errorMessage);
        throw new TRPCError({
            message: errorMessage,
            code: "INTERNAL_SERVER_ERROR",
        });
    }

    // Check api key, determine if user has a valid api key
    return { user };
};

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({
            message: "User not found",
            code: "UNAUTHORIZED",
        });
    }
    return next({ ctx: { ...ctx, user: ctx.user } });
});
