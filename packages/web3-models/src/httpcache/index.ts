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

export function validateIdHTTPCache({ id }: HTTPCacheId): HTTPCacheId {
    return { id };
}

export function validateHTTPCache(item: HTTPCache): HTTPCache {
    return item;
}

export function toPrimaryKeyHTTPCache({ id }: HTTPCacheId): string {
    return id;
}
