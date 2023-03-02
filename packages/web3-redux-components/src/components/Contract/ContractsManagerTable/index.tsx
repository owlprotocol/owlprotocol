import {
    Box,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    useTheme,
} from "@chakra-ui/react";
import { Contract } from "@owlprotocol/web3-redux";
import composeHooks from "react-hooks-compose";
import { ContractsManagerTableRow } from "../ContractsManagerTableRow";

export const useContractsManagerTableHook = () => {
    const [contracts] = Contract.hooks.useERC721Contracts();
    return { contracts };
};

export interface ContractListProps {
    networkId: string;
    address: string;
}

export interface ContractsManagerTableProps {
    contracts: ContractListProps[];
}

const ContractsManagerTablePresenter = ({
    contracts,
}: ContractsManagerTableProps) => {
    const { themes } = useTheme();

    if (contracts.length < 1) {
        return (
            <Box mt={4} px={4} p={3} borderWidth={1} borderRadius={12}>
                No contracts found
            </Box>
        );
    }

    return (
        <TableContainer>
            <Table variant="unstyled">
                <Thead>
                    <Tr>
                        {["network", "address", "interfaces"].map(
                            (title: string, key) => (
                                <Th
                                    key={key}
                                    textTransform={"capitalize"}
                                    color={themes.color9}
                                >
                                    {title}
                                </Th>
                            )
                        )}
                    </Tr>
                </Thead>
                <Tbody>
                    {contracts.map((props: ContractListProps, key: any) => (
                        <ContractsManagerTableRow key={key} {...props} />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export const ContractsManagerTableWhere = ({
    networkId,
    tags,
}: {
    networkId?: string;
    tags?: string;
}) => {
    //@ts-ignore
    const [contracts] = Contract.hooks.useWhere({ networkId, tags });
    const data = (contracts ?? []).map(({ networkId, address }) => {
        return { networkId, address };
    });
    return <ContractsManagerTablePresenter contracts={data} />;
};

const ContractsManagerTable = composeHooks((props: Props) => ({
    useContractsManagerTable: () => useContractsManagerTableHook(props),
}))(ContractsManagerTablePresenter) as (props: Props) => JSX.Element;

//@ts-expect-error
ContractsManagerTable.displayName = "ContractsManagerTable";

export { ContractsManagerTablePresenter, ContractsManagerTable };
export default ContractsManagerTable;
