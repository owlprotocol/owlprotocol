import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {expect} from 'chai';
//@ts-expect-error
import hre, { ethers } from 'hardhat';
import { ERC721TopDownDna } from '../ethers/types.js';
//import SDK from '@owlprotocol/nft-sdk';
import {Factories, InitializeFactories} from '../ethers';
import {ERC721TopDownDnaInitializeArgs} from '../utils/ERC721TopDownDna';

import { readFileSync, writeFileSync } from 'fs';

const thCollAddress = '0xd7eA8f48928e940553ED02e2cEbe18b2F94339Cf';


describe('threadhausTest', function (){

    //@ts-ignore
    const { deployments, getNamedAccounts } = hre;

    let threadHausContract: ERC721TopDownDna;
    let deployer: string;
    let other: string;
    /*
    let signers: SignerWithAddress[];
    let factories: Factories;
    let deterministicFactories: InitializeFactories;
    let ERC721TopDownDnaFactory: typeof deterministicFactories.ERC721TopDownDna;

    let nonce = 0;
    let tokenArgs: ERC721TopDownDnaInitializeArgs[];
    let tokens: ERC721TopDownDna[];
    let dnas: string[];
     */

    before(async () => {

        console.log(process.cwd());

        let provider = ethers.provider;

        console.log(provider.connection);

        const namedAccounts = await getNamedAccounts();

        deployer = namedAccounts.deployer;
        other = namedAccounts.other;

        // DOES NOT WORK - if you do not pass in provider it will use the defaultProvider, like infura
        // const ERC721DeployedFilePath = './deployments/anvil/ERC721TopDownDnaImplementation.json';
        // const ERC721DeployedFile = JSON.parse(readFileSync(ERC721DeployedFilePath).toString());
        // threadHausContract = new ethers.Contract(thCollAddress, ERC721DeployedFile.abi, provider) as ERC721TopDownDna;

        threadHausContract = (await ethers.getContractAt('ERC721TopDownDna', thCollAddress)) as ERC721TopDownDna;

        // console.log(await threadHausContract.getDna(1));

        // console.log(SDK.Collections.collectionThNested.createFromFullDna(await threadHausContract.getDna(1)));
    });

    it('contract - symbol', async () => {
        expect(await (threadHausContract).symbol()).to.be.eq('ThreadHaus');
    });

    it('contract - balanceOf', async () => {
        expect(await (threadHausContract).balanceOf(deployer)).to.be.eq(1);
    });


});
