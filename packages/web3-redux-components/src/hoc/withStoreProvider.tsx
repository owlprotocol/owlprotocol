import { Provider } from 'react-redux';
import { createStore } from '@owlprotocol/web3-redux';
import getDisplayName from './getDisplayName.js';

export const withStoreProvider = (WrappedComponent: any) => {
    const component = (props: any) => {
        return (
            <Provider store={createStore()}>
                <WrappedComponent {...props} />
            </Provider>
        );
    };
    component.displayName = `withStoreProvider(${getDisplayName(WrappedComponent)})`;
    return component;
};

export default withStoreProvider;
