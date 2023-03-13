import {
    Button,
    Checkbox,
    CheckboxGroup,
    HStack,
    Input,
    Select,
    Stack,
} from "@chakra-ui/react";
import { Column, Table as ReactTable } from "@tanstack/react-table";
import { interfaceIdNames } from "@owlprotocol/contracts";
import { useState } from "react";

function Filter({
    column,
    table,
}: {
    column: Column<any, any>;
    table: ReactTable<any>;
}) {
    const [interfaceFilters, setInterfaceFilters] = useState<string[]>([]);
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    if (column.id === "networkId") return null;

    if (column.id === "interfaceIds") {
        const filters = column.getFilterValue();

        return (
            <div>
                <HStack maxW={"2xl"} overflow={"auto"} h={12}>
                    <Select
                        h={6}
                        fontSize={"sm"}
                        flex={"1 0 200px"}
                        onChange={(e) =>
                            column.setFilterValue([e.target.value])
                        }
                    >
                        <option value={""}>PICK A FILTER</option>
                        {Object.entries(interfaceIdNames).map(
                            ([id, value], key) => (
                                <option key={key} value={id}>
                                    {value}
                                </option>
                            )
                        )}
                    </Select>
                    <Button
                        flexShrink={0}
                        h={6}
                        variant="hollow"
                        px={4}
                        onClick={() => {
                            setInterfaceFilters([]);
                            column.setFilterValue([]);
                        }}
                    >
                        CLEAR FILTERS
                    </Button>
                    <CheckboxGroup>
                        {Object.entries(interfaceIdNames).map(
                            ([id, value], key) => (
                                <Checkbox
                                    key={key}
                                    value={id}
                                    isChecked={interfaceFilters.includes(id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setInterfaceFilters(
                                                interfaceFilters.filter(
                                                    (a) => a !== e.target.value
                                                )
                                            );
                                        } else {
                                            setInterfaceFilters([
                                                ...interfaceFilters,
                                                e.target.value,
                                            ]);
                                        }

                                        column.setFilterValue(interfaceFilters);
                                    }}
                                >
                                    {value}
                                </Checkbox>
                            )
                        )}
                    </CheckboxGroup>
                </HStack>
                filters: {filters}
                <br />
                {interfaceFilters.length > 0 &&
                    `Active Filters: ${interfaceFilters.join(", ")}`}
            </div>
        );
    }

    return typeof firstValue === "number" ? (
        <div>
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[0] ?? ""}
                onChange={(e) =>
                    column.setFilterValue((old: [number, number]) => [
                        e.target.value,
                        old?.[1],
                    ])
                }
                placeholder={`Min`}
                className="w-24 border shadow rounded"
            />
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[1] ?? ""}
                onChange={(e) =>
                    column.setFilterValue((old: [number, number]) => [
                        old?.[0],
                        e.target.value,
                    ])
                }
                placeholder={`Max`}
                className="w-24 border shadow rounded"
            />
        </div>
    ) : (
        <Input
            h={8}
            type="text"
            border="1px solid"
            value={(columnFilterValue ?? "") as string}
            onChange={(e) => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
        />
    );
}

export default Filter;
