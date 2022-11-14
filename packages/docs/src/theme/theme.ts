import { extendTheme } from "@chakra-ui/react";

const THEME_COLORS = {
    theme1: {
        storyBG: "#131419",
        background: "#131419",
        color1: "#4447E2",
        color2: "#2B2D7D",
        color3: "#1D1E41",
        color4: "#DBE4E6",
        color5: "#1C1C24",
        color6: "#2C2C30",
        color7: "#FFFFFF",
        color8: "#70797B",
        color9: "#92929D",
        color10: "#A10A1D",
    },
};

const CURRENT_THEME = "theme1";

const themeOverrides = {
    themes: THEME_COLORS[CURRENT_THEME],
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
    config: {
        initialColorMode: "dark",
    },
    fonts: {
        heading: '"Inter", sans-serif',
        body: '"Inter", sans-serif',
    },
};

// const AppTheme = {
//     config: {
//         initialColorMode: "dark",
//         useSystemColorMode: false,
//     },
//     fonts: {
//         heading: '"Inter", sans-serif',
//         body: '"Inter", sans-serif',
//     },
// };

const theme = extendTheme(themeOverrides);

export default theme;
