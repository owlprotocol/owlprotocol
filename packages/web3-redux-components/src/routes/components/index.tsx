import { Outlet, Route } from '@tanstack/react-router'
import { rootRoute } from '../__root.js'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { ADDRESS_0, ADDRESS_1, ContractHelpers } from '@owlprotocol/web3-redux'
import { Button } from '@chakra-ui/react'
import { AddressDisplay, AddressDropdown, AddressList } from '../../components/Address/index.js'
import NetworkIcon from '../../components/NetworkIcon/index.js'
import NetworkDropdown from '../../components/NetworkDropdown/index.js'
import { NetworkTable } from '../../components/Network/index.js'
import { Links } from '../index.js'

export const ComponentsIndex = () => {
    const dispatch = useDispatch()
    const onInitialize = useCallback(() => {
        //dispatch(Web3Redux.actions.initialize(undefined))
    }, [])
    const onClear = useCallback(() => {
        //dispatch(Web3Redux.actions.clear(undefined))
    }, [])
    const onDispatchError = useCallback(() => {
        dispatch({ type: 'ReduxError/CREATE', payload: { errorMessage: 'test ' } })
    }, [])

    return <>
        <Button onClick={onInitialize}>Initialize</Button><br />
        <Button onClick={onClear}>Clear</Button><br />
        <Button onClick={onDispatchError}>Dispatch Error</Button><br />
        <Links />
    </>;
}

export const componentsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'components',
    component: () => <Outlet />
})

const componentsIndexRoute = new Route({
    getParentRoute: () => componentsRoute,
    path: '/',
    component: ComponentsIndex
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
    new Route({ getParentRoute: () => componentsRoute, path: '/address-display', component: () => <AddressDisplay networkId='1' address={ADDRESS_0} /> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/address-dropdown', component: () => <AddressDropdown address={[ADDRESS_0, ADDRESS_1]} /> }),
    //new Route({ getParentRoute: () => componentsRoute, path: '/address-book', component: () => <AddressList /> }),
    /*
    new Route({ getParentRoute: () => componentsRoute, path: '/contract-hooks', component: UseHooksTemplate }),
    new Route({ getParentRoute: () => componentsRoute, path: '/contracts-table', component: () => <>Contracts Table</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/contract-description', component: () => <>Contracts Description: Loads Metadata URI</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/erc20-logo', component: () => <>ERC20 Logo</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/erc20-dropdown', component: () => <></> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/erc721-instance', component: () => <>ERC721 Instance Card</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/erc1155-instance', component: () => <>ERC1155 Instance Card</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/erc721-collection', component: () => <>ERC721 Collection</> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/erc1155-collection', component: () => <>ERC1155 Collection</> }),
    */
    new Route({ getParentRoute: () => componentsRoute, path: '/network-icon', component: () => <NetworkIcon networkId={'1'} /> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/network-dropdown', component: () => <NetworkDropdown /> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/network-table', component: () => <NetworkTable /> }),
    /*
    new Route({ getParentRoute: () => componentsRoute, path: '/ethcall-table', component: () => <></> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/ethlog-table', component: () => <></> }),
    new Route({ getParentRoute: () => componentsRoute, path: '/ethtransaction-table', component: () => <></> }),
    */
] as const

