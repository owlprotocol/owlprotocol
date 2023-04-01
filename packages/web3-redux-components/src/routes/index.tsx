import {
    Route,
} from '@tanstack/react-router'
import { rootRoute } from './__root.js'

// Create an index route
export const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Index,
})

function Index() {
    return (
        <div>
            <h3>Welcome Home!</h3>
        </div>
    )
}
