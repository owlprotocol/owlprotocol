import { createCRUDDB } from "@owlprotocol/crud-dexie";
import {
    IPFSCache,
    IPFSCacheName,
    validateIdIPFSCache,
    toPrimaryKeyIPFSCache,
    Contract,
    ERC1155,
    ERC721,
} from "@owlprotocol/web3-models";
import { compact, flatten, fromPairs } from "lodash-es";
import { ContractDexie } from "./contract.js";
import { ERC1155Dexie } from "./contractmodels/erc1155.js";
import { ERC721Dexie } from "./contractmodels/erc721.js";
import { Web3Dexie } from "../dbIndex.js";
import {
    IPFSCacheKeyId,
    IPFSCacheKeyIdEq,
    IPFSCacheKeyIdx,
    IPFSCacheKeyIdxEq,
    IPFSCacheKeyIdxEqAny,
} from "../tables/ipfscache.js";

export function getIPFSCacheDexie() {
    return createCRUDDB<
        typeof IPFSCacheName,
        IPFSCache,
        IPFSCacheKeyId,
        IPFSCacheKeyIdEq,
        IPFSCacheKeyIdx,
        IPFSCacheKeyIdxEq,
        IPFSCacheKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[IPFSCacheName], {
        validateId: validateIdIPFSCache,
        toPrimaryKey: toPrimaryKeyIPFSCache,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const IPFSCacheDexie = getIPFSCacheDexie();

export async function postWriteBulkDBIPFSCache(items: IPFSCache[]): Promise<any> {
    const paths = compact(flatten(items.map((e) => e.paths))).map((p) => `ipfs://${p}`);

    const ContractUpserts: Contract[] = [];
    const ERC721Upserts: ERC721[] = [];
    const ERC1155Upserts: ERC1155[] = [];

    const contracts = await ContractDexie.anyOf("metadataURI", paths);
    const erc721 = await ERC721Dexie.anyOf("tokenURI", paths);
    const erc1155 = await ERC1155Dexie.anyOf("uri", paths);

    const ipfsCacheByPath: { [url: string]: IPFSCache } = fromPairs(
        flatten(items.map((e) => (e.paths ?? []).map((p) => [`ipfs://${p}`, e]))),
    );
    contracts.forEach((c) => {
        const metadataURI = c.metadataURI!;
        const result = ipfsCacheByPath[metadataURI];
        if (result.dataJSON)
            ContractUpserts.push({
                networkId: c.networkId,
                address: c.address,
                metadata: result.dataJSON,
            });
    });
    erc721.forEach((c) => {
        const metadataURI = c.tokenURI!;
        const result = ipfsCacheByPath[metadataURI];
        if (result.dataJSON)
            ERC721Upserts.push({
                networkId: c.networkId,
                address: c.address,
                tokenId: c.tokenId,
                metadata: result.dataJSON,
            });
    });
    erc1155.forEach((c) => {
        const metadataURI = c.uri!;
        const result = ipfsCacheByPath[metadataURI];
        if (result.dataJSON)
            ERC1155Upserts.push({
                networkId: c.networkId,
                address: c.address,
                id: c.id,
                metadata: result.dataJSON,
            });
    });

    return Promise.all([
        ContractDexie.bulkUpdateUnchained(ContractUpserts),
        ERC721Dexie.bulkUpdateUnchained(ERC721Upserts),
        ERC1155Dexie.bulkUpdateUnchained(ERC1155Upserts),
    ]);
}
