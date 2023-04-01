import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Contract, Network } from "@owlprotocol/web3-redux";
import { Artifacts } from "@owlprotocol/contracts";
import type { AbiItem } from "web3-utils";
import { useEffect } from "react";
import ContractEventsTable, { ContractEventsTableProps } from ".";

const abi = Artifacts.BlockNumber.abi as AbiItem[];
const bytecode = Artifacts.BlockNumber.bytecode;
const label = "BlockNumber";
const eventName = "NewValue";

export default {
    title: "Tables/Contract/Events",
    component: ContractEventsTable,
} as ComponentMeta<typeof ContractEventsTable>;

const Template: ComponentStory<typeof ContractEventsTable> = (
    args: ContractEventsTableProps
) => <ContractEventsTable {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: "1337",
    address: "0xf5059a5d33d5853360d16c683c16e67980206f36",
    eventName,
} as any;
