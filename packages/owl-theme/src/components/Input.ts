import { THEME_COLORS } from "../constants/index.js";

const Input = (CURRENT_THEME: string) => {
    // @ts-ignore
    const theme = THEME_COLORS[CURRENT_THEME];

    return {
        // baseStyle: {},
        variants: {
            form: {
                field: {
                    height: "52px",
                    bg: theme.color5,
                    color: theme.color7,
                    borderRadius: 12,
                    outline: 0,
                    border: 0,
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
            },
        },
    };
};

export default Input;
