import { THEME_COLORS } from "../../constants/index.js";

const Link = (CURRENT_THEME: string) => {
    // @ts-ignore
    const theme = THEME_COLORS[CURRENT_THEME];

    return {
        baseStyle: {
            color: theme.color1,
            _focus: {
                outline: 0,
                boxShadow: 0,
            },
        },
        variants: {
            header: {
                fontWeight: 700,
                _hover: {
                    color: theme.color11,
                    textDecor: "none",
                },
            },
        },
    };
};

export default Link;
