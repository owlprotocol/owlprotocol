import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { RouterProvider } from "@tanstack/react-router";
import { Environment, createStore } from "@owlprotocol/web3-redux";
import { router } from "./router.js";
import { theme } from "@owlprotocol/owl-theme";
import { getEnvironment } from "./environment.js";
//import './i18n';

//import '@fontsource/inter/400.css';
//import '@fontsource/inter/500.css';
//import '@fontsource/inter/600.css';
//import '@fontsource/inter/700.css';
//import '@fontsource/inter/800.css';

Environment.setEnvironment(getEnvironment() as any);
const store = createStore();

const App = () => {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <RouterProvider router={router} />
            </ChakraProvider>
        </Provider>
    );
};

export default App;
