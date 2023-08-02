import { IconButton } from "@chakra-ui/react";
import { useAddressHasTag } from "@owlprotocol/web3-redux";
import Icon from "../../Icon/index.js";

export const AddressFavoriteButton = ({
    networkId,
    address,
}: { networkId: string, address: string }) => {
    const [isFavorite, { toggleLabel }] = useAddressHasTag(networkId, address, "Favorite");
    return (
        <IconButton
            variant="cube"
            onClick={toggleLabel}
            aria-label={"mark as favorite"}
            icon={<Icon icon={isFavorite ? "heart.active" : "heart"} />}
        />
    );
};
