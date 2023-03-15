import { Select, HStack, Button, Text, Box } from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";

export interface Props {
    data: any[];
    table: Table<any>;
}

const TableHeader = ({ data, table }: Props) => (
    <HStack p={6} justify={"space-between"}>
        <HStack flex={1}>
            <Text>
                More than {`>`} {data.length} collections found,
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
        </HStack>
    </HStack>
);

export { TableHeader };
