import { Image } from '@chakra-ui/react';
import { ERC1155 } from '@owlprotocol/web3-redux';

export interface ERC1155ImageProps {
    networkId: string;
    address: string;
    tokenId: string;
}

export const ERC1155Image = ({ networkId, address, tokenId }: ERC1155ImageProps) => {
    const [token] = ERC1155.hooks.useERC1155({networkId, address, id: tokenId});
    const metadata = token?.metadata

    //TODO: Add uri getter

    const src = metadata?.image;
    return <Image src={src} w={'100%'} h={'100x'} objectFit={'scale-down'} cursor={'pointer'} />;
};
