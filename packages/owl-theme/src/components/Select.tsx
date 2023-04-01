import { THEME_COLORS } from "../constants/index.js";

const Select = (CURRENT_THEME: string) => {
    // @ts-ignore
    const theme = THEME_COLORS[CURRENT_THEME];

    return {
        baseStyle: {
            bg: theme.color6,
            color: theme.color9,
        },
        variants: {
            form: {
                borderRadius: 12,
                height: "54px",
                color: theme.color7,
                backgroundColor: "transparent",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: theme.color6,
                outline: 0,
                _placeholder: {
                    color: theme.color9,
                },
                _focus: {
                    outline: 0,
                    boxShadow: 0,
                    borderWidth: 2,
                    borderColor: theme.color1,
                },
            },
            hollow: {
                h: "27px",
                bg: "transparent",
                color: theme.color9,
                borderRadius: 12,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: theme.color9,
            },
        },
    };
};

export default Select;
