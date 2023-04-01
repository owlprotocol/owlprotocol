import { assert } from "chai";
import ethers from "ethers";

import { interfaceIds, interfaces } from "@owlprotocol/contracts";
import { ERC165Name } from "../common.js";
import { ERC165CRUD } from "../crud.js";
import { ADDRESS_0, networkId } from "../../../data.js";
import { ContractCRUD } from "../../../contract/crud.js";
import { abiDeterministic } from "../../../utils/abiDeterministic.js";

//@ts-expect-error
ethers.utils.Logger.setLogLevel("ERROR");

describe(`${ERC165Name}/model/postWriteBulkDB.test.ts`, () => {
    it("ERC721", async () => {
        await ERC165CRUD.db.add({
            networkId,
            address: ADDRESS_0,
            interfaceId: interfaces.IERC721.interfaceId,
        });

        const contract = await ContractCRUD.db.get({ networkId, address: ADDRESS_0 });
        assert.isDefined(contract, "contract");
        assert.deepEqual(contract?.abi, abiDeterministic(interfaceIds[interfaces.IERC721.interfaceId]));
    });
});
