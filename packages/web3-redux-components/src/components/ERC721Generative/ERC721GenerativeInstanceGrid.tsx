import { Grid, GridItem } from '@chakra-ui/react';
import { NFTGenerativeItemId } from '@owlprotocol/web3-redux/src/nftgenerativeitem/model/interface.js';
import { ERC721GenerativeInstance } from './ERC721GenerativeInstance.js';

export interface ERC721GenerativeInstanceGrid {
    tokens: NFTGenerativeItemId[];
    onClick?: (token: NFTGenerativeItemId) => any;
}

export const ERC721GenerativeInstanceGrid = ({ tokens, onClick }: ERC721GenerativeInstanceGrid) => {
    return (
        <Grid templateColumns={{ sm: 'repeat(4, 1fr)' }} gap={6}>
            <GridItem>
                {tokens.map((token, i) => {
                    return <ERC721GenerativeInstance key={i} {...token} onSelected={onClick} />;
                })}
            </GridItem>
        </Grid>
    );
};
