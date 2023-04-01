import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnDef,
    flexRender,
    getFilteredRowModel,
    Cell,
    getFacetedUniqueValues,
} from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import {
    Box,
    Text,
    TableContainer,
    Table as ChakraTable,
    Thead,
    Tr,
    Th,
    Tbody,
    useTheme,
    HStack,
    Badge,
    Td,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { TableWrapper } from "@owlprotocol/owl-theme";
import NetworkIcon from "../../../NetworkIcon";
import { interfaceIdNames } from "@owlprotocol/contracts";
import Filter from "./tableUtils/Filter";
import TableHeader from "./TableHeader";

export interface ContractsManagerTableProps {
    contracts: Contract[];
}

export type Contract = {
    networkId: string;
    address: string;
};

const ContractsManagerTablePresenter = ({
    contracts,
}: ContractsManagerTableProps) => {
    const columns = useMemo<ColumnDef<Contract>[]>(
        () => [
            {
                accessorKey: "networkId",
                cell: (props) => props.getValue(),
                header: () => <span>Network</span>,
            },
            {
                accessorKey: "address",
                cell: (props) => props.getValue(),
                header: () => <span>Address</span>,
            },
            {
                accessorKey: "interfaceIds",
                cell: (props) => props.getValue(),
                header: () => <span>Interfaces</span>,
                filterFn: (rows: any, columnIds: any, filterValues: any) => {
                    // no filters assigned, show all
                    if (filterValues.length === 0) return true;

                    // filter by selective IDs
                    return (
                        rows.original.interfaceIds.filter((id: any) =>
                            filterValues.includes(id)
                        ).length > 0
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data: contracts,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    const { themes } = useTheme();

    if (contracts.length < 1) {
        return (
            <Box mt={4} px={4} p={3} borderWidth={1} borderRadius={12}>
                No contracts found
            </Box>
        );
    }

    return (
        <TableWrapper>
            <TableContainer bg={themes.color5}>
                <TableHeader contracts={contracts} table={table} />

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
                                            <HStack>
                                                <Text fontWeight={"bold"}>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                </Text>
                                                {header.column.getCanFilter() ? (
                                                    <Box>
                                                        <Filter
                                                            table={table}
                                                            column={
                                                                header.column
                                                            }
                                                        />
                                                    </Box>
                                                ) : null}
                                            </HStack>
                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.length === 0 && (
                            <Tr>
                                <Td>
                                    <Text p={4} fontSize="lg">
                                        nothing here, try another filter
                                    </Text>
                                </Td>
                            </Tr>
                        )}
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row
                                        .getVisibleCells()
                                        .map((cell: Cell<any, any>) => {
                                            if (
                                                cell.column.id === "networkId"
                                            ) {
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
                                                cell.column.id ===
                                                "interfaceIds"
                                            ) {
                                                const ids: string[] =
                                                    cell.getValue() || [];

                                                return (
                                                    <Td key={cell.id}>
                                                        {ids.map(
                                                            (id: string) => (
                                                                <Badge
                                                                    key={id}
                                                                    mr={2}
                                                                    bg={
                                                                        themes.color4
                                                                    }
                                                                >
                                                                    <Link
                                                                        to={"/"}
                                                                    >
                                                                        {
                                                                            interfaceIdNames[
                                                                                id
                                                                            ]
                                                                        }
                                                                    </Link>
                                                                </Badge>
                                                            )
                                                        )}
                                                    </Td>
                                                );
                                            } else {
                                                return (
                                                    <Td key={cell.id}>
                                                        <Text>
                                                            {cell.getValue()}
                                                        </Text>
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
};

export { ContractsManagerTablePresenter };
