/* eslint-disable */
import { Button } from "@chakra-ui/react";
import {  ContractHelpers, ERC721 } from "@owlprotocol/web3-redux";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { WalletConnect } from "../WalletConnect";

export interface ERC721ApproveButtonProps {
    networkId: string | undefined;
    address: string | undefined;
    tokenId: string | undefined;
    approveAddress: string | undefined;
    children: JSX.Element;
    approvalType?: "approve" | "setApprovalForAll";
}

export const ERC721ApproveButton = ({
    networkId,
    address,
    tokenId,
    approveAddress,
    children,
    approvalType,
}: ERC721ApproveButtonProps) => {
    const dispatch = useDispatch();
    const [token] = ERC721.hooks.useERC721({networkId, address, tokenId})
    const ownerOf = token?.owner;
    const approved = token?.approved;
    const [operator] = ContractHelpers.IERC721.useIsApprovedForAll(
        ownerOf && approveAddress ?
        { networkId, to: address, args: [ownerOf, approveAddress] } : undefined
    )

    console.debug({ ownerOf, approved, approveAddress, operator });

    const approve = useCallback(() => {
        if (networkId && address && tokenId && approveAddress && ownerOf) {
            if (approvalType === "setApprovalForAll") {
                const action = ContractHelpers.IERC721.setApprovalForAll({
                    networkId,
                    to: address,
                    args: [approveAddress, true],
                    from: ownerOf,
                });
                dispatch(action);
            } else if (
                approvalType === "approve" ||
                approvalType === undefined
            ) {
                const action = ContractHelpers.IERC721.approve({
                    networkId,
                    to: address,
                    args: [tokenId, approveAddress],
                    from: ownerOf,
                });
                dispatch(action);
            }
        }
    }, [networkId, address, tokenId, approvalType, dispatch, ownerOf]);

    if (!networkId || !address || !tokenId || !approveAddress) {
        return <></>;
    } else if (
        ownerOf === approveAddress ||
        approved === approveAddress ||
        operator
    ) {
        //Render children
        return (
            <>
                <WalletConnect networkId={networkId ?? "1"}>
                    {children}
                </WalletConnect>
            </>
        );
    } else {
        return (
            <>
                <WalletConnect networkId={networkId ?? "1"}>
                    <Button onClick={() => approve()} variant={"form"}>
                        Approve token {tokenId}
                    </Button>
                </WalletConnect>
            </>
        );
    }
};
