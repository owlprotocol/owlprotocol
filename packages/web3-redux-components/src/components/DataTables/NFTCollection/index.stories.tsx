import { Box, Heading } from "@chakra-ui/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NFTCollectionTablePresenter } from "./Table/Presenter";
import { NFTCollectionGridPresenter } from "./Grid/presenter";
import { NFTCollectionInfiniteGridPresenter } from "./InfiniteGrid/Presenter";
import { NFTCollectionInfiniteTablePresenter } from "./InfiniteTable/Presenter";

export default {
    title: "Tables/NFTCollection/Components",
    component: NFTCollectionTablePresenter,
} as ComponentMeta<typeof NFTCollectionTablePresenter>;

const TableTemplate: ComponentStory<typeof NFTCollectionTablePresenter> =
    () => <NFTCollectionTablePresenter />;
export const Table = TableTemplate.bind({});

const GridTemplate: ComponentStory<typeof NFTCollectionGridPresenter> = () => (
    <Box h={"100vh"}>
        <Heading>Simple list using TanStack Virtualize</Heading>
        <br />
        <br />
        <NFTCollectionGridPresenter />
    </Box>
);
export const Grid = GridTemplate.bind({});

const InfiniteGridTemplate: ComponentStory<
    typeof NFTCollectionInfiniteGridPresenter
> = () => (
    <Box h={"100vh"}>
        <Heading>
            Filter/Sort list using TanStack Table + Infinite Scroll
        </Heading>
        <br />
        <br />
        <NFTCollectionInfiniteGridPresenter />
    </Box>
);
export const InfiniteGrid = InfiniteGridTemplate.bind({});

const InfiniteTableTemplate: ComponentStory<
    typeof NFTCollectionInfiniteTablePresenter
> = () => (
    <Box h={"100vh"}>
        <Heading>Infinite Table</Heading>
        <br />
        <br />
        <NFTCollectionInfiniteTablePresenter />
    </Box>
);
export const InfiniteTable = InfiniteTableTemplate.bind({});
