// import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import composeHooks from "react-hooks-compose";
import { Environment } from "@owlprotocol/web3-redux";
import { withChakraProvider } from "../src/hoc/index.js";
import { THEME_COLORS } from "@owlprotocol/owl-theme";
import { Provider } from "react-redux";
import { createStore } from "@owlprotocol/web3-redux";
import { getEnvironment } from "../src/environment.js";

Environment.setEnvironment(getEnvironment() as any);

const store = createStore();
export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: "owl",
        values: [
            {
                name: "owl",
                value: THEME_COLORS.theme1.gradpurple,
            },
            {
                name: "white",
                value: THEME_COLORS.theme1.color7,
            },
        ],
    },
};

export const decorators = [
    (Story) => {
        let Story2 = withChakraProvider(Story);
        //Story2 = withWeb3ReactProvider(Story2)
        Story2 = composeHooks(() => ({}))(Story2);

        //
        // const rootRoute = createRouteConfig({
        //     component: () => {
        //         return <Story2 />;
        //     },
        // });
        // const indexRoute = rootRoute.createRoute({
        //     path: "/",
        //     component: () => {
        //         return <></>;
        //     },
        // });
        // const routeConfig = rootRoute.addChildren([indexRoute]);
        // const router = createReactRouter({ routeConfig });

        return (
            <Provider store={store}>
                {/* <RouterProvider router={router} /> */}
                <Story2 />
            </Provider>
        );
    },
];
