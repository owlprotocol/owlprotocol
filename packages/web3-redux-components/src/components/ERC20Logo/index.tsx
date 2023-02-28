import { Box, ChakraProps, Image } from "@chakra-ui/react";

const BASE_URL = "https://owlprotocol.github.io";

export interface Props extends ChakraProps {
    address?: string | undefined;
}

const ERC20Logo = (props: Props) => {
    const { address } = props;
    const imageSrc = `${BASE_URL}/blockchains/ethereum/assets/${address}/logo.png`;

    return (
        <Box boxSize={40} borderRadius={"100%"} overflow={"hidden"} {...props}>
            <Image
                src={imageSrc}
                crossOrigin="anonymous"
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/200"
            />
        </Box>
    );
};

export default ERC20Logo;
