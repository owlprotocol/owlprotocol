import { Box, SimpleGrid, useTheme } from "@chakra-ui/react";
import {
    Row,
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    sortingFns,
    FilterFn,
    SortingFn,
    getFilteredRowModel,
} from "@tanstack/react-table";
import {
    QueryClient,
    QueryClientProvider,
    useInfiniteQuery,
} from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { CollectionCardPresenter } from "../../../NFT";
import { ApiResponse, Item, fetchData } from "./dataFaker";
import { Filters } from "../Filters";
import {
    RankingInfo,
    rankItem,
    compareItems,
} from "@tanstack/match-sorter-utils";

declare module "@tanstack/table-core" {
    interface FilterFns {
        fuzzy: FilterFn<unknown>;
    }
    interface FilterMeta {
        itemRank: RankingInfo;
    }
}

const fetchSize = 25;

// Sortable accessors
export const accessors = ["networkId", "title", "isVerified"];

const VirtualComponent = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const columns = useMemo<ColumnDef<Item>[]>(
        () => [
            {
                accessorKey: "networkId",
                header: "networkId",
            },
            {
                accessorKey: "address",
                header: "address",
            },
            {
                accessorKey: "title",
                header: "title",
            },
            {
                accessorKey: "isVerified",
                header: "isVerified",
            },
            {
                accessorKey: "description",
                header: "description",
            },
            {
                accessorKey: "assetAvatarSrc",
                header: "assetAvatarSrc",
            },
            {
                accessorKey: "assetPreviewSrc",
                header: "assetPreviewSrc",
            },
        ],
        []
    );

    const [sorting, setSorting] = useState<SortingState>([]);

    const { data, fetchNextPage, isFetching, isLoading } =
        useInfiniteQuery<ApiResponse>(
            //adding sorting state as key causes table to reset and fetch from new beginning upon sort
            ["table-data", sorting],
            async ({ pageParam = 0 }) => {
                const start = pageParam * fetchSize;
                //pretend api call
                const fetchedData = fetchData(start, fetchSize, sorting);
                return fetchedData;
            },
            {
                getNextPageParam: (_lastGroup, groups) => groups.length,
                keepPreviousData: true,
                refetchOnWindowFocus: false,
            }
        );

    const flatData = useMemo(
        () => data?.pages?.flatMap((page) => page.data) ?? [],
        [data]
    );
    const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
    const totalFetched = flatData.length;

    //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } =
                    containerRefElement;
                //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
                if (
                    scrollHeight - scrollTop - clientHeight < 300 &&
                    !isFetching &&
                    totalFetched < totalDBRowCount
                ) {
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
    );

    useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current);
    }, [fetchMoreOnBottomReached]);

    const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
        let dir = 0;

        // Only sort by rank if the column has ranking information
        if (rowA.columnFiltersMeta[columnId]) {
            dir = compareItems(
                rowA.columnFiltersMeta[columnId]?.itemRank!,
                rowB.columnFiltersMeta[columnId]?.itemRank!
            );
        }

        // Provide an alphanumeric fallback for when the item ranks are equal
        return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
    };
    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        // Rank the item
        const itemRank = rankItem(row.getValue(columnId), value);

        // Store the itemRank info
        addMeta({
            itemRank,
        });

        // Return if the item should be filtered in/out
        return itemRank.passed;
    };
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data: flatData,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            sorting,
            globalFilter,
        },
        globalFilterFn: fuzzyFilter,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: false,
    });

    const { rows } = table.getRowModel();
    const rowVirtualizer = useVirtualizer({
        getScrollElement: () =>
            // @ts-ignore
            tableContainerRef.current,
        overscan: 10,
        count: rows.length,
        estimateSize: () => 35,
    });
    const virtualRows = rowVirtualizer.getVirtualItems();
    const { themes } = useTheme();

    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        <>
            <Filters
                accessors={accessors}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                tableSetSorting={table.setSorting}
            />
            <SimpleGrid
                spacing={4}
                columns={[1, 2, 2, 4]}
                ref={tableContainerRef}
                onScroll={(e) =>
                    fetchMoreOnBottomReached(e.target as HTMLDivElement)
                }
            >
                {virtualRows.map((virtualRow: any) => {
                    const row = rows[virtualRow.index] as Row<Item>;
                    const networkId = row.getValue("networkId");
                    const address = row.getValue("address");
                    const title = row.getValue("title");
                    const isVerified = row.getValue("isVerified");
                    const description = row.getValue("description");
                    const assetAvatarSrc = row.getValue("assetAvatarSrc");
                    const assetPreviewSrc = row.getValue("assetPreviewSrc");

                    const itemData = {
                        networkId,
                        address,
                        title,
                        isVerified,
                        description,
                        assetAvatarSrc,
                        assetPreviewSrc,
                    };

                    return (
                        <Box
                            key={row.id}
                            _hover={{ transform: "scale(1.05)" }}
                            transition={"300ms ease-in-out"}
                        >
                            <a
                                href={`/explore/${address}?networkId=${networkId}`}
                            >
                                <CollectionCardPresenter {...itemData} />
                            </a>
                        </Box>
                    );
                })}
            </SimpleGrid>
        </>
    );
};

const queryClient = new QueryClient();
const NFTCollectionInfiniteGridPresenter = () => (
    <QueryClientProvider client={queryClient}>
        <VirtualComponent />
    </QueryClientProvider>
);

export { NFTCollectionInfiniteGridPresenter };
