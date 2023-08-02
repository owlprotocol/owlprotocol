import { THEME_COLORS } from "../constants/index.js";
import Button from "./Button.js";
import Text from "./Text.js";
import Link from "./Link.js";
import Input from "./Input.js";
import Textarea from "./Textarea.js";
import Select from "./Select.js";
import AccordionButton from "./AccordionButton.js";
import FormLabel from "./FormLabel.js";
import AccordionIcon from "./AccordionIcon.js";
import Box from "./Box.js";
// import Tabs from "./Tabs.js";

const components = (CURRENT_THEME: string) => {
    const { color6 }: any = THEME_COLORS[CURRENT_THEME];

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
        // Tabs: Tabs(CURRENT_THEME), --require chakra upgrade. see module.

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
    };
};

export default components;
