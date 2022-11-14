import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import styled from "@emotion/styled";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

const SVGOverride = styled.div`
    svg {
        display: inline-block;
    }
`;

// Default implementation, that you can customize
export default function Root({ children }) {
    return (
        <ChakraProvider theme={theme}>
            <SVGOverride>{children}</SVGOverride>
        </ChakraProvider>
    );
}
