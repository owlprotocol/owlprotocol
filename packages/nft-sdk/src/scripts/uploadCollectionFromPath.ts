import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { readFileSync } from 'fs';

import { NFTGenerativeTraitBaseClass, NFTGenerativeTraitImageClass } from '../classes/index.js';
import { NFTGenerativeCollectionClass } from '../classes/NFTGenerativeCollection/NFTGenerativeCollectionClass.js';

async function main() {
    if (process.argv.length != 3) {
        throw Error('Missing collection path');
    }

    const path = process.argv[2];

    const infuraAuth = process.env.AUTH;
    let ipfs: IPFSHTTPClient;
    if (infuraAuth) {
        const authorization = 'Basic ' + Buffer.from(infuraAuth).toString('base64');
        ipfs = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: { authorization },
        });
    } else {
        ipfs = create();
    }

    const collection = NFTGenerativeCollectionClass.loadFromFolder(path, {
        readFileSync,
    });
    const cid = await collection.uploadIPFS(ipfs);

    // (Nate) this is a workaround for:
    // Type 'NFTGenerativeTraitBaseInterface' has no call signatures.ts(2349)
    //
    const collectionTraits = collection.traits as unknown as Array<any>;
    const imageTraits = collectionTraits.filter(
        (trait: NFTGenerativeTraitBaseClass) => trait instanceof NFTGenerativeTraitImageClass,
    ) as NFTGenerativeTraitImageClass[];
    imageTraits.forEach((trait) => {
        trait.options.forEach((option) => {
            if (!option.image_url) return;

            console.log(`${trait.name}.${option.value}: ${option.image_url}`);
        });
    });

    console.log('collection CID: ', cid.toString());
}

main().then(() => console.log('Done uploading'));
