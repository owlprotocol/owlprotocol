import type { PBNode, PBLink } from "@ipld/dag-pb";
import { extname } from "path";

export interface IPFSCacheId {
    /** ipfs hash */
    readonly contentId: string;
}

export enum IPFSDataType {
    Raw = 0,
    Directory = 1,
    File = 2,
    Metadata = 3,
    Symlink = 4,
    HAMTShard = 5,
    DAG_CBOR = 6,
}

export type FileType = "txt" | "json" | "svg" | "jpeg" | "jpg";

export interface IPFSCache extends IPFSCacheId {
    /** Protocol Buffer Node.
     * See https://github.com/ipld/specs/blob/master/block-layer/codecs/dag-pb.md */
    readonly pbNode?: Partial<PBNode>;
    /** Links by Name */
    readonly linksByName?: { [k: string]: Partial<PBLink> };
    /** Decoded data */
    readonly data?: Uint8Array | any;
    readonly dataTxt?: string;
    readonly dataJSON?: any;
    /** Type of data */
    readonly type?: IPFSDataType;
    /** Type of file */
    readonly fileType?: FileType;
    /** Paths that point to CID */
    readonly paths?: string[];
}

/** @internal */
export function validateIdIPFSCache({ contentId }: IPFSCacheId): IPFSCacheId {
    return { contentId };
}

export function toPrimaryKeyIPFSCache({ contentId }: IPFSCacheId): string {
    return contentId;
}

/** @internal */
export function validateIPFSCache(item: IPFSCache): IPFSCache {
    const data = item.data;
    const paths = (item.paths ?? []).map((p) => p.replace("ipfs://", ""));
    const extNames = paths
        .map((p) => extname(p))
        .filter((ext) => ext.length > 0)
        .map((e) => e.slice(1));
    const ext: string | undefined = extNames[0];
    const fileType = item.fileType ?? (ext as FileType);

    let dataTxt = item.dataTxt;
    let dataJSON = item.dataJSON;

    if (data) {
        if ((!dataTxt && fileType === "txt") || fileType === "svg" || fileType === "json") {
            //Decode TXT
            dataTxt = Buffer.from(data).toString("utf8");
            if (!item.dataJSON) {
                //Decode JSON
                dataJSON = JSON.parse(dataTxt);
            }
        }
    }

    return {
        ...item,
        paths,
        fileType,
        dataTxt,
        dataJSON,
    };
}
