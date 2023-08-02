import { THEME_COLORS } from "../constants/index.js";

const AccordionButton = (CURRENT_THEME: string) => {
    // @ts-ignore
    const theme = THEME_COLORS[CURRENT_THEME];

    return {
        baseStyle: {
            color: theme.color9,
            fontSize: 14,
            fontWeight: 600,
            _focus: {
                outline: 0,
                boxShadow: 0,
            },
        },
    };
};

export default AccordionButton;
