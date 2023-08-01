import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";

export default {
    title: "Atoms/Tabs",
    component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args: any) => (
    <Tabs variant="soft-rounded">
        <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>1</TabPanel>
            <TabPanel>2</TabPanel>
            <TabPanel>3</TabPanel>
        </TabPanels>
    </Tabs>
);
export const Main = Template.bind({});

Main.args = {
    variant: "form",
    disabled: false,
};
