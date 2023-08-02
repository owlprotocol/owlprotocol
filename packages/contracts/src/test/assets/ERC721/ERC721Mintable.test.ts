//@ts-nocheck
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import hre, { ethers } from "hardhat";
import { expect, assert } from "chai";
import { zip } from "lodash";
import { ERC721Mintable } from "../../../typechain/ethers/index.js";;
import deployProxyNick from "../../../deploy-hre/common/DeterministicDeployer.js";
import ProxyFactoryDeploy from "../../../deploy-hre/common/ProxyFactory.js";
import ERC1820Deploy from "../../../deploy-hre/common/ERC1820.js";
import { ERC721MintableInitializeArgs, initializeUtil } from "../../../utils/initializeUtils/ERC721Mintable.js";
import { Factories, getFactories } from "../../../ethers/factories.js";
import { getDeterministicInitializeFactories, InitializeFactories } from "../../../ethers/deterministicFactories.js";
import {
    IAccessControlInterfaceId,
    IBaseURIInterfaceId,
    IContractURIInterfaceId,
    IERC165InterfaceId,
    IERC2981InterfaceId,
    IERC2981SetterInterfaceId,
    IERC721InterfaceId,
    IERC721MetadataInterfaceId,
    IERC721MintableInterfaceId,
    interfaceIdNames,
} from "../../../ethers/interfaces.js";
import { registry as registryContract } from "../../../utils/ERC1820.js";
import { sleep } from "../../utils/sleep.js";
import { ERC1167FactoryAddress } from "../../../utils/ERC1167Factory/index.js";

describe("ERC721Mintable", function () {
    let signers: SignerWithAddress[];
    let factories: Factories;
    let deterministicFactories: InitializeFactories;
    let ERC721MintableFactory: typeof deterministicFactories.ERC721Mintable;
    let ERC721Mintable: ERC721Mintable;

    let tokenName = 0;
    let token: ERC721MintableInitializeArgs;

    before(async () => {
        await deployProxyNick(hre as any);
        await ProxyFactoryDeploy(hre as any);
        await ERC1820Deploy(hre as any);

        await sleep(1000);

        signers = await ethers.getSigners();
        const signer = signers[0];
        const signerAddress = signer.address;

        factories = getFactories(signer);
        const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddressLocal);
        deterministicFactories = getDeterministicInitializeFactories(factories, cloneFactory, signerAddress);
        ERC721MintableFactory = deterministicFactories.ERC721Mintable;
    });

    beforeEach(async () => {
        token = {
            admin: signers[0].address,
            contractUri: `token.${tokenName}.com`,
                        name: `Token ${tokenName}`,
            symbol: `TK${tokenName}`,
            initBaseURI: `token.${tokenName}.com/token`,
            feeReceiver: signers[0].address,
        };
        const initializerArgs = initializeUtil(token);
        ERC721Mintable = await ERC721MintableFactory.deploy(...initializerArgs);

        tokenName++;
    });

    it("name", async () => {
        const result = await ERC721Mintable.name();
        expect(result).to.be.eq(token.name);
    });

    it("symbol", async () => {
        const result = await ERC721Mintable.symbol();
        expect(result).to.be.eq(token.symbol);
    });

    it("balanceOf", async () => {
        await ERC721Mintable.mint(signers[0].address, 1);
        const result = await ERC721Mintable.balanceOf(signers[0].address);
        expect(parseInt(result.toString())).to.be.eq(1);
    });

    it("InterfaceImplementerSet", async () => {
        const registry = registryContract.connect(signers[0]);
        const filter = registry.filters.InterfaceImplementerSet(ERC721Mintable.address);
        const events = await registry.queryFilter(filter);
        const interfaceIds = events.map((e) => {
            return e.args.interfaceHash.substring(0, 10);
        });
        const interfaceIdsExpected = [
            IERC165InterfaceId,
            IAccessControlInterfaceId,
            IContractURIInterfaceId,
            IBaseURIInterfaceId,
            IERC2981InterfaceId,
            IERC2981SetterInterfaceId,
            IERC721InterfaceId,
            IERC721MetadataInterfaceId,
            IERC721MintableInterfaceId,
        ];
        const results = zip(interfaceIds, interfaceIdsExpected);
        for (const [interfaceId, expected] of results) {
            assert.equal(interfaceId, expected, `${interfaceIdNames[interfaceId!]} != ${interfaceIdNames[expected!]}`);
        }
    });

    it("supportsInterface", async () => {
        const interfaceIds = [
            IERC165InterfaceId,
            IAccessControlInterfaceId,
            IContractURIInterfaceId,
            IBaseURIInterfaceId,
            IERC2981InterfaceId,
            IERC2981SetterInterfaceId,
            IERC721InterfaceId,
            IERC721MetadataInterfaceId,
            IERC721MintableInterfaceId,
        ];
        for (const interfaceId of interfaceIds) {
            const supported = await ERC721Mintable.supportsInterface(interfaceId);
            assert.isTrue(supported, `${interfaceId} ${interfaceIdNames[interfaceId]} unsupported!`);
        }
    });

    it("implementsERC165Interface", async () => {
        const registry = registryContract.connect(signers[0]);
        const interfaceIds = [
            IERC165InterfaceId,
            IAccessControlInterfaceId,
            IContractURIInterfaceId,
            IBaseURIInterfaceId,
            IERC2981InterfaceId,
            IERC2981SetterInterfaceId,
            IERC721InterfaceId,
            IERC721MetadataInterfaceId,
            IERC721MintableInterfaceId,
        ];
        for (const interfaceId of interfaceIds) {
            const supported = await registry.implementsERC165Interface(ERC721Mintable.address, interfaceId);
            assert.isTrue(supported, `${interfaceId} ${interfaceIdNames[interfaceId]} unsupported!`);
        }
    });
});
