//@ts-nocheck
import { Skeleton } from "@chakra-ui/react";
import { NFTGenerativeItem } from "@owlprotocol/web3-redux";
import { add, omit } from "lodash-es";
//import { ImageProps } from '@chakra-ui/react';
import { NFTGenerativeItemId } from "@owlprotocol/web3-redux/src/nftgenerativeitem/model";
import { NFTGenerativeItemImageDisplay } from "@owlprotocol/nft-sdk-components";

export type ERC721GenerativeImageProps = Partial<NFTGenerativeItemId>; // & ImageProps;

export const ERC721GenerativeImage = (props: ERC721GenerativeImageProps) => {
    const { networkId, address, tokenId, status } = props;
    const imageProps = omit(props, "networkId", "address", "tokenId", "status");

    const [nftOnchain] = NFTGenerativeItem.hooks.useGenerativeItemOnchain(
        status == "onchain" ? networkId : undefined,
        status == "onchain" ? address : undefined,
        tokenId
    );
    const [nftLocal] = NFTGenerativeItem.hooks.useGenerativeItemLocal(
        status == "draft" ? networkId : undefined,
        status == "draft" ? address : undefined,
        tokenId
    );
    const nft = status == "onchain" ? nftOnchain.item : nftLocal.item;

    if (nft) {
        return <NFTGenerativeItemImageDisplay {...imageProps} item={nft as any} />;
    } else {
        return <Skeleton w={"100%"} h={"100%"} speed={1} />;
    }
};
