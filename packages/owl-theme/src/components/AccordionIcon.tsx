import { THEME_COLORS } from "../constants/index.js";

const AccordionIcon = (CURRENT_THEME: string) => {
    // @ts-ignore
    const theme = THEME_COLORS[CURRENT_THEME];

    return {
        baseStyle: {
            w: "26px",
            h: "26px",
            marginLeft: "auto",
        },
    };
};

export default AccordionIcon;
