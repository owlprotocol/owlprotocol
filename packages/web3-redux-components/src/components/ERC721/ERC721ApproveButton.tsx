/* eslint-disable */
import { useTheme, Button } from '@chakra-ui/react';
import { Contract } from '@owlprotocol/web3-redux';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hooks, metaMask } from '../../connectors/metaMask';
import useConnectWithSelect from '../../hooks/useConnectWithSelect';
import { WalletConnect } from '../WalletConnect';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } = hooks;

export interface ERC721ApproveButtonProps {
    networkId: string | undefined;
    address: string | undefined;
    tokenId: string | undefined;
    approveAddress: string | undefined;
    children: JSX.Element;
    approvalType?: 'approve' | 'setApprovalForAll'
}

export const ERC721ApproveButton = ({ networkId, address, tokenId, approveAddress, children, approvalType }: ERC721ApproveButtonProps) => {
    const dispatch = useDispatch()
    const [ownerOf] = Contract.hooks.useERC721OwnerOf(networkId, address, [tokenId])
    const [approved] = Contract.hooks.useERC721GetApproved(networkId, address, [tokenId])
    const [operator] = Contract.hooks.useERC721IsApprovedForAll(networkId, address, [ownerOf, approveAddress])
    console.debug({ ownerOf, approved, approveAddress, operator })

    const approve = useCallback(() => {
        if (networkId && address && tokenId) {
            if (approvalType === 'setApprovalForAll' && ownerOf) {
                const action = Contract.actions.send({
                    networkId,
                    address,
                    method: 'setApprovalForAll',
                    args: [approveAddress, true],
                    from: ownerOf
                })
                dispatch(action)
            }
            else if (approvalType === 'approve' || approvalType === undefined) {
                const action = Contract.actions.send({
                    networkId,
                    address,
                    method: 'approve',
                    args: [tokenId, approveAddress],
                    from: ownerOf
                })
                dispatch(action)
            }
        }
    }, [networkId, address, tokenId, approvalType, dispatch, ownerOf])

    if (!networkId || !address || !tokenId || !approveAddress) {
        return <></>
    }
    else if (ownerOf === approveAddress || approved === approveAddress || operator) {
        //Render children
        return <>
            <WalletConnect networkId={networkId ?? '1'}>
                {children}
            </WalletConnect>
        </>;
    } else {
        return <>
            <WalletConnect networkId={networkId ?? '1'}>
                <Button onClick={() => approve()}>
                    Approve token {tokenId}
                </Button>
            </WalletConnect>
        </>
    }
};
