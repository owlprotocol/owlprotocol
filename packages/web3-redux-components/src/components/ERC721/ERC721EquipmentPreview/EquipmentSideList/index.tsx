import { useState } from "react";
import { VStack, Box, Text, Button, useTheme } from "@chakra-ui/react";
import { ERC721GenerativeInstanceSelectWithState } from "../../../ERC721Generative/ERC721GenerativeInstanceSelect";
import Icon from "../../../Icon";

export interface Props {
    tokens?: { name: string }[];
}

// POC for choosing an NFT as an equipment for the generative app.
//
const EquipmentSideList = ({ tokens }: Props) => {
    const { themes } = useTheme();

    const [items, setItems] = useState([]);

    const handleAddItem = () => {
        setItems([
            // @ts-ignore
            ...items,
            // @ts-ignore
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
                        <ERC721GenerativeInstanceSelectWithState
                            tokens={tokens as any}
                        />
                    </Box>
                ))}
            </Box>

            <Button
                onClick={handleAddItem}
                bg={themes.color5}
                borderRadius={20}
                p={4}
            >
                <Icon icon="PlusRounded" />
                <Text ml={3}>Add Item</Text>
            </Button>
        </VStack>
    );
};

export default EquipmentSideList;
