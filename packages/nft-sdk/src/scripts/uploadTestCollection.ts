// import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';

import { readFileSync, existsSync, rmSync } from 'node:fs';
import { NFTGenerativeCollectionClass } from '../classes/NFTGenerativeCollection/NFTGenerativeCollectionClass.js';
import { NFTGenerativeTraitImage } from '../types/index.js';

const path = '../nft-project-demos/shapes';

// NOTE: Use if deploying to external IPFS
// if (!process.env.AUTH) { console.log('AUTH missing')
// const auth =
//     'Basic ' + Buffer.from(process.env.AUTH!).toString('base64');

async function main() {
    ['./.ipfs'].map((p) => {
        if (existsSync(p)) rmSync(p, { recursive: true });
    });

    const ipfs = create();
    // NOTE: Use if deploying to external IPFS
    // const ipfs = create({
    //     host: 'ipfs.infura.io',
    //     port: 5001,
    //     protocol: 'https',
    //     headers: {
    //         authorization: auth,
    //     },
    // });

    const collection = NFTGenerativeCollectionClass.loadFromFolder(path, {
        readFileSync,
    });
    const cid = await collection.uploadIPFS(ipfs);

    const shapes = collection.getTrait('shape0') as NFTGenerativeTraitImage;

    shapes.options.forEach((s) => console.log(s.image_url));

    console.log('collection CID: ', cid.toString());
}

main().then(() => console.log('done'));
