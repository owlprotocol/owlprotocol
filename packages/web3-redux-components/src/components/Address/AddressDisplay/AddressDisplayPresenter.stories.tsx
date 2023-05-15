import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddressDisplayPresenter, {
    AddressDisplayPresenterProps,
} from "./AddressDisplayPresenter.js";
import {
    addressArgType,
    networkIdArgType,
} from "../../../test/storybookArgs.js";
import { AddressDisplayTiny } from "./AddressDisplayTiny.js";
import { Box } from "@chakra-ui/react";

const Template: ComponentStory<typeof AddressDisplayPresenter> = (
    args: any
) => <AddressDisplayPresenter {...args} />;

const TinyTemplate: ComponentStory<typeof AddressDisplayPresenter> = (
    args: any
) => <AddressDisplayTiny {...args} />;
export const Main = Template.bind({});
export const CustomHeight = Template.bind({});
export const Tiny = TinyTemplate.bind({});

const Args: AddressDisplayPresenterProps = {
    networkId: networkIdArgType.options[0],
    address: addressArgType.options[0],
    label: "Main",
    isFavorite: false,
};

Main.args = Args;
Main.argTypes = {
    address: addressArgType,
};

const AltArgs: AddressDisplayPresenterProps = {
    address: addressArgType.options[0],
    networkId: "1",
    controls: ["copy", "icon"],
    containerStyles: {
        h: "33px",
    },
};
CustomHeight.args = AltArgs;

Tiny.args = {
    address: addressArgType.options[0],
};

export default {
    title: "Address/AddressDisplayPresenter",
    component: AddressDisplayPresenter,
} as ComponentMeta<typeof AddressDisplayPresenter>;
