import { THEME_COLORS } from "../constants/index.js";

const Table = (CURRENT_THEME: string) => {
    // @ts-ignore
    const theme = THEME_COLORS[CURRENT_THEME];

    return {
        baseStyle: {
            // TBA
        },
        variants: {
            striped: {
                // TBA
            },
        },
    };
};

export default Table;
