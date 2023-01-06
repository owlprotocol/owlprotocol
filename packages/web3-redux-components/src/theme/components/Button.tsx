import { THEME_COLORS } from "../../constants/index.js";

const Button = (CURRENT_THEME: string) => {
    // @ts-ignore
    const { color1, color2, color3, color7, color10 } =
        THEME_COLORS[CURRENT_THEME];

    return {
        baseStyle: {
            h: "40px",
            w: ["100%", "auto"],
            px: 10,
            borderRadius: 20,
            fontWeight: "bold",
            color: color7,
            backgroundColor: "transparent",
            _hover: {
                color: color1,
            },
            _focus: {
                outline: 0,
                boxShadow: 0,
            },
        },
        variants: {
            link: {
                color: color1,
                fontSize: 13,
            },
            form: {
                color: color7,
                backgroundColor: color1,
                _hover: {
                    color: color7,
                    opacity: 0.8,
                },
                _disabled: {
                    backgroundColor: color3,
                },
                _active: {
                    backgroundColor: color2,
                },
                _focus: {
                    backgroundColor: color2,
                    outline: 0,
                    boxShadow: 0,
                },
            },
            hollow: {
                bg: "transparent",
                color: color1,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: color1,
                _hover: {
                    bg: color1,
                    color: color7,
                },
                _disabled: {
                    backgroundColor: color3,
                },
                _active: {
                    backgroundColor: color2,
                },
                _focus: {
                    backgroundColor: color2,
                    outline: 0,
                    boxShadow: 0,
                },
            },
            cancel: {
                bg: color10,
                color: color7,
                _hover: {
                    bg: color10,
                    color: color7,
                    opacity: 0.8,
                },
            },
        },
    };
};

export default Button;
