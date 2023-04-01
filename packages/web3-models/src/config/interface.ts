import type { AxiosInstance } from "axios";
import type { IPFS } from "ipfs-core-types";

export interface ConfigId {
    /* Id in store. Default is 0. */
    readonly id: string;
}

/** A global singleton config object.
 * Can be extended to store any key-value pairs.
 */
export interface Config extends ConfigId {
    /* Selected blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks.
     */
    readonly networkId?: string | undefined | null;
    /* Selected account */
    readonly account?: string | undefined | null;
    /* API URLs */
    /* IPFS Url */
    readonly ipfsUrl?: string | undefined;
    /* 4byte.directory Url */
    readonly _4byteUrl?: string | undefined;
    /* CORS Proxy */
    readonly corsProxy?: string | undefined;
    /* Arbitrary config values */
    //readonly [key: string]: any;
}

export interface ConfigWithObjects extends Config {
    /* IPFS Client */
    readonly ipfsClient?: IPFS;
    /* 4byte.directory Client */
    readonly _4byteClient?: AxiosInstance;
    /* CORS Proxy */
    readonly corsProxy?: string;
    /* HTTP Client */
    readonly httpClient?: AxiosInstance;
}
