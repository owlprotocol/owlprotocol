import composeHooks from "react-hooks-compose";
import { TransactionTablePresenter } from "./presenter";

export const useTransactionTableHook = () => {
    // TBA
    // return { contracts: [] };
};

const TransactionTable = composeHooks(() => ({
    useTransactionTable: () => useTransactionTableHook(),
}))(TransactionTablePresenter) as () => JSX.Element;

//@ts-expect-error
TransactionTable.displayName = "TransactionTable";

export { TransactionTablePresenter, TransactionTable };
export default TransactionTable;
