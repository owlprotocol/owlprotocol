import { put, call } from 'typed-redux-saga';
import * as Contracts from '@owlprotocol/contracts';

import { fetchSaga } from './fetch.js';
import { CallAction } from '../actions/index.js';
import { ContractCRUD } from '../crud.js';
import { EthCallCRUD } from '../../ethcall/crud.js';
import { NetworkWithObjects } from '../../network/model/interface.js';
import { ContractWithObjects } from '../model/interface.js';
import { EthCall } from '../../ethcall/model/interface.js';
import type { Web3ContractMethodCall, Web3ContractMethodParams } from '@owlprotocol/contracts/lib/types/web3/types.js';
import { BaseContract } from '@owlprotocol/contracts/lib/types/typechain/web3/types.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';

export function* callSaga(action: CallAction): Generator<
    any,
    {
        network: NetworkWithObjects;
        contract: ContractWithObjects;
        ethcall: EthCall
    }
> {
    const { payload } = action;
    const { networkId, address, args, method, gas, from, defaultBlock, maxCacheAge } = payload;

    const { network, contract } = yield* call(fetchSaga, ContractCRUD.actions.fetch({ networkId, address }, action.meta.uuid));
    //Make sure required parameters defined
    if (!method) throw new Error('method undefined');

    const web3Contract = contract.web3Contract!;
    const methodFn = web3Contract.methods[method];
    if (!methodFn) throw new Error(`Contract ${ContractCRUD.toPrimaryKey(payload)} has no such method ${payload.method}`);

    let tx: Contracts.Web3.NonPayableTransactionObject<any>;
    if (!args || args.length == 0) tx = methodFn();
    else tx = methodFn(...args);
    const data = tx.encodeABI();

    const dbSelected = yield* call(EthCallCRUD.db.get, { networkId, to: contract.address, data });
    if (dbSelected?.updatedAt && Date.now() - dbSelected.updatedAt < maxCacheAge) {
        return { network, contract, ethcall: dbSelected }
    }
    const fromDefined = from ?? ADDRESS_0;
    const ethcallLoading = {
        networkId,
        to: contract.address,
        data,
        methodName: method,
        args,
        from: fromDefined,
        status: 'LOADING' as const,
    }
    yield* put(
        EthCallCRUD.actions.upsert(ethcallLoading),
    );

    const gasDefined = gas ?? (yield* call(tx.estimateGas, { from: fromDefined })); //default gas
    //@ts-ignore
    const returnValue: any = yield* call(
        tx.call,
        { gas: gasDefined, from: fromDefined },
        defaultBlock ?? 'latest',
    );

    const ethcall = {
        networkId,
        to: contract.address,
        data,
        methodName: method,
        args,
        from: fromDefined,
        gas: gasDefined,
        returnValue,
        status: 'SUCCESS' as const,
    }

    yield* put(
        EthCallCRUD.actions.upsert(ethcall),
    );

    return { network, contract, ethcall }
}

export function callSagaFactory<T extends BaseContract, K extends keyof T['methods']>(method: K) {
    return (action: CallAction<Web3ContractMethodParams<T, K>>): Generator<
        any,
        {
            network: NetworkWithObjects;
            contract: ContractWithObjects;
            ethcall: EthCall<Web3ContractMethodParams<T, K>, Web3ContractMethodCall<T, K>>
        }
    > => {
        const payload = { ...action.payload, method }
        //@ts-expect-error
        return callSaga({ type: action.type, payload, meta: { ...action.meta } }) as Generator<
            any,
            {
                network: NetworkWithObjects;
                contract: ContractWithObjects;
                ethcall: EthCall<Web3ContractMethodParams<T, K>, Web3ContractMethodCall<T, K>>
            }
        >
    }
}

//Common
export const callSagaContractURI = callSagaFactory<Contracts.Web3.IContractURI, 'contractURI'>('contractURI')
//IERC165
export const callSagaERC165SupportsInterface = callSagaFactory<Contracts.Web3.IERC165, 'supportsInterface'>('supportsInterface')
export const callSagaRouterReceiverIsTrustedForwarder = callSagaFactory<Contracts.Web3.IRouterReceiver, 'isTrustedForwarder'>('isTrustedForwarder')

//Assets
//IERC20
export const callSagaERC20Name = callSagaFactory<Contracts.Web3.IERC20Metadata, 'name'>('name')
export const callSagaERC20Symbol = callSagaFactory<Contracts.Web3.IERC20Metadata, 'symbol'>('symbol')
export const callSagaERC20Decimals = callSagaFactory<Contracts.Web3.IERC20Metadata, 'decimals'>('decimals')
export const callSagaERC20TotalSupply = callSagaFactory<Contracts.Web3.IERC20Metadata, 'totalSupply'>('totalSupply')
export const callSagaERC20BalanceOf = callSagaFactory<Contracts.Web3.IERC20, 'balanceOf'>('balanceOf')
//IERC721
export const callSagaERC721Name = callSagaFactory<Contracts.Web3.IERC721Metadata, 'name'>('name')
export const callSagaERC721Symbol = callSagaFactory<Contracts.Web3.IERC721Metadata, 'symbol'>('symbol')
export const callSagaERC721BalanceOf = callSagaFactory<Contracts.Web3.IERC721, 'balanceOf'>('balanceOf')
export const callSagaERC721OwnerOf = callSagaFactory<Contracts.Web3.IERC721, 'ownerOf'>('ownerOf')
export const callSagaERC721TokenURI = callSagaFactory<Contracts.Web3.IERC721Metadata, 'tokenURI'>('tokenURI')
//IERC1155
export const callSagaERC1155Uri = callSagaFactory<Contracts.Web3.IERC1155MetadataURI, 'uri'>('uri')
export const callSagaERC1155BalanceOf = callSagaFactory<Contracts.Web3.IERC1155, 'balanceOf'>('balanceOf')
//IERC721Dna
export const callSagaERC721DnaGetDna = callSagaFactory<Contracts.Web3.IERC721Dna, 'getDna'>('getDna')
//IERC721TopDown
export const callSagaERC721TopDownGetChildContracts = callSagaFactory<Contracts.Web3.IERC721TopDown, 'getChildContracts'>('getChildContracts')
export const callSagaERC721TopDownChildTokenIdsOf = callSagaFactory<Contracts.Web3.IERC721TopDown, 'childTokenIdsOf'>('childTokenIdsOf')
export const callSagaERC721TopDownRootOwnerOf = callSagaFactory<Contracts.Web3.IERC721TopDown, 'rootOwnerOf'>('rootOwnerOf')
//IERC1155Dna
export const callSagaERC1155DnaGetDna = callSagaFactory<Contracts.Web3.IERC1155Dna, 'getDna'>('getDna')
//IERC2981
export const callSagaERC2981RoyaltyInfo = callSagaFactory<Contracts.Web3.IERC2981, 'royaltyInfo'>('royaltyInfo')

//Plugins
//IAssetRouterInput
export const callSagaAssetRouterInputGetBasket = callSagaFactory<Contracts.Web3.AssetRouterInput, 'getBasket'>('getBasket')
//IAssetRouterOutput
export const callSagaAssetRouterOutputGetBasket = callSagaFactory<Contracts.Web3.AssetRouterOutput, 'getBasket'>('getBasket')
