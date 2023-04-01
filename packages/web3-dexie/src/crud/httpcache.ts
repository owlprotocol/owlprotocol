import { createCRUDDB } from "@owlprotocol/crud-dexie";
import {
    HTTPCache,
    HTTPCacheName,
    validateIdHTTPCache,
    toPrimaryKeyHTTPCache,
    Contract,
    ERC1155,
    ERC721,
} from "@owlprotocol/web3-models";
import { compact, fromPairs } from "lodash-es";

//TODO: Use factories?
import { ContractDexie } from "./contract.js";
import { ERC1155Dexie } from "./contractmodels/erc1155.js";
import { ERC721Dexie } from "./contractmodels/erc721.js";
import { Web3Dexie } from "../dbIndex.js";
import {
    HTTPCacheKeyId,
    HTTPCacheKeyIdEq,
    HTTPCacheKeyIdx,
    HTTPCacheKeyIdxEq,
    HTTPCacheKeyIdxEqAny,
} from "../tables/httpcache.js";

export function getHTTPCacheDexie() {
    return createCRUDDB<
        typeof HTTPCacheName,
        HTTPCache,
        HTTPCacheKeyId,
        HTTPCacheKeyIdEq,
        HTTPCacheKeyIdx,
        HTTPCacheKeyIdxEq,
        HTTPCacheKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[HTTPCacheName], {
        validateId: validateIdHTTPCache,
        toPrimaryKey: toPrimaryKeyHTTPCache,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const HTTPCacheDexie = getHTTPCacheDexie();

export async function postWriteBulkDBHTTPCache(items: HTTPCache[]): Promise<any> {
    const urls = compact(items.map((e) => e.url));

    const ContractUpserts: Contract[] = [];
    const ERC721Upserts: ERC721[] = [];
    const ERC1155Upserts: ERC1155[] = [];

    const contracts = await ContractDexie.anyOf("metadataURI", urls);
    const erc721 = await ERC721Dexie.anyOf("tokenURI", urls);
    const erc1155 = await ERC1155Dexie.anyOf("uri", urls);

    const httpCacheByUrl: { [url: string]: HTTPCache } = fromPairs(items.map((e) => [e.url, e]));
    contracts.forEach((c) => {
        const metadataURI = c.metadataURI!;
        const result = httpCacheByUrl[metadataURI];
        if (result.data)
            ContractUpserts.push({
                networkId: c.networkId,
                address: c.address,
                metadata: result.data,
            });
    });
    erc721.forEach((c) => {
        const metadataURI = c.tokenURI!;
        const result = httpCacheByUrl[metadataURI];
        if (result.data)
            ContractUpserts.push({
                networkId: c.networkId,
                address: c.address,
                metadata: result.data,
            });
    });
    erc1155.forEach((c) => {
        const metadataURI = c.uri!;
        const result = httpCacheByUrl[metadataURI];
        if (result.data)
            ContractUpserts.push({
                networkId: c.networkId,
                address: c.address,
                metadata: result.data,
            });
    });

    return Promise.all([
        ContractDexie.bulkUpdateUnchained(ContractUpserts),
        ERC721Dexie.bulkUpdateUnchained(ERC721Upserts),
        ERC1155Dexie.bulkUpdateUnchained(ERC1155Upserts),
    ]);
}
