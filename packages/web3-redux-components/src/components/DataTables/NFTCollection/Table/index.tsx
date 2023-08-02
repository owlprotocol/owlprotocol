import composeHooks from "react-hooks-compose";
import { NFTCollectionTablePresenter } from "./presenter";

export const useTableHook = () => {
    // TBA
    // return { items: [] };
};

const NFTCollectionTable = composeHooks(() => ({
    NFTCollectionTable: () => useTableHook(),
}))(NFTCollectionTablePresenter) as () => JSX.Element;

//@ts-expect-error
NFTCollectionTable.displayName = "NFTCollectionTable";

export { NFTCollectionTablePresenter, NFTCollectionTable };
export default NFTCollectionTable;
