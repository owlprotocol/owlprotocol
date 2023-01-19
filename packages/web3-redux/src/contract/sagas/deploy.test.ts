import { assert } from 'chai';
import * as Contracts from '@owlprotocol/contracts';
import { ERC721Mintable } from '@owlprotocol/contracts/lib/types/ethers/types.js';
import ethers, { constants, Signer } from 'ethers';
import Web3 from 'web3';

import { AbiItem } from '../../utils/web3-utils/index.js';
import { sleep } from '../../utils/index.js';

import { name } from '../common.js';

import { createStore, StoreType } from '../../store.js';
import { deployAction, DeployType } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import { network1336 } from '../../network/data.js';
import { ADDRESS_1 } from '../../data.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/sagas/deploy.ts`, () => {
    let store: StoreType;

    let from: string;
    let signer: Signer
    let web3Sender: Web3

    let factoriesDeterministic: ReturnType<typeof Contracts.Ethers.getDeterministicFactories>;
    let factoriesDeterministicInit: ReturnType<typeof Contracts.Ethers.getDeterministicInitializeFactories>;
    let factoriesProxy1167: ReturnType<typeof Contracts.Ethers.getProxy1167InitializeFactories>;
    let factoriesProxyBeacon: ReturnType<typeof Contracts.Ethers.getBeaconProxyFactories>;

    before(async () => {
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
        factoriesDeterministic = Contracts.Ethers.getDeterministicFactories(factories);
        factoriesDeterministicInit = Contracts.Ethers.getDeterministicInitializeFactories(factories, from);
        factoriesProxy1167 = Contracts.Ethers.getProxy1167InitializeFactories(factoriesDeterministic, from)
        //Get address of upgradeable beacons
        const beaconFactory = factoriesDeterministicInit.UpgradeableBeacon;
        factoriesProxyBeacon = Contracts.Ethers.getBeaconProxyFactories(factoriesDeterministic, beaconFactory, from);

        //Configure web3Sender with privateKey wallet (required as we do signatures etc...)
        web3Sender = new Web3(web3.currentProvider);
        web3Sender.eth.accounts.wallet.add(privateKey);
    });

    describe('store', () => {
        beforeEach(async () => {
            store = createStore();
            store.dispatch(NetworkCRUD.actions.create({
                networkId,
                web3,
                web3Sender
            }));
        });

        it(DeployType.REGULAR, async () => {
            let address: string | undefined
            store.dispatch(
                deployAction({
                    networkId,
                    abi: Contracts.Artifacts.BlockNumber.abi as AbiItem[],
                    bytecode: Contracts.Artifacts.BlockNumber.bytecode,
                    args: [],
                    from,
                    deployType: DeployType.REGULAR,
                    onSuccess: (a) => { address = a },
                    label: DeployType.REGULAR
                }),
            );

            await sleep(1000);

            assert.isDefined(address, 'address')
            const contract = await ContractCRUD.db.get({ networkId, address });
            assert.isDefined(contract, 'contract');

            const contractsByLabel = await ContractCRUD.db.where({ label: DeployType.REGULAR });
            const contractByLabel = contractsByLabel.length > 0 ? contractsByLabel[0] : undefined;
            assert.isDefined(contractByLabel, 'contractByLabel');
        });

        it(DeployType.INITIALIZE, async () => {
            let address: string | undefined
            let args: Parameters<ERC721Mintable['initialize']> = [
                from,
                '',
                constants.AddressZero,
                'XYZ Collection',
                'XYZ',
                'http://example.com/metadata/',
                ADDRESS_1,
                0
            ]
            store.dispatch(
                deployAction({
                    networkId,
                    abi: Contracts.Artifacts.ERC721Mintable.abi,
                    bytecode: Contracts.Artifacts.ERC721Mintable.bytecode,
                    args,
                    from,
                    deployType: DeployType.INITIALIZE,
                    onSuccess: (a) => { address = a },
                    label: DeployType.INITIALIZE
                }),
            );

            await sleep(2000);

            assert.isDefined(address, 'address')
            assert.equal(address, factoriesDeterministicInit.ERC721Mintable.getAddress(...args).toLowerCase())
            const contract = await ContractCRUD.db.get({ networkId, address });
            assert.isDefined(contract, 'contract');

            const contractsByLabel = await ContractCRUD.db.where({ label: DeployType.INITIALIZE });
            const contractByLabel = contractsByLabel.length > 0 ? contractsByLabel[0] : undefined;
            assert.isDefined(contractByLabel, 'contractByLabel');
        });

        it(DeployType.PROXY_1167, async () => {
            let address: string | undefined
            let args: Parameters<ERC721Mintable['initialize']> = [
                from,
                '',
                constants.AddressZero,
                'XYZ Collection',
                'XYZ',
                'http://example.com/metadata/',
                ADDRESS_1,
                0
            ]
            store.dispatch(
                deployAction({
                    networkId,
                    abi: Contracts.Artifacts.ERC721Mintable.abi,
                    deployImplementationAddress: factoriesDeterministic.ERC721Mintable.getAddress(),
                    args,
                    from,
                    deployType: DeployType.PROXY_1167,
                    onSuccess: (a) => { address = a },
                    label: DeployType.PROXY_1167
                }),
            );

            await sleep(2000);

            assert.isDefined(address, 'address')
            assert.equal(address, factoriesProxy1167.ERC721Mintable.getAddress(...args).toLowerCase())
            const contract = await ContractCRUD.db.get({ networkId, address });
            assert.isDefined(contract, 'contract');

            const contractsByLabel = await ContractCRUD.db.where({ label: DeployType.PROXY_1167 });
            const contractByLabel = contractsByLabel.length > 0 ? contractsByLabel[0] : undefined;
            assert.isDefined(contractByLabel, 'contractByLabel');
        });

        it(DeployType.PROXY_BEACON, async () => {
            let address: string | undefined
            let args: Parameters<ERC721Mintable['initialize']> = [
                from,
                '',
                constants.AddressZero,
                'XYZ Collection',
                'XYZ',
                'http://example.com/metadata/',
                ADDRESS_1,
                0
            ]
            const UpgradeableBeaconFactory = factoriesDeterministicInit.UpgradeableBeacon;
            store.dispatch(
                deployAction({
                    networkId,
                    abi: Contracts.Artifacts.ERC721Mintable.abi,
                    deployBeaconAddress: UpgradeableBeaconFactory.getAddress(from, factoriesDeterministic.ERC721Mintable.getAddress()),
                    args,
                    from,
                    deployType: DeployType.PROXY_BEACON,
                    onSuccess: (a) => { address = a },
                    label: DeployType.PROXY_BEACON
                }),
            );

            await sleep(2000);

            assert.isDefined(address, 'address')
            assert.equal(address, factoriesProxyBeacon.ERC721Mintable.getAddress(...args).toLowerCase())
            const contract = await ContractCRUD.db.get({ networkId, address });
            assert.isDefined(contract, 'contract');

            const contractsByLabel = await ContractCRUD.db.where({ label: DeployType.PROXY_BEACON });
            const contractByLabel = contractsByLabel.length > 0 ? contractsByLabel[0] : undefined;
            assert.isDefined(contractByLabel, 'contractByLabel');
        });
    });
});
