/* eslint-disable */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { httpGet as httpGetAction } from "../actions/index.js";
import { HTTPCacheCRUD } from "../crud.js";

/**
 * Get content for HTTP URI
 * @category Hooks
 * */
export const useHttpGet = (uri: string[] | string | undefined) => {
    const dispatch = useDispatch();

    const uriArr = uri ? (Array.isArray(uri) ? uri : [uri]) : [];
    const [items, options] = HTTPCacheCRUD.hooks.useGetBulk(uriArr);

    //TODO: Only shows existing
    useEffect(() => {
        const urls = items.filter((c) => c && c?.data === undefined).map((c) => c!.url!);
        //TODO: Bulk
        urls.forEach((c) => {
            dispatch(httpGetAction({ url: c }));
        });
    }, [uri, JSON.stringify(uri), items]);

    return [items, options] as [typeof items, typeof options];
};
