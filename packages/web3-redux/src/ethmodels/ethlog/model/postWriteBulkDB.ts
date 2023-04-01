import { interfaces } from "@owlprotocol/contracts";
import { utils } from "ethers";
import { EthLog } from "./interface.js";
import { ERC20Allowance } from "../../../contractmodels/erc20allowance/model/interface.js";
import { ERC20Balance } from "../../../contractmodels/erc20balance/model/interface.js";
import { ERC721 } from "../../../contractmodels/erc721/model/interface.js";
import { ERC1155Balance } from "../../../contractmodels/erc1155balance/model/interface.js";
import { ERC20BalanceCRUD } from "../../../contractmodels/erc20balance/crud.js";
import { ERC721CRUD } from "../../../contractmodels/erc721/crud.js";
import { ERC1155BalanceCRUD } from "../../../contractmodels/erc1155balance/crud.js";
import { AssetRouterInputBasketCRUD } from "../../../contractmodels/assetrouterinputbasket/crud.js";
import { AssetRouterOutputBasketCRUD } from "../../../contractmodels/assetrouteroutputbasket/crud.js";
import { AssetRouterInputBasket } from "../../../contractmodels/assetrouterinputbasket/model/interface.js";
import { AssetRouterOutputBasket } from "../../../contractmodels/assetrouteroutputbasket/model/interface.js";
import { Contract } from "../../../contract/model/interface.js";
import { ERC20AllowanceCRUD } from "../../../contractmodels/erc20allowance/crud.js";
import { getContractCRUD } from "../../../contract/crudGet.js";
//import { ERC165 } from "../../../contractmodels/erc165/model/interface.js";
//import { getERC165CRUD } from "../../../contractmodels/erc165/crudGet.js";

const ContractCRUD = getContractCRUD();
//const ERC165CRUD = getERC165CRUD();

export async function postWriteBulkDB(items: EthLog[]) {
    const ContractUpserts: Contract[] = [];
    //const ERC165Upserts: ERC165[] = [];
    const ERC20AllowanceUpserts: ERC20Allowance[] = [];
    const ERC20BalanceUpserts: ERC20Balance[] = [];
    const ERC721Upserts: ERC721[] = [];
    const ERC1155BalanceUpserts: ERC1155Balance[] = [];
    const AssetRouterInputBasketUpserts: AssetRouterInputBasket[] = [];
    const AssetRouterOutputBasketUpserts: AssetRouterOutputBasket[] = [];

    items.forEach((e) => {
        const { networkId, address } = e;
        if (
            e.eventFormatFull ===
            interfaces.IERC1820.interface
                .getEvent("InterfaceImplementerSet")
                .format(utils.FormatTypes.full)
                .replace("event ", "")
        ) {
            const returnValues = e.returnValues;
            if (returnValues) {
                const { implementer, interfaceHash } = returnValues as { implementer: string; interfaceHash: string };
                //0x01ffc9a7ffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                let interfaceId: string;
                if (interfaceHash.slice(10) === "ffffffffffffffffffffffffffffffffffffffffffffffffffffffff") {
                    //ERC165
                    interfaceId = interfaceHash.slice(0, 10);
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    interfaceId = interfaceHash;
                }

                //console.debug({ networkId, address: implementer, interfaceId, x: x++ });

                //New contract with known interface
                ContractUpserts.push({ networkId, address: implementer, interfaceCheckedAt: Date.now() });
                //ERC165Upserts.push({ networkId, address: implementer, interfaceId });
            }
        } else {
            //Register any contract that emits an event
            ContractUpserts.push({ networkId, address });
        }

        const returnValues = e.returnValues;
        if (returnValues) {
            if (
                e.eventFormatFull ===
                interfaces.IERC20.interface.getEvent("Approval").format(utils.FormatTypes.full).replace("event ", "")
            ) {
                const [account, spender] = returnValues;
                ERC20AllowanceUpserts.push({
                    networkId,
                    address,
                    account,
                    spender,
                });
            } else if (
                e.eventFormatFull ===
                interfaces.IERC20.interface.getEvent("Transfer").format(utils.FormatTypes.full).replace("event ", "")
            ) {
                const [from, to] = returnValues;
                ERC20BalanceUpserts.push({
                    networkId,
                    address,
                    account: from,
                });
                ERC20BalanceUpserts.push({
                    networkId,
                    address,
                    account: to,
                });
            } else if (
                e.eventFormatFull ===
                interfaces.IERC721.interface.getEvent("Transfer").format(utils.FormatTypes.full).replace("event ", "")
            ) {
                const [, , tokenId] = returnValues;
                ERC721Upserts.push({
                    networkId,
                    address,
                    tokenId,
                });
            } else if (
                e.eventFormatFull ===
                interfaces.IERC1155.interface
                    .getEvent("TransferSingle")
                    .format(utils.FormatTypes.full)
                    .replace("event ", "")
            ) {
                const [, from, to, id] = returnValues;
                ERC1155BalanceUpserts.push({
                    networkId,
                    address,
                    id,
                    account: from,
                });
                ERC1155BalanceUpserts.push({
                    networkId,
                    address,
                    id,
                    account: to,
                });
            } else if (
                e.eventFormatFull ===
                interfaces.IERC1155.interface
                    .getEvent("TransferBatch")
                    .format(utils.FormatTypes.full)
                    .replace("event ", "")
            ) {
                const [, from, to, ids] = returnValues;
                (ids as string[]).forEach((id) => {
                    ERC1155BalanceUpserts.push({
                        networkId,
                        address,
                        id,
                        account: from,
                    });
                    ERC1155BalanceUpserts.push({
                        networkId,
                        address,
                        id,
                        account: to,
                    });
                });
            } else if (
                e.eventFormatFull ===
                interfaces.IAssetRouterInput.interface
                    .getEvent("SupportsInputAsset")
                    .format(utils.FormatTypes.full)
                    .replace("event ", "")
            ) {
                const [assetAddress, assetId, basketId] = returnValues;
                AssetRouterInputBasketUpserts.push({
                    networkId,
                    address,
                    basketId,
                    assetAddress: assetAddress,
                    erc1155Id: assetId,
                });
            } else if (
                e.eventFormatFull ===
                interfaces.IAssetRouterOutput.interface
                    .getEvent("SupportsOutputAsset")
                    .format(utils.FormatTypes.full)
                    .replace("event ", "")
            ) {
                const [assetAddress, assetId, basketId] = returnValues;
                AssetRouterOutputBasketUpserts.push({
                    networkId,
                    address,
                    basketId,
                    assetAddress: assetAddress,
                    erc1155Id: assetId,
                });
            }
        }
    });

    return Promise.all([
        ContractCRUD.db.bulkUpsertUnchained(ContractUpserts),
        //ERC165CRUD.db.bulkUpdateUnchained(ERC165Upserts),
        ERC20AllowanceCRUD.db.bulkUpsertUnchained(ERC20AllowanceUpserts),
        ERC20BalanceCRUD.db.bulkUpsertUnchained(ERC20BalanceUpserts),
        ERC721CRUD.db.bulkUpsertUnchained(ERC721Upserts),
        ERC1155BalanceCRUD.db.bulkUpsertUnchained(ERC1155BalanceUpserts),
        AssetRouterInputBasketCRUD.db.bulkUpsertUnchained(AssetRouterInputBasketUpserts),
        AssetRouterOutputBasketCRUD.db.bulkUpsertUnchained(AssetRouterOutputBasketUpserts),
    ]);
}
