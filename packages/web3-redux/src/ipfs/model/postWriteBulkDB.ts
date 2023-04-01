import { compact, flatten, fromPairs } from "lodash-es";
import type { Ipfs } from "./interface.js";
import { ContractCRUD } from "../../contract/crud.js";
import type { Contract } from "../../contract/model/interface.js";
import { ERC1155CRUD } from "../../contractmodels/erc1155/crud.js";
import type { ERC1155 } from "../../contractmodels/erc1155/model/interface.js";
import { ERC721CRUD } from "../../contractmodels/erc721/crud.js";
import type { ERC721 } from "../../contractmodels/erc721/model/interface.js";

export async function postWriteBulkDB(items: Ipfs[]): Promise<any> {
    const paths = compact(flatten(items.map((e) => e.paths))).map((p) => `ipfs://${p}`);

    const ContractUpserts: Contract[] = [];
    const ERC721Upserts: ERC721[] = [];
    const ERC1155Upserts: ERC1155[] = [];

    const contracts = await ContractCRUD.db.anyOf("metadataURI", paths);
    const erc721 = await ERC721CRUD.db.anyOf("tokenURI", paths);
    const erc1155 = await ERC1155CRUD.db.anyOf("uri", paths);

    const ipfsCacheByPath: { [url: string]: Ipfs } = fromPairs(
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
        ContractCRUD.db.bulkUpdateUnchained(ContractUpserts),
        ERC721CRUD.db.bulkUpdateUnchained(ERC721Upserts),
        ERC1155CRUD.db.bulkUpdateUnchained(ERC1155Upserts),
    ]);
}
