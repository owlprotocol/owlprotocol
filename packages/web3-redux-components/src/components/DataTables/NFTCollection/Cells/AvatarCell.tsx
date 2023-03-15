import { Box, useTheme } from "@chakra-ui/react";
import { ReactComponent as VerifiedIcon } from "./assets/verified.svg";

export interface Props {
    isVerified: boolean;
    assetAvatarSrc: string;
}

const AvatarCell = ({ isVerified, assetAvatarSrc }: Props) => {
    const { themes } = useTheme();

    return (
        <Box
            boxSize={"80px"}
            bgColor={themes.color1}
            bgImage={assetAvatarSrc}
            bgSize={"cover"}
            overflow={"hidden"}
            borderRadius={10}
            pos={"relative"}
        >
            {isVerified && (
                <Box boxSize={5} pos={"absolute"} bottom={"1px"} right={"1px"}>
                    <VerifiedIcon />
                </Box>
            )}
        </Box>
    );
};

export { AvatarCell };
