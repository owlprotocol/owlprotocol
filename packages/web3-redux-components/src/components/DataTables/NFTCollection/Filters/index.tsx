import { HStack, Select, useBoolean } from "@chakra-ui/react";
import { Box, useTheme } from "@chakra-ui/react";
import { DebouncedInput } from "../../../../utils";

const DEF_SEARCH_PLACEHOLDER = "Search all columns...";

const Filters = ({
    accessors,
    globalFilter,
    setGlobalFilter,
    tableSetSorting,
    searchPlaceholder = DEF_SEARCH_PLACEHOLDER,
}: any) => {
    const [isOpen, setFlag] = useBoolean();
    const { themes } = useTheme();

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedOption = event.target.options[selectedIndex]!;
        const id = selectedOption.dataset.sortId!;
        const desc = selectedOption.dataset.sortOrder === "desc";
        tableSetSorting([{ id, desc }]);
    };

    return (
        <HStack mb={10}>
            {/* <Button onClick={setFlag.toggle}>Filter</Button>
            <Box
                bg={themes.color5}
                borderRadius={8}
                p={4}
                visibility={isOpen ? "visible" : "hidden"}
            >
                <HStack>filters</HStack>
            </Box> */}
            <HStack bg={themes.color5} borderRadius={8} px={4}>
                <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(String(value))}
                    placeholder={searchPlaceholder}
                />
            </HStack>
            <Box>
                <Select
                    minW={260}
                    onChange={handleSortChange}
                    borderRadius={12}
                    bg={themes.color6}
                    border={0}
                    h={"52px"}
                >
                    <option data-sort-id="">Sort by</option>
                    {accessors.map((accessor: string) => {
                        return (
                            <option
                                data-sort-id={accessor}
                                data-sort-order="desc"
                            >
                                {accessor}
                            </option>
                        );
                    })}
                </Select>
            </Box>
        </HStack>
    );
};

export { Filters };
