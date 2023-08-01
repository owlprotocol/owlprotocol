import { InterfaceName } from "@owlprotocol/contracts";
import type { AnyAction } from "@reduxjs/toolkit";
//import { fetchAccessControl } from "./fetchAccessControl.js";
import { fetchAssetRouterCraft } from "./fetchAssetRouterCraft.js";
import { fetchAssetRouterInput } from "./fetchAssetRouterInput.js";
import { fetchAssetRouterOutput } from "./fetchAssetRouterOutput.js";
import { fetchContractURI } from "./fetchContractURI.js";
//import { fetchERC165 } from "./fetchERC165.js";
import { fetchERC1820 } from "./fetchERC1820.js";
import { fetchERC20 } from "./fetchERC20.js";
import { fetchERC20Metadata } from "./fetchERC20Metadata.js";
import { fetchERC2981 } from "./fetchERC2981.js";
import { fetchERC721 } from "./fetchERC721.js";
import { fetchERC721Metadata } from "./fetchERC721Metadata.js";
// TODO: Add back when IERC721TopDown is back
// import { fetchERC721TopDown } from "./fetchERC721TopDown.js";

//TODO: fetchContractActions Background / Specific
//Handle contract creation
export function fetchContractActions(
    networkId: string,
    address: string,
    account: string | undefined | null,
    interfaceName: InterfaceName,
): AnyAction[] {
    //log.debug({ interfaceNamesSet })
    const actions: AnyAction[] = [];

    //Handle interface
    if (interfaceName === "IERC165") {
        //actions.push(...fetchERC165(networkId, address));
    } else if (interfaceName === "IERC1820") {
        actions.push(...fetchERC1820(networkId, address));
    } else if (interfaceName === "IRouterReceiver") {
        //ignore
        //TODO: Check common router receivers
    } else if (interfaceName === "IERC2981") {
        actions.push(...fetchERC2981(networkId, address));
    } else if (interfaceName === "IContractURI") {
        actions.push(...fetchContractURI(networkId, address));
    } else if (interfaceName === "IAccessControl") {
        //Ignore for now, only fetch events on a per requirement basis
        //actions.push(...fetchAccessControl(networkId, address));
    } else if (interfaceName === "IERC20") {
        actions.push(...fetchERC20(networkId, address, account));
    } else if (interfaceName === "IERC20Metadata") {
        actions.push(...fetchERC20Metadata(networkId, address));
    } else if (interfaceName === "IERC721") {
        actions.push(...fetchERC721(networkId, address, account));
    } else if (interfaceName === "IERC721Metadata") {
        actions.push(...fetchERC721Metadata(networkId, address));
    // TODO: Add back when IERC721TopDown is back
    // } else if (interfaceName === "IERC721TopDown") {
    //     actions.push(...fetchERC721TopDown(networkId, address));
    } else if (interfaceName === "IAssetRouterCraft") {
        actions.push(...fetchAssetRouterCraft(networkId, address, account));
    } else if (interfaceName === "IAssetRouterInput") {
        actions.push(...fetchAssetRouterInput(networkId, address, account));
    } else if (interfaceName === "IAssetRouterOutput") {
        actions.push(...fetchAssetRouterOutput(networkId, address, account));
    }

    return actions;
}
