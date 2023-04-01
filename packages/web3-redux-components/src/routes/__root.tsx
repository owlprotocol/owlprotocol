import {
    Outlet,
    Link,
    RootRoute,
    useRouter,
} from '@tanstack/react-router'

// Create a root route
export const rootRoute = new RootRoute({
    component: Root,
})


const routes = [
    "/",
    "/components",
    "/components/contract-hooks",
    "/components/contracts-table",
    "/components/contract-description",
    "/components/erc20-log",
    "/components/erc721-instance",
    "/components/erc1155-instance",
    "/components/erc721-collection",
    "/components/erc1155-collection",
    "/components/network-icon",
] as const
function Root() {
    return (
        <>
            <div>
                {
                    routes.map((r) => {
                        return <><Link to={r}>{r}</Link><br /></>
                    })
                }
            </div>
            <hr />
            <Outlet />
        </>
    )
}
