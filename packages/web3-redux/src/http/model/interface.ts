export interface HTTPCacheId {
    readonly id: string;
}
export interface HTTPCache extends HTTPCacheId {
    /** HTTP url */
    readonly url?: string;
    /** Response data */
    readonly data?: any;
    /** Used CORS Proxyy */
    readonly corsProxied?: boolean;
}

export type HTTPCacheIndexInput = HTTPCacheId;

export type HTTPCacheIndexInputAnyOf = { id: string[] | string };

export const HTTPCacheIndex = "id";
