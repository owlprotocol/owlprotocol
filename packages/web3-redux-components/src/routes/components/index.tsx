import { Outlet, Route } from '@tanstack/react-router'
import { rootRoute } from '../__root.js'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { ContractHelpers, Web3Redux } from '@owlprotocol/web3-redux'
import { Button } from '@chakra-ui/react'

export const Components = () => {
    const dispatch = useDispatch()
    const onInitialize = useCallback(() => {
        dispatch(Web3Redux.actions.initialize(undefined))
    }, [])
    const onClear = useCallback(() => {
        dispatch(Web3Redux.actions.clear(undefined))
    }, [])
    const onDispatchError = useCallback(() => {
        dispatch({ type: 'ReduxError/CREATE', payload: { errorMessage: 'test ' } })
    }, [])

    return <>
        <Button onClick={onInitialize}>Initialize</Button><br />
        <Button onClick={onClear}>Clear</Button><br />
        <Button onClick={onDispatchError}>Dispatch Error</Button><br />
        <Outlet />
    </>;
}

export const componentsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'components',
    component: Components
})

const componentsIndexRoute = new Route({
    getParentRoute: () => componentsRoute,
    path: '/',
})

//Hooks
const UseERC20Template = () => {
    const [contracts] = ContractHelpers.IERC20.useContracts()

    return <>useERC20Contracts {`count = ${contracts.length}`}<br /><br />
        {
            contracts.map((c) => {
                return <>{c.address}<br /></>
            })
        }
    </>
};

const UseERC721Template = () => {
    const [contracts] = ContractHelpers.IERC721.useContracts()

    return <>useERC721Contracts {`count = ${contracts.length}`}<br /><br />
        {
            contracts.map((c) => {
                return <>{c.address}<br /></>
            })
        }
    </>
};

const UseERC1155Template = () => {
    const [contracts] = ContractHelpers.IERC1155.useContracts()

    return <>useERC1155Contracts {`count = ${contracts.length}`}<br /><br />
        {
            contracts.map((c) => {
                return <>{c.address}<br /></>
            })
        }
    </>
};

const UseHooksTemplate = () =>
    <>
        <UseERC20Template />
        <UseERC721Template />
        <UseERC1155Template />
    </>

export const componentRoutes = [
    componentsIndexRoute,
    new Route({ getParentRoute: () => componentsRoute, path: '/contract-hooks', component: UseHooksTemplate }),
    new Route({ getParentRoute: () => componentsRoute, path: '/contracts-table', component: () => <>Contracts Table</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/contract-description', component: () => <>Contracts Description: Loads Metadata URI</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/erc20-log', component: () => <>ERC20 Logo</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/erc721-instance', component: () => <>ERC721 Instance Card</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/erc1155-instance', component: () => <>ERC1155 Instance Card</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/erc721-collection', component: () => <>ERC721 Collection</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/erc1155-collection', component: () => <>ERC1155 Collection</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/network-icon', component: () => <>Network Icon</> })
] as const

