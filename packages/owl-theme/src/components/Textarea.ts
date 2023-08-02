import { THEME_COLORS } from "../constants/index.js";

const Textarea = (CURRENT_THEME: string) => {
    // @ts-ignore
    const theme = THEME_COLORS[CURRENT_THEME];

    return {
        // baseStyle: {
        //     field: {
        //         p: 10,
        //     },
        // },
        variants: {
            form: {
                minHeight: "104px",
                color: theme.color7,
                borderRadius: 12,
                backgroundColor: theme.color5,
                border: 0,
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
        },
    };
};

export default Textarea;
