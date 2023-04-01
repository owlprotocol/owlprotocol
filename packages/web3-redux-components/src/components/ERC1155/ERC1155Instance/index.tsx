import { useTheme, Box, HStack, Image, Skeleton } from '@chakra-ui/react';
import { ERC1155 } from '@owlprotocol/web3-redux';
import { Token } from '../../../interfaces/Token.js';
import NetworkIcon from '../../NetworkIcon/index.js';

export interface ERC1155InstanceProps {
    networkId: string;
    address: string;
    tokenId: string;
    isSelected?: boolean;
    onClick?: ({ networkId, address, tokenId }: Partial<Token>) => any;
}

const ERC1155Instance = ({ networkId, address, tokenId, isSelected, onClick }: ERC1155InstanceProps) => {
    const [token] = ERC1155.hooks.useERC1155({ networkId, address, id: tokenId });
    const metadata = token?.metadata

    const name = metadata?.name;
    const imageSrc = metadata?.image;
    const onClickDefined = onClick ?? console.log;

    const { themes } = useTheme();
    const clickHandler = (e: PointerEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onClickDefined({ networkId, address, tokenId });
    };

    return (
        <Box
            bg={themes.color5}
            p={'16px 16px 12px 16px'}
            borderRadius={12}
            w={'100%'}
            maxW={264}
            border={'2px solid'}
            borderColor={isSelected ? themes.color1 : themes.color5}
            boxShadow={'md'}
        >
            <Box marginBottom={'16px'} w={'100%'} h={'100%'} overflow={'hidden'}>
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        w={'100%'}
                        h={'100%'}
                        objectFit={'scale-down'}
                        // @ts-ignore
                        onClick={clickHandler}
                        cursor={'pointer'}
                    />
                ) : (
                    <Skeleton w={'100%'} h={'228px'} fadeDuration={4} />
                )}
            </Box>
            <Box
                color={themes.color7}
                p={'6px'}
                marginBottom={'16px'}
                border="2px solid"
                borderColor={themes.color6}
                borderRadius={16}
                w={'100%'}
                textAlign="center"
                fontWeight={700}
                fontSize={14}
                // @ts-ignore
                onClick={clickHandler}
                cursor={'pointer'}
            >
                {name}
            </Box>
            <HStack justifyContent="space-between">
                <HStack>
                    {/** NFT Network */}
                    {<NetworkIcon networkId={networkId} size={18} />}
                    {/*
                    {handleFavorite && (
                        <IconButton
                            onClick={handleFavorite}
                            icon={isFavorite ? <Icon icon="heart.active" size={18} /> : <Icon icon="heart" size={18} />}
                            bg={'transparent'}
                            aria-label="mark as favorite"
                        />
                    )}
                    */}
                </HStack>
            </HStack>
        </Box>
    );
};

ERC1155Instance.displayName = 'ERC1155Instance';
export { ERC1155Instance };
