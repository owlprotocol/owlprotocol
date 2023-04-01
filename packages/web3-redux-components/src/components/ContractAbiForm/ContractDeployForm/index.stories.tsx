//@ts-nocheck
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Artifacts, Ethers } from '@owlprotocol/contracts';
import { Contract } from '@owlprotocol/web3-redux'
import { ContractDeployForm } from '.';
import * as ethers from 'ethers';
import { networkIdArgType } from '../../../test/storybookArgs';

export default {
    title: 'ContractAbi/ContractDeployForm',
    component: ContractDeployForm,
} as ComponentMeta<typeof ContractDeployForm>;

const Template: ComponentStory<typeof ContractDeployForm> = (args: any) => <ContractDeployForm {...args} />;

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const BlockNumber = Template.bind({});
BlockNumber.args = {
    networkId: '1336',
    abi: Artifacts.BlockNumber.abi,
    bytecode: Artifacts.BlockNumber.bytecode,
    deployType: Contract.enums.DeployType.REGULAR,
    label: 'BlockNumber',
    tags: ['deployed']
};
BlockNumber.argTypes = {
    networkId: networkIdArgType,
};

const from = '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf'
const privateKey = ethers.utils.hexZeroPad(ethers.utils.hexlify(1), 32)
const signer = new ethers.Wallet(privateKey);
const factories = Ethers.getFactories(signer);
const factoriesDeterministic = Ethers.getDeterministicFactories(factories);
//TODO: Patch this, need cloneFactory
const factoriesDeterministicInit = factoriesDeterministic//Ethers.getDeterministicInitializeFactories(factories, from);

const ERC721MintableImplementation = factoriesDeterministic.ERC721Mintable.getAddress()
const UpgradeableBeaconFactory = factoriesDeterministicInit.UpgradeableBeacon;
const ERC721MintableBeacon = '0x2Aa8C5372B00dcDD3DFE11d7baE5d24EA212d400' //UpgradeableBeaconFactory.getAddress(from, ERC721MintableImplementation)

export const ERC721Mintable = Template.bind({});
ERC721Mintable.args = {
    networkId: '1336',
    abi: Artifacts.ERC721Mintable.abi,
    bytecode: Artifacts.ERC721Mintable.bytecode,
    deployType: Contract.enums.DeployType.INITIALIZE,
    deployImplementationAddress: ERC721MintableImplementation,
    deployBeaconAddress: ERC721MintableBeacon,
    deploySalt: '0x0000000000000000000000000000000000000000000000000000000000000001',
    label: 'ERC721Mintable',
    tags: ['deployed', 'ERC721', 'ERC721Mintable']
};
ERC721Mintable.argTypes = {
    networkId: networkIdArgType,
};
