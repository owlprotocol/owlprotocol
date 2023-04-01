import { Button } from '@chakra-ui/react';
import { Web3Redux } from '@owlprotocol/web3-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const Template: ComponentStory<any> = (args: any) => {
    const dispatch = useDispatch()
    const onClick = useCallback(() => {
        dispatch(Web3Redux.actions.initialize(undefined))
    }, [])

    return (<Button onClick={onClick}>Initialize</Button>);
}
export const Main = Template.bind({});
export default {
    title: 'AAA/Root',
} as ComponentMeta<any>;
