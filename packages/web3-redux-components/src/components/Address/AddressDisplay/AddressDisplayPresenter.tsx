import { useCallback, useEffect, useState } from "react";
import {
    useTheme,
    Flex,
    Box,
    Text,
    Button,
    IconButton,
    Input,
    StyleProps,
} from "@chakra-ui/react";
import copy from "copy-to-clipboard";
import Icon from "../../Icon/index.js";
import NetworkIcon from "../../NetworkIcon/index.js";
import QRCodePopover from "../../QRCodePopover/index.js";
import { Address } from "../../../interfaces/Address.js";

export type Control = "qr" | "copy" | "favorite" | "edit" | "icon";
export interface AddressDisplayPresenterProps extends Address {
    label?: string;
    isFavorite?: boolean;
    borderRadius?: number;
    bg?: string;
    toggleFavorite?: () => void;
    setLabel?: (v: string) => void;
    controls?: Control[];
    containerStyles?: StyleProps;
}

export const AddressDisplayPresenter = ({
    networkId,
    address,
    label,
    isFavorite,
    borderRadius = 12,
    bg,
    toggleFavorite = () => console.log("toggleFavorite()"),
    setLabel = (v) => console.log(`setLabel(${v})`),
    controls = ["qr", "copy", "favorite", "edit", "icon"],
    containerStyles,
}: AddressDisplayPresenterProps) => {
    const { themes } = useTheme();

    const [editLabelText, setEditLabelText] = useState("");
    const [editLabel, setEditLabel] = useState(false);

    //Default edit input text
    useEffect(() => {
        setEditLabelText(label ?? "");
    }, [label]);

    const handleSave = useCallback(() => {
        setLabel(editLabelText);
        setEditLabel(false);
    }, [setLabel, editLabelText]);

    const handleInputKeyDown = useCallback(
        (e: any) => {
            if (e.key === "Enter") handleSave();
        },
        [handleSave]
    );

    const handleEditOnClick = useCallback(() => {
        setEditLabel(true);
    }, [setEditLabel]);

    const handleEditOnChange = useCallback(({ target }: any) => {
        setEditLabelText(target.value);
    }, []);

    const handleCancelOnClick = useCallback(() => {
        setEditLabel(false);
    }, [setEditLabel]);

    const handleCopy = useCallback(() => {
        copy(address);
    }, [address]);

    return (
        <Flex
            p={2}
            h={"60px"}
            alignItems={"center"}
            justify={"space-between"}
            bg={bg || themes.color5}
            borderRadius={borderRadius}
            {...containerStyles}
        >
            {controls.includes("qr") && <QRCodePopover address={address} />}
            {controls.includes("icon") && (
                <NetworkIcon networkId={networkId} size={20} />
            )}

            {editLabel && (
                <Box color={themes.color9} textAlign={"left"} flex={1}>
                    <Input
                        h={"30px"}
                        border={0}
                        borderRadius={0}
                        lineHeight={1}
                        borderBottom={"1px solid"}
                        fontSize={"lg"}
                        type="text"
                        placeholder="Label"
                        value={editLabelText}
                        onChange={handleEditOnChange}
                        onKeyDown={handleInputKeyDown}
                    />
                </Box>
            )}

            {!editLabel && (
                <Box
                    color={themes.color9}
                    fontSize={14}
                    fontWeight={400}
                    flex={1}
                    w={["30%", "40%", "75%"]}
                >
                    {label ? (
                        <Flex>
                            <Text
                                fontSize={16}
                                isTruncated
                                maxW={"50%"}
                                mx={2}
                                ml={4}
                            >
                                {label}
                            </Text>
                            &lt;
                            <Text isTruncated fontSize={16}>
                                {address}
                            </Text>
                            &gt;
                        </Flex>
                    ) : (
                        <Text isTruncated fontSize={16} px={2}>
                            {address}
                        </Text>
                    )}
                </Box>
            )}

            {editLabel ? (
                <Flex alignItems={"center"}>
                    <Button onClick={handleSave} bg={"transparent"} h={"35px"}>
                        Save
                    </Button>
                    <Button
                        onClick={handleCancelOnClick}
                        color={themes.color9}
                        bg={"transparent"}
                        h={"35px"}
                    >
                        Cancel
                    </Button>
                </Flex>
            ) : (
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                    {controls.includes("copy") && (
                        <IconButton
                            mx={2}
                            variant="cube"
                            onClick={handleCopy}
                            aria-label={"copy to clipboard"}
                            icon={<Icon icon="copy" size={20} />}
                        />
                    )}
                    {controls.includes("favorite") && (
                        <IconButton
                            mx={2}
                            variant="cube"
                            onClick={toggleFavorite}
                            aria-label={"mark as favorite"}
                            icon={
                                <Icon
                                    icon={isFavorite ? "heart.active" : "heart"}
                                />
                            }
                        />
                    )}
                    {controls.includes("edit") && (
                        <IconButton
                            mx={2}
                            variant="cube"
                            onClick={handleEditOnClick}
                            aria-label={"click to edit"}
                            icon={<Icon icon="pencil" />}
                        />
                    )}
                </Flex>
            )}
        </Flex>
    );
};

export default AddressDisplayPresenter;
