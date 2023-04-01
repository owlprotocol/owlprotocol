import { Network, NetworkData } from "@owlprotocol/web3-redux";
import {
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    useTheme,
} from "@chakra-ui/react";
import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    RowData,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { omit } from "lodash-es";
import { TableWrapper } from "@owlprotocol/owl-theme";

interface NetworkCell extends NetworkData {
    edit?: boolean;
}

declare module "@tanstack/react-table" {
    interface TableMeta<TData extends RowData> {
        setEditData: (data: Partial<NetworkCell>) => void;
        saveData: (networkId: string) => void;
    }
}

const columnHelper = createColumnHelper<NetworkCell>();
const columns: ColumnDef<NetworkCell, any>[] = [
    columnHelper.accessor("networkId", {
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
    }),
    {
        accessorFn: (row) => row,
        id: "web3Rpc",
        cell: ({ getValue, table }) => {
            const network = getValue() as NetworkCell;
            const { edit, web3Rpc } = network;
            const initialValue = web3Rpc;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [value, setValue] = useState(initialValue);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
                if (!edit) setValue(undefined);
                else setValue(initialValue);
            }, [initialValue, edit]);

            const onBlur = () => {
                table.options.meta?.setEditData({ ...network, web3Rpc: value });
            };

            if (!edit) return <>{web3Rpc}</>;
            return (
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                />
            );
        },
    },
    {
        accessorFn: (row) => row,
        id: "save",
        cell: ({ getValue, table }) => {
            const { networkId, edit } = getValue() as NetworkCell;
            const onClickEdit = () => {
                table.options.meta?.setEditData({ networkId, edit: true });
            };
            const onClickCancel = () => {
                table.options.meta?.setEditData({ networkId, edit: false });
            };
            const onClickSave = () => {
                table.options.meta?.saveData(networkId);
            };
            if (!edit)
                return (
                    <Button variant={"form"} h={6} onClick={onClickEdit}>
                        Edit
                    </Button>
                );

            return (
                <>
                    <Button variant={"form"} onClick={onClickCancel}>
                        Cancel
                    </Button>
                    <Button variant={"form"} onClick={onClickSave}>
                        Save
                    </Button>
                </>
            );
        },
    },
];

export const NetworkTable = () => {
    const { themes } = useTheme();
    const dispatch = useDispatch();
    const [networks] = Network.hooks.useAll();
    //Temp copy storing edited values
    const [networksEdit, setNetworksEdit] = useState<
        Record<string, NetworkCell>
    >({});

    const data = (networks ?? []).map((n) => {
        const nEdit = networksEdit[n.networkId];
        return {
            ...n,
            ...nEdit,
        };
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true,
        meta: {
            setEditData: (data) => {
                const networkId = data.networkId!;
                const newEdit = {
                    ...networksEdit,
                    [networkId]: { ...data, networkId },
                };
                setNetworksEdit(newEdit);
            },
            saveData: (networkId) => {
                const network = networksEdit[networkId];
                const newEdit = {
                    ...networksEdit,
                    [networkId]: { ...networksEdit[networkId], edit: false },
                };
                setNetworksEdit(newEdit);
                dispatch(Network.actions.update(omit(network, ["edit"])));
            },
        },
    });

    return (
        <TableWrapper>
            <TableContainer color={themes.color9}>
                <Table variant="unstyled">
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <br />
                    <Tbody>
                        {table.getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Td>
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
                                            : flexRender(
                                                  header.column.columnDef
                                                      .footer,
                                                  header.getContext()
                                              )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Tfoot>
                </Table>
            </TableContainer>
        </TableWrapper>
    );
};
