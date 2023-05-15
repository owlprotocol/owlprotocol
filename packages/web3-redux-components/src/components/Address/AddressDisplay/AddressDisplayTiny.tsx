import { useCallback } from "react";
import {
    Box,
    Button,
    HStack,
    IconButton,
    Text,
    useTheme,
} from "@chakra-ui/react";
import { Icon } from "../../Icon";
import copy from "copy-to-clipboard";

export interface Address {
    address: string;
}

const AddressDisplayTiny = ({ address }: Address) => {
    const handleCopy = useCallback(() => {
        copy(address);
    }, [address]);

    const { themes } = useTheme();

    return (
        <HStack bg={"transparent"} align={"center"} justify={"flex-start"}>
            <Text
                fontSize={14}
                fontWeight={500}
                color={themes.color7}
                maxW={"100%"}
                isTruncated
            >
                {address}
            </Text>
            <Button
                variant="none"
                m={0}
                w={18}
                bg={"transparent"}
                onClick={handleCopy}
                aria-label={"copy to clipboard"}
                leftIcon={<Icon icon="copy" size={20} />}
            />
        </HStack>
    );
};

export { AddressDisplayTiny };
