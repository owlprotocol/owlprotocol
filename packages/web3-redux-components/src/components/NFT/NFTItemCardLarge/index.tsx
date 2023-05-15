import {
    useTheme,
    Box,
    Text,
    Image,
    Flex,
    Link,
    HStack,
    IconButton,
    Center,
} from "@chakra-ui/react";
import Icon from "../../Icon/index.js";

export interface NFTItemCardLargeProps {
    itemName?: string;
    viewsAmount?: number;
    favoriteAmount?: number;
    assetPreviewSrc?: string;
    category?: string;
    creator?: string;
    ownedBy?: string;
    handleFavorite?: () => any;
}

export const NFTItemCardLarge = ({
    itemName,
    viewsAmount = 0,
    favoriteAmount = 0,
    assetPreviewSrc,
    category,
    creator,
    ownedBy,
    handleFavorite,
}: NFTItemCardLargeProps) => {
    const { themes } = useTheme();

    return (
        <Box
            pt={1}
            pb={4}
            px={4}
            w={"100%"}
            borderRadius={12}
            bg={themes.color5}
            color={themes.color8}
            boxShadow={"md"}
        >
            <HStack mb={2} justify={"space-between"}>
                {category && <Link fontWeight={600}>Category</Link>}
                {handleFavorite && (
                    <IconButton
                        icon={
                            <Icon
                                icon="heart"
                                size={20}
                                color={themes.color8}
                            />
                        }
                        aria-label="add to favorite"
                        bg={"transparent"}
                        w={10}
                    />
                )}
            </HStack>

            <Box
                w={"100%"}
                h={["100%", "482px"]}
                overflow={"hidden"}
                borderRadius={12}
                mb={4}
            >
                <Image
                    src={assetPreviewSrc}
                    w={["100%", "570px"]}
                    objectFit={"scale-down"}
                    fallback={
                        <Center w={"100%"} h={"100%"}>
                            <Icon icon="BrokenImage" size={100} />
                        </Center>
                    }
                />
            </Box>

            {creator && <Link href="#">Creator</Link>}
            <Text
                color={themes.color9}
                w={"100%"}
                fontWeight={600}
                fontSize={16}
                my={2}
            >
                {itemName}
            </Text>

            <Flex
                flexDir={["column", "row"]}
                gap={1}
                justifyContent={"space-between"}
                alignItems={"center"}
                fontSize={14}
            >
                {ownedBy && (
                    <Text fontWeight={600}>
                        Owned by
                        <Link href="#" ml={1}>
                            you
                        </Link>
                    </Text>
                )}
                <HStack>
                    <Flex align={"center"} mx={[0, 2]}>
                        <Icon icon="view" mr={2} />
                        {viewsAmount} views
                    </Flex>
                    <Flex align={"center"} mx={[0, 2]}>
                        <Icon icon="heart" mr={3} size={16} />
                        {favoriteAmount} favorites
                    </Flex>
                </HStack>
            </Flex>
        </Box>
    );
};

export default NFTItemCardLarge;
