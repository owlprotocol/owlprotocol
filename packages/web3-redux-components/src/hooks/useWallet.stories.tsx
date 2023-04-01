import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Config, useWallet } from '@owlprotocol/web3-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEnvironment } from '../environment.js';

const UseWalletTemplate: ComponentStory<any> = (args: any) => {
    const dispatch = useDispatch()
    const account = getEnvironment().VITE_PUBLIC_ADDRESS_0
    useEffect(() => {
        dispatch(Config.actions.upsert({
            id: '0',
            networkId: '31337',
            account
        }))
    }, [account])
    const { ERC20, ERC721, ERC1155 } = useWallet(account)

    return <>useWallet<br /><br />
        ERC20<br /><br />
        {
            ERC20.map((c) => {
                return <>{c.address} {c.balance}<br /></>
            })
        }<br />
        ERC721<br /><br />
        {
            ERC721.map((c) => {
                return <>{c.address} {c.tokenId}<br /></>
            })
        }<br />
        ERC1155<br /><br />
        {
            ERC1155.map((c) => {
                return <>{c.address} {c.id} {c.balance}<br /></>
            })
        }
    </>
};
export const UseWallet = UseWalletTemplate.bind({});

export default {
    title: 'AAA/Hooks',
} as ComponentMeta<any>;
