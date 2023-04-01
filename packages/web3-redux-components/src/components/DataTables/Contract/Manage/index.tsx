import { Contract } from "@owlprotocol/web3-redux";
import composeHooks from "react-hooks-compose";
import { ContractsManagerTablePresenter } from "./presenter";

export const useContractsManagerTableHook = () => {
    // const [contracts] = Contract.hooks.useERC721Contracts();
    // return { contracts };
};

export const ContractsManagerTableWhere = ({
    networkId,
    tags,
}: {
    networkId?: string;
    tags?: string[];
}) => {
    const [contracts] = Contract.hooks.useWhere({ networkId: `${networkId}` });
    const data = (contracts ?? []).map(({ networkId, address }) => {
        return { networkId, address };
    });
    return <ContractsManagerTablePresenter contracts={data} />;
};

const ContractsManagerTable = composeHooks(() => ({
    useContractsManagerTable: () => useContractsManagerTableHook(),
}))(ContractsManagerTablePresenter) as () => JSX.Element;

//@ts-expect-error
ContractsManagerTable.displayName = "ContractsManagerTable";

export { ContractsManagerTablePresenter, ContractsManagerTable };
export default ContractsManagerTable;
