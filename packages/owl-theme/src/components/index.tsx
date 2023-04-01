import { THEME_COLORS } from "../constants/index.js";
import Button from "./Button";
import Text from "./Text";
import Link from "./Link";
import Input from "./Input";
import Textarea from "./Textarea";
import Select from "./Select";
import AccordionButton from "./AccordionButton";
import FormLabel from "./FormLabel";
import AccordionIcon from "./AccordionIcon";
import Box from "./Box";

const components = (CURRENT_THEME: string) => {
    // @ts-ignore
    const { color6, color9 } = THEME_COLORS[CURRENT_THEME];

    return {
        Box: Box(CURRENT_THEME),
        Button: Button(CURRENT_THEME),
        Text: Text(CURRENT_THEME),
        Input: Input(CURRENT_THEME),
        Textarea: Textarea(CURRENT_THEME),
        Select: Select(CURRENT_THEME),
        Link: Link(CURRENT_THEME),
        AccordionButton: AccordionButton(CURRENT_THEME),
        FormLabel: FormLabel(CURRENT_THEME),
        AccordionIcon: AccordionIcon(CURRENT_THEME),

        Container: {
            baseStyle: {
                w: "100%",
                maxW: "1200px",
            },
        },
        Divider: {
            baseStyle: {
                borderColor: color6,
            },
        },
        Tab: {
            baseStyle: {
                bg: color6,
                color: color9,
            },
        },
    };
};

export default components;
