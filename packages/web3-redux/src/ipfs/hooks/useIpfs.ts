/* eslint-disable */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAtPath } from "./useAtPath.js";
import { catAction } from "../actions/index.js";

/**
 * Reads IPFS content from store and makes a call to cat content.
 * @category Hooks
 * */
export const useIpfs = (paths: string[] | string | undefined) => {
    const dispatch = useDispatch();

    //TODO: Only fetches existing, dispatch for non-existing
    const [items, options] = useAtPath(paths);

    useEffect(() => {
        const cids = items.filter((c) => c.data === undefined).map((c) => c.contentId);
        //TODO: Bulk
        cids.forEach((c) => {
            dispatch(catAction({ path: c }));
        });
    }, [dispatch, JSON.stringify(paths), items]);

    return [items, options] as [typeof items, typeof options];
};
