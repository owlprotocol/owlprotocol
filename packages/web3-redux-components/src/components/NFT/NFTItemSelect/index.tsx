import {
    Box,
    Heading,
    Grid,
    GridItem,
    useTheme,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import ERC1155ItemCard from "../ERC1155ItemCard";
import ERC721ItemCard from "../ERC721ItemCard";

export interface Asset {
    id: string;
    networkId: any;
    address: string;
    itemName: string;
    assetPreviewSrc: string;
    tokenId: string;
    interface: "ERC721" | "ERC1155";
}

export interface Props {
    assets: Asset[];
    otherAssets: Asset[];
    selectedAssets?: string[];
    onSelect?: any;
}

const NFTItemSelect = ({
    assets = [],
    otherAssets = [],
    selectedAssets = [],
    onSelect,
}: Props) => {
    const { themes } = useTheme();
    const selectedAssetsIds = selectedAssets.map((asset: Asset) => asset.id);

    return (
        <Box
            color={themes.color9}
            maxW={660}
            // bg={
            //     "linear-gradient(0deg, rgba(28, 28, 36, 0.6), rgba(28, 28, 36, 0.6)), linear-gradient(143.93deg, rgba(28, 28, 36, 0.6) 0%, rgba(45, 45, 54, 0.6) 50%, rgba(28, 28, 36, 0.6) 100%)"
            // }
        >
            <Box borderBottom={`1px solid ${themes.color6}`}>
                <Heading textAlign={"center"} size="sm" py={6}>
                    Select an asset
                </Heading>
            </Box>
            <Tabs variant="soft-rounded" p={6}>
                <TabList my={6} gap={4}>
                    <Tab color={themes.color1} bg={"rgba(68, 71, 226, 0.2)"}>
                        Owned assets
                    </Tab>
                    <Tab color={themes.color1} bg={"rgba(68, 71, 226, 0.2)"}>
                        Missing items
                    </Tab>
                </TabList>
                <TabPanels>
                    {/* TODO;remove this code dupe. */}
                    <TabPanel p={0}>
                        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                            {assets?.map((asset: any, key: any) => (
                                <GridItem key={key}>
                                    {asset.interface === "ERC721" ? (
                                        <ERC721ItemCard
                                            {...asset}
                                            isSelected={selectedAssetsIds.includes(
                                                asset.id
                                            )}
                                            onSelect={onSelect}
                                            withSelection
                                        />
                                    ) : (
                                        <ERC1155ItemCard
                                            {...asset}
                                            isSelected={selectedAssetsIds.includes(
                                                asset.id
                                            )}
                                            onSelect={onSelect}
                                            withSelection
                                        />
                                    )}
                                </GridItem>
                            ))}
                        </Grid>
                    </TabPanel>
                    <TabPanel p={0}>
                        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                            {otherAssets?.map((asset: any, key: any) => (
                                <GridItem key={key}>
                                    {asset.interface === "ERC721" ? (
                                        <ERC721ItemCard
                                            {...asset}
                                            isSelected={selectedAssetsIds.includes(
                                                asset.id
                                            )}
                                            onSelect={onSelect}
                                            withSelection
                                        />
                                    ) : (
                                        <ERC1155ItemCard
                                            {...asset}
                                            isSelected={selectedAssetsIds.includes(
                                                asset.id
                                            )}
                                            onSelect={onSelect}
                                            withSelection
                                        />
                                    )}
                                </GridItem>
                            ))}
                        </Grid>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export { NFTItemSelect };
