//@ts-nocheck
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useDisclosure,
    useTheme,
    Button,
} from "@chakra-ui/react";
import { NFTGenerativeItemId } from "@owlprotocol/web3-redux/src/nftgenerativeitem/model/interface.js";
import { ERC721GenerativeInstanceGrid } from "./ERC721GenerativeInstanceGrid.js";

export interface ERC721GenerativeInstanceGridModal {
    isOpen: boolean;
    tokens: NFTGenerativeItemId[];
    onClick?: (token: NFTGenerativeItemId) => any;
}

export const ERC721GenerativeInstanceGridModal = ({
    isOpen,
    tokens,
    onClick,
}: ERC721GenerativeInstanceGridModal) => {
    const { themes } = useTheme();
    const { onClose } = useDisclosure();
    const handleAssetSelect = null;

    const settings = {
        onClose,
        isOpen: isOpen,
        closeOnEsc: true,
        closeOnOverlayClick: true,
        isCentered: true,
        size: "2xl",
        autoFocus: false,
        trapFocus: false,
    };

    return (
        <>
            <Modal {...settings}>
                <ModalOverlay />
                <ModalContent
                    bg={themes.color5}
                    color={themes.color9}
                    w={"100%"}
                    maxW={"1100px"}
                >
                    <ModalHeader
                        mb={6}
                        borderBottom={`1px solid ${themes.color6}`}
                    >
                        Select an asset
                    </ModalHeader>

                    <ModalCloseButton />

                    <Box p={3} maxH={400} overflowY={"auto"}>
                        <ERC721GenerativeInstanceGrid
                            tokens={tokens}
                            onClick={onClick}
                        />
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
};
