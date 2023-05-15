import { Skeleton } from "@chakra-ui/react";
import { add, omit } from "lodash-es";
import { NFTGenerativeItemImageDisplay } from "@owlprotocol/nft-sdk-components";

export interface ERC721GenerativeImageProps {
    networkId: string;
    address: string;
    tokenId: string;
    status: string;
}

export const ERC721GenerativeImage = (props: ERC721GenerativeImageProps) => {
    const { networkId, address, tokenId, status } = props;
    const imageProps = omit(props, "networkId", "address", "tokenId", "status");

    // TODO:
    // this check is invalid, since there is not hooks under that class.

    // const [nftOnchain] = NFTGenerativeItem.hooks.useGenerativeItemOnchain(
    //     status == "onchain" ? networkId : undefined,
    //     status == "onchain" ? address : undefined,
    //     tokenId
    // );
    // const [nftLocal] = NFTGenerativeItem.hooks.useGenerativeItemLocal(
    //     status == "draft" ? networkId : undefined,
    //     status == "draft" ? address : undefined,
    //     tokenId
    // );
    // const nft = status == "onchain" ? nftOnchain.item : nftLocal.item;
    const nft = true;

    if (nft) {
        return (
            <NFTGenerativeItemImageDisplay {...imageProps} item={nft as any} />
        );
    } else {
        // @ts-ignore
        return <Skeleton w={"100%"} h={"100%"} speed={1} />;
    }
};
