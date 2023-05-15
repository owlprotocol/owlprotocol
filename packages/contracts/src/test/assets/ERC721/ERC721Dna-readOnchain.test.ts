import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import hre, { ethers } from "hardhat";
import { expect } from "chai";
import { ERC721TopDownDna } from "../../../ethers/types.js";
import deployProxyNick from "../../../deploy-hre/common/DeterministicDeployer.js";
import ProxyFactoryDeploy from "../../../deploy-hre/common/ProxyFactory.js";
import ImplementationsDeploy from "../../../deploy-hre/common/Implementations.js";
import {
    ERC721TopDownDnaInitializeArgs,
    flattenInitArgsERC721TopDownDna,
    flattenSetChildrenArgsERC721TopDownDna,
} from "../../../utils/ERC721TopDownDna.js";
import { factories, Factories, getFactories } from "../../../ethers/factories.js";
import { getDeterministicInitializeFactories, InitializeFactories } from "../../../ethers/deterministicFactories.js";
import { ERC1167FactoryAddress } from "../../../utils/ERC1167Factory/index.js";
import log from "loglevel";

const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddress);

/**
 * WIP
 */
describe("ERC721Dna-readOnChain", function () {

    let signers: SignerWithAddress[];
    let factories: Factories;
    let deterministicFactories: InitializeFactories;
    let ERC721TopDownDnaFactory: typeof deterministicFactories.ERC721TopDownDna;

    let nonce = 0;
    let tokenArgs: ERC721TopDownDnaInitializeArgs[];
    let tokens: ERC721TopDownDna[];
    let dnas: string[];

    before(async () => {
        await deployProxyNick(hre as any);
        await ProxyFactoryDeploy(hre as any);
        //Deploy libraries and other contracts
        await ImplementationsDeploy(hre as any);

        signers = await ethers.getSigners();
        const signer = signers[0];
        const signerAddress = signer.address;

        factories = getFactories(signer);
        deterministicFactories = getDeterministicInitializeFactories(factories, cloneFactory, signerAddress);
        ERC721TopDownDnaFactory = deterministicFactories.ERC721TopDownDna;
    });

    it('Should deploy a NFT Dna to tokenId 3', async () => {
        log.debug('TODO');
        expect(true).to.be.true;
    });
});
