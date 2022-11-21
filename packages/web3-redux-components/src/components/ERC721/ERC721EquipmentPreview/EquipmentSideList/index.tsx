import { useState } from "react";
import { VStack, Box, Text, Button, useTheme } from "@chakra-ui/react";
import { ERC721InstanceSelectWithState } from "../../../ERC721/ERC721InstanceSelect";
import Icon from "../../../Icon";

export interface Props {
    tokens?: { name: string }[];
}

const EquipmentSideList = ({ tokens }: Props) => {
    const { themes } = useTheme();

    const [items, setItems] = useState([]);

    const handleAddItem = () => {
        setItems([
            ...items,
            {
                itemId: 1,
            },
        ]);
    };

    return (
        <VStack gap={4}>
            <Box maxH={"75vh"} overflowY={"auto"}>
                {items.map((item, key) => (
                    <Box key={key}>
                        <ERC721InstanceSelectWithState tokens={tokens} />
                    </Box>
                ))}
            </Box>

            <Button
                onClick={handleAddItem}
                bg={themes.color5}
                borderRadius={12}
                p={2}
            >
                <Icon icon="PlusRounded" />
                <Text ml={3}>Add Item</Text>
            </Button>

            {/* {items.map((item, key) => (
                <Box key={key} bg={themes.color5} borderRadius={12} p={2} w={'138px'}>
                    <Button float={'right'} bg={'transparent'} boxSize={'28px'} p={0} mr={-1.5} onClick={handleRemove}>
                        <XIcon />
                    </Button>
                    <Box h={'98px'} bg={themes.color6} borderRadius={12} mb={2} />
                    <Box
                        border={'2px solid'}
                        borderColor={themes.color6}
                        borderRadius={12}
                        textAlign={'center'}
                        fontWeight={400}
                        fontSize={10}
                        p={1}
                    >
                        {item?.name}
                    </Box>
                </Box>
            ))} */}
        </VStack>
    );
};

export default EquipmentSideList;
