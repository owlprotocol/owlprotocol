import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
//@ts-expect-error
import hre, { ethers } from 'hardhat';
import { ERC721TopDownDna } from '../../../ethers/types.js';
import deployProxyNick from '../../../deploy-hre/common/DeterministicDeployer.js';
import deployProxyFactory from '../../../deploy-hre/common/ProxyFactory.js';
import deployImplementations from '../../../deploy-hre/common/Implementations.js';
import {
    ERC721TopDownDnaInitializeArgs,
    flattenInitArgsERC721TopDownDna,
    flattenSetChildrenArgsERC721TopDownDna,
} from '../../../utils/ERC721TopDownDna.js';
import { expect } from 'chai';
import { Factories, getFactories } from '../../../ethers/factories.js';
import { getDeterministicInitializeFactories, InitializeFactories } from '../../../ethers/deterministicFactories.js';

describe('ERC721TopDownDna', function () {
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
        await deployProxyFactory(hre as any);
        //Deploy libraries and other contracts
        await deployImplementations(hre as any);

        signers = await ethers.getSigners();
        const signer = signers[0];
        const signerAddress = signer.address;

        factories = getFactories(signer);
        deterministicFactories = getDeterministicInitializeFactories(factories, signerAddress);
        ERC721TopDownDnaFactory = deterministicFactories.ERC721TopDownDna;
    });

    beforeEach(() => {
        tokenArgs = [1, 2, 3].map((x) => {
            return {
                admin: signers[0].address,
                contractUri: `token${x}.${nonce}.com`,
                gsnForwarder: ethers.constants.AddressZero,
                name: `Token ${x} - ${nonce}`,
                symbol: `TK ${x} - ${nonce}`,
                initBaseURI: `token${x}.${nonce}.com/api/`,
                feeReceiver: signers[0].address,
                feeNumerator: 0,
                childContracts721: [],
                childContracts1155: [],
            };
        });
        dnas = [1, 2, 3].map((x) => {
            return ethers.utils.solidityPack(['uint8', 'uint8'], [x, x]);
        });
        nonce++;
    });

    describe('0 empty child contracts', () => {
        beforeEach(async () => {
            tokens = [await ERC721TopDownDnaFactory.deploy(...flattenInitArgsERC721TopDownDna(tokenArgs[0]))];
            await tokens[0].mintWithDna(signers[0].address, dnas[0]);
        });

        it('balanceOf', async () => {
            const result = await tokens[0].balanceOf(signers[0].address);
            expect(result).to.be.eq(1);
        });

        it('getDna', async () => {
            const result = await tokens[0].getDna(1);
            const expected = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [dnas[0], []]);
            expect(result).to.be.eq(expected);
        });
    });

    describe('0-1 single child contract', () => {
        beforeEach(async () => {
            const token1 = await ERC721TopDownDnaFactory.deploy(...flattenInitArgsERC721TopDownDna(tokenArgs[1]));
            tokenArgs[0].childContracts721 = [token1.address];
            const token0 = await ERC721TopDownDnaFactory.deploy(...flattenInitArgsERC721TopDownDna(tokenArgs[0]));

            tokens = [token0, token1];
            await tokens[0].mintWithDna(signers[0].address, dnas[0]);
            await tokens[1].mintWithDna(signers[0].address, dnas[1]);
        });

        it('getDna - no attachment', async () => {
            //Parent unattached
            const result = await tokens[0].getDna(1);
            const expected = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [dnas[0], ['0x']]);
            expect(result).to.be.eq(expected, 'dna');
        });

        it('getDna - attachment', async () => {
            //Child dna
            const childResult = await tokens[1].getDna(1);
            const childExpected = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [dnas[1], []]);
            expect(childResult).to.be.eq(childExpected, 'childDna');

            //Attach
            await tokens[1].setApprovalForAll(tokens[0].address, true);
            await tokens[0].setChildren(
                ...flattenSetChildrenArgsERC721TopDownDna({
                    tokenId: 1,
                    childContracts721Set: [tokens[1].address],
                    childTokenIds721Set: [1],
                }),
            );

            //Parent attached
            const result = await tokens[0].getDna(1);
            const expected = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [dnas[0], [childExpected]]);
            expect(result).to.be.eq(expected, 'dna');
        });

        it('getChildContracts', async () => {
            const [[result]] = await tokens[0].getChildContracts();
            expect(result).to.be.eq(tokens[1].address);
        });

        it('ownership', async () => {
            //Token 1 Attach
            await tokens[1].setApprovalForAll(tokens[0].address, true);
            await tokens[0].setChildren(
                ...flattenSetChildrenArgsERC721TopDownDna({
                    tokenId: 1,
                    childContracts721Set: [tokens[1].address],
                    childTokenIds721Set: [1],
                }),
            );

            expect(await tokens[1].ownerOf(1)).to.be.eq(tokens[0].address, 'attach tokens[1].ownerOf');
            expect(await tokens[1].rootOwnerOf(1)).to.be.eq(signers[0].address, 'attach tokens[1].rootOwnerOf');

            //Transfer Token0 -> signers[1]
            await tokens[0].transferFrom(signers[0].address, signers[1].address, 1);
            expect(await tokens[0].rootOwnerOf(1)).to.be.eq(signers[1].address, 'tokens[0].rootOwnerOf');
            expect(await tokens[1].rootOwnerOf(1)).to.be.eq(signers[1].address, 'tokens[1].rootOwnerOf');

            //Token 1 Detach
            tokens[0] = tokens[0].connect(signers[1]);
            await tokens[0].setChildren(
                ...flattenSetChildrenArgsERC721TopDownDna({
                    tokenId: 1,
                    childContracts721Set: [tokens[1].address],
                    childTokenIds721Set: [0],
                }),
            );
            expect(await tokens[1].ownerOf(1)).to.be.eq(signers[1].address, 'detach tokens[1].ownerOf');
            expect(await tokens[1].rootOwnerOf(1)).to.be.eq(signers[1].address, 'detach tokens[1].rootOwnerOf');
        });
    });

    describe('0-1-2 nested child contract', () => {
        beforeEach(async () => {
            const token2 = await ERC721TopDownDnaFactory.deploy(...flattenInitArgsERC721TopDownDna(tokenArgs[2]));

            tokenArgs[1].childContracts721 = [token2.address];
            const token1 = await ERC721TopDownDnaFactory.deploy(...flattenInitArgsERC721TopDownDna(tokenArgs[1]));

            tokenArgs[0].childContracts721 = [token1.address];
            const token0 = await ERC721TopDownDnaFactory.deploy(...flattenInitArgsERC721TopDownDna(tokenArgs[0]));

            tokens = [token0, token1, token2];
            await tokens[0].mintWithDna(signers[0].address, dnas[0]);
            await tokens[1].mintWithDna(signers[0].address, dnas[1]);
            await tokens[2].mintWithDna(signers[0].address, dnas[2]);
        });

        it('getDna - attachment', async () => {
            //Token2 dna
            const token2Result = await tokens[2].getDna(1);
            const token2Expected = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [dnas[2], []]);
            expect(token2Result).to.be.eq(token2Expected, 'token2');

            //Token2 attach
            await tokens[2].setApprovalForAll(tokens[1].address, true);
            await tokens[1].setChildren(
                ...flattenSetChildrenArgsERC721TopDownDna({
                    tokenId: 1,
                    childContracts721Set: [tokens[2].address],
                    childTokenIds721Set: [1],
                }),
            );

            //Token1 dna
            const token1Result = await tokens[1].getDna(1);
            const token1Expected = ethers.utils.defaultAbiCoder.encode(
                ['bytes', 'bytes[]'],
                [dnas[1], [token2Expected]],
            );
            expect(token1Result).to.be.eq(token1Expected, 'token1');

            //Token1 attach
            await tokens[1].setApprovalForAll(tokens[0].address, true);
            await tokens[0].setChildren(
                ...flattenSetChildrenArgsERC721TopDownDna({
                    tokenId: 1,
                    childContracts721Set: [tokens[1].address],
                    childTokenIds721Set: [1],
                }),
            );

            //Token0 dna
            const token0Result = await tokens[0].getDna(1);
            const token0Expected = ethers.utils.defaultAbiCoder.encode(
                ['bytes', 'bytes[]'],
                [dnas[0], [token1Expected]],
            );
            expect(token0Result).to.be.eq(token0Expected, 'token0');
        });

        it('ownership', async () => {
            //Token2 attach
            await tokens[2].setApprovalForAll(tokens[1].address, true);
            await tokens[1].setChildren(
                ...flattenSetChildrenArgsERC721TopDownDna({
                    tokenId: 1,
                    childContracts721Set: [tokens[2].address],
                    childTokenIds721Set: [1],
                }),
            );

            expect(await tokens[2].ownerOf(1)).to.be.eq(tokens[1].address, 'token2.ownerOf');
            expect(await tokens[2].rootOwnerOf(1)).to.be.eq(signers[0].address, 'token2.rootOwnerOf');

            //Token1 attach
            await tokens[1].setApprovalForAll(tokens[0].address, true);
            await tokens[0].setChildren(
                ...flattenSetChildrenArgsERC721TopDownDna({
                    tokenId: 1,
                    childContracts721Set: [tokens[1].address],
                    childTokenIds721Set: [1],
                }),
            );

            expect(await tokens[1].ownerOf(1)).to.be.eq(tokens[0].address, 'token1.ownerOf');
            expect(await tokens[1].rootOwnerOf(1)).to.be.eq(signers[0].address, 'token1.rootOwnerOf');
            expect(await tokens[2].ownerOf(1)).to.be.eq(tokens[1].address, 'token2.ownerOf');
            expect(await tokens[2].rootOwnerOf(1)).to.be.eq(signers[0].address, 'token2.rootOwnerOf');

            //Transfer Token0
            await tokens[0].transferFrom(signers[0].address, signers[1].address, 1);
            expect(await tokens[0].rootOwnerOf(1)).to.be.eq(signers[1].address, 'token0.rootOwnerOf');
            expect(await tokens[1].rootOwnerOf(1)).to.be.eq(signers[1].address, 'token1.rootOwnerOf');
            expect(await tokens[2].rootOwnerOf(1)).to.be.eq(signers[1].address, 'token2.rootOwnerOf');

            //Token 2 Detach
            tokens[0] = tokens[0].connect(signers[1]);
            tokens[1] = tokens[1].connect(signers[1]);
            await tokens[1].setChildren(
                ...flattenSetChildrenArgsERC721TopDownDna({
                    tokenId: 1,
                    childContracts721Set: [tokens[2].address],
                    childTokenIds721Set: [0],
                }),
            );
            expect(await tokens[2].ownerOf(1)).to.be.eq(signers[1].address, 'detach tokens[2].ownerOf');
            expect(await tokens[2].rootOwnerOf(1)).to.be.eq(signers[1].address, 'detach tokens[2].rootOwnerOf');
        });
    });
});
