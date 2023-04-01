import { useIpfs } from "./useIpfs.js";
import { useHttpGet } from "../../http/hooks/useHttpGet.js";

/**
 * Get content for URI depending on protocol
 * @category Hooks
 * */
export const useURI = (uriPath: string[] | string | undefined) => {
    const uriPathArr = uriPath ? (Array.isArray(uriPath) ? uriPath : [uriPath]) : [];
    const uri = uriPathArr.map((u) => new URL(u));

    const uriIPFS = uri.filter((u) => u.protocol === "ipfs:").map((u) => u.toString().replace("ipfs://", ""));
    const uriHTTP = uri
        .filter((u) => u.protocol === "http:" || u.protocol === "https:")
        .map((u) => u.toString().replace("ipfs://", ""));

    const [contentIPFS] = useIpfs(uriIPFS);
    const [contentHTTP] = useHttpGet(uriHTTP);
    return [[...contentIPFS, ...contentHTTP]];
};
