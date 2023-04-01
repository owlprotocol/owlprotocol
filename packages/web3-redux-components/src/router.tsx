import { ReactRouter } from "@tanstack/react-router";
import { indexRoute } from "./routes/index.js";
import { rootRoute } from "./routes/__root.js";
import { componentsRoute, componentRoutes } from "./routes/components/index.js";

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
    indexRoute,
    componentsRoute.addChildren([
        ...componentRoutes
    ])
])

// Create the router using your route tree
export const router = new ReactRouter({ routeTree, defaultPreload: 'intent' })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
