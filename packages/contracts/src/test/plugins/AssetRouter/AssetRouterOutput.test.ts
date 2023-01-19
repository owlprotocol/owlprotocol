import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
//@ts-expect-error
import hre, { ethers } from 'hardhat';
import {
    AssetRouterOutput,
    ERC20Mintable,
    ERC721Mintable,
    ERC721MintableAutoId,
    ERC1155Mintable,
} from '../../../ethers/types';
import deployProxyNick from '../../../deploy-hre/common/DeterministicDeployer.js';
import deployProxyFactory from '../../../deploy-hre/common/ProxyFactory.js';
import { ERC20MintableInitializeArgs, flattenInitArgsERC20Mintable } from '../../../utils/ERC20Mintable';
import { ERC721MintableInitializeArgs, flattenInitArgsERC721Mintable } from '../../../utils/ERC721Mintable';
import { ERC1155MintableInitializeArgs, flattenInitArgsERC1155Mintable } from '../../../utils/ERC1155Mintable';
import { expect } from 'chai';
import { Factories, getFactories } from '../../../ethers/factories';
import { getDeterministicInitializeFactories, InitializeFactories } from '../../../ethers/deterministicFactories';
import { AssetRouterOutputInitializeArgs, flattenInitArgsAssetRouterOutput } from '../../../utils/AssetRouterOutput';
import { MINTER_ROLE } from '../../../utils/IAccessControl';
import {
    ERC721MintableAutoIdInitializeArgs,
    flattenInitArgsERC721MintableAutoId,
} from '../../../utils/ERC721MintableAutoId';

describe('AssetRouterOutput', function () {
    let signers: SignerWithAddress[];
    let factories: Factories;
    let deterministicInitFactories: InitializeFactories;

    let AssetRouterOutputFactory: typeof deterministicInitFactories.AssetRouterOutput;
    let AssetRouterOutput: AssetRouterOutput;

    let assetRouterOutputName = 0;
    let assetRouterOutput: AssetRouterOutputInitializeArgs;

    before(async () => {
        await deployProxyNick(hre as any);
        await deployProxyFactory(hre as any);

        signers = await ethers.getSigners();
        const signer = signers[0];
        const signerAddress = signer.address;

        factories = getFactories(signer);
        deterministicInitFactories = getDeterministicInitializeFactories(factories, signerAddress);

        AssetRouterOutputFactory = deterministicInitFactories.AssetRouterOutput;
    });

    describe('empty', () => {
        beforeEach(async () => {
            assetRouterOutput = {
                admin: signers[0].address,
                contractUri: `assetRouterOutput.${assetRouterOutputName}.com`,
                outputBaskets: [
                    {
                        outputableAmount: 0,
                        erc20Transfer: [],
                        erc20Mint: [],
                        erc721Transfer: [],
                        erc721Mint: [],
                        erc721MintAutoId: [],
                        erc1155Transfer: [],
                        erc1155Mint: [],
                    },
                ],
                routers: [signers[0].address],
            };
            assetRouterOutputName++;
            const assetRouterInitArgs = flattenInitArgsAssetRouterOutput(assetRouterOutput);
            AssetRouterOutput = await AssetRouterOutputFactory.deploy(...assetRouterInitArgs);
        });

        it('getBasket', async () => {
            await AssetRouterOutput.deposit(1, 0, [], []);
            const b = await AssetRouterOutput.getBasket(0);
            expect(b.outputableAmount.toString()).to.be.eq('1');
        });

        it('success', async () => {
            await AssetRouterOutput.deposit(1, 0, [], []);
            await AssetRouterOutput.output(signers[0].address, 1, 0);
            const b = await AssetRouterOutput.getBasket(0);
            expect(b.outputableAmount.toString()).to.be.eq('0');
        });
    });

    describe('erc20', () => {
        let tokenName = 0;
        let token: ERC20MintableInitializeArgs;
        let ERC20MintableFactory: typeof deterministicInitFactories.ERC20Mintable;
        let ERC20Mintable: ERC20Mintable;

        beforeEach(async () => {
            ERC20MintableFactory = deterministicInitFactories.ERC20Mintable;

            token = {
                admin: signers[0].address,
                contractUri: `token.${tokenName}.com`,
                gsnForwarder: ethers.constants.AddressZero,
                name: `Token ${tokenName}`,
                symbol: `TK${tokenName}`,
            };
            const tokenInitArgs = flattenInitArgsERC20Mintable(token);
            ERC20Mintable = await ERC20MintableFactory.deploy(...tokenInitArgs);
            tokenName++;
        });

        describe('erc20Transfer', () => {
            beforeEach(async () => {
                assetRouterOutput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterOutput.${assetRouterOutputName}.com`,
                    outputBaskets: [
                        {
                            outputableAmount: 0,
                            erc20Transfer: [{ contractAddr: ERC20Mintable.address, amount: 1 }],
                            erc20Mint: [],
                            erc721Transfer: [],
                            erc721Mint: [],
                            erc721MintAutoId: [],
                            erc1155Transfer: [],
                            erc1155Mint: [],
                        },
                    ],
                    routers: [signers[0].address],
                };
                assetRouterOutputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterOutput(assetRouterOutput);
                AssetRouterOutput = await AssetRouterOutputFactory.deploy(...assetRouterInitArgs);
            });

            it('success', async () => {
                await ERC20Mintable.mint(signers[0].address, 1);
                await ERC20Mintable.increaseAllowance(AssetRouterOutput.address, 1);
                await AssetRouterOutput.deposit(1, 0, [], []);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('1');
                expect(await ERC20Mintable.balanceOf(AssetRouterOutput.address)).to.be.eq('1');
                expect(await ERC20Mintable.balanceOf(signers[0].address)).to.be.eq('0');

                await AssetRouterOutput.output(signers[0].address, 1, 0);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('0');
                expect(await ERC20Mintable.balanceOf(AssetRouterOutput.address)).to.be.eq('0');
                expect(await ERC20Mintable.balanceOf(signers[0].address)).to.be.eq('1');
            });
        });

        describe('erc20Mint', () => {
            beforeEach(async () => {
                assetRouterOutput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterOutput.${assetRouterOutputName}.com`,
                    outputBaskets: [
                        {
                            outputableAmount: 0,
                            erc20Transfer: [],
                            erc20Mint: [{ contractAddr: ERC20Mintable.address, amount: 1 }],
                            erc721Transfer: [],
                            erc721Mint: [],
                            erc721MintAutoId: [],
                            erc1155Transfer: [],
                            erc1155Mint: [],
                        },
                    ],
                    routers: [signers[0].address],
                };
                assetRouterOutputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterOutput(assetRouterOutput);
                AssetRouterOutput = await AssetRouterOutputFactory.deploy(...assetRouterInitArgs);
            });

            it('success', async () => {
                await ERC20Mintable.grantRole(MINTER_ROLE, AssetRouterOutput.address);
                await AssetRouterOutput.deposit(1, 0, [], []);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('1');

                await AssetRouterOutput.output(signers[0].address, 1, 0);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('0');
                expect(await ERC20Mintable.balanceOf(signers[0].address)).to.be.eq('1');
            });
        });
    });

    describe('erc721', () => {
        let tokenName = 0;
        let token: ERC721MintableInitializeArgs;
        let ERC721MintableFactory: typeof deterministicInitFactories.ERC721Mintable;
        let ERC721Mintable: ERC721Mintable;

        beforeEach(async () => {
            ERC721MintableFactory = deterministicInitFactories.ERC721Mintable;

            token = {
                admin: signers[0].address,
                contractUri: `token.${tokenName}.com`,
                gsnForwarder: ethers.constants.AddressZero,
                name: `Token ${tokenName}`,
                symbol: `TK${tokenName}`,
                initBaseURI: `token.${tokenName}.com/token`,
                feeReceiver: signers[0].address,
                feeNumerator: 0,
            };
            const tokenInitArgs = flattenInitArgsERC721Mintable(token);
            ERC721Mintable = await ERC721MintableFactory.deploy(...tokenInitArgs);
            tokenName++;
        });

        describe('erc721Transfer', () => {
            beforeEach(async () => {
                assetRouterOutput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterOutput.${assetRouterOutputName}.com`,
                    outputBaskets: [
                        {
                            outputableAmount: 0,
                            erc20Transfer: [],
                            erc20Mint: [],
                            erc721Transfer: [{ contractAddr: ERC721Mintable.address, tokenIds: [1] }],
                            erc721Mint: [],
                            erc721MintAutoId: [],
                            erc1155Transfer: [],
                            erc1155Mint: [],
                        },
                    ],
                    routers: [signers[0].address],
                };
                assetRouterOutputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterOutput(assetRouterOutput);
                AssetRouterOutput = await AssetRouterOutputFactory.deploy(...assetRouterInitArgs);
            });

            it('success', async () => {
                await ERC721Mintable.mint(signers[0].address, 1);
                await ERC721Mintable.setApprovalForAll(AssetRouterOutput.address, true);
                await AssetRouterOutput.deposit(1, 0, [[1]], []);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('1');
                expect(await ERC721Mintable.balanceOf(AssetRouterOutput.address)).to.be.eq('1');
                expect(await ERC721Mintable.balanceOf(signers[0].address)).to.be.eq('0');

                await AssetRouterOutput.output(signers[0].address, 1, 0);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('0');
                expect(await ERC721Mintable.balanceOf(signers[0].address)).to.be.eq('1');
            });
        });

        describe('erc721Mint', () => {
            beforeEach(async () => {
                assetRouterOutput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterOutput.${assetRouterOutputName}.com`,
                    outputBaskets: [
                        {
                            outputableAmount: 0,
                            erc20Transfer: [],
                            erc20Mint: [],
                            erc721Transfer: [],
                            erc721Mint: [{ contractAddr: ERC721Mintable.address, tokenIds: [1] }],
                            erc721MintAutoId: [],
                            erc1155Transfer: [],
                            erc1155Mint: [],
                        },
                    ],
                    routers: [signers[0].address],
                };
                assetRouterOutputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterOutput(assetRouterOutput);
                AssetRouterOutput = await AssetRouterOutputFactory.deploy(...assetRouterInitArgs);
            });

            it('success', async () => {
                await ERC721Mintable.grantRole(MINTER_ROLE, AssetRouterOutput.address);
                await AssetRouterOutput.deposit(1, 0, [], [[1]]);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('1');

                await AssetRouterOutput.output(signers[0].address, 1, 0);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('0');
                expect(await ERC721Mintable.balanceOf(signers[0].address)).to.be.eq('1');
            });
        });
    });

    describe('erc721AutoId', () => {
        let tokenName = 0;
        let token: ERC721MintableAutoIdInitializeArgs;
        let ERC721MintableAutoIdFactory: typeof deterministicInitFactories.ERC721MintableAutoId;
        let ERC721MintableAutoId: ERC721MintableAutoId;

        beforeEach(async () => {
            ERC721MintableAutoIdFactory = deterministicInitFactories.ERC721MintableAutoId;

            token = {
                admin: signers[0].address,
                contractUri: `token.${tokenName}.com`,
                gsnForwarder: ethers.constants.AddressZero,
                name: `Token ${tokenName}`,
                symbol: `TK${tokenName}`,
                initBaseURI: `token.${tokenName}.com/token`,
                feeReceiver: signers[0].address,
                feeNumerator: 0,
            };
            const tokenInitArgs = flattenInitArgsERC721MintableAutoId(token);
            ERC721MintableAutoId = await ERC721MintableAutoIdFactory.deploy(...tokenInitArgs);
            tokenName++;
        });

        describe('erc721MintAutoId', () => {
            beforeEach(async () => {
                assetRouterOutput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterAssetRouterOutput.${assetRouterOutputName}.com`,
                    outputBaskets: [
                        {
                            outputableAmount: 0,
                            erc20Transfer: [],
                            erc20Mint: [],
                            erc721Transfer: [],
                            erc721Mint: [],
                            erc721MintAutoId: [{ contractAddr: ERC721MintableAutoId.address, tokenIds: [] }],
                            erc1155Transfer: [],
                            erc1155Mint: [],
                        },
                    ],
                    routers: [signers[0].address],
                };
                assetRouterOutputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterOutput(assetRouterOutput);
                AssetRouterOutput = await AssetRouterOutputFactory.deploy(...assetRouterInitArgs);
            });

            it('success', async () => {
                await ERC721MintableAutoId.grantRole(MINTER_ROLE, AssetRouterOutput.address);
                await AssetRouterOutput.deposit(1, 0, [], []);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('1');

                await AssetRouterOutput.output(signers[0].address, 1, 0);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('0');
                expect(await ERC721MintableAutoId.balanceOf(signers[0].address)).to.be.eq('1');
            });
        });
    });

    describe('erc1155', () => {
        let tokenName = 0;
        let token: ERC1155MintableInitializeArgs;
        let ERC1155MintableFactory: typeof deterministicInitFactories.ERC1155Mintable;
        let ERC1155Mintable: ERC1155Mintable;

        beforeEach(async () => {
            ERC1155MintableFactory = deterministicInitFactories.ERC1155Mintable;

            token = {
                admin: signers[0].address,
                contractUri: `token.${tokenName}.com`,
                gsnForwarder: ethers.constants.AddressZero,
                uri: `token.${tokenName}.com/token`,
                feeReceiver: signers[0].address,
                feeNumerator: 0,
            };
            const tokenInitArgs = flattenInitArgsERC1155Mintable(token);
            ERC1155Mintable = await ERC1155MintableFactory.deploy(...tokenInitArgs);
            tokenName++;
        });

        describe('erc1155Transfer', () => {
            beforeEach(async () => {
                assetRouterOutput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterOutput.${assetRouterOutputName}.com`,
                    outputBaskets: [
                        {
                            outputableAmount: 0,
                            erc20Transfer: [],
                            erc20Mint: [],
                            erc721Transfer: [],
                            erc721Mint: [],
                            erc721MintAutoId: [],
                            erc1155Transfer: [{ contractAddr: ERC1155Mintable.address, tokenIds: [1], amounts: [1] }],
                            erc1155Mint: [],
                        },
                    ],
                    routers: [signers[0].address],
                };
                assetRouterOutputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterOutput(assetRouterOutput);
                AssetRouterOutput = await AssetRouterOutputFactory.deploy(...assetRouterInitArgs);
            });

            it('success', async () => {
                await ERC1155Mintable.mint(signers[0].address, 1, 1, '0x');
                await ERC1155Mintable.setApprovalForAll(AssetRouterOutput.address, true);
                await AssetRouterOutput.deposit(1, 0, [], []);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('1');
                expect(await ERC1155Mintable.balanceOf(AssetRouterOutput.address, 1)).to.be.eq('1');
                expect(await ERC1155Mintable.balanceOf(signers[0].address, 1)).to.be.eq('0');

                await AssetRouterOutput.output(signers[0].address, 1, 0);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('0');
                expect(await ERC1155Mintable.balanceOf(signers[0].address, 1)).to.be.eq('1');
            });
        });

        describe('erc1155Mint', () => {
            beforeEach(async () => {
                assetRouterOutput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterOutput.${assetRouterOutputName}.com`,
                    outputBaskets: [
                        {
                            outputableAmount: 0,
                            erc20Transfer: [],
                            erc20Mint: [],
                            erc721Transfer: [],
                            erc721Mint: [],
                            erc721MintAutoId: [],
                            erc1155Transfer: [],
                            erc1155Mint: [{ contractAddr: ERC1155Mintable.address, tokenIds: [1], amounts: [1] }],
                        },
                    ],
                    routers: [signers[0].address],
                };
                assetRouterOutputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterOutput(assetRouterOutput);

                AssetRouterOutput = await AssetRouterOutputFactory.deploy(...assetRouterInitArgs);
            });

            it('success', async () => {
                await ERC1155Mintable.grantRole(MINTER_ROLE, AssetRouterOutput.address);
                await AssetRouterOutput.deposit(1, 0, [], []);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('1');

                await AssetRouterOutput.output(signers[0].address, 1, 0);
                expect((await AssetRouterOutput.getBasket(0)).outputableAmount.toString()).to.be.eq('0');
                expect(await ERC1155Mintable.balanceOf(signers[0].address, 1)).to.be.eq('1');
            });
        });
    });
});
