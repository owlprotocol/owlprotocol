//@ts-nocheck
import { useTheme, Box, HStack } from "@chakra-ui/react";
import { Contract } from "@owlprotocol/web3-redux";

import { NFTGenerativeItemId } from "@owlprotocol/web3-redux/src/nftgenerativeitem/model/interface.js";
import {
    ERC721GenerativeImage,
    ERC721GenerativeImageProps,
} from "./ERC721GenerativeImage.js";
import { AddressLink } from "../Address/index.js";
import NetworkIcon from "../NetworkIcon/index.js";
import { JSXElementConstructor } from "react";

export interface ERC721GenerativeInstanceProps
    extends ERC721GenerativeImageProps {
    isSelected?: boolean;
    onSelected?: (token: NFTGenerativeItemId) => any;
    InstanceMenu?: JSXElementConstructor<any> | null;
}

export const ERC721GenerativeInstance = ({
    networkId,
    address,
    tokenId,
    status,
    isSelected,
    onSelected,
    InstanceMenu = null,
}: ERC721GenerativeInstanceProps) => {
    const [rootOwner] = Contract.hooks.useERC721TopDownRootOwnerOf(
        networkId,
        address,
        [tokenId]
    );

    const onClickDefined = onSelected ?? console.debug;

    const { themes } = useTheme();
    const clickHandler = (e: PointerEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onClickDefined({ networkId, address, tokenId, status });
    };

    return (
        <Box
            bg={themes.color5}
            p={"16px 16px 12px 16px"}
            borderRadius={12}
            w={"100%"}
            maxW={264}
            border={"2px solid"}
            borderColor={isSelected ? themes.color1 : themes.color5}
            boxShadow={"md"}
            pos={"relative"}
        >
            {InstanceMenu && (
                <Box float={"right"} m={-1} pos={"absolute"} right={0} top={0}>
                    {/* @ts-ignore */}
                    <InstanceMenu />
                </Box>
            )}
            <Box
                marginBottom={"16px"}
                w={"100%"}
                h={"200px"}
                overflow={"hidden"}
            >
                <ERC721GenerativeImage
                    networkId={networkId}
                    address={address}
                    tokenId={tokenId}
                    status={status}
                    // @ts-ignore
                    onClick={clickHandler}
                    cursor="pointer"
                />
            </Box>
            <Box
                color={themes.color7}
                p={"6px"}
                marginBottom={"16px"}
                border="2px solid"
                borderColor={themes.color6}
                borderRadius={16}
                w={"100%"}
                textAlign="center"
                fontWeight={700}
                fontSize={14}
                // @ts-ignore
                onClick={clickHandler}
                cursor={"pointer"}
            >
                #{tokenId}
            </Box>
            <HStack justifyContent="space-between">
                {rootOwner && (
                    <Box color={themes.color9} fontWeight={400} fontSize={14}>
                        {/*<Avatar size="2xs" mr={2} />*/}
                        Owned by <AddressLink address={rootOwner} />
                    </Box>
                )}

                <HStack>
                    <NetworkIcon networkId={networkId} size={18} />
                </HStack>
            </HStack>
        </Box>
    );
};
