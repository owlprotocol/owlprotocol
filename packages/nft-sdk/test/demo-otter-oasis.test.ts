import { BN } from 'bn.js';
import { Canvas, Image } from 'canvas';
import { assert } from 'chai';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'node:fs';

import { NFTGenerativeCollectionClass } from '../src/classes/NFTGenerativeCollection/NFTGenerativeCollectionClass.js';

describe('NFTGenerativeCollectionClass - Examples/otter-oasis', () => {
    const mergeOptions = { Canvas, Image };
    const path = '../nft-project-demos/otter-oasis';

    it('loadFromFolder', () => {
        const collection = NFTGenerativeCollectionClass.loadFromFolder(path, {
            readFileSync,
        });
        assert.equal(collection.getMaxBitSize(), 8);
    });

    it('getImage', async () => {
        const collection = NFTGenerativeCollectionClass.loadFromFolder(path, {
            readFileSync,
        });
        const dna = '00000000';

        //Generate image by formatting SVG
        const image = await collection.getImage(new BN(dna, 2), mergeOptions, 5000, 5000);
        writeFileSync(join(path, 'tokens', `${dna}.svg`), image.toString());
    });
});
