export interface MetadataCache {
    get: (path: string) => Promise<any>;
    set: (path: string, value: any) => Promise<void>;
}
