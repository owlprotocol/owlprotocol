import composeHooks from "react-hooks-compose";
import { NFTCollectionInfiniteTablePresenter } from "./Presenter";

export const useTableHook = () => {
    // TBA
    // return { items: [] };
};

const NFTCollectionInfiniteTable = composeHooks(() => ({
    NFTCollectionInfiniteTable: () => useTableHook(),
}))(NFTCollectionInfiniteTablePresenter) as () => JSX.Element;

//@ts-expect-error
NFTCollectionInfiniteTable.displayName = "NFTCollectionInfiniteTable";

export { NFTCollectionInfiniteTablePresenter, NFTCollectionInfiniteTable };
export default NFTCollectionInfiniteTable;
