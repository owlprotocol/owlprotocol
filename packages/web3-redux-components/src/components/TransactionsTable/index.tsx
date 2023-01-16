import {
    useTheme,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
} from "@chakra-ui/react";
import TableWrapper from "../../theme/TableStyleOverrides";
import Default from "./Default";
import NFTTransactions from "./NFTTransactions";

export interface ItemProps {
    txHash?: string;
    event?: string;
    tokenId?: number;
    price?: number;
    method?: string;
    blockNumber?: number;
    age?: string;
    from?: string;
    to?: string;
    value?: string;
    fee?: string;
    date?: number;
}

export interface Props {
    items?: ItemProps[];
    type?: "DEFAULT" | "NFT_TXS";
}

export const TransactionsTable = ({ items = [], type = "DEFAULT" }: Props) => {
    const { themes } = useTheme();

    let THEAD_LABELS = [
        "txn hash",
        "method",
        "block",
        "age",
        "from",
        "to",
        "value",
        "txn fee",
    ];
    let TableItemsByType = Default;

    switch (type) {
        case "DEFAULT":
            TableItemsByType = Default;
            break;
        case "NFT_TXS":
            TableItemsByType = NFTTransactions;
            THEAD_LABELS = ["Event", "Price", "From", "To", "Date"];
            break;

        default:
            TableItemsByType = Default;
            break;
    }

    return (
        <TableWrapper>
            <TableContainer color={themes.color9}>
                <Table variant="unstyled">
                    <Thead>
                        <Tr bg={themes.color5}>
                            {THEAD_LABELS.map((header, key) => (
                                <Th textTransform={"capitalize"} key={key}>
                                    {header}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {items.map((item: ItemProps, idx) => {
                            return <TableItemsByType key={idx} {...item} />;
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </TableWrapper>
    );
};

export default TransactionsTable;
