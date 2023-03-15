import {
    Box,
    Tag,
    CloseButton,
    useTheme,
    Input,
    HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import lodash from "lodash-es";
import Pagination from "rc-pagination";
import styled from "@emotion/styled";
import Icon from "../../Icon";

const CONTAINER_HEIGHT = "500px";

const RCPaginationStyles = styled.div`
    .page-controls {
        list-style-type: none;
        display: flex;

        & > li {
            padding: 0 8px;
            cursor: pointer;

            &:after {
                content: "|";
                position: relative;
                left: 8px;
                top: -1px;
                font-size: 11px;
            }
        }

        .rc-pagination-prev,
        .rc-pagination-next {
            display: none;
        }

        .rc-pagination-item-active a {
            color: #92929d;
        }
    }
`;

export interface AddressListProps {
    items: string[];
    handleRemoveAddress: any;
    pageSize: number;
    hasSearch?: boolean;
    hasPagination?: boolean;
}

export const AddressList = ({
    items = [],
    handleRemoveAddress,
    pageSize = 20,
    hasSearch = false,
    hasPagination = false,
}: AddressListProps) => {
    const { themes } = useTheme();

    const [visibleItems, setVisibleItems] = useState<string[][] | [][]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationTotalItems, setPaginationTotalItems] = useState(
        items.length
    );

    const onChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const chunkedItems = lodash.chunk(items, pageSize);
        setVisibleItems(chunkedItems);
    }, [items, pageSize]);

    const handleSearchInput = (searchQuery: string) => {
        const searchResults = lodash.filter(items, (item) => {
            return lodash.includes(item, lodash.lowerCase(searchQuery));
        });

        const chunkedItems = lodash.chunk(searchResults, pageSize);
        setVisibleItems(chunkedItems);
        setPaginationTotalItems(searchResults.length);
    };

    return (
        <RCPaginationStyles>
            {hasSearch && (
                <HStack mb={7} bg={themes.color6} borderRadius={12} px={4}>
                    <Box float={"left"}>
                        <Icon icon="search" />
                    </Box>
                    <Input
                        variant={"form"}
                        bg={themes.color6}
                        onChange={({ target }) =>
                            handleSearchInput(target.value)
                        }
                        placeholder={"Search by address"}
                    />
                </HStack>
            )}
            <Box borderRadius={12} bg={themes.color6} p={"16px"}>
                <Box mb={8} height={CONTAINER_HEIGHT} overflowY={"auto"}>
                    <Box flexWrap={"wrap"} flexDir={"row"}>
                        {visibleItems[currentPage - 1]?.map((address, key) => (
                            <Box
                                p={2}
                                key={key}
                                w={"50%"}
                                display={"inline-block"}
                            >
                                <Tag
                                    variant="solid"
                                    bg={themes.background}
                                    borderRadius={12}
                                    w={"100%"}
                                    h={"40px"}
                                    pl={4}
                                >
                                    <Box
                                        h={4}
                                        w={"95%"}
                                        overflow={"hidden"}
                                        display={"inline-block"}
                                        color={themes.color9}
                                    >
                                        {address}
                                    </Box>
                                    <CloseButton
                                        onClick={handleRemoveAddress}
                                        float={"right"}
                                        color={themes.color9}
                                    />
                                </Tag>
                            </Box>
                        ))}
                    </Box>
                </Box>
                {hasPagination && (
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        bg={themes.color5}
                        color={themes.color9}
                        p={"11px 16px"}
                        m={"-14px"}
                        borderRadius={"0 0 10px 10px"}
                        fontSize={"12px"}
                        fontWeight={"semibold"}
                    >
                        <Pagination
                            onChange={onChange}
                            current={currentPage}
                            total={paginationTotalItems}
                            pageSize={pageSize}
                            className="page-controls"
                        />
                        <div>
                            {visibleItems[currentPage - 1]?.length}/
                            {items.length}
                        </div>
                    </Box>
                )}
            </Box>
        </RCPaginationStyles>
    );
};
