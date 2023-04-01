import { extendTheme } from "@chakra-ui/react";
import components from "../components/index.js";
import { THEME_COLORS } from "../constants/index.js";
import TableWrapper from "./TableStyleOverrides.js";

const CURRENT_THEME = "theme1";

const themeOverrides = {
    styles: {
        global: {
            "html, body": {
                backgroundColor: THEME_COLORS[CURRENT_THEME].background,
                color: THEME_COLORS[CURRENT_THEME].color4,
                lineHeight: "1.2",
            },
            a: {
                color: THEME_COLORS[CURRENT_THEME].color1,
            },
        },
    },
    textStyles: {
        title: {
            // responsive sizes TBA
            fontSize: ["20px", "20px"],
            fontWeight: "400",
            lineHeight: "27px",
        },
    },
    components: components(CURRENT_THEME),
    themes: THEME_COLORS[CURRENT_THEME],
};

const theme: any = extendTheme(themeOverrides);
export { theme, TableWrapper };
