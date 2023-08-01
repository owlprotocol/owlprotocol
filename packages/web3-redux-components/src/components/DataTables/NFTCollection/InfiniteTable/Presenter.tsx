import {
    Box,
    Table as ChakraTable,
    Text,
    useTheme,
    Tbody,
    HStack,
    Th,
    Thead,
    Tr,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    QueryClient,
    QueryClientProvider,
    useInfiniteQuery,
} from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { ApiResponse, Item, fetchData } from "./dataFaker";
import { AvatarCell } from "../Table/Cells/AvatarCell";
import { PreviewAvatarsCell } from "../Table/Cells/PreviewAvatarsCell";
import { Filters } from "../Filters";
import NetworkIcon from "../../../NetworkIcon";

const fetchSize = 25;
// Sortable accessors
export const accessors = ["networkId", "title", "isVerified"];

const VirtualComponent = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const columns = useMemo<ColumnDef<Item>[]>(
        () => [
            {
                accessorKey: "networkId",
                id: "networkId",
                // header: "networkId",
                header: () => <span></span>,
            },
            {
                id: "assetAvatarSrc",
                cell: (props) => {
                    const { isVerified, assetAvatarSrc } =
                        props.cell.row.original;

                    return (
                        <AvatarCell
                            isVerified={isVerified}
                            assetAvatarSrc={assetAvatarSrc}
                        />
                    );
                },
                header: () => <span>Collection</span>,
            },
            {
                accessorKey: "title",
                cell: (props) => (
                    <Text color={themes.color7} fontWeight={600}>
                        {props.getValue()}
                    </Text>
                ),
                header: () => <span></span>,
            },
            {
                accessorKey: "participants",
                cell: (props) => (
                    <Text color={themes.color7} fontWeight={600}>
                        {props.getValue()}
                    </Text>
                ),
                header: () => <span>Participants</span>,
            },
            {
                accessorKey: "volume",
                cell: (props) => (
                    <Text color={themes.color7} fontWeight={600}>
                        {props.getValue()}
                    </Text>
                ),
                header: () => <span>Volume</span>,
            },
            {
                accessorKey: "recipes",
                cell: (props) => (
                    <Text color={themes.color7} fontWeight={600}>
                        {props.getValue()}
                    </Text>
                ),
                header: () => <span>Recipes</span>,
            },
            {
                id: "collectionPreviewSrcs",
                cell: (props) => {
                    const { collectionPreviewSrcs } = props.cell.row.original;

                    return (
                        <PreviewAvatarsCell
                            collectionPreviewSrcs={collectionPreviewSrcs}
                        />
                    );
                },
            },
        ],
        []
    );

    const { data, fetchNextPage, isFetching, isLoading } =
        useInfiniteQuery<ApiResponse>(
            ["table-data", sorting], //adding sorting state as key causes table to reset and fetch from new beginning upon sort
            async ({ pageParam = 0 }) => {
                const start = pageParam * fetchSize;
                const fetchedData = fetchData(start, fetchSize, sorting); //pretend api call
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

    const table = useReactTable({
        data: flatData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: false,
    });

    const { rows } = table.getRowModel();
    const rowVirtualizer = useVirtualizer({
        getScrollElement: () =>
            // @ts-ignore
            tableContainerRef,
        size: rows.length,
        overscan: 10,
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
            <Box
                ref={tableContainerRef}
                onScroll={(e) =>
                    fetchMoreOnBottomReached(e.target as HTMLDivElement)
                }
            >
                <TableContainer color={themes.color9} bg={themes.color5}>
                    <ChakraTable variant="unstyled">
                        <Thead>
                            {table.getHeaderGroups().map((headerGroup: any) => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header: any) => {
                                        return (
                                            <Th
                                                p={4}
                                                key={header.id}
                                                colSpan={header.colSpan}
                                            >
                                                <HStack>
                                                    <Text
                                                        fontSize={18}
                                                        fontWeight={600}
                                                        textTransform={"none"}
                                                        cursor={"pointer"}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                    </Text>
                                                    <Box>
                                                        {{
                                                            asc: " 🔼",
                                                            desc: " 🔽",
                                                        }[
                                                            header.column.getIsSorted() as string
                                                        ] ?? null}
                                                    </Box>
                                                </HStack>
                                            </Th>
                                        );
                                    })}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody>
                            {virtualRows.map((virtualRow) => {
                                const row = rows[virtualRow.index] as Row<Item>;

                                return (
                                    <Tr key={row.id}>
                                        {row
                                            .getVisibleCells()
                                            .map((cell: any) => {
                                                if (
                                                    cell.column.columnDef.id ===
                                                    "networkId"
                                                ) {
                                                    return (
                                                        <Td key={cell.id}>
                                                            <NetworkIcon
                                                                networkId={cell
                                                                    .getContext()
                                                                    .getValue()}
                                                            />
                                                        </Td>
                                                    );
                                                }

                                                return (
                                                    <Td key={cell.id}>
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </Td>
                                                );
                                            })}
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </ChakraTable>
                </TableContainer>
            </Box>
        </>
    );
};

const queryClient = new QueryClient();
const NFTCollectionInfiniteTablePresenter = () => (
    <QueryClientProvider client={queryClient}>
        <VirtualComponent />
    </QueryClientProvider>
);

export { NFTCollectionInfiniteTablePresenter };
