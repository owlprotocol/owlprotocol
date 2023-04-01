import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnDef,
    flexRender,
} from "@tanstack/react-table";
import { makeData, Item } from "./dataFaker";
import { useMemo, useState } from "react";
import {
    Badge,
    Box,
    Text,
    Button,
    HStack,
    TableContainer,
    Table as ChakraTable,
    useTheme,
    Tbody,
    Thead,
    Tr,
    Td,
    Th,
    Select,
} from "@chakra-ui/react";
import { TableWrapper } from "@owlprotocol/owl-theme";
import NetworkIcon from "../../NetworkIcon";

const TransactionTablePresenter = () => {
    const columns = useMemo<ColumnDef<Item>[]>(
        () => [
            {
                accessorKey: "networkId",
                cell: (props) => props.getValue(),
                header: () => <span>Network</span>,
            },
            {
                accessorKey: "txnHash",
                cell: (props) => props.getValue(),
                header: () => <span>Txn Hash</span>,
            },
            {
                accessorKey: "method",
                cell: (props) => props.getValue(),
                header: () => <span>method</span>,
            },
            {
                accessorKey: "blockNumber",
                cell: (props) => props.getValue(),
                header: () => <span>block</span>,
            },
            {
                accessorKey: "age",
                cell: (props) => props.getValue(),
                header: () => <span>age</span>,
            },
            {
                accessorKey: "from",
                cell: (props) => props.getValue(),
                header: () => <span>from</span>,
            },
            {
                accessorKey: "to",
                cell: (props) => props.getValue(),
                header: () => <span>to</span>,
            },
            {
                accessorKey: "value",
                cell: (props) => props.getValue(),
                header: () => <span>value</span>,
            },
            {
                accessorKey: "fee",
                cell: (props) => props.getValue(),
                header: () => <span>fee</span>,
            },
        ],
        []
    );

    const [data, setData] = useState(() => makeData(50000));

    return (
        <Box p={4}>
            <Table
                {...{
                    data,
                    columns,
                }}
            />
        </Box>
    );
};

function Table({
    data,
    columns,
}: {
    data: Item[];
    columns: ColumnDef<Item>[];
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const { themes } = useTheme();

    if (data.length < 1) {
        return (
            <Box mt={4} px={4} p={3} borderWidth={1} borderRadius={12}>
                No transactions found
            </Box>
        );
    }

    return (
        <TableWrapper>
            <TableContainer color={themes.color9} bg={themes.color5}>
                {/* Table Toolbar */}
                <HStack p={6} justify={"space-between"}>
                    <HStack flex={1}>
                        <Text>
                            More than {`>`} {data.length} transactions found,
                        </Text>
                        <Text>
                            showing {table.getRowModel().rows.length} Rows
                        </Text>
                    </HStack>
                    <HStack>
                        <Button
                            variant="hollow"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            textTransform={"capitalize"}
                        >
                            first page
                        </Button>
                        <Button
                            variant="hollow"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Prev
                        </Button>
                        <Button
                            variant="hollow"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                        <Button
                            variant="hollow"
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                            textTransform={"capitalize"}
                        >
                            last page
                        </Button>
                    </HStack>
                    <HStack>
                        <Box>
                            <div>Page</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of{" "}
                                {table.getPageCount()}
                            </strong>
                        </Box>
                        <Select
                            variant="form"
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </Select>
                    </HStack>
                </HStack>
                {/* Table Content */}

                <ChakraTable variant="unstyled">
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            <Text fontWeight={"bold"}>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                            </Text>
                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        if (cell.column.id === "networkId") {
                                            return (
                                                <Td key={cell.id}>
                                                    <NetworkIcon
                                                        networkId={String(
                                                            cell.getValue()
                                                        )}
                                                    />
                                                </Td>
                                            );
                                        } else if (
                                            cell.column.id === "method"
                                        ) {
                                            return (
                                                <Td key={cell.id}>
                                                    <Badge>
                                                        {cell.getValue()}
                                                    </Badge>
                                                </Td>
                                            );
                                        } else {
                                            return (
                                                <Td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </Td>
                                            );
                                        }
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </ChakraTable>
            </TableContainer>
        </TableWrapper>
    );
}

export { TransactionTablePresenter };
