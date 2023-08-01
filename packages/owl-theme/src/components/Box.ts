import { THEME_COLORS } from "../constants/index.js";

const box_grad_bg =
    "linear-gradient(143.93deg, rgba(28, 28, 36, 0.6) 0%, rgba(45, 45, 54, 0.6) 50%, rgba(28, 28, 36, 0.6) 100%)";

const Box = (CURRENT_THEME: string) => {
    // @ts-ignore
    const theme = THEME_COLORS[CURRENT_THEME];

    return {
        variants: {
            "card-container": {
                w: "100%",
                minH: "50px",
                bg: box_grad_bg,
                p: 6,
                spacing: 6,
                border: `1px solid ${theme.color6}`,
                borderRadius: 12,
                boxShadow: "md",
            },
        },
    };
};

export default Box;
