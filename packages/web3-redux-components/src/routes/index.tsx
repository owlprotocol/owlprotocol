import {
    Link,
    Route,
} from '@tanstack/react-router'
import { rootRoute } from './__root.js'

// Create an index route
export const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Index,
})

const routes = [
    "/",
    "/components",
    "/components/address-display",
    "/components/address-dropdown",
    "/components/address-book",
    "/components/contract-hooks",
    "/components/contracts-table",
    "/components/contract-description",
    "/components/contract-abi-form",
    "/components/abi-input",
    "/components/abi-item",
    "/components/erc20-logo",
    "/components/erc20-dropdown",
    "/components/erc20-approve",
    "/components/erc20-deploy",
    "/components/erc721-instance",
    "/components/erc721-collection",
    "/components/erc721-picker",
    "/components/erc721-approve",
    "/components/erc721-deploy",
    "/components/erc1155-instance",
    "/components/erc1155-collection",
    "/components/erc1155-picker",
    "/components/erc1155-approve",
    "/components/erc1155-deploy",
    "/components/erc1167-form",
    "/components/network-icon",
    "/components/network-dropdown",
    "/components/network-table",
    "/components/network-grid",
    "/components/ethcall-table",
    "/components/ethlog-table",
    "/components/ethtransaction-table",
    "/componets/ethtransaction-progress-bar",
    "/components/ethtransaction-progress-modal",
    "/components/ipfs-image-upload",
    "/components/ipfs-image-display",
    "/components/ipfs-json-upload",
    "/components/ipfs-json-display",
    "/components/ipfs-explorer",
    "/components/wallet-button",
    "/components/wallet-sidebar",
    "/components/dna-decode",
    "/components/web3-button", //see web3-button
    "/components/assetrouterinput",
    "/components/assetrouterinput-deploy",
    "/components/assetrouteroutput",
    "/components/assetrouteroutput-deploy",
    "/components/assetroutercraft",
    "/components/assetroutercraft-deploy",
    "/components/recipe-display",
    "/components/recipe-table",
    "/components/recipe-grid",
] as const

export function Links() {
    return <>
        <div>
            {
                routes.map((r) => {
                    return <><Link to={r}>{r}</Link><br /></>
                })
            }
        </div>
        <hr />
    </>
}

function Index() {
    return (
        <div>
            <h3>Welcome Home!</h3>
            <Links />
        </div>
    )
}
