import { select, put, call, all } from 'typed-redux-saga';
import * as Contracts from '@owlprotocol/contracts';
import { NFTGenerativeCollection as NFTGenerativeCollectionSpec, loadCollectionImages } from '@owlprotocol/nft-sdk';
import axios, { AxiosResponse } from 'axios';
import { NFTGenerativeCollectionCRUD } from '../crud.js';
import { fetchSaga as fetchContractSaga } from '../../contract/sagas/fetch.js';

import { ConfigCRUD } from '../../config/crud.js';
import { NetworkWithObjects } from '../../network/model/interface.js';
import { ContractWithObjects } from '../../contract/model/interface.js';
import ContractCRUD from '../../contract/crud.js';
import { NFTGenerativeCollection } from '../model/interface.js';
import { callBatched } from '../../contract/sagas/callBatched.js';
import { callBatched as callBatchedAction } from '../../contract/actions/callBatched.js'

const IContractURI = Contracts.Artifacts.IContractURI.abi;
const IERC721 = Contracts.Artifacts.IERC721.abi;
const IERC721TopDown = Contracts.Artifacts.IERC721TopDown.abi;
const IERC721Dna = Contracts.Artifacts.IERC721Dna.abi;

/** @category Sagas */
export function* fetchSaga(action: ReturnType<typeof NFTGenerativeCollectionCRUD.actions.fetch>): Generator<
    any,
    {
        network: NetworkWithObjects;
        contract: ContractWithObjects<Contracts.Web3.ERC721TopDownDna>;
        collection: NFTGenerativeCollection;
    }
> {
    const { payload } = action;
    const { networkId, address, status } = payload;

    const abi = [...IContractURI, ...IERC721, ...IERC721TopDown, ...IERC721Dna];
    const { network, contract } = (yield* call(
        fetchContractSaga,
        ContractCRUD.actions.fetch({ networkId, address, abi }),
    )) as { network: NetworkWithObjects; contract: ContractWithObjects<Contracts.Web3.ERC721TopDownDna> };

    const dbSelected = yield* call(NFTGenerativeCollectionCRUD.db.get, { networkId, address, status });
    if (dbSelected && dbSelected.metadata && dbSelected.childContracts) {
        return { network, contract, collection: dbSelected };
    }

    const callActionInputs = [
        { networkId, address, method: 'contractURI', args: [], maxCacheAge: Number.MAX_SAFE_INTEGER },
        { networkId, address, method: 'getChildContracts', args: [], maxCacheAge: Number.MAX_SAFE_INTEGER }
    ]
    const results = yield* call(callBatched, callBatchedAction({ calls: callActionInputs }, action.meta.uuid))
    const uri = results[0].ethcall.returnValue! as string
    const childContracts = results[1].ethcall.returnValue! as string[]

    //Fetch
    const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, { id: '0' });
    const httpClient = config?.httpClient ?? axios;

    //@ts-expect-error
    const response: AxiosResponse = yield* call(httpClient.get, uri);
    const metadata = response.data as NFTGenerativeCollectionSpec;
    yield* call(loadCollectionImages, metadata);

    const collection = {
        networkId,
        address,
        status: 'onchain' as const,
        metadata: metadata as any,
        childContracts: childContracts.map((c) => c.toLowerCase()),
    };

    yield* put(NFTGenerativeCollectionCRUD.actions.upsert(collection, action.meta.uuid));
    return { network, contract, collection };
}
