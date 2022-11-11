import { Button } from '@chakra-ui/react';
import { Config, NFTGenerativeCollection, NFTGenerativeItem } from '@owlprotocol/web3-redux';
import { NFTGenerativeItemId } from '@owlprotocol/web3-redux/src/nftgenerativeitem/model/interface.js';
import { add, zip } from 'lodash-es';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ERC721GenerativeInstance } from './ERC721GenerativeInstance.js';
import { ERC721GenerativeInstanceSelect } from './ERC721GenerativeInstanceSelect.js';
import { WalletConnect } from '../../index.js';
import { ERC721ApproveButton } from '../ERC721/ERC721ApproveButton.js';

export interface ERC721GenerativeEquipmentProps {
    networkId: string | undefined;
    address: string | undefined;
    tokenId: number | undefined;
}

export const ERC721GenerativeEquipment = ({ networkId, address, tokenId }: ERC721GenerativeEquipmentProps) => {
    const dispatch = useDispatch();
    const [account] = Config.hooks.useAccount()
    const [collection] = NFTGenerativeCollection.hooks.useFetch({ networkId, address, status: 'onchain' });
    const [nftOnChain] = NFTGenerativeItem.hooks.useGenerativeItemOnchain(networkId, address, tokenId)
    const [nftDraft] = NFTGenerativeItem.hooks.useFetch({ networkId, address, tokenId, status: 'draft' });

    const childContracts = collection?.childContracts ?? [];
    const childTokenIdsOnChain = nftOnChain?.childTokenIds ?? [];
    const childTokenIdsDraft = nftDraft?.childTokenIds ?? [];
    const childTokens = zip(childContracts, childTokenIdsDraft.map(parseInt));
    console.debug({ account, collection, nftOnChain, nftDraft, childContracts, childTokenIds: childTokenIdsDraft });

    //Open modal or not
    const [selectingTokens, setSelectingTokens] = useState<Record<string, boolean>>({});

    const onSelect = useCallback(
        (token: NFTGenerativeItemId) => {
            if (networkId && address && tokenId) {
                dispatch(
                    NFTGenerativeItem.actions.childAttach({
                        networkId,
                        address,
                        tokenId,
                        status: 'draft',
                        children: [{ networkId, address: token.address, tokenId: token.tokenId, status: 'draft' }],
                    }),
                );
            }
        },
        [networkId, address, tokenId, dispatch],
    );

    const onSave = useCallback(
        (token: NFTGenerativeItemId) => {
            if (networkId && address && tokenId) {
                dispatch(
                    NFTGenerativeItem.actions.childAttach({
                        networkId,
                        address,
                        tokenId,
                        status: 'onchain',
                        from: account,
                        children: [{ networkId, address: token.address, tokenId: token.tokenId, status: 'draft' }],
                    }),
                );
            }
        },
        [networkId, address, tokenId, dispatch],
    );

    return (
        <>
            <ERC721GenerativeInstance networkId={networkId} address={address} tokenId={tokenId} status="draft" />
            {childTokens?.map(([childAddress, childTokenId], i) => {
                const selecting = selectingTokens[childAddress!];
                const saved = childTokenIdsOnChain[i] == childTokenIdsDraft[i];
                console.debug({ address: childAddress, tokenId: childTokenId });
                if (networkId && childAddress) {
                    if (saved) {
                        return (
                            <>
                                <ERC721GenerativeInstanceSelect
                                    key={i}
                                    selecting={selecting}
                                    setSelecting={(s) => setSelectingTokens({ ...selectingTokens, [childAddress!]: s })}
                                    onSelect={(token) =>
                                        onSelect(
                                            token ?? { networkId, address: childAddress, tokenId: 0, status: 'draft' },
                                        )
                                    }
                                    token={
                                        childTokenId
                                            ? {
                                                networkId,
                                                address: childAddress,
                                                tokenId: childTokenId,
                                                status: 'onchain' as const,
                                            }
                                            : undefined
                                    }
                                    //Test data
                                    tokens={[{ networkId, address: childAddress, tokenId: 1, status: 'onchain' }]}
                                />
                            </>
                        );
                    } else if (!saved && childTokenId != undefined && childTokenId == 0) {
                        //Detach
                        return (
                            <>
                                <ERC721GenerativeInstanceSelect
                                    key={i}
                                    selecting={selecting}
                                    setSelecting={(s) => setSelectingTokens({ ...selectingTokens, [childAddress!]: s })}
                                    onSelect={(token) =>
                                        onSelect(
                                            token ?? { networkId, address: childAddress, tokenId: 0, status: 'draft' },
                                        )
                                    }
                                    token={
                                        childTokenId
                                            ? {
                                                networkId,
                                                address: childAddress,
                                                tokenId: childTokenId,
                                                status: 'onchain' as const,
                                            }
                                            : undefined
                                    }
                                    //Test data
                                    tokens={[{ networkId, address: childAddress, tokenId: 1, status: 'onchain' }]}
                                />
                                <Button
                                    onClick={() =>
                                        onSave({
                                            networkId,
                                            address: childAddress,
                                            tokenId: childTokenId,
                                            status: 'onchain',
                                        })
                                    }
                                >
                                    Detach
                                </Button>
                            </>
                        );
                    } else if (!saved && childTokenId != undefined) {
                        //Attach
                        return (
                            <>
                                <ERC721GenerativeInstanceSelect
                                    key={i}
                                    selecting={selecting}
                                    setSelecting={(s) => setSelectingTokens({ ...selectingTokens, [childAddress!]: s })}
                                    onSelect={(token) =>
                                        onSelect(
                                            token ?? { networkId, address: childAddress, tokenId: 0, status: 'draft' },
                                        )
                                    }
                                    token={
                                        childTokenId
                                            ? {
                                                networkId,
                                                address: childAddress,
                                                tokenId: childTokenId,
                                                status: 'onchain' as const,
                                            }
                                            : undefined
                                    }
                                    //Test data
                                    tokens={[{ networkId, address: childAddress, tokenId: 1, status: 'onchain' }]}
                                />
                                <ERC721ApproveButton
                                    networkId={networkId ?? '1'}
                                    address={childAddress}
                                    tokenId={`${childTokenId}`}
                                    approveAddress={address}
                                    approvalType="setApprovalForAll"
                                >
                                    <Button
                                        onClick={() =>
                                            onSave({
                                                networkId,
                                                address: childAddress,
                                                tokenId: childTokenId,
                                                status: 'onchain',
                                            })
                                        }
                                    >
                                        Attach
                                    </Button>
                                </ERC721ApproveButton>
                            </>
                        );
                    }
                }
            })}
        </>
    );
};
