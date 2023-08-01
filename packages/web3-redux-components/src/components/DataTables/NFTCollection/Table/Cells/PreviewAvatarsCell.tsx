import { Box, HStack, Image, useTheme } from "@chakra-ui/react";

export interface Props {
    collectionPreviewSrcs: string[];
}

const PreviewAvatarsCell = ({ collectionPreviewSrcs }: Props) => {
    const { themes } = useTheme();

    return (
        <HStack w={"432px"} overflow={"hidden"} pos={"relative"} gap={2}>
            {collectionPreviewSrcs.map((src: string, key: any) => (
                <Box
                    flexShrink={0}
                    boxSize={"80px"}
                    key={key}
                    overflow={"hidden"}
                    borderRadius={10}
                >
                    <Image src={src} />
                </Box>
            ))}
            <Box
                boxShadow={"lg"}
                w={"40px"}
                h={100}
                bg={
                    "linear-gradient(90deg, rgba(24, 18, 34, 0) 0%, #181222 103.73%)"
                }
                pos={"absolute"}
                right={0}
                top={0}
            />
        </HStack>
    );
};

export { PreviewAvatarsCell };
