import { ConfigDexie } from "@owlprotocol/web3-redux-2";
import UrlPattern from "url-pattern";
import { accountsMenu } from "./accounts.js";
import { accountsAddMenu } from "./accountsAdd.js";
import { configMenu } from "./config/index.js";
import { contractMenu, contractsAddMenu, contractEditMenu } from "./contract/index.js";
import { erc1155Menu } from "./erc1155.js";
import { erc165Menu } from "./erc165/index.js";
import { erc20Menu } from "./erc20.js";
import { erc721Menu } from "./erc721.js";
import { homeMenu } from "./home.js";
import { ipfsMenu } from "./ipfs/ipfs.js";
import { ipfsPinMenu } from "./ipfs/ipfsPin.js";
import { ipfsViewMenu } from "./ipfs/ipfsView.js";
import { ipfsViewItemMenu } from "./ipfs/ipfsViewHash.js";
import { networkMenu, networksAddMenu, networkEditMenu } from "./network/index.js";
import { transactionsMenu } from "./transactions.js";

export const patterns = {
    "/quit": new UrlPattern("/quit"),
    "/home": new UrlPattern("/home"),
    /* /config */
    "/config": new UrlPattern("/config"),
    /* /accounts */
    "/accounts": new UrlPattern("/accounts"),
    "/accounts/edit(/:address)": new UrlPattern("/accounts/edit(/:address)"),
    "/accounts/add(/:address)": new UrlPattern("/accounts/add(/:address)"),
    "/accounts/switch(/:address)": new UrlPattern("/accounts/switch(/:address)"),
    /* /networks */
    "/networks": new UrlPattern("/networks"),
    "/networks/(:networkId)": new UrlPattern("/networks/(:networkId)"),
    "/networks/(/:networkId)/edit": new UrlPattern("/networks(/:networkId)/edit"),
    "/networks/add(/:networkId)": new UrlPattern("/networks/add(/:networkId)"),
    "/networks/sync(/:networkId)": new UrlPattern("/networks/sync(/:networkId)"),
    "/networks/switch(/:networkId)": new UrlPattern("/networks/switch(/:networkId)"),
    /* /contracts */
    "/contracts": new UrlPattern("/contracts"),
    "/contracts/:networkId": new UrlPattern("/contracts/:networkId"),
    "/contracts/:networkId/:interfaceId": new UrlPattern("/contracts/:networkId/:interfaceId"),
    "/contracts/:networkId/:interfaceId/:address": new UrlPattern("/contracts/:networkId/:interfaceId/:address"),
    "/contracts/edit/:networkId(/:address)": new UrlPattern("/contracts/edit/:networkId(/:address)"),
    "/contracts/add/:networkId(/:address)": new UrlPattern("/contracts/add/:networkId(/:address)"),
    /* /transactions */
    "/transactions(/:networkId)": new UrlPattern("/transactions(/:networkId)"),
    "/transactions/cancel/:networkId(/:hash)": new UrlPattern("/transactions/cancel/:networkId(/:hash)"),
    "/transactions/fee/:networkId(/:hash)": new UrlPattern("/transactions/fee/:networkId(/:hash)"),
    /* /ipfs */
    "/ipfs": new UrlPattern("/ipfs"),
    "/ipfs/pin": new UrlPattern("/ipfs/pin"),
    "/ipfs/view": new UrlPattern("/ipfs/view"),
    "/ipfs/view/:cid": new UrlPattern("/ipfs/view/:cid"),
    "/ipfs/edit": new UrlPattern("/ipfs/edit"),
    /* /erc20 */
    "/erc20(/:networkId)": new UrlPattern("/erc20(/:networkId)"),
    "/erc20/edit/:networkId(/:address)": new UrlPattern("/erc20/edit/:networkId(/:address)"),
    "/erc20/add/:networkId(/:address)": new UrlPattern("/erc20/add/:networkId(/:address)"),
    /* /erc721 */
    "/erc721(/:networkId)": new UrlPattern("/erc721(/:networkId)"),
    "/erc721/edit/:networkId(/:address)": new UrlPattern("/erc721/edit/:networkId(/:address)"),
    "/erc721/add/:networkId(/:address)": new UrlPattern("/erc721/add/:networkId(/:address)"),
    /* /erc1155 */
    "/erc1155(/:networkId)": new UrlPattern("/erc1155(/:networkId)"),
    "/erc1155/edit/:networkId(/:address)": new UrlPattern("/erc1155/edit/:networkId(/:address)"),
    "/erc1155/add/:networkId(/:address)": new UrlPattern("/erc1155/add/:networkId(/:address)"),
};

export async function routeAll(path: string) {
    while (path != "/quit") {
        path = await route(path);
    }

    //@ts-ignore
    process.exit()
}

export async function route(path: string) {
    const config = await ConfigDexie.get({ id: "0" })
    const defaultNetworkId = config?.networkId ?? "1"

    if (patterns["/home"].match(path)) {
        return await homeMenu();
    } else if (patterns["/config"].match(path)) {
        return await configMenu();
    } else if (patterns["/accounts"].match(path)) {
        return await accountsMenu();
    } else if (patterns["/accounts/add(/:address)"].match(path)) {
        return await accountsAddMenu();
    } else if (patterns["/networks"].match(path)) {
        return await networkMenu();
    } else if (patterns["/networks/(:networkId)"].match(path)) {
        const { networkId } = patterns["/networks/(:networkId)"].match(path);
        return await networkEditMenu(networkId);
    } else if (patterns["/networks/add(/:networkId)"].match(path)) {
        return await networksAddMenu();
    } else if (patterns["/contracts/:networkId/:interfaceId/:address"].match(path)) {
        const { networkId, interfaceId, address } = patterns["/contracts/:networkId/:interfaceId/:address"].match(path);
        return await contractEditMenu(networkId, interfaceId, address);
    } else if (patterns["/contracts/:networkId/:interfaceId"].match(path)) {
        const { networkId, interfaceId } = patterns["/contracts/:networkId/:interfaceId"].match(path);
        return await contractMenu(networkId, interfaceId);
    } else if (patterns["/contracts/:networkId"].match(path)) {
        const { networkId } = patterns["/contracts/:networkId"].match(path);
        return await erc165Menu(networkId);
    } else if (patterns["/contracts"].match(path)) {
        return `/contracts/${defaultNetworkId}`
    } else if (patterns["/contracts/add/:networkId(/:address)"].match(path)) {
        return await contractsAddMenu();
    } else if (patterns["/erc20(/:networkId)"].match(path)) {
        return await erc20Menu();
    } else if (patterns["/erc721(/:networkId)"].match(path)) {
        return await erc721Menu();
    } else if (patterns["/erc1155(/:networkId)"].match(path)) {
        return await erc1155Menu();
    } else if (patterns["/transactions(/:networkId)"].match(path)) {
        return await transactionsMenu();
    } else if (patterns["/ipfs"].match(path)) {
        return await ipfsMenu();
    } else if (patterns["/ipfs/pin"].match(path)) {
        return await ipfsPinMenu();
    } else if (patterns["/ipfs/view"].match(path)) {
        return await ipfsViewMenu();
    } else if (patterns["/ipfs/view/:cid"].match(path)) {
        const { cid } = patterns["/ipfs/view/:cid"].match(path);
        return await ipfsViewItemMenu(cid);
    }

    throw new Error(`Could not match ${path}`);
}
