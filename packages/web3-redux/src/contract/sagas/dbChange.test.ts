import { assert } from 'chai';
import * as Contracts from '@owlprotocol/contracts';
import type { ERC721Mintable } from '@owlprotocol/contracts/lib/types/ethers/types.js';
import type { ERC721MintableInitializeArgs } from '@owlprotocol/contracts/lib/types/utils/ERC721Mintable.js';
import ethers, { Signer } from 'ethers';
import Web3 from 'web3';

import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';
import { NetworkCRUD } from '../../network/crud.js';
import { ContractCRUD } from '../crud.js';
import { getNetwork1336 } from '../../network/data.js';
import { ConfigCRUD } from '../../config/crud.js';
import sleep from '../../utils/sleep.js';
import { getEthCall } from '../db/getEthCall.js';
import { NetworkWithObjects } from '../../network/index.js';

describe(`${name}/sagas/createPost.ts`, () => {
    let store: StoreType;

    let from: string;
    let signer: Signer

    let networkId: string
    let network1336: NetworkWithObjects
    let web3: Web3

    let factoriesDeterministic: ReturnType<typeof Contracts.Ethers.getDeterministicFactories>;
    let factoriesDeterministicInit: ReturnType<typeof Contracts.Ethers.getDeterministicInitializeFactories>;

    beforeEach(async () => {
        //Re-start network
        network1336 = getNetwork1336()
        networkId = network1336.networkId
        web3 = network1336.web3!
        //Check balance using ethers
        const provider = new ethers.providers.Web3Provider(web3.currentProvider as any)
        const privateKey = ethers.utils.hexZeroPad(ethers.utils.hexlify(1), 32)
        signer = new ethers.Wallet(
            privateKey,
            provider
        );
        from = await signer.getAddress();
        const ONE_ETH = ethers.utils.parseUnits('1', 'ether')
        const fromBalance = await provider.getBalance(from)

        if (fromBalance.lt(ONE_ETH)) {
            const accounts = await web3.eth.getAccounts();
            await web3.eth.sendTransaction({
                from: accounts[0],
                to: from,
                value: ONE_ETH.sub(fromBalance).toString()
            })
        }

        //Deploy universal deployer, implementations, beacons, ERC1820
        const hre = {
            provider,
            signers: [signer],
            network: {
                name: 'ganache',
                config: {
                    chainId: 1336
                }
            }
        }
        await Contracts.Deploy.deployDeterministicDeployer(hre)
        await Contracts.Deploy.deployProxyFactory(hre);
        await Contracts.Deploy.deployERC1820(hre);
        await Contracts.Deploy.deployImplementations(hre);
        await Contracts.Deploy.deployUpgradeableBeacon(hre);

        //Use Factories to derive deterministic addresses
        const factories = Contracts.Ethers.getFactories(signer);
        const cloneFactory = factories.ERC1167Factory.attach(Contracts.Utils.ERC1167Factory.ERC1167FactoryAddress)
        factoriesDeterministic = Contracts.Ethers.getDeterministicFactories(factories);
        factoriesDeterministicInit = Contracts.Ethers.getDeterministicInitializeFactories(factories, cloneFactory, from);

        //Store
        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId }));
        //TODO: Separate Encoded/Object actions
        store.dispatch(NetworkCRUD.actions.reduxUpsert({ networkId, web3 }))
    })

    describe('ERC721Mintable - Detection', () => {
        let ERC721MintableFactory: typeof factoriesDeterministicInit.ERC721Mintable;
        let ERC721Mintable: ERC721Mintable;
        let tokenName = 0;
        let token: ERC721MintableInitializeArgs;

        beforeEach(async () => {
            token = {
                admin: from,
                contractUri: `token.${tokenName}.com`,
                gsnForwarder: ethers.constants.AddressZero,
                name: `Token ${tokenName}`,
                symbol: `TK${tokenName}`,
                initBaseURI: `token.${tokenName}.com/token`,
                feeReceiver: from,
                feeNumerator: 0,
            };
            ERC721MintableFactory = factoriesDeterministicInit.ERC721Mintable
            tokenName++;
        });

        it('Manual', async () => {
            ERC721Mintable = await ERC721MintableFactory.deploy(...Contracts.Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token));
            //Add Contract to store manually
            store.dispatch(ContractCRUD.actions.create({
                networkId,
                address: ERC721Mintable.address,
                code: '0x1'
            }))
            await sleep(1000)

            //Exists
            assert.isDefined(ContractCRUD.db.get({ networkId, address: ERC721Mintable.address.toLowerCase() }))

            //Metadata
            const ethCall = await getEthCall(store.getState(), networkId, ERC721Mintable.address.toLowerCase(), 'name')
            const name = ethCall?.returnValue
            assert.equal(name, token.name, 'name')
        })

        it('ERC1820 - Past', async () => {
            //Past Event trigger
            ERC721Mintable = await ERC721MintableFactory.deploy(...Contracts.Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token));
            //Add ERC1820 Contract, detect the registration event from ERC721
            store.dispatch(ContractCRUD.actions.create({
                networkId,
                address: Contracts.Utils.ERC1820.registryAddress.toLowerCase(),
                code: '0x1',
            }))
            await sleep(2000)

            //Exists
            assert.isDefined(ContractCRUD.db.get({ networkId, address: ERC721Mintable.address.toLowerCase() }))

            //Metadata
            const ethCall = await getEthCall(store.getState(), networkId, ERC721Mintable.address.toLowerCase(), 'name')
            const name = ethCall?.returnValue
            console.debug({ ethCall })
            assert.equal(name, token.name, 'name')
        })

        it('ERC1820 - Subscribe', async () => {
            //Add ERC1820 Contract, detect the registration event from ImplementerSet
            store.dispatch(ContractCRUD.actions.create({
                networkId,
                address: Contracts.Utils.ERC1820.registryAddress.toLowerCase(),
                code: '0x1',
            }))
            await sleep(1000)
            //Subscription Trigger
            ERC721Mintable = await ERC721MintableFactory.deploy(...Contracts.Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token));
            await sleep(2000)

            //Exists
            assert.isDefined(ContractCRUD.db.get({ networkId, address: ERC721Mintable.address.toLowerCase() }))

            //Metadata
            const ethCall = await getEthCall(store.getState(), networkId, ERC721Mintable.address.toLowerCase(), 'name')
            const name = ethCall?.returnValue
            assert.equal(name, token.name, 'name')
        })

        it('Account Asset Transfer - Past', async () => {
            ERC721Mintable = await ERC721MintableFactory.deploy(...Contracts.Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token));
            //Past Transfer event trigger
            const tx = await ERC721Mintable.mint(from, 1);
            await tx.wait()
            await sleep(1000)
            //Add account to config, detect asset transfer to account
            store.dispatch(ConfigCRUD.actions.create({
                id: '0',
                networkId,
                account: from
            }));
            await sleep(2000)

            //Exists
            assert.isDefined(ContractCRUD.db.get({ networkId, address: ERC721Mintable.address.toLowerCase() }))

            //Metadata
            const ethCall = await getEthCall(store.getState(), networkId, ERC721Mintable.address.toLowerCase(), 'name')
            const name = ethCall?.returnValue
            assert.equal(name, token.name, 'name')
        })

        it('Account Asset Transfer - Subscribe', async () => {
            ERC721Mintable = await ERC721MintableFactory.deploy(...Contracts.Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token));
            //Add account to config, detect asset transfer to account
            store.dispatch(ConfigCRUD.actions.create({
                id: '0',
                networkId,
                account: from
            }));
            await sleep(1000)
            //Subscribe Transfer event trigger
            const tx = await ERC721Mintable.mint(from, 1);
            await tx.wait()
            await sleep(2000)

            //Exists
            assert.isDefined(ContractCRUD.db.get({ networkId, address: ERC721Mintable.address.toLowerCase() }))

            //Metadata
            const ethCall = await getEthCall(store.getState(), networkId, ERC721Mintable.address.toLowerCase(), 'name')
            const name = ethCall?.returnValue
            assert.equal(name, token.name, 'name')
        })
    })
})
