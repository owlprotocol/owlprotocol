import { useRef, useState } from "react";
import { Box, SimpleGrid, useTheme } from "@chakra-ui/react";
import { CollectionCardPresenter } from "../../../NFT";
import { useVirtualizer } from "@tanstack/react-virtual";
import { makeData, Item } from "./dataFaker";

const ITEMS_QUANTITY = 500;

const NFTCollectionGridPresenter = () => {
    const [data, setDataNotInUse] = useState(() => makeData(ITEMS_QUANTITY));

    const parentRef = useRef();
    const rowVirtualizer = useVirtualizer({
        count: data.length,
        getScrollElement: () =>
            // @ts-ignore
            parentRef.current,
        estimateSize: () => 35,
    });
    const virtualItems = rowVirtualizer.getVirtualItems();

    const { themes } = useTheme();

    return (
        // @ts-ignore
        <Box ref={parentRef}>
            <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
                {virtualItems.map((item: Item, key) => (
                    <Box
                        key={item.key}
                        _hover={{ transform: "scale(1.05)" }}
                        transition={"300ms ease-in-out"}
                    >
                        <a
                            href={`/explore/${item.address}?networkId=${item.networkId}`}
                        >
                            <CollectionCardPresenter {...data[key]} />
                        </a>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export { NFTCollectionGridPresenter };
