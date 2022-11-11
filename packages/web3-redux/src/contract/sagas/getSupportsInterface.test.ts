import { assert } from 'chai';
import { Deploy, Ethers, IERC165InterfaceId, IERC721InterfaceId, IERC721MintableInterfaceId, Utils, interfaceIdNames, IContractURIInterfaceId, IERC721MetadataInterfaceId, IAccessControlInterfaceId, IBaseURIInterfaceId, IERC2981InterfaceId, IERC2981SetterInterfaceId, IRouterReceiverInterfaceId } from '@owlprotocol/contracts';
import { ethers, Signer } from 'ethers'
import { sleep } from '../../utils/index.js';

import { name } from '../common.js';

import { createStore, StoreType } from '../../store.js';
import { getSupportsInterface, call as callAction } from '../actions/index.js';
import { network1336 } from '../../network/data.js';
import { NetworkCRUD } from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import { privateKey } from '../../test/getWeb3Provider.js';
import { getContractCall } from '../db/getContractCall.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/sagas/getSupportsInterface.ts`, () => {
    let signers: Signer[];
    let signer: Signer
    let signerAddress: string

    let factories: Ethers.Factories;
    let deterministicFactories: Ethers.InitializeFactories;
    let ERC721MintableFactory: typeof deterministicFactories.ERC721Mintable;
    let ERC721Mintable: Ethers.ERC721Mintable;

    let tokenName = 0;
    let token: Utils.ERC721Mintable.ERC721MintableInitializeArgs;

    let store: StoreType;
    let address: string;

    before(async () => {
        const network = { name: 'local', config: { chainId: 1336 } }
        const provider = new ethers.providers.Web3Provider(web3.currentProvider as any);
        signers = [new ethers.Wallet(privateKey, provider)]
        signer = signers[0]
        signerAddress = await signer.getAddress()

        await Deploy.deployDeterministicDeployer({ provider, signers, network })
        await Deploy.deployProxyFactory({ provider, signers, network });
        await Deploy.deployERC1820({ provider, signers, network });

        factories = Ethers.getFactories(signer);
        deterministicFactories = Ethers.getDeterministicInitializeFactories(signer, factories, signerAddress);
        ERC721MintableFactory = deterministicFactories.ERC721Mintable;
    });

    beforeEach(async () => {
        token = {
            admin: signerAddress,
            contractUri: `token.${tokenName}.com`,
            gsnForwarder: ethers.constants.AddressZero,
            name: `Token ${tokenName}`,
            symbol: `TK${tokenName}`,
            initBaseURI: `token.${tokenName}.com/token`,
            feeReceiver: signerAddress,
            feeNumerator: 0,
        };
        const initializerArgs = Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token);
        ERC721Mintable = await ERC721MintableFactory.deploy(...initializerArgs);
        tokenName++;

        address = ERC721Mintable.address
    });

    describe('store', () => {
        beforeEach(async () => {
            store = createStore();
            store.dispatch(NetworkCRUD.actions.create(network1336));
        });

        it('getSupportsInterface', async () => {
            store.dispatch(
                getSupportsInterface({
                    networkId,
                    address,
                }),
            );

            await sleep(1000)

            //Selector
            const contract = await ContractCRUD.selectors.selectByIdSingle(
                store.getState(),
                { networkId, address: address.toLowerCase() });
            assert.isDefined(contract);

            const expectedInterfaceIds = [
                IERC165InterfaceId,
                IAccessControlInterfaceId,
                IRouterReceiverInterfaceId,
                IContractURIInterfaceId,
                IBaseURIInterfaceId,
                IERC2981InterfaceId,
                IERC2981SetterInterfaceId,
                IERC721InterfaceId,
                IERC721MetadataInterfaceId,
                IERC721MintableInterfaceId,
            ]
            const supportedNames = contract?.interfaceIds?.map((interfaceId) => interfaceIdNames[interfaceId])
            console.debug(supportedNames)
            assert.deepEqual(contract?.interfaceIds, expectedInterfaceIds, 'interfaceIds')

            console.debug(contract?.web3Contract)

            //Call
            const action = callAction({
                networkId,
                address,
                method: 'symbol',
            });
            store.dispatch(action);
            await sleep(1000);

            //Call an invalid function
            const value = await getContractCall(store.getState(), networkId, address.toLowerCase(), 'symbol');

            assert.equal(value, token.symbol, 'symbol');
        });

        it('call', async () => {
            //Call, no interface, gets fetched
            const action = callAction({
                networkId,
                address,
                method: 'symbol',
            });
            store.dispatch(action);
            await sleep(1000);

            //Call an invalid function
            const value = await getContractCall(store.getState(), networkId, address.toLowerCase(), 'symbol');

            assert.equal(value, token.symbol, 'symbol');
        });
    });

});
