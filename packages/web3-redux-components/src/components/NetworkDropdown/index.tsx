import { useState } from "react";
import { Box, Select, useTheme } from "@chakra-ui/react";
import NetworkIcon from "../NetworkIcon/index.js";

const DEF_LABEL = "Select a Network";
const DEFAULT_CHAINS = [
    "Ethereum",
    "Arbitrum",
    "Optimism",
    "Polygon",
    "Binance",
    "Moonbeam",
    "Moonriver",
];

export interface Props {
    options?: string[];
    handleChange?: any;
    label?: string;
    bg?: string;
}
export const NetworkDropdown = ({
    options = [],
    label = DEF_LABEL,
    handleChange,
    bg,
}: Props) => {
    const { themes } = useTheme();
    const [selectedNetwork, setSelectedNetwork] = useState("1");
    const _options = [...DEFAULT_CHAINS, ...options];

    const _onChange = (value: any) => {
        setSelectedNetwork(value);
        handleChange(value, "networkId");
    };

    return (
        <Box
            h={"52px"}
            display={"flex"}
            alignItems={"center"}
            borderRadius={12}
            bg={bg || themes.color5}
            color={themes.color8}
            px={2}
        >
            <Box p={2} pr={0}>
                <NetworkIcon networkId={selectedNetwork} size={20} />
            </Box>
            <Select
                w={label ? "auto" : 10}
                border={0}
                bg={"transparent"}
                color={themes.color8}
                placeholder={label}
                onChange={({ target }: any) => _onChange(target.value)}
            >
                {_options.map((item, key) => (
                    <option key={key}>{item}</option>
                ))}
            </Select>
        </Box>
    );
};

export default NetworkDropdown;
