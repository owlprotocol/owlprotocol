//@ts-nocheck
import {
    Box,
    Button,
    VStack,
    HStack,
    useTheme,
    Center,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { NFTGenerativeItemId } from "@owlprotocol/web3-redux/src/nftgenerativeitem/model/interface.js";
import {
    ERC721GenerativeInstance,
    ERC721GenerativeInstanceProps,
} from "./ERC721GenerativeInstance.js";
import { ERC721GenerativeInstanceGridModal } from "./ERC721GenerativeInstanceGridModal.js";
import Icon from "../Icon/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export interface ERC721GenerativeInstanceSelect {
    selecting: boolean;
    token: NFTGenerativeItemId | undefined;
    tokens: NFTGenerativeItemId[];
    setSelecting: (selecting: boolean) => any;
    onSelect: (token: NFTGenerativeItemId | undefined) => any;
}

export const ERC721GenerativeInstanceSelect = ({
    selecting,
    token,
    tokens,
    setSelecting,
    onSelect,
}: ERC721GenerativeInstanceSelect) => {
    const { themes } = useTheme();

    const setSelected = useCallback(
        (token: NFTGenerativeItemId | undefined) => {
            onSelect(token);
            setSelecting(!selecting);
        },
        [selecting, setSelecting, onSelect]
    );

    if (!selecting) {
        if (token) {
            return (
                <Box my={4}>
                    <ERC721GenerativeInstance
                        networkId={token.networkId}
                        address={token.address}
                        tokenId={token.tokenId}
                        status={token.status}
                        InstanceMenu={() => (
                            <HStack spacing={-5} float={"right"}>
                                <Button
                                    onClick={(e) => setSelected(undefined)}
                                    variant={"ghost"}
                                >
                                    <Icon icon="pencil" size={18} />
                                </Button>
                                <Button
                                    onClick={() => onSelect(undefined)}
                                    variant={"ghost"}
                                >
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        size={"sm"}
                                    />
                                </Button>
                            </HStack>
                        )}
                    />
                </Box>
            );
        } else {
            return (
                <VStack
                    onClick={(e) => setSelected(undefined)}
                    w={"138px"}
                    h={"138px"}
                    bg={themes.color5}
                    justify={"center"}
                    align={"center"}
                    borderRadius={12}
                    cursor={"pointer"}
                    p={2}
                >
                    <Box w={"100%"} bg={themes.color6} borderRadius={12} py={6}>
                        <Center>
                            <Icon icon="AddRounded" size={40} />
                        </Center>
                    </Box>
                    <Box
                        w={"100%"}
                        border={"2px solid"}
                        borderColor={themes.color6}
                        borderRadius={12}
                        textAlign={"center"}
                        fontWeight={400}
                        fontSize={10}
                        p={1}
                    >
                        Select Item
                    </Box>
                </VStack>
            );
        }
    } else {
        return (
            <ERC721GenerativeInstanceGridModal
                isOpen={!token}
                tokens={tokens}
                onClick={setSelected}
            />
        );
    }
};

export interface ERC721GenerativeInstanceSelectWithState {
    tokens?: NFTGenerativeItemId[];
}
export const ERC721GenerativeInstanceSelectWithState = ({
    tokens = [],
}: ERC721GenerativeInstanceSelectWithState) => {
    const [selecting, setSelecting] = useState(false);
    const [selected, setSelected] = useState<NFTGenerativeItemId | undefined>();

    return (
        <ERC721GenerativeInstanceSelect
            token={selected}
            tokens={tokens}
            selecting={selecting}
            setSelecting={setSelecting}
            onSelect={setSelected}
        />
    );
};
