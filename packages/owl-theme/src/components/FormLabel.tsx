import { THEME_COLORS } from "../constants/index.js";

const FormLabel = (CURRENT_THEME: string) => {
    // @ts-ignore
    const theme = THEME_COLORS[CURRENT_THEME];

    return {
        baseStyle: {
            fontSize: 18,
            fontWeight: 600,
            color: theme.color9,
            mb: 4,
        },
    };
};

export default FormLabel;
