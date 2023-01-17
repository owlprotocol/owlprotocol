import { THEME_COLORS } from "../../constants/index.js";

const Text = (CURRENT_THEME: string) => {
    // @ts-ignore
    const theme = THEME_COLORS[CURRENT_THEME];

    return {
        baseStyle: {
            color: theme.color9,
            fontSize: 14,
            fontWeight: 400,
        },
        variants: {
            "form-label": {
                fontSize: 18,
                fontWeight: 600,
                color: theme.color9,
                mb: 3,
            },
            "grad-1": {
                bg: "linear-gradient(99.23deg, #942457 1.6%, #8318DD 97.94%)",
                backgroundClip: "text",
            },
        },
    };
};

export default Text;
