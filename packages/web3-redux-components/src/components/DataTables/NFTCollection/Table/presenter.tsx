import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    SortingState,
    ColumnDef,
    flexRender,
    Cell,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
    Box,
    Text,
    TableContainer,
    Table as ChakraTable,
    useTheme,
    Tbody,
    Thead,
    Tr,
    Th,
    Td,
    HStack,
} from "@chakra-ui/react";
import { TableHeader } from "./TableHeader";
import { AvatarCell } from "./Cells/AvatarCell";
import { PreviewAvatarsCell } from "./Cells/PreviewAvatarsCell";
import { makeData } from "./dataFaker";

const NFTCollectionTablePresenter = () => {
    const { themes } = useTheme();
    const [sorting, setSorting] = useState<SortingState>([]);

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
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

    const [data, setData] = useState(() => makeData(500));

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: false,
    });

    if (data.length < 1) {
        return (
            <Box mt={4} px={4} p={3} borderWidth={1} borderRadius={12}>
                No collections found
            </Box>
        );
    }

    return (
        <Box>
            <TableContainer color={themes.color9} bg={themes.color5}>
                <TableHeader data={data} table={table} />

                <ChakraTable variant="unstyled">
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
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
                                                        header.column.columnDef
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
                        {table.getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row
                                    .getVisibleCells()
                                    .map((cell: Cell<any, any>) => (
                                        <Td key={cell.id} p={4} width={"80px"}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    ))}
                            </Tr>
                        ))}
                    </Tbody>
                </ChakraTable>
            </TableContainer>
        </Box>
    );
};

export { NFTCollectionTablePresenter };
