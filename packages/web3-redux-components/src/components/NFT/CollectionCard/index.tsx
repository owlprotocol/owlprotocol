import { useTheme, Box, Text, Image, HStack, Center } from "@chakra-ui/react";
import { ReactComponent as VerifiedIcon } from "./assets/verified.svg";
import Icon from "../../Icon";
import NetworkIcon from "../../NetworkIcon";

export interface CollectionCardProps {
    networkId: number;
    title: string;
    isVerified?: boolean;
    description?: string;
    recipeNumber?: number;
    floorPrice?: number;
    volume?: number;
    assetAvatarSrc?: string;
    assetPreviewSrc?: string;
}

const CollectionCardPresenter = ({
    networkId,
    title,
    isVerified,
    description,
    recipeNumber,
    floorPrice,
    volume,
    assetAvatarSrc,
    assetPreviewSrc,
}: CollectionCardProps) => {
    const { themes } = useTheme();

    return (
        <Box
            p={2}
            w={288}
            h={407}
            borderRadius={8}
            bg={themes.color5}
            background={`linear-gradient(143.93deg, rgba(28, 28, 36, 0.6) 0%, rgba(45, 45, 54, 0.6) 50%, rgba(28, 28, 36, 0.6) 100%)`}
            color={themes.color8}
            boxShadow={"md"}
        >
            <Box pos={"relative"} mb={6}>
                <Box w={"100%"} h={166} overflow={"hidden"} borderRadius={8}>
                    <Image
                        w={"100%"}
                        src={assetPreviewSrc}
                        objectFit={"scale-down"}
                        fallback={
                            <Center w={"100%"} h={"100%"} bg={themes.color6}>
                                <Icon icon="BrokenImage" size={80} />
                            </Center>
                        }
                    />
                </Box>
                <Box
                    boxSize={"68px"}
                    bgColor={themes.color1}
                    bgImage={assetAvatarSrc}
                    bgSize={"100%"}
                    borderWidth={"3px"}
                    borderColor={themes.color5}
                    borderRadius={"50%"}
                    overflow={"hidden"}
                    pos={"absolute"}
                    bottom={-5}
                    left={3}
                    zIndex={1}
                />
            </Box>

            <Box px={3} mb={7}>
                <HStack align={"center"} mb={1}>
                    <Text
                        w={"100%"}
                        color={themes.color7}
                        fontWeight={600}
                        fontSize={16}
                        my={2}
                        width={"auto"}
                    >
                        {title}
                    </Text>
                    {isVerified && (
                        <Box boxSize={5}>
                            <VerifiedIcon />
                        </Box>
                    )}
                </HStack>
                <Text h={"83px"} noOfLines={5} textOverflow={"ellipsis"}>
                    {description}
                </Text>
            </Box>

            <HStack px={3} justify={"space-between"}>
                {networkId && <NetworkIcon networkId={networkId} />}
                {recipeNumber && (
                    <Box>
                        <Text fontWeight={600} mb={1}>
                            Recipe
                        </Text>
                        <Text
                            fontWeight={800}
                            color={themes.color7}
                            fontSize={18}
                        >
                            {recipeNumber}
                        </Text>
                    </Box>
                )}
                {floorPrice && (
                    <Box>
                        <Text fontWeight={600} mb={1}>
                            Floor Price
                        </Text>
                        <Text
                            fontWeight={800}
                            color={themes.color7}
                            fontSize={18}
                        >
                            {floorPrice}
                        </Text>
                    </Box>
                )}
                {volume && (
                    <Box>
                        <Text fontWeight={600} mb={1}>
                            Volume
                        </Text>
                        <Text
                            fontWeight={800}
                            color={themes.color7}
                            fontSize={18}
                        >
                            {volume}
                        </Text>
                    </Box>
                )}
            </HStack>
        </Box>
    );
};

export { CollectionCardPresenter };
