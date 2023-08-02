import { Box, Text, Image, useTheme, HStack } from "@chakra-ui/react";
import { ReactComponent as EthereumIcon } from "./icons/eth.svg";
import { ReactComponent as OptimismIcon } from "./icons/optimism.svg";
import { ReactComponent as ArbitrumIcon } from "./icons/arbitrum.svg";
import { ReactComponent as PolygonIcon } from "./icons/polygon.svg";
import { ReactComponent as MoonbeamIcon } from "./icons/moonbeam.svg";
import { ReactComponent as MoonriverIcon } from "./icons/moonriver.svg";
import { ReactComponent as BNBIcon } from "./icons/bnb.svg";
import AnvilIcon from "./icons/anvil-logo-sm.png";

const NETWORK_LABELS: any = {
    "1": "ethereum",
    "10": "optimism",
    "137": "polygon",
};

export interface Props {
    networkId?: number | string | undefined;
    size?: number | string | undefined;
    label?: boolean;
}
export const NetworkIcon = ({
    networkId = "1",
    size = 30,
    label = false,
}: Props) => {
    const IconSelect = (icon: number | string) => {
        switch (icon) {
            case "1":
            case "ethereum":
                return <EthereumIcon />;
            case "10":
            case "optimism":
                return <OptimismIcon />;
            case "42161":
            case "arbitrum":
                return <ArbitrumIcon />;
            case "137":
            case "polygon":
                return <PolygonIcon />;
            case "moonbeam":
                return <MoonbeamIcon />;
            case "moonriver":
                return <MoonriverIcon />;
            case "56":
            case "binance":
                return <BNBIcon />;
            case "31337":
                return <Image src={AnvilIcon} />;
            default:
                return (
                    <Box borderRadius={"50%"} bg={"#eee"} boxSize={"100%"} />
                );
        }
    };

    const { themes } = useTheme();

    return (
        <HStack>
            <Box boxSize={`${size}px`}>
                {IconSelect(String(networkId).toLowerCase())}
            </Box>
            {label && (
                <Text
                    color={themes.color7}
                    fontSize={14}
                    textTransform={"capitalize"}
                >
                    {NETWORK_LABELS[networkId]}
                </Text>
            )}
        </HStack>
    );
};

export default NetworkIcon;
