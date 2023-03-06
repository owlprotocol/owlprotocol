import { assert } from 'chai';

import "@nomiclabs/hardhat-ethers";
import hre, { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    ERC1167Factory,
    ERC721MintableAutoId as ERC721MintableAutoIdContract,
    ERC721MintableAutoId__factory,
} from '../../ethers/types';
import { proxy1167Factory } from '../../utils/ERC1167Factory/getContractFactory';
import deployProxyNick from '../../deploy-hre/common/DeterministicDeployer.js';
import deployProxyFactory from '../../deploy-hre/common/ProxyFactory.js';
import deployImplementations from '../../deploy-hre/common/Implementations.js';
import { Factories, getFactories } from '../../ethers/factories';
import { getProxy1167InitializeFactories } from '../../ethers/proxy1167Factories';
import { DEFAULT_SALT } from '../../utils/ERC1167Factory/getSalt';
import { getDeterministicFactories, InitializeFactories, NoInitFactories } from '../../ethers/deterministicFactories';
import { cloneDeterministicAddress } from '../../utils/ERC1167Factory/getAddress';
import { ERC721MintableAutoId } from '../../utils/index';

describe('ERC1167Factory.sol', function () {
    const salt = DEFAULT_SALT;
    let signers: SignerWithAddress[];
    let factories: Factories;
    let deterministicFactories: NoInitFactories;
    let proxyFactories: InitializeFactories;

    let cloneFactory: ERC1167Factory;

    let token: ERC721MintableAutoId.ERC721MintableAutoIdInitializeArgs;

    before(async () => {
        await deployProxyNick(hre as any);
        await deployImplementations(hre as any);

        signers = await ethers.getSigners();
        const signer = signers[0];
        const signerAddress = signer.address;

        factories = getFactories(signer);
        deterministicFactories = getDeterministicFactories(factories);
        proxyFactories = getProxy1167InitializeFactories(deterministicFactories, signerAddress);

        cloneFactory = await deployProxyFactory(hre as any);

        token = {
            admin: signers[0].address,
            name: 'test',
            symbol: 'TEST',
            initBaseURI: ''
        };
    });

    it('cloneDeterministicAddress - Typescript', async () => {
        const initializerArgs = ERC721MintableAutoId.flattenInitArgsERC721MintableAutoId(token);
        const implementationAddress = proxyFactories.ERC721MintableAutoId.getAddress(...initializerArgs);

        const initData = ERC721MintableAutoId.ERC721MintableAutoIdInterface.encodeFunctionData(
            'initialize',
            initializerArgs,
        );

        const result = await cloneFactory.cloneDeterministicAddress(
            implementationAddress,
            salt,
            initData,
            signers[0].address,
        );
        const expected = cloneDeterministicAddress<ERC721MintableAutoIdContract, 'initialize'>({
            implementationAddress,
            contractInterface: ERC721MintableAutoId.ERC721MintableAutoIdInterface,
            salt,
            cloneFactoryAddress: cloneFactory.address,
            msgSender: signers[0].address,
            initOptions: {
                initSignature: 'initialize',
                initArgs: initializerArgs,
            },
        });

        assert.equal(result, expected, 'Typescript != Solidity');
    });

    it('proxyFactory', async () => {
        const initializerArgs = ERC721MintableAutoId.flattenInitArgsERC721MintableAutoId(token);
        const implementationAddress = proxyFactories.ERC721MintableAutoId.getAddress(...initializerArgs);
        const contractFactory = factories.ERC721MintableAutoId;

        //Create Proxy Factory & Test with local
        const factory = proxy1167Factory<ERC721MintableAutoId__factory, ERC721MintableAutoIdContract, 'initialize'>({
            implementationAddress,
            initSignature: 'initialize',
            contractFactory,
            cloneFactory,
        });

        const contract = await factory.deploy(...initializerArgs);

        const expected = cloneDeterministicAddress<ERC721MintableAutoIdContract, 'initialize'>({
            implementationAddress,
            salt,
            cloneFactoryAddress: cloneFactory.address,
            msgSender: signers[0].address,
            contractInterface: ERC721MintableAutoId.ERC721MintableAutoIdInterface,
            initOptions: {
                initSignature: 'initialize',
                initArgs: initializerArgs,
            },
        });

        assert.equal(contract.address, expected, 'Deployed Proxy != Typescript');

        //Use hard-coded proxy factory, no receipt but initializes with deploeyd code
        const factory2 = proxyFactories.ERC721MintableAutoId;
        const contract2 = await factory2.deploy(...initializerArgs);
        assert.equal(contract2.address, expected, 'Cached Proxy != Typescript');
    });
});
