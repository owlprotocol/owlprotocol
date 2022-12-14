import { Contract } from '@owlprotocol/web3-redux';

export interface ERC721OwnerOfProps {
    networkId: string | undefined;
    address: string | undefined;
    tokenId: string | undefined;
}

export const ERC721OwnerOf = ({ networkId, address, tokenId }: ERC721OwnerOfProps) => {
    const [ownerOf] = Contract.hooks.useERC721OwnerOf(networkId, address, [tokenId]);
    return <>{ownerOf}</>;
};
