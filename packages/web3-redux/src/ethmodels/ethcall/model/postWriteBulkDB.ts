import { interfaceIdNames, InterfaceName, interfaces, Utils } from "@owlprotocol/contracts";
import { AssetBasketInput, AssetBasketOutput } from "@owlprotocol/contracts/lib/types/utils/AssetLib.js";
import { utils } from "ethers";
import { zip } from "lodash-es";
import { EthCall } from "./interface.js";
import { AssetRouterInputBasketCRUD } from "../../../contractmodels/assetrouterinputbasket/crud.js";
import {
    AssetRouterInputBasket,
    assetRouterInputBasketsFromSolidityBasket,
} from "../../../contractmodels/assetrouterinputbasket/model/interface.js";
import { AssetRouterOutputBasketCRUD } from "../../../contractmodels/assetrouteroutputbasket/crud.js";
import {
    AssetRouterOutputBasket,
    assetRouterOutputBasketsFromSolidityBasket,
} from "../../../contractmodels/assetrouteroutputbasket/model/interface.js";
import { AssetRouterPathCRUD } from "../../../contractmodels/assetrouterpath/crud.js";
import { AssetRouterPath } from "../../../contractmodels/assetrouterpath/model/interface.js";
import { ContractCRUD } from "../../../contract/crud.js";
import { Contract } from "../../../contract/model/interface.js";
import { ERC1155CRUD } from "../../../contractmodels/erc1155/crud.js";
import { ERC1155 } from "../../../contractmodels/erc1155/model/interface.js";
import { ERC1155BalanceCRUD } from "../../../contractmodels/erc1155balance/crud.js";
import { ERC1155Balance } from "../../../contractmodels/erc1155balance/model/interface.js";
import { ERC165CRUD } from "../../../contractmodels/erc165/crud.js";
import { ERC165 } from "../../../contractmodels/erc165/model/interface.js";
import { ERC20BalanceCRUD } from "../../../contractmodels/erc20balance/crud.js";
import { ERC20Balance } from "../../../contractmodels/erc20balance/model/interface.js";
import { ERC721CRUD } from "../../../contractmodels/erc721/crud.js";
import { ERC721 } from "../../../contractmodels/erc721/model/interface.js";

export async function postWriteBulkDBEthCall(items: EthCall[]): Promise<any> {
    const ContractUpserts: Contract[] = [];
    const ERC165Upserts: ERC165[] = [];
    //const ERC20Upserts = []
    const ERC20BalanceUpserts: ERC20Balance[] = [];
    const ERC721Upserts: ERC721[] = [];
    const ERC1155Upserts: ERC1155[] = [];
    const ERC1155BalanceUpserts: ERC1155Balance[] = [];
    const AssetRouterInputBasketUpserts: AssetRouterInputBasket[] = [];
    const AssetRouterOutputBasketUpserts: AssetRouterOutputBasket[] = [];
    const AssetRouterPathUpserts: AssetRouterPath[] = [];

    const interfaceQueries = items.map((item) => {
        const { networkId, to } = item;
        return { networkId, address: to };
    });

    //TODO: Optimize with anyOf?
    const ifacesArr = await ERC165CRUD.db.bulkWhere(interfaceQueries);
    zip(items, ifacesArr).map(([item, ifaces]) => {
        const { networkId, to, args, methodFormatFull, returnValue } = item!;
        const interfaceNames = new Set(
            ifaces!.map(({ interfaceId }) => interfaceIdNames[interfaceId]),
        ) as Set<InterfaceName>;

        if (returnValue) {
            //Interface
            if (
                methodFormatFull ===
                interfaces.IERC165.interface
                    .getFunction("supportsInterface")
                    .format(utils.FormatTypes.full)
                    .replace("function ", "")
            ) {
                if (returnValue[0]) {
                    const interfaceName = interfaceIdNames[args[0]];
                    ERC165Upserts.push({
                        networkId,
                        address: to,
                        interfaceId: args[0],
                    });
                    interfaceNames.add(interfaceName);

                    //AssetRouterPath
                    if (interfaceName === "IAssetRouterCraft") {
                        //Self route path
                        AssetRouterPathUpserts.push({ networkId, from: to, to });
                    }
                }
            }
            //Metadata
            else if (
                methodFormatFull ===
                interfaces.IContractURI.interface
                    .getFunction("contractURI")
                    .format(utils.FormatTypes.full)
                    .replace("function ", "")
            ) {
                ContractUpserts.push({
                    networkId,
                    address: to,
                    metadataURI: returnValue[0],
                });
            }
            //Assets
            else if (interfaceNames.has("IERC20")) {
                if (
                    methodFormatFull ===
                    interfaces.IERC20.interface
                        .getFunction("balanceOf")
                        .format(utils.FormatTypes.full)
                        .replace("function ", "")
                ) {
                    ERC20BalanceUpserts.push({
                        networkId,
                        address: to,
                        account: args[0],
                        balance: returnValue[0],
                    });
                }
            } else if (interfaceNames.has("IERC721")) {
                if (
                    methodFormatFull ===
                    interfaces.IERC721.interface
                        .getFunction("ownerOf")
                        .format(utils.FormatTypes.full)
                        .replace("function ", "")
                ) {
                    ERC721Upserts.push({
                        networkId,
                        address: to,
                        tokenId: args[0],
                        owner: returnValue[0],
                    });
                } else if (
                    methodFormatFull ===
                    interfaces.IERC721Metadata.interface
                        .getFunction("tokenURI")
                        .format(utils.FormatTypes.full)
                        .replace("function ", "")
                ) {
                    ERC721Upserts.push({
                        networkId,
                        address: to,
                        tokenId: args[0],
                        tokenURI: returnValue[0],
                    });
                } else if (
                    methodFormatFull ===
                    interfaces.IERC721Dna.interface
                        .getFunction("getDna")
                        .format(utils.FormatTypes.full)
                        .replace("function ", "")
                ) {
                    ERC721Upserts.push({
                        networkId,
                        address: to,
                        tokenId: args[0],
                        dna: returnValue[0],
                    });
                }
            } else if (interfaceNames.has("IERC1155")) {
                if (
                    methodFormatFull ===
                    interfaces.IERC1155.interface
                        .getFunction("balanceOf")
                        .format(utils.FormatTypes.full)
                        .replace("function ", "")
                ) {
                    ERC1155BalanceUpserts.push({
                        networkId,
                        address: to,
                        account: args[0],
                        id: args[1],
                        balance: returnValue[0],
                    });
                } else if (
                    methodFormatFull ===
                    interfaces.IERC1155.interface
                        .getFunction("balanceOfBatch")
                        .format(utils.FormatTypes.full)
                        .replace("function ", "")
                ) {
                    const results = zip(
                        args[0] as string[],
                        args[1] as any as string[],
                        returnValue[0] as string[],
                    ).map(([account, id, balance]) => {
                        return {
                            networkId,
                            address: to,
                            account: account!,
                            id: id!,
                            balance,
                        };
                    });
                    ERC1155BalanceUpserts.push(...results);
                } else if (
                    methodFormatFull ===
                    interfaces.IERC1155MetadataURI.interface
                        .getFunction("uri")
                        .format(utils.FormatTypes.full)
                        .replace("function ", "")
                ) {
                    ERC1155Upserts.push({
                        networkId,
                        address: to,
                        id: args[0],
                        uri: returnValue[0].replace("{id}", args[0]),
                    });
                } else if (
                    methodFormatFull ===
                    interfaces.IERC1155Dna.interface
                        .getFunction("getDna")
                        .format(utils.FormatTypes.full)
                        .replace("function ", "")
                ) {
                    ERC1155Upserts.push({
                        networkId,
                        address: to,
                        id: args[0],
                        dna: returnValue[0],
                    });
                }
            }
            //Roles
            else if (interfaceNames.has("IAccessControl")) {
                if (
                    methodFormatFull ===
                    interfaces.IAccessControl.interface
                        .getFunction("hasRole")
                        .format(utils.FormatTypes.full)
                        .replace("function ", "")
                ) {
                    const role = args[0] as string;
                    const target = args[1] as string;
                    if (role === Utils.AccessControl.ASSET_ROUTER_INPUT && returnValue[0]) {
                        //Set path
                        AssetRouterPathUpserts.push({
                            networkId,
                            from: target,
                            to,
                        });
                    }
                }
            }
            //AssetRouter
            else if (interfaceNames.has("IAssetRouterInput") || interfaceNames.has("IAssetRouterCraft")) {
                if (
                    methodFormatFull ===
                    interfaces.IAssetRouterInput.interface
                        .getFunction("getInputBasket")
                        .format(utils.FormatTypes.full)
                        .replace("function ", "")
                ) {
                    const address = to;
                    const basketId = args[0] as string;
                    const basket = returnValue[0] as AssetBasketInput;
                    AssetRouterInputBasketUpserts.push(
                        ...assetRouterInputBasketsFromSolidityBasket(networkId, address, basketId, basket),
                    );
                }
            } else if (interfaceNames.has("IAssetRouterOutput") || interfaceNames.has("IAssetRouterCraft")) {
                if (
                    methodFormatFull ===
                    interfaces.IAssetRouterInput.interface
                        //@ts-ignore
                        .getFunction("getOutputBasket")
                        .format(utils.FormatTypes.full)
                        .replace("function ", "")
                ) {
                    const address = to;
                    const basketId = args[0] as string;
                    const basket = returnValue[0] as AssetBasketOutput;
                    AssetRouterOutputBasketUpserts.push(
                        ...assetRouterOutputBasketsFromSolidityBasket(networkId, address, basketId, basket),
                    );
                }
            }
        }
    });

    return Promise.all([
        ContractCRUD.db.bulkPutUnchained(ContractUpserts),
        ERC165CRUD.db.bulkPutUnchained(ERC165Upserts),
        ERC20BalanceCRUD.db.bulkUpsertUnchained(ERC20BalanceUpserts),
        ERC721CRUD.db.bulkUpsertUnchained(ERC721Upserts),
        ERC1155CRUD.db.bulkUpsertUnchained(ERC1155Upserts),
        ERC1155BalanceCRUD.db.bulkUpsertUnchained(ERC1155BalanceUpserts),
        AssetRouterInputBasketCRUD.db.bulkUpsertUnchained(AssetRouterInputBasketUpserts),
        AssetRouterOutputBasketCRUD.db.bulkUpsertUnchained(AssetRouterOutputBasketUpserts),
        AssetRouterPathCRUD.db.bulkUpsertUnchained(AssetRouterPathUpserts),
    ]);
}
