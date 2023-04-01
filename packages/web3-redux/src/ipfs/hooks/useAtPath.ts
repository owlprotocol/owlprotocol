import { IPFSCacheCRUD } from "../crud.js";

/**
 * Recursively searches for CID at file at <BASE_CID>/path/to/file
 */
export function useAtPath(paths: string[] | string | undefined) {
    return IPFSCacheCRUD.hooks.useAnyOf("paths", paths);
}
