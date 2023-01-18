import {
    NFTGenerativeCollectionClass,
    NFTGenerativeItemClass, NFTGenerativeCollectionInterface
} from '../classes';

import {
    NFTGenerativeCollection,
    NFTGenerativeTraitBase,
    NFTGenerativeTraitImage,
    NFTGenerativeTraitImageOption,
    isNFTGenerativeTraitImage,
} from '../types'
import BN from 'bn.js';

/**
 * Run with experimental-specifier-resolution
 *
 * e.g. pnpm run esbuild && node --experimental-specifier-resolution=node ./lib/esm/scripts/generateExampleDna.js
 */
async function main(){

    const parentCollection = await fetchParentCollectionClass();

    // fetch hat
    const nftHat = await getHat();

    const nftDress = await getDress();

    const nftParent = NFTGenerativeItemClass.fromAttributes({
        collection: <NFTGenerativeCollectionInterface>parentCollection,
        attributes: parentCollection.dnaToAttributes(new BN('17170688').toBuffer()),
        children: {
            glasses: undefined,
            dress: nftDress,
            hats: nftHat,
            facial_hair: undefined
        }
    });

    console.log(nftParent.genes());

    console.log(nftParent.dnaWithChildren());

    console.log(nftParent.fullDnaWithChildren());

}

async function fetchParentCollectionClass(): Promise<NFTGenerativeCollectionClass> {
    const resp = await fetch('https://leovigna.mypinata.cloud/ipfs/QmYzizfhuUX64rwdaEqunQxSxd8p4uXkpVE2zFpq14cvSM');
    const data = await resp.json();

    const collection = <NFTGenerativeCollection>data;

    return NFTGenerativeCollectionClass.fromData(collection);
}

async function getHat(): Promise<NFTGenerativeItemClass> {
    const resp = await fetch('https://leovigna.mypinata.cloud/ipfs/QmbrstXfLUQ2gEi1uzMX39x4YRvtSPoJTYcxwbLxsiF2Dt');
    const data = await resp.json();

    const collection = <NFTGenerativeCollection>data;

    const collectionClass = NFTGenerativeCollectionClass.fromData(collection);

    return NFTGenerativeItemClass.fromAttributes({
        collection: <NFTGenerativeCollectionInterface>collectionClass,
        attributes: { class: 'Designer', hats: 'Designer - Cap 5' }
    });
}

async function getDress(): Promise<NFTGenerativeItemClass> {
    const resp = await fetch('https://leovigna.mypinata.cloud/ipfs/QmPRM4ABL9eSmoYtuiqWxrV7b8KCcRu9PDmoaUeiVMmMCm');
    const data = await resp.json();

    const collection = <NFTGenerativeCollection>data;

    const collectionClass = NFTGenerativeCollectionClass.fromData(collection);

    return NFTGenerativeItemClass.fromAttributes({
        collection: <NFTGenerativeCollectionInterface>collectionClass,
        attributes: { class: 'Thread Haus', dress: 'ThreadHaus - Flight Jacket Indigo' }
    });
}

main().then(() => console.log('Done'));

