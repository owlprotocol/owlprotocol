import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { utils } from "ethers";
import {
    interfaceIdNames,
    InterfaceName,
    interfaces,
    Utils,
} from "@owlprotocol/contracts";
import {
    AssetBasketInput,
    AssetBasketOutput,
} from "@owlprotocol/contracts/lib/types/utils/AssetLib.js";
import {
    EthCall,
    EthCallName,
    validateIdEthCall,
    toPrimaryKeyEthCall,
    Contract,
    AssetRouterInputBasket,
    AssetRouterOutputBasket,
    AssetRouterPath,
    ERC1155,
    ERC1155Balance,
    ERC165,
    ERC20Balance,
    ERC721,
    assetRouterInputBasketsFromSolidityBasket,
    assetRouterOutputBasketsFromSolidityBasket,
} from "@owlprotocol/web3-models";
import { zip } from "lodash-es";
import {
    EthCallKeyId,
    EthCallKeyIdEq,
    EthCallKeyIdx,
    EthCallKeyIdxEq,
    EthCallKeyIdxEqAny,
} from "../../tables/ethmodels/ethcall.js";
import { Web3Dexie } from "../../dbIndex.js";
import { ContractDexie } from "../contract.js";

//TODO: Use factories?
import { AssetRouterInputBasketDexie } from "../contractmodels/assetrouterinputbasket.js";
import { AssetRouterOutputBasketDexie } from "../contractmodels/assetrouteroutputbasket.js";
import { AssetRouterPathDexie } from "../contractmodels/assetrouterpath.js";
import { ERC1155Dexie } from "../contractmodels/erc1155.js";
import { ERC1155BalanceDexie } from "../contractmodels/erc1155balance.js";
import { ERC165Dexie } from "../contractmodels/erc165.js";
import { ERC20BalanceDexie } from "../contractmodels/erc20balance.js";
import { ERC721Dexie } from "../contractmodels/erc721.js";

export function getEthCallDexie() {
    return createCRUDDB<
        typeof EthCallName,
        EthCall,
        EthCallKeyId,
        EthCallKeyIdEq,
        EthCallKeyIdx,
        EthCallKeyIdxEq,
        EthCallKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[EthCallName], {
        validateId: validateIdEthCall,
        toPrimaryKey: toPrimaryKeyEthCall,
        preWriteBulkDB: preWriteBulkEthCall,
        postWriteBulkDB: postWriteBulkEthCall,
    });
}
export const EthCallDexie = getEthCallDexie();

export async function preWriteBulkEthCall(
    items: EthCall[]
): Promise<EthCall[]> {
    return items.map((item) => {
        return { ...item, updatedAt: Date.now() };
    });
}

export async function postWriteBulkEthCall(items: EthCall[]): Promise<any> {
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
    const ifacesArr = await ERC165Dexie.bulkWhere(interfaceQueries);
    zip(items, ifacesArr).map(([item, ifaces]) => {
        const { networkId, to, args, methodFormatFull, returnValue } = item!;
        const interfaceNames = new Set(
            ifaces!.map(({ interfaceId }) => interfaceIdNames[interfaceId])
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
                        AssetRouterPathUpserts.push({
                            networkId,
                            from: to,
                            to,
                        });
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
                    interfaces.ITokenDna.interface
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
                        (args[1] as any) as string[],
                        returnValue[0] as string[]
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
                    interfaces.ITokenDna.interface
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
                    if (
                        role === Utils.AccessControl.ASSET_ROUTER_INPUT &&
                        returnValue[0]
                    ) {
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
            else if (
                interfaceNames.has("IAssetRouterInput") ||
                interfaceNames.has("IAssetRouterCraft")
            ) {
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
                        ...assetRouterInputBasketsFromSolidityBasket(
                            networkId,
                            address,
                            basketId,
                            basket
                        )
                    );
                }
            } else if (
                interfaceNames.has("IAssetRouterOutput") ||
                interfaceNames.has("IAssetRouterCraft")
            ) {
                if (
                    methodFormatFull ===
                    interfaces.IAssetRouterOutput.interface
                        .getFunction("getOutputBasket")
                        .format(utils.FormatTypes.full)
                        .replace("function ", "")
                ) {
                    const address = to;
                    const basketId = args[0] as string;
                    const basket = returnValue[0] as AssetBasketOutput;
                    AssetRouterOutputBasketUpserts.push(
                        ...assetRouterOutputBasketsFromSolidityBasket(
                            networkId,
                            address,
                            basketId,
                            basket
                        )
                    );
                }
            }
        }
    });

    return Promise.all([
        ContractDexie.bulkPutUnchained(ContractUpserts),
        ERC165Dexie.bulkPutUnchained(ERC165Upserts),
        ERC20BalanceDexie.bulkUpsertUnchained(ERC20BalanceUpserts),
        ERC721Dexie.bulkUpsertUnchained(ERC721Upserts),
        ERC1155Dexie.bulkUpsertUnchained(ERC1155Upserts),
        ERC1155BalanceDexie.bulkUpsertUnchained(ERC1155BalanceUpserts),
        AssetRouterInputBasketDexie.bulkUpsertUnchained(
            AssetRouterInputBasketUpserts
        ),
        AssetRouterOutputBasketDexie.bulkUpsertUnchained(
            AssetRouterOutputBasketUpserts
        ),
        AssetRouterPathDexie.bulkUpsertUnchained(AssetRouterPathUpserts),
    ]);
}
