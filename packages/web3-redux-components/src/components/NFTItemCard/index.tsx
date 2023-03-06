import { useTheme, Box, Image, Flex, Center, Checkbox } from "@chakra-ui/react";
import Icon from "../Icon/index.js";
import { ReactComponent as BrokenImgIcon } from "./assets/broken-img-icon.svg";

export interface NFTItemCardProps {
    tokenId?: number;
    value?: number;
    itemName?: string;
    tokenName?: string;
    generateTime?: number | undefined;
    assetPreviewSrc?: string;
    isSelectable?: boolean;
    isSelected?: boolean;
    onSelect?: Function;
}

export const NFTItemCard = ({
    value,
    itemName,
    tokenName,
    generateTime,
    assetPreviewSrc,
    isSelectable,
    isSelected = false,
    onSelect,
}: NFTItemCardProps) => {
    const { themes } = useTheme();

    return (
        <Box
            p={2}
            boxSize={168}
            borderRadius={4}
            bg={themes.color6}
            boxShadow={"lg"}
            pos={"relative"}
            border={isSelected ? `1px solid ${themes.color1}` : "none"}
        >
            {isSelectable && (
                <Checkbox
                    borderRadius={"50%"}
                    right={2}
                    position={"absolute"}
                    defaultChecked={isSelected}
                    onChange={onSelect as any}
                />
            )}
            <Box
                w={"100%"}
                h={"108px"}
                overflow={"hidden"}
                borderRadius={4}
                mb={2}
            >
                <Image
                    w={"100%"}
                    h={"100%"}
                    bg={themes.color7}
                    src={assetPreviewSrc}
                    fallback={
                        <Center w={"100%"} h={"100%"}>
                            <Box boxSize={20}>
                                <BrokenImgIcon />
                            </Box>
                        </Center>
                    }
                />
            </Box>

            <Box
                color={themes.color7}
                marginBottom={1}
                w={"100%"}
                fontWeight={700}
                fontSize={14}
            >
                {itemName}
            </Box>

            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                color={themes.color9}
                fontSize={12}
            >
                {value && (
                    <Box fontSize={12} color={themes.color7}>
                        {value}
                    </Box>
                )}
                {tokenName && <Box>{tokenName}</Box>}
                {generateTime && (
                    <Flex alignItems={"center"}>
                        <Icon icon={"Clock"} size={18} mr={1} />
                        Slow ({Math.floor(generateTime / 60)})m
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default NFTItemCard;
