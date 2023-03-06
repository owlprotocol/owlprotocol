import {
    Box,
    Select,
    IconButton,
    CloseButton,
    useTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import copy from "copy-to-clipboard";
import Icon from "../../Icon/index.js";

export interface AddressDropdownProps {
    address: string[];
    onChange?: (address: string) => any;
    placeholder?: string;
}

export const AddressDropdown = ({
    address = [],
    onChange = (address) => { console.debug(address) },
    placeholder = "Select address",
}: AddressDropdownProps) => {
    const { themes } = useTheme();

    const [selectedAddress, setSelectedAddress] = useState("");

    const handleChange = ({ target }: any) => {
        setSelectedAddress(target.value);
        onChange(target.value);
    };

    const handleCopy = (address: string) => {
        copy(address);
    };

    const handleReset = () => {
        setSelectedAddress("");
    };

    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            bg={themes.color6}
            color={themes.color4}
            fontSize={"16px"}
            fontWeight={"bold"}
            borderRadius={"8px"}
            h={"52px"}
            p={"12px"}
        >
            <Select
                onChange={handleChange}
                value={selectedAddress}
                placeholder={placeholder}
                border={0}
            >
                {address.map((opt, key) => (
                    <option value={opt} key={key}>
                        {opt}
                    </option>
                ))}
            </Select>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                pr={1}
            >
                <IconButton
                    aria-label="click to copy address"
                    onClick={() => handleCopy(selectedAddress)}
                    icon={<Icon icon="copy" size={20} />}
                    bg={"transparent"}
                />
                <CloseButton onClick={handleReset} />
            </Box>
        </Box>
    );
};
