import { Button, Table, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { getCoreRowModel, createColumnHelper, useReactTable, flexRender } from '@tanstack/react-table';
import { useReducer } from 'react';

export interface Person {
    firstName: string;
    lastName: string;
}

export interface Props {
    data: Person[];
}

//https://tanstack.com/table/v8/docs/examples/react/basic
//https://codesandbox.io/s/github/tanstack/table/tree/main/examples/react/basic?from-embed=&file=/src/main.tsx:829-1138
/**
 * Example Table Component using TanStack React Table
 */
export const ExampleTable = ({ data }: Props) => {
    const rerender = useReducer(() => ({}), {})[1];

    const columnHelper = createColumnHelper<Person>();
    const columns = [
        columnHelper.accessor('firstName', {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor((row) => row.lastName, {
            id: 'lastName',
            cell: (info) => <i>{info.getValue()}</i>,
            header: () => <span>Last Name</span>,
            footer: (info) => info.column.id,
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true,
    });
    return (
        <>
            <Table>
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <Tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <Th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.footer, header.getContext())}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Tfoot>
            </Table>
            <div className="h-4" />
            <Button onClick={() => rerender()} className="border p-2">
                Rerender
            </Button>
        </>
    );
};
