import { useTheme, Text, Box, Image, Center, HStack } from "@chakra-ui/react";
import Icon from "../../Icon/index.js";
import NetworkIcon from "../../NetworkIcon/index.js";

export interface NFTItemCardProps {
    id?: string;
    networkId?: any;
    tokenId?: number;
    value?: number;
    itemName?: string;
    assetPreviewSrc?: string;
    isSelected?: boolean;
    onSelect?: any;
    withSelection?: boolean;
}

const NFTItemCardPresenter = ({
    id,
    networkId,
    value,
    itemName,
    assetPreviewSrc,
    onSelect,
    isSelected = false,
    withSelection = false,
}: NFTItemCardProps) => {
    const { themes } = useTheme();

    return (
        <Box
            onClick={() =>
                withSelection
                    ? onSelect({
                          id,
                          networkId,
                          value,
                          itemName,
                          assetPreviewSrc,
                      })
                    : null
            }
            p={2}
            w={"184px"}
            h={"168px"}
            borderRadius={4}
            bg={themes.color6}
            boxShadow={"lg"}
            pos={"relative"}
            cursor={"pointer"}
            border={isSelected ? `1px solid ${themes.color1}` : "none"}
            _hover={{
                outline: `1px solid ${themes.color1}`,
                transition: "280ms",
            }}
            transition={"280ms"}
        >
            {withSelection ? (
                <Box
                    bg={isSelected ? themes.color1 : "transparent"}
                    borderRadius={50}
                    boxSize={"16px"}
                    border={`1px solid ${themes.color8}`}
                    pos={"absolute"}
                    top={0}
                    right={0}
                    m={2}
                />
            ) : null}

            <Box
                w={"100%"}
                h={"122px"}
                overflow={"hidden"}
                borderRadius={4}
                mb={3}
            >
                <Image
                    w={"100%"}
                    h={"100%"}
                    bg={"transparent"}
                    src={assetPreviewSrc}
                    objectFit={"scale-down"}
                    fallback={
                        <Center w={"100%"} h={"100%"}>
                            <Icon icon="BrokenImage" size={80} ml={2} />
                        </Center>
                    }
                />
            </Box>

            <HStack justify={"space-between"} px={1}>
                <Box>
                    <Box float={"left"} mr={2}>
                        <NetworkIcon networkId={networkId} size={18} />
                    </Box>
                    <Text
                        fontWeight={700}
                        fontSize={14}
                        color={themes.color7}
                        noOfLines={1}
                        maxW={100}
                    >
                        {itemName}
                    </Text>
                </Box>
                <Text fontSize={12} color={themes.color7} flexShrink={0}>
                    {value?.toPrecision(3)} ETH
                </Text>
            </HStack>
        </Box>
    );
};

export { NFTItemCardPresenter };
