import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
//@ts-expect-error
import hre, { ethers } from 'hardhat';
import { AssetRouterInput, ERC20Mintable, ERC721Mintable, ERC1155Mintable, Fallback } from '../../../ethers/types.js';
import deployProxyNick from '../../../deploy-hre/common/DeterministicDeployer.js';
import deployProxyFactory from '../../../deploy-hre/common/ProxyFactory.js';
import { ERC20MintableInitializeArgs, flattenInitArgsERC20Mintable } from '../../../utils/ERC20Mintable.js';
import { ERC721MintableInitializeArgs, flattenInitArgsERC721Mintable } from '../../../utils/ERC721Mintable.js';
import { ERC1155MintableInitializeArgs, flattenInitArgsERC1155Mintable } from '../../../utils/ERC1155Mintable.js';
import { expect } from 'chai';
import { Factories, getFactories } from '../../../ethers/factories.js';
import {
    getDeterministicFactories,
    getDeterministicInitializeFactories,
    InitializeFactories,
} from '../../../ethers/deterministicFactories.js';
import { AssetRouterInputInitializeArgs, flattenInitArgsAssetRouterInput } from '../../../utils/AssetRouterInput.js';

describe('AssetRouterInput', function () {
    let signers: SignerWithAddress[];
    let factories: Factories;
    let deterministicInitFactories: InitializeFactories;

    let Fallback: Fallback;

    let AssetRouterInputFactory: typeof deterministicInitFactories.AssetRouterInput;
    let AssetRouterInput: AssetRouterInput;

    let assetRouterInputName = 0;
    let assetRouterInput: AssetRouterInputInitializeArgs;

    before(async () => {
        await deployProxyNick(hre as any);
        await deployProxyFactory(hre as any);

        signers = await ethers.getSigners();
        const signer = signers[0];
        const signerAddress = signer.address;

        factories = getFactories(signer);
        const deterministicFactories = getDeterministicFactories(factories);
        deterministicInitFactories = getDeterministicInitializeFactories(factories, signerAddress);

        Fallback = await deterministicFactories.Fallback.deploy();
        AssetRouterInputFactory = deterministicInitFactories.AssetRouterInput;
    });

    describe('empty', () => {
        beforeEach(async () => {
            assetRouterInput = {
                admin: signers[0].address,
                contractUri: `assetRouterInput.${assetRouterInputName}.com`,
                gsnForwarder: ethers.constants.AddressZero,
                inputBaskets: [
                    {
                        burnAddress: signers[1].address,
                        erc20Unaffected: [],
                        erc20Burned: [],
                        erc721Unaffected: [],
                        erc721Burned: [],
                        erc721NTime: [],
                        erc721NTimeMax: [],
                        erc1155Unaffected: [],
                        erc1155Burned: [],
                    },
                ],
            };
            assetRouterInputName++;
            const assetRouterInitArgs = flattenInitArgsAssetRouterInput(assetRouterInput);
            AssetRouterInput = await AssetRouterInputFactory.deploy(...assetRouterInitArgs);
        });

        it('success', async () => {
            await AssetRouterInput.input(Fallback.address, 1, 0, [], [], [], 0);
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

        describe('erc20Unaffected', () => {
            beforeEach(async () => {
                assetRouterInput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterInput.${assetRouterInputName}.com`,
                    gsnForwarder: ethers.constants.AddressZero,
                    inputBaskets: [
                        {
                            burnAddress: signers[1].address,
                            erc20Unaffected: [{ contractAddr: ERC20Mintable.address, amount: 1 }],
                            erc20Burned: [],
                            erc721Unaffected: [],
                            erc721Burned: [],
                            erc721NTime: [],
                            erc721NTimeMax: [],
                            erc1155Unaffected: [],
                            erc1155Burned: [],
                        },
                    ],
                };
                assetRouterInputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterInput(assetRouterInput);
                AssetRouterInput = await AssetRouterInputFactory.deploy(...assetRouterInitArgs);
            });

            it('fail: InvalidERC20BalanceOf', async () => {
                //@ts-expect-error
                await expect(AssetRouterInput.input(Fallback.address, 1, 0, [], [], [], 0)).to.be.revertedWith(
                    `InvalidERC20BalanceOf(["${ERC20Mintable.address}", 1], 0, 1)`,
                );
            });

            it('success', async () => {
                await ERC20Mintable.mint(signers[0].address, 1);
                await AssetRouterInput.input(Fallback.address, 1, 0, [], [], [], 0);
                await expect(await ERC20Mintable.balanceOf(signers[0].address)).to.be.eq('1');
            });
        });

        describe('erc20Burned', () => {
            beforeEach(async () => {
                assetRouterInput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterInput.${assetRouterInputName}.com`,
                    gsnForwarder: ethers.constants.AddressZero,
                    inputBaskets: [
                        {
                            burnAddress: signers[1].address,
                            erc20Unaffected: [],
                            erc20Burned: [{ contractAddr: ERC20Mintable.address, amount: 1 }],
                            erc721Unaffected: [],
                            erc721Burned: [],
                            erc721NTime: [],
                            erc721NTimeMax: [],
                            erc1155Unaffected: [],
                            erc1155Burned: [],
                        },
                    ],
                };
                assetRouterInputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterInput(assetRouterInput);
                AssetRouterInput = await AssetRouterInputFactory.deploy(...assetRouterInitArgs);
            });

            it('fail: InvalidERC20BalanceOf', async () => {
                //@ts-expect-error
                await expect(AssetRouterInput.input(Fallback.address, 1, 0, [], [], [], 0)).to.be.revertedWith(
                    'ERC20: insufficient allowance',
                );
            });

            it('success', async () => {
                await ERC20Mintable.mint(signers[0].address, 1);
                await ERC20Mintable.increaseAllowance(AssetRouterInput.address, 1);
                await AssetRouterInput.input(Fallback.address, 1, 0, [], [], [], 0);
                await expect(await ERC20Mintable.balanceOf(signers[0].address)).to.be.eq('0');
                await expect(await ERC20Mintable.balanceOf(signers[1].address)).to.be.eq('1');
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

        describe('erc721Unaffected', () => {
            beforeEach(async () => {
                assetRouterInput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterInput.${assetRouterInputName}.com`,
                    gsnForwarder: ethers.constants.AddressZero,
                    inputBaskets: [
                        {
                            burnAddress: signers[1].address,
                            erc20Unaffected: [],
                            erc20Burned: [],
                            erc721Unaffected: [{ contractAddr: ERC721Mintable.address, tokenIds: [] }],
                            erc721Burned: [],
                            erc721NTime: [],
                            erc721NTimeMax: [],
                            erc1155Unaffected: [],
                            erc1155Burned: [],
                        },
                    ],
                };
                assetRouterInputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterInput(assetRouterInput);
                AssetRouterInput = await AssetRouterInputFactory.deploy(...assetRouterInitArgs);
            });

            it('fail', async () => {
                await ERC721Mintable.mint(signers[1].address, 1);
                //@ts-expect-error
                await expect(AssetRouterInput.input(Fallback.address, 1, 0, [[1]], [], [], 0)).to.be.revertedWith(
                    `InvalidERC721OwnerOf(["${ERC721Mintable.address}", []], "${signers[1].address}", "${signers[0].address}")`,
                );
                await expect(await ERC721Mintable.balanceOf(signers[0].address)).to.be.eq('0');
            });

            it('success', async () => {
                await ERC721Mintable.mint(signers[0].address, 2);
                await AssetRouterInput.input(Fallback.address, 1, 0, [[2]], [], [], 0);
                await expect(await ERC721Mintable.balanceOf(signers[0].address)).to.be.eq('1');
            });
        });

        describe('erc721Burned', () => {
            beforeEach(async () => {
                assetRouterInput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterInput.${assetRouterInputName}.com`,
                    gsnForwarder: ethers.constants.AddressZero,
                    inputBaskets: [
                        {
                            burnAddress: signers[1].address,
                            erc20Unaffected: [],
                            erc20Burned: [],
                            erc721Unaffected: [],
                            erc721Burned: [{ contractAddr: ERC721Mintable.address, tokenIds: [] }],
                            erc721NTime: [],
                            erc721NTimeMax: [],
                            erc1155Unaffected: [],
                            erc1155Burned: [],
                        },
                    ],
                };
                assetRouterInputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterInput(assetRouterInput);
                AssetRouterInput = await AssetRouterInputFactory.deploy(...assetRouterInitArgs);
            });

            it('fail', async () => {
                await ERC721Mintable.mint(signers[2].address, 1);
                //@ts-expect-error
                await expect(AssetRouterInput.input(Fallback.address, 1, 0, [], [], [[1]], 0)).to.be.revertedWith(
                    'ERC721: caller is not token owner nor approved',
                );
                await expect(await ERC721Mintable.balanceOf(signers[0].address)).to.be.eq('0');
            });

            it('success', async () => {
                await ERC721Mintable.mint(signers[0].address, 2);
                await ERC721Mintable.setApprovalForAll(AssetRouterInput.address, true);
                await AssetRouterInput.input(Fallback.address, 1, 0, [], [], [[2]], 0);
                await expect(await ERC721Mintable.balanceOf(signers[0].address)).to.be.eq('0');
                await expect(await ERC721Mintable.balanceOf(signers[1].address)).to.be.eq('1');
            });
        });

        describe('erc721NTime', () => {
            beforeEach(async () => {
                assetRouterInput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterAssetRouterInput.${assetRouterInputName}.com`,
                    gsnForwarder: ethers.constants.AddressZero,
                    inputBaskets: [
                        {
                            burnAddress: signers[1].address,
                            erc20Unaffected: [],
                            erc20Burned: [],
                            erc721Unaffected: [],
                            erc721Burned: [],
                            erc721NTime: [{ contractAddr: ERC721Mintable.address, tokenIds: [] }],
                            erc721NTimeMax: [1],
                            erc1155Unaffected: [],
                            erc1155Burned: [],
                        },
                    ],
                };
                assetRouterInputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterInput(assetRouterInput);
                AssetRouterInput = await AssetRouterInputFactory.deploy(...assetRouterInitArgs);
            });

            it('fail', async () => {
                await ERC721Mintable.mint(signers[1].address, 1);
                //@ts-expect-error
                await expect(AssetRouterInput.input(Fallback.address, 1, 0, [], [[1]], [], 0)).to.be.revertedWith(
                    `InvalidERC721OwnerOf(["${ERC721Mintable.address}", []], "${signers[1].address}", "${signers[0].address}")`,
                );
                await expect(await ERC721Mintable.balanceOf(signers[0].address)).to.be.eq('0');
            });

            it('success', async () => {
                await ERC721Mintable.mint(signers[0].address, 1);
                await AssetRouterInput.input(Fallback.address, 1, 0, [], [[1]], [], 0);
                await expect(await ERC721Mintable.balanceOf(signers[0].address)).to.be.eq('1');

                //Fail re-use
                //@ts-expect-error
                await expect(AssetRouterInput.input(Fallback.address, 1, 0, [], [[1]], [], 0)).to.be.revertedWith(
                    `InvalidERC721NTime(["${ERC721Mintable.address}", []], 1, 1`,
                );
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

        describe('erc1155Unaffected', () => {
            beforeEach(async () => {
                assetRouterInput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterInput.${assetRouterInputName}.com`,
                    gsnForwarder: ethers.constants.AddressZero,
                    inputBaskets: [
                        {
                            burnAddress: signers[1].address,
                            erc20Unaffected: [],
                            erc20Burned: [],
                            erc721Unaffected: [],
                            erc721Burned: [],
                            erc721NTime: [],
                            erc721NTimeMax: [],
                            erc1155Unaffected: [{ contractAddr: ERC1155Mintable.address, tokenIds: [1], amounts: [1] }],
                            erc1155Burned: [],
                        },
                    ],
                };
                assetRouterInputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterInput(assetRouterInput);
                AssetRouterInput = await AssetRouterInputFactory.deploy(...assetRouterInitArgs);
            });

            it('fail', async () => {
                await ERC1155Mintable.mint(signers[1].address, 1, 1, '0x');
                //@ts-expect-error
                await expect(AssetRouterInput.input(Fallback.address, 1, 0, [], [[1]], [], 0)).to.be.revertedWith(
                    `InvalidERC1155BalanceOfBatch(["${ERC1155Mintable.address}", [1], [1]], 1, 0, 1)`,
                );
                await expect(await ERC1155Mintable.balanceOf(signers[0].address, 1)).to.be.eq('0');
            });

            it('success', async () => {
                await ERC1155Mintable.mint(signers[0].address, 1, 1, '0x');
                await AssetRouterInput.input(Fallback.address, 1, 0, [], [[2]], [], 0);
                await expect(await ERC1155Mintable.balanceOf(signers[0].address, 1)).to.be.eq('1');
            });
        });

        describe('erc1155Burned', () => {
            beforeEach(async () => {
                assetRouterInput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterInput.${assetRouterInputName}.com`,
                    gsnForwarder: ethers.constants.AddressZero,
                    inputBaskets: [
                        {
                            burnAddress: signers[1].address,
                            erc20Unaffected: [],
                            erc20Burned: [],
                            erc721Unaffected: [],
                            erc721Burned: [],
                            erc721NTime: [],
                            erc721NTimeMax: [],
                            erc1155Unaffected: [],
                            erc1155Burned: [{ contractAddr: ERC1155Mintable.address, tokenIds: [1], amounts: [1] }],
                        },
                    ],
                };
                assetRouterInputName++;
                const assetRouterInitArgs = flattenInitArgsAssetRouterInput(assetRouterInput);
                AssetRouterInput = await AssetRouterInputFactory.deploy(...assetRouterInitArgs);
            });

            it('fail', async () => {
                await ERC1155Mintable.mint(signers[1].address, 1, 1, '0x');
                //@ts-expect-error
                await expect(AssetRouterInput.input(Fallback.address, 1, 0, [], [[1]], [], 0)).to.be.revertedWith(
                    'ERC1155: caller is not token owner nor approved',
                );
                await expect(await ERC1155Mintable.balanceOf(signers[0].address, 1)).to.be.eq('0');
            });

            it('success', async () => {
                await ERC1155Mintable.mint(signers[0].address, 1, 1, '0x');
                await ERC1155Mintable.setApprovalForAll(AssetRouterInput.address, true);
                await AssetRouterInput.input(Fallback.address, 1, 0, [], [[2]], [], 0);
                await expect(await ERC1155Mintable.balanceOf(signers[0].address, 1)).to.be.eq('0');
            });
        });
    });
});
