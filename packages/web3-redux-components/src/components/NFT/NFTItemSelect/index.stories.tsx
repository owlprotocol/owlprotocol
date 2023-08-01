import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NFTItemSelect, Asset } from ".";
import { TestData } from "@owlprotocol/web3-redux";
import { faker } from "@faker-js/faker";

const Wrapper = (props: any) => {
    return <NFTItemSelect {...props} />;
};

export default {
    title: "NFT/NFTItemSelect",
    component: NFTItemSelect,
} as ComponentMeta<typeof NFTItemSelect>;

const Template: ComponentStory<typeof NFTItemSelect> = (args: any) => (
    <Wrapper {...args} />
);

export const Main = Template.bind({});

const range = (len: number) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newItem = () => ({
    id: faker.finance.ethereumAddress(),
    networkId: faker.helpers.shuffle<Asset["networkId"]>([1, 10, 56, 137])[0]!,
    address: TestData.OZ_TEAM,
    tokenId: "1",
    itemName: faker.animal.cow(),
    assetPreviewSrc: faker.image.url(),
    interface: faker.helpers.shuffle<string>(["ERC721", "ERC1155"])[0]!,
});

function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Asset[] => {
        const len = lens[depth]!;
        return range(len).map((d): Asset => newItem() as Asset);
    };

    return makeDataLevel();
}

Main.args = {
    assets: makeData(6),
    otherAssets: makeData(6),
};
