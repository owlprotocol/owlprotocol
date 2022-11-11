import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useTheme,
} from '@chakra-ui/react';
import { NFTGenerativeItemId } from '@owlprotocol/web3-redux/src/nftgenerativeitem/model/interface.js';
import { ERC721GenerativeInstanceGrid } from './ERC721GenerativeInstanceGrid.js';

export interface ERC721GenerativeInstanceGridModal {
    isOpen: boolean;
    tokens: NFTGenerativeItemId[];
    onClick?: (token: NFTGenerativeItemId) => any;
}

export const ERC721GenerativeInstanceGridModal = ({ isOpen, tokens, onClick }: ERC721GenerativeInstanceGridModal) => {
    const { themes } = useTheme();
    const { onClose } = useDisclosure();
    const handleAssetSelect = null;

    const settings = {
        closeOnEsc: false,
        closeOnOverlayClick: false,
        isOpen: isOpen,
        onClose: onClose,
        isCentered: true,
        size: '2xl',
        autoFocus: false,
        trapFocus: false,
    };

    return (
        <>
            <Modal {...settings}>
                <ModalOverlay />
                <ModalContent bg={themes.color5} color={themes.color9} w={'100%'} maxW={'792px'}>
                    <ModalHeader mb={6} borderBottom={`1px solid ${themes.color6}`}>
                        Select an asset
                    </ModalHeader>

                    <ModalCloseButton />
                    <ERC721GenerativeInstanceGrid tokens={tokens} onClick={onClick} />
                </ModalContent>
            </Modal>
        </>
    );
};
