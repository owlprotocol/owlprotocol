//@ts-nocheck
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import hre, { ethers } from "hardhat";
import { expect } from "chai";
import {
    AssetRouterOutput,
    ERC20Mintable,
    ERC721MintableAutoId,
    ERC1155Mintable,
} from "../../../typechain/ethers/index.js";
import deployProxyNick from "../../../deploy-hre/common/DeterministicDeployer.js";
import ProxyFactoryDeploy from "../../../deploy-hre/common/ProxyFactory.js";
import { ERC20MintableInitializeArgs, initializeUtil } from "../../../utils/initializeUtils/ERC20Mintable.js";
import { ERC1155MintableInitializeArgs, initializeUtil } from "../../../utils/initializeUtils/ERC1155Mintable.js";
import { factories, Factories, getFactories } from "../../../ethers/factories.js";
import { getDeterministicInitializeFactories, InitializeFactories } from "../../../ethers/deterministicFactories.js";
import { AssetRouterOutputInitializeArgs, initializeUtil } from "../../../utils/initializeUtils/AssetRouterOutput.js";
import { MINTER_ROLE } from "../../../utils/IAccessControl.js";
import {
    ERC721MintableAutoIdInitializeArgs,
    initializeUtil,
} from "../../../utils/initializeUtils/ERC721MintableAutoId.js";
import { ERC1167FactoryAddress } from "../../../utils/ERC1167Factory/index.js";

const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddressLocal);
describe("AssetRouterOutput", function () {
    let signers: SignerWithAddress[];
    let factories: Factories;
    let deterministicInitFactories: InitializeFactories;

    let AssetRouterOutputFactory: typeof deterministicInitFactories.AssetRouterOutput;
    let AssetRouterOutput: AssetRouterOutput;

    let assetRouterOutputName = 0;
    let assetRouterOutput: AssetRouterOutputInitializeArgs;

    before(async () => {
        await deployProxyNick(hre as any);
        await ProxyFactoryDeploy(hre as any);

        signers = await ethers.getSigners();
        const signer = signers[0];
        const signerAddress = signer.address;

        factories = getFactories(signer);
        deterministicInitFactories = getDeterministicInitializeFactories(factories, cloneFactory, signerAddress);

        AssetRouterOutputFactory = deterministicInitFactories.AssetRouterOutput;
    });

    describe("empty", () => {
        beforeEach(async () => {
            assetRouterOutput = {
                admin: signers[0].address,
                contractUri: `assetRouterOutput.${assetRouterOutputName}.com`,
                outputBaskets: [
                    {
                        outputableAmount: 0,

                        erc20Mint: [],

                        erc721MintAutoId: [],

                        erc1155Mint: [],
                    },
                ],
                routers: [signers[0].address],
            };
            assetRouterOutputName++;
            const assetRouterInitArgs = initializeUtil(assetRouterOutput);
            AssetRouterOutput = await AssetRouterOutputFactory.deploy(...assetRouterInitArgs);
        });

        it("getBasket", async () => {
            await AssetRouterOutput.deposit(1, 0);
            const b = await AssetRouterOutput.getOutputBasket(0);
            expect(b.outputableAmount.toString()).to.be.eq("1");
        });

        it("success", async () => {
            await AssetRouterOutput.deposit(1, 0);
            await AssetRouterOutput.output(signers[0].address, 1, 0);
            const b = await AssetRouterOutput.getOutputBasket(0);
            expect(b.outputableAmount.toString()).to.be.eq("0");
        });
    });

    describe("erc20", () => {
        let tokenName = 0;
        let token: ERC20MintableInitializeArgs;
        let ERC20MintableFactory: typeof deterministicInitFactories.ERC20Mintable;
        let ERC20Mintable: ERC20Mintable;

        beforeEach(async () => {
            ERC20MintableFactory = deterministicInitFactories.ERC20Mintable;

            token = {
                admin: signers[0].address,
                contractUri: `token.${tokenName}.com`,
                                name: `Token ${tokenName}`,
                symbol: `TK${tokenName}`,
            };
            const tokenInitArgs = initializeUtil(token);
            ERC20Mintable = await ERC20MintableFactory.deploy(...tokenInitArgs);
            tokenName++;
        });

        describe("erc20Mint", () => {
            beforeEach(async () => {
                assetRouterOutput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterOutput.${assetRouterOutputName}.com`,
                    outputBaskets: [
                        {
                            outputableAmount: 0,

                            erc20Mint: [{ contractAddr: ERC20Mintable.address, amount: 1 }],

                            erc721MintAutoId: [],

                            erc1155Mint: [],
                        },
                    ],
                    routers: [signers[0].address],
                };
                assetRouterOutputName++;
                const assetRouterInitArgs = initializeUtil(assetRouterOutput);
                AssetRouterOutput = await AssetRouterOutputFactory.deploy(...assetRouterInitArgs);
            });

            it("success", async () => {
                await ERC20Mintable.grantRole(MINTER_ROLE, AssetRouterOutput.address);
                await AssetRouterOutput.deposit(1, 0);
                expect((await AssetRouterOutput.getOutputBasket(0)).outputableAmount.toString()).to.be.eq("1");

                await AssetRouterOutput.output(signers[0].address, 1, 0);
                expect((await AssetRouterOutput.getOutputBasket(0)).outputableAmount.toString()).to.be.eq("0");
                expect(await ERC20Mintable.balanceOf(signers[0].address)).to.be.eq("1");
            });
        });
    });

    describe("erc721AutoId", () => {
        let tokenName = 0;
        let token: ERC721MintableAutoIdInitializeArgs;
        let ERC721MintableAutoIdFactory: typeof deterministicInitFactories.ERC721MintableAutoId;
        let ERC721MintableAutoId: ERC721MintableAutoId;

        beforeEach(async () => {
            ERC721MintableAutoIdFactory = deterministicInitFactories.ERC721MintableAutoId;

            token = {
                admin: signers[0].address,
                contractUri: `token.${tokenName}.com`,
                                name: `Token ${tokenName}`,
                symbol: `TK${tokenName}`,
                initBaseURI: `token.${tokenName}.com/token`,
                feeReceiver: signers[0].address,
            };
            const tokenInitArgs = initializeUtil(token);
            ERC721MintableAutoId = await ERC721MintableAutoIdFactory.deploy(...tokenInitArgs);
            tokenName++;
        });

        describe("erc721MintAutoId", () => {
            beforeEach(async () => {
                assetRouterOutput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterAssetRouterOutput.${assetRouterOutputName}.com`,
                    outputBaskets: [
                        {
                            outputableAmount: 0,

                            erc20Mint: [],

                            erc721MintAutoId: [{ contractAddr: ERC721MintableAutoId.address }],

                            erc1155Mint: [],
                        },
                    ],
                    routers: [signers[0].address],
                };
                assetRouterOutputName++;
                const assetRouterInitArgs = initializeUtil(assetRouterOutput);
                AssetRouterOutput = await AssetRouterOutputFactory.deploy(...assetRouterInitArgs);
            });

            it("success", async () => {
                await ERC721MintableAutoId.grantRole(MINTER_ROLE, AssetRouterOutput.address);
                await AssetRouterOutput.deposit(1, 0);
                expect((await AssetRouterOutput.getOutputBasket(0)).outputableAmount.toString()).to.be.eq("1");

                await AssetRouterOutput.output(signers[0].address, 1, 0);
                expect((await AssetRouterOutput.getOutputBasket(0)).outputableAmount.toString()).to.be.eq("0");
                expect(await ERC721MintableAutoId.balanceOf(signers[0].address)).to.be.eq("1");
            });
        });
    });

    describe("erc1155", () => {
        let tokenName = 0;
        let token: ERC1155MintableInitializeArgs;
        let ERC1155MintableFactory: typeof deterministicInitFactories.ERC1155Mintable;
        let ERC1155Mintable: ERC1155Mintable;

        beforeEach(async () => {
            ERC1155MintableFactory = deterministicInitFactories.ERC1155Mintable;

            token = {
                admin: signers[0].address,
                contractUri: `token.${tokenName}.com`,
                                uri: `token.${tokenName}.com/token`,
                feeReceiver: signers[0].address,
            };
            const tokenInitArgs = initializeUtil(token);
            ERC1155Mintable = await ERC1155MintableFactory.deploy(...tokenInitArgs);
            tokenName++;
        });

        describe("erc1155Mint", () => {
            beforeEach(async () => {
                assetRouterOutput = {
                    admin: signers[0].address,
                    contractUri: `assetRouterOutput.${assetRouterOutputName}.com`,
                    outputBaskets: [
                        {
                            outputableAmount: 0,
                            erc20Mint: [],
                            erc721MintAutoId: [],
                            erc1155Mint: [{ contractAddr: ERC1155Mintable.address, tokenIds: [1], amounts: [1] }],
                        },
                    ],
                    routers: [signers[0].address],
                };
                assetRouterOutputName++;
                const assetRouterInitArgs = initializeUtil(assetRouterOutput);

                AssetRouterOutput = await AssetRouterOutputFactory.deploy(...assetRouterInitArgs);
            });

            it("success", async () => {
                await ERC1155Mintable.grantRole(MINTER_ROLE, AssetRouterOutput.address);
                await AssetRouterOutput.deposit(1, 0);
                expect((await AssetRouterOutput.getOutputBasket(0)).outputableAmount.toString()).to.be.eq("1");

                await AssetRouterOutput.output(signers[0].address, 1, 0);
                expect((await AssetRouterOutput.getOutputBasket(0)).outputableAmount.toString()).to.be.eq("0");
                expect(await ERC1155Mintable.balanceOf(signers[0].address, 1)).to.be.eq("1");
            });
        });
    });
});
