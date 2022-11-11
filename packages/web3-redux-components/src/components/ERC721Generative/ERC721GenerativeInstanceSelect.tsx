import { Button } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { NFTGenerativeItemId } from '@owlprotocol/web3-redux/src/nftgenerativeitem/model/interface.js';
import { ERC721GenerativeInstance, ERC721GenerativeInstanceProps } from './ERC721GenerativeInstance.js';
import { ERC721GenerativeInstanceGridModal } from './ERC721GenerativeInstanceGridModal.js';

export interface ERC721GenerativeInstanceSelect {
    selecting: boolean;
    token: NFTGenerativeItemId | undefined;
    tokens: NFTGenerativeItemId[];
    setSelecting: (selecting: boolean) => any;
    onSelect: (token: NFTGenerativeItemId | undefined) => any;
}

export const ERC721GenerativeInstanceSelect = ({
    selecting,
    token,
    tokens,
    setSelecting,
    onSelect,
}: ERC721GenerativeInstanceSelect) => {
    const setSelected = useCallback(
        (token: NFTGenerativeItemId | undefined) => {
            onSelect(token);
            setSelecting(!selecting);
        },
        [selecting, setSelecting, onSelect],
    );

    if (!selecting) {
        if (token) {
            return (
                <>
                    <ERC721GenerativeInstance
                        networkId={token.networkId}
                        address={token.address}
                        tokenId={token.tokenId}
                        status={token.status}
                    />
                    <Button onClick={() => setSelected(undefined)}>Change</Button>
                    <Button onClick={() => onSelect(undefined)}>Remove</Button>
                </>
            );
        } else {
            return (
                <>
                    <Button onClick={() => setSelected(undefined)}>Select</Button>
                </>
            );
        }
    } else {
        return (
            <>
                <ERC721GenerativeInstanceGridModal isOpen={!token} tokens={tokens} onClick={setSelected} />
            </>
        );
    }
};

export interface ERC721GenerativeInstanceSelectWithState {
    tokens: NFTGenerativeItemId[];
}
export const ERC721GenerativeInstanceSelectWithState = ({ tokens }: ERC721GenerativeInstanceSelectWithState) => {
    const [selecting, setSelecting] = useState(false);
    const [selected, setSelected] = useState<NFTGenerativeItemId | undefined>();

    return (
        <ERC721GenerativeInstanceSelect
            token={selected}
            tokens={tokens}
            selecting={selecting}
            setSelecting={setSelecting}
            onSelect={setSelected}
        />
    );
};
