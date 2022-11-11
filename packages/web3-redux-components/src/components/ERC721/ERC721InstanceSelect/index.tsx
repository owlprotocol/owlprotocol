import { Box, HStack, Button, useTheme } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { ReactComponent as XIcon } from './assets/x-icon.svg';
import { Token } from '../../../interfaces/Token.js';
import { ERC721Instance, ERC721InstanceProps } from '../ERC721Instance/index.js';
import { ERC721InstanceGridModal } from '../ERC721InstanceGridModal/index.js';
import Icon from '../../Icon';

export interface ERC721InstanceSelect {
    selecting: boolean;
    token: Partial<Token> | undefined;
    tokens: ERC721InstanceProps[];
    setSelecting: (selecting: boolean) => any;
    onSelect: (token: Partial<Token> | undefined) => any;
}

export const ERC721InstanceSelect = ({ selecting, token, tokens, setSelecting, onSelect }: ERC721InstanceSelect) => {
    const { themes } = useTheme();

    const setSelected = useCallback(
        (token: Partial<Token> | undefined) => {
            onSelect(token);
            setSelecting(!selecting);
        },
        [selecting, token, setSelecting, onSelect],
    );

    if (!selecting) {
        if (token) {
            return (
                <Box my={4}>
                    <Button
                        float={'right'}
                        bg={'transparent'}
                        boxSize={'28px'}
                        p={0}
                        mt={1}
                        onClick={(e) => onSelect(undefined)}
                    >
                        <XIcon />
                    </Button>
                    <ERC721Instance networkId={token.networkId} address={token.address} tokenId={token.tokenId} />
                    <Button onClick={(e) => setSelected(undefined)} variant={'link'}>
                        Replace
                    </Button>
                </Box>
            );
        } else {
            return (
                <Box
                    onClick={(e) => setSelected(undefined)}
                    w={'138px'}
                    h={'138px'}
                    bg={themes.color5}
                    justify={'center'}
                    align={'center'}
                    my={4}
                    p={2}
                    mx={'auto'}
                    borderRadius={12}
                    cursor={'pointer'}
                >
                    <Box mb={2} bg={themes.color6} borderRadius={12} py={6}>
                        <Icon icon="AddRounded" size={40} />
                    </Box>
                    <Box
                        border={'2px solid'}
                        borderColor={themes.color6}
                        borderRadius={12}
                        textAlign={'center'}
                        fontWeight={400}
                        fontSize={10}
                        p={1}
                    >
                        Select Item
                    </Box>
                </Box>
            );
        }
    } else {
        return (
            <>
                <ERC721InstanceGridModal isOpen={!token} tokens={tokens} onClick={setSelected} />
            </>
        );
    }
};

export interface ERC721InstanceSelectWithState {
    tokens: ERC721InstanceProps[];
}
export const ERC721InstanceSelectWithState = ({ tokens }: ERC721InstanceSelectWithState) => {
    const [selecting, setSelecting] = useState(false);
    const [token, setToken] = useState<Partial<Token> | undefined>();

    return (
        <ERC721InstanceSelect
            token={token}
            tokens={tokens}
            selecting={selecting}
            setSelecting={setSelecting}
            onSelect={setToken}
        />
    );
};
