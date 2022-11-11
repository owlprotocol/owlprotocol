import { Grid, GridItem } from '@chakra-ui/react';
import { Token } from '../../../interfaces/Token.js';
import { ERC721Instance, ERC721InstanceProps } from '../ERC721Instance/index.js';

export interface ERC721InstanceGrid {
    tokens: ERC721InstanceProps[];
    onClick?: ({ networkId, address, tokenId }: Partial<Token>) => any;
}

export const ERC721InstanceGrid = ({ tokens, onClick }: ERC721InstanceGrid) => {
    return (
        <Grid templateColumns={{ sm: 'repeat(4, 1fr)' }} gap={6} p={2} pb={6}>
            {tokens.map((token, i) => (
                <GridItem key={i} _hover={{ opacity: 0.6 }} transition={'300ms'}>
                    <ERC721Instance {...token} onClick={onClick ?? token.onClick} />
                </GridItem>
            ))}
        </Grid>
    );
};
