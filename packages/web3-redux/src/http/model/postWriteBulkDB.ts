import { compact, fromPairs } from "lodash-es";
import type { HTTPCache } from "./interface.js";
import { ContractCRUD } from "../../contract/crud.js";
import type { Contract } from "../../contract/model/index.js";
import { ERC1155CRUD } from "../../contractmodels/erc1155/crud.js";
import type { ERC1155 } from "../../contractmodels/erc1155/model/interface.js";
import { ERC721CRUD } from "../../contractmodels/erc721/crud.js";
import type { ERC721 } from "../../contractmodels/erc721/model/interface.js";

export async function postWriteBulkDB(items: HTTPCache[]): Promise<any> {
    const urls = compact(items.map((e) => e.url));

    const ContractUpserts: Contract[] = [];
    const ERC721Upserts: ERC721[] = [];
    const ERC1155Upserts: ERC1155[] = [];

    const contracts = await ContractCRUD.db.anyOf("metadataURI", urls);
    const erc721 = await ERC721CRUD.db.anyOf("tokenURI", urls);
    const erc1155 = await ERC1155CRUD.db.anyOf("uri", urls);

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
        ContractCRUD.db.bulkUpdateUnchained(ContractUpserts),
        ERC721CRUD.db.bulkUpdateUnchained(ERC721Upserts),
        ERC1155CRUD.db.bulkUpdateUnchained(ERC1155Upserts),
    ]);
}
