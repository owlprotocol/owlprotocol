import {
    Outlet,
    RootRoute,
} from '@tanstack/react-router'

// Create a root route
export const rootRoute = new RootRoute({
    component: Root,
})

function Root() {
    return (
        <>
            <Outlet />
        </>
    )
}
