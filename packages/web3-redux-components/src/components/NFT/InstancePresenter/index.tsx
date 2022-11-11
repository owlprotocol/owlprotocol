import { useState, useCallback, useEffect } from 'react';
import { useTheme, Box, Text, IconButton, HStack, Image, Tooltip } from '@chakra-ui/react';
import { ReactComponent as ImageIcon } from './assets/img-icon.svg';
import { ReactComponent as XIcon } from './assets/x-icon.svg';
import { ReactComponent as PreMintIcon } from '../assets/premint.svg';
import Icon from '../../Icon/index.js';
import { shortenHash } from '../../../utils/index.js';
import NetworkIcon from '../../NetworkIcon/index.js';
import { FileUploadButton } from '../../FileUpload/index.js';

export interface PresenterProps {
    itemName: string;
    networkId?: string;
    price?: string;
    isSelected?: boolean;
    isFavorite?: boolean;
    handleFavorite?: any;
    imageSrc?: string;
    imageAlt?: string;
    name?: string | undefined;
    symbol?: string | undefined;
    ownerOf?: string | undefined;
    tokenURI?: string | undefined;
    metadata?: any | undefined;
    contentId?: string | undefined;
    editable?: boolean | undefined;
    preMint?: boolean | undefined;
}

export const NFTInstancePresenter = ({
    itemName = '',
    networkId,
    ownerOf,
    price,
    isSelected,
    isFavorite,
    handleFavorite,
    imageSrc,
    imageAlt = '',
    editable = false,
    preMint = false,
}: PresenterProps) => {
    const { themes } = useTheme();
    const [previewUrl, setPreviewUrl] = useState<any>(null);

    useEffect(() => {
        setPreviewUrl(imageSrc);
    }, [imageSrc]);

    const onFileChangeCompose = useCallback((file: File | undefined) => {
        if (file) setPreviewUrl(URL.createObjectURL(file));
    }, []);

    return (
        <Box
            bg={themes.color5}
            p={'16px 16px 12px 16px'}
            borderRadius={12}
            w={'264px'}
            border={'2px solid'}
            borderColor={isSelected ? themes.color1 : themes.color5}
            boxShadow={'md'}
        >
            <HStack
                bg={themes.color6}
                marginBottom={4}
                borderRadius={16}
                h={'196px'}
                overflow={'hidden'}
                justify={'center'}
                pos={'relative'}
            >
                {previewUrl ? (
                    <Image src={previewUrl} borderRadius={16} h={'196px'} alt={imageAlt} objectFit={'scale-down'} />
                ) : (
                    editable && (
                        <FileUploadButton
                            accept={'image/*'}
                            onFileChange={onFileChangeCompose}
                            icon={
                                <Box textAlign={'center'} cursor={'pointer'}>
                                    <Box boxSize={12} mx={'auto'}>
                                        <ImageIcon />
                                    </Box>
                                    <Text>Add featured image</Text>
                                </Box>
                            }
                        />
                    )
                )}
                {previewUrl && editable && (
                    <Box onClick={() => setPreviewUrl(null)} boxSize={8} pos={'absolute'} top={0} right={0} zIndex={3}>
                        <XIcon />
                    </Box>
                )}
            </HStack>
            {itemName && (
                <Text
                    p={2}
                    color={themes.color7}
                    marginBottom={4}
                    border="2px solid"
                    borderColor={themes.color6}
                    borderRadius={16}
                    textAlign="center"
                    fontWeight={700}
                    fontSize={14}
                >
                    {itemName}
                </Text>
            )}
            {!editable && (
                <HStack justifyContent={'space-between'} mb={2}>
                    {ownerOf && (
                        <Text color={themes.color9} fontWeight={400} fontSize={14}>
                            {/* <Avatar size="2xs" mr={2} /> */}
                            {shortenHash(ownerOf)}
                        </Text>
                    )}

                    {handleFavorite && (
                        <IconButton
                            display={'flex'}
                            justifyContent={'right'}
                            h={'20px'}
                            w={'20px'}
                            ml={'auto'}
                            onClick={handleFavorite}
                            icon={isFavorite ? <Icon icon="heart.active" size={17} /> : <Icon icon="heart" size={17} />}
                            bg={'transparent'}
                            _hover={{ bg: 'transparent' }}
                            aria-label="mark as favorite"
                        />
                    )}
                </HStack>
            )}

            {price && (
                <HStack justifyContent="space-between">
                    <Box color={themes.color9} fontWeight={600} fontSize={14}>
                        {price} ETH
                    </Box>
                    {networkId && <NetworkIcon networkId={networkId} size={18} />}
                </HStack>
            )}

            {preMint && (
                <HStack mr={3}>
                    <Box boxSize={9}>
                        <PreMintIcon />
                    </Box>
                    <Text color={themes.color9} fontSize={16} flex={1}>
                        Pre mint a new NFT
                    </Text>
                    <Tooltip label="Place more information here about this item">
                        <Box boxSize={4}>
                            <Icon icon={'QuestionMark'} size={15} />
                        </Box>
                    </Tooltip>
                </HStack>
            )}
        </Box>
    );
};

export default NFTInstancePresenter;
