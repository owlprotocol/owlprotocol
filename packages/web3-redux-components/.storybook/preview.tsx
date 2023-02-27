import React from 'react';
import { Outlet, RouterProvider, createReactRouter, createRouteConfig } from '@tanstack/react-router';
import composeHooks from 'react-hooks-compose';
import { useConfigureFromWeb3React, useMockData } from '../src/hooks/index.js'
import { withChakraProvider, withWeb3ReactProvider } from '../src/hoc/index.js';
import { THEME_COLORS } from '../src/constants/index.js';
import { Provider } from 'react-redux';
import { createStore } from '@owlprotocol/web3-redux';

const store = createStore()
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: 'owl',
        values: [
            {
                name: 'owl',
                value: THEME_COLORS.theme1.storyBG,
            },
            {
                name: 'white',
                value: THEME_COLORS.theme1.color7,
            },
        ],
    },
};

export const decorators = [
    (Story) => {
        let Story2 = withChakraProvider(Story)
        Story2 = withWeb3ReactProvider(Story2)
        Story2 = composeHooks(() => ({
            useConfigureFromWeb3React,
            useMockData,
        }))(Story2)

        const rootRoute = createRouteConfig({
            component: () => {
                return <Story2 />
            }
        })
        const indexRoute = rootRoute.createRoute({
            path: '/',
            component: () => {
                return <></>
            },
        })
        const routeConfig = rootRoute.addChildren([
            indexRoute])
        const router = createReactRouter({ routeConfig })

        return (
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        )
    }
];
