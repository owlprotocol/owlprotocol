import {
    ADDRESS_1,
    ADDRESS_2,
    ADDRESS_3,
    ADDRESS_4,
    AssetRouterInputBasket,
    AssetRouterOutputBasket,
    AssetRouterPath,
    Contract,
    ERC1155,
    ERC1155Balance,
    ERC165,
    ERC20,
    ERC20Allowance,
    ERC20Balance,
    ERC721,
    HTTPCache,
    IPFSCache,
} from "@owlprotocol/web3-models";
import { ethers } from "ethers";
import { PUBLIC_ADDRESS_0, PUBLIC_ADDRESS_1 } from "@owlprotocol/envvars";
import { interfaces } from "@owlprotocol/contracts";
import { Web3Tables } from "./dbIndex.js";

export function initDemoData(db: Web3Tables) {
    //Networks
    //Contracts
    const contract: Contract[] = [
        {
            networkId: "1337",
            address: ADDRESS_1,
            label: "ERC20 - 0",
            interfaceCheckedAt: Number.MAX_SAFE_INTEGER,
        },
        {
            networkId: "1337",
            address: ADDRESS_2,
            label: "ERC721 - 0",
            interfaceCheckedAt: Number.MAX_SAFE_INTEGER,
        },
        {
            networkId: "1337",
            address: ADDRESS_3,
            label: "ERC1155 - 0",
            interfaceCheckedAt: Number.MAX_SAFE_INTEGER,
        },
        {
            networkId: "1337",
            address: ADDRESS_4,
            label: "AssetRouterCraft - 0",
            interfaceCheckedAt: Number.MAX_SAFE_INTEGER,
        },
    ];
    //EthModel
    //Abstractions
    const erc165: ERC165[] = [
        {
            networkId: "1337",
            address: ADDRESS_1,
            interfaceId: interfaces.IERC20.interfaceId,
        },
        {
            networkId: "1337",
            address: ADDRESS_2,
            interfaceId: interfaces.IERC721.interfaceId,
        },
        {
            networkId: "1337",
            address: ADDRESS_3,
            interfaceId: interfaces.IERC1155.interfaceId,
        },
        {
            networkId: "1337",
            address: ADDRESS_4,
            interfaceId: interfaces.IAssetRouterCraft.interfaceId,
        },
    ];
    const erc20: ERC20[] = [
        {
            networkId: "1337",
            address: ADDRESS_1,
            name: "ERC20 - 0",
            symbol: "TK0",
            decimals: 18,
            totalSupply: ethers.utils.formatUnits(1000, "ether"),
        },
    ];
    const erc20balance: ERC20Balance[] = [
        {
            networkId: "1337",
            address: ADDRESS_1,
            account: PUBLIC_ADDRESS_0!,
            balance: ethers.utils.formatUnits(1, "ether"),
        },
    ];
    const erc20allowance: ERC20Allowance[] = [
        {
            networkId: "1337",
            address: ADDRESS_1,
            account: PUBLIC_ADDRESS_0!,
            spender: PUBLIC_ADDRESS_1!,
            balance: ethers.utils.formatUnits(1, "ether"),
        },
    ];
    const erc721: ERC721[] = [
        {
            networkId: "1337",
            address: ADDRESS_2,
            tokenId: "1",
            owner: PUBLIC_ADDRESS_0,
            name: "NFT1",
            tokenURI: `http://localhost:8080/${ADDRESS_2}/1`,
        },
    ];
    const erc1155: ERC1155[] = [
        {
            networkId: "1337",
            address: ADDRESS_3,
            id: "1",
            name: "MULTI1",
            totalSupply: "1000",
            uri: `ipfs://localhost:8080/${ADDRESS_3}/1`,
        },
    ];
    const erc1155balance: ERC1155Balance[] = [
        {
            networkId: "1337",
            address: ADDRESS_3,
            id: "1",
            account: PUBLIC_ADDRESS_0!,
            balance: "1",
        },
    ];
    const assetRouterInputBasket: AssetRouterInputBasket[] = [
        {
            networkId: "1337",
            address: ADDRESS_4,
            basketId: "0",
            assetAddress: erc20[0].address,
            erc1155Id: "0",
            assetType: "ERC20",
            assetBurned: false,
            assetBurnAddress: ADDRESS_1,
            assetAmount: "1",
            assetNTime: "1",
        },
    ];
    const assetRouterOutputBasket: AssetRouterOutputBasket[] = [
        {
            networkId: "1337",
            address: ADDRESS_4,
            basketId: "0",
            assetAddress: erc721[0].address,
            erc1155Id: "0",
            assetType: "ERC721",
            assetAmount: "1",
        },
        {
            networkId: "1337",
            address: ADDRESS_4,
            basketId: "1",
            assetAddress: erc1155[0].address,
            erc1155Id: "1",
            assetType: "ERC1155",
            assetAmount: "1",
        },
    ];
    const assetRouterPath: AssetRouterPath[] = [
        {
            networkId: "1337",
            from: ADDRESS_4,
            to: ADDRESS_4,
        },
    ];
    //HTTP
    const httpcache: HTTPCache[] = [
        {
            id: erc721[0].tokenURI!,
            url: erc721[0].tokenURI,
            data: {
                name: "NFT1",
                image_url: `http://localhost:8080/${erc721[0].address}/image/${erc721[0].tokenId}`,
            },
        },
    ];
    //IPFS
    const ipfscache: IPFSCache[] = [
        {
            contentId: erc1155[0].uri!,
            dataJSON: {
                name: "MULTI1",
                image_url: `http://localhost:8080/${erc1155[0].address}/image/${erc1155[0].id}`,
            },
        },
    ];

    return Promise.all([
        db.Contract.bulkAdd(contract),
        db.ERC165.bulkAdd(erc165),
        db.ERC20.bulkAdd(erc20),
        db.ERC20Balance.bulkAdd(erc20balance),
        db.ERC20Allowance.bulkAdd(erc20allowance),
        db.ERC721.bulkAdd(erc721),
        db.ERC1155.bulkAdd(erc1155),
        db.ERC1155Balance.bulkAdd(erc1155balance),
        db.AssetRouterInputBasket.bulkAdd(assetRouterInputBasket),
        db.AssetRouterOutputBasket.bulkAdd(assetRouterOutputBasket),
        db.AssetRouterPath.bulkAdd(assetRouterPath),
        db.HTTPCache.bulkAdd(httpcache),
        db.IPFSCache.bulkAdd(ipfscache),
    ]);
}
