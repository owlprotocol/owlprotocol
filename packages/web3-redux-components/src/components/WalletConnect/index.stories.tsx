import { ComponentStory, ComponentMeta } from '@storybook/react';
import { networkIdArgType } from '../../test/storybookArgs.js';
import { WalletConnect } from './index.js';

export default {
    title: 'Wallet/Connect',
    component: WalletConnect,
} as ComponentMeta<typeof WalletConnect>;

const MainTemplate: ComponentStory<typeof WalletConnect> = (args) => (
    <WalletConnect {...args}>
        <>Connected!</>
    </WalletConnect>
);
export const Main = MainTemplate.bind({});
Main.argTypes = {
    networkId: networkIdArgType,
};
