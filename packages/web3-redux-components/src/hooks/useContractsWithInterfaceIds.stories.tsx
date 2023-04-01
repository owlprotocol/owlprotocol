import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContractHelpers } from '@owlprotocol/web3-redux';

const UseERC20Template: ComponentStory<any> = (args: any) => {
    const [contracts] = ContractHelpers.IERC20.useContracts()

    return <>useERC20Contracts {`count = ${contracts.length}`}<br /><br />
        {
            contracts.map((c) => {
                return <>{c.address}<br /></>
            })
        }
    </>
};
export const UseERC20 = UseERC20Template.bind({});

const UseERC721Template: ComponentStory<any> = (args: any) => {
    const [contracts] = ContractHelpers.IERC721.useContracts()

    return <>useERC721Contracts {`count = ${contracts.length}`}<br /><br />
        {
            contracts.map((c) => {
                return <>{c.address}<br /></>
            })
        }
    </>
};
export const UseERC721 = UseERC721Template.bind({});

const UseERC1155Template: ComponentStory<any> = (args: any) => {
    const [contracts] = ContractHelpers.IERC1155.useContracts()

    return <>useERC1155Contracts {`count = ${contracts.length}`}<br /><br />
        {
            contracts.map((c) => {
                return <>{c.address}<br /></>
            })
        }
    </>
};
export const UseERC1155 = UseERC1155Template.bind({});

const UseAssetRouterCraftTemplate: ComponentStory<any> = (args: any) => {
    const [contracts] = ContractHelpers.IAssetRouterCraft.useContracts()

    return <>useAssetRouterCraftContracts {`count = ${contracts.length}`}<br /><br />
        {
            contracts.map((c) => {
                return <>{c.address}<br /></>
            })
        }
    </>
};
export const UseAssetRouterCraft = UseAssetRouterCraftTemplate.bind({});

export default {
    title: 'AAA/Hooks',
} as ComponentMeta<any>;
