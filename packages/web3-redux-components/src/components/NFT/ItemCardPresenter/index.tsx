import { useTheme, Box, Image, Flex, Skeleton, Center } from "@chakra-ui/react";
import Icon from "../../Icon/index.js";
export interface NFTItemCardProps {
    itemName?: string;
    tokenName?: string;
    generateTime?: number;
    assetPreviewSrc?: string;
}

export const NFTItemCard = ({
    itemName,
    tokenName,
    generateTime = 1,
    assetPreviewSrc,
}: NFTItemCardProps) => {
    const { themes } = useTheme();

    return (
        <Box
            p={"8px 12px"}
            w={"168px"}
            pb={3}
            borderRadius={4}
            bg={themes.color6}
            boxShadow={"lg"}
        >
            <Box
                marginBottom={3}
                w={"100%"}
                h={"108px"}
                overflow={"hidden"}
                borderRadius={4}
            >
                {assetPreviewSrc ? (
                    <Image
                        src={assetPreviewSrc}
                        w={"100%"}
                        h={"100%"}
                        objectFit={"scale-down"}
                        fallback={
                            <Center w={"100%"} h={"100%"}>
                                <Icon icon="BrokenImage" size={80} />
                            </Center>
                        }
                    />
                ) : (
                    <Skeleton h={"100%"} speed={1} />
                )}
            </Box>

            <Box
                color={themes.color7}
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
                {tokenName && <Box>{tokenName}</Box>}
                {generateTime && (
                    <Flex alignItems={"center"} mt={1} ml={-1}>
                        <Icon icon={"Clock"} size={18} mr={1} />
                        Slow ({Math.floor(generateTime / 60)})m
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default NFTItemCard;
