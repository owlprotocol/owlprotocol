import { Select, HStack, Button, Text, Box } from "@chakra-ui/react";
import { Contract } from "@owlprotocol/web3-redux/src/contract/model";
import { Table } from "@tanstack/react-table";

export interface Props {
    contracts: Contract[];
    table: Table<any>;
}

const TableHeader = ({ contracts, table }: Props) => (
    <HStack p={6} justify={"space-between"}>
        <HStack flex={1}>
            <Text>
                More than {`>`} {contracts.length} transactions found,
            </Text>
            <Text>showing {table.getRowModel().rows.length} Rows</Text>
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
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
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
);

export default TableHeader;
