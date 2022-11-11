import { assert } from 'chai';
import { BN } from 'bn.js';
import { Canvas, Image } from 'canvas';
import type { IPFS } from 'ipfs-core-types';
import { create as createIpfsHttpClient } from 'ipfs-http-client';
// eslint-disable-next-line import/no-unresolved
import { create as createIpfsNode } from 'ipfs-core';
import * as MockIPFS from 'mockipfs';
import { Buffer } from 'buffer';
import { readFileSync, existsSync, rmSync } from 'node:fs';

import { NFTGenerativeCollectionClass } from './NFTGenerativeCollectionClass.js';
import { NFTGenerativeTraitColormap, NFTGenerativeTraitImage } from '../../types/index.js';
import { asyncIterableToArray } from '../../utils/asyncIterableToArray.js';

describe('NFTGenerativeCollectionClass - Examples/shapes', () => {
    const mergeOptions = { Canvas, Image };
    const path = '../nft-project-demos/shapes';

    it('loadFromFolder', () => {
        const collection = NFTGenerativeCollectionClass.loadFromFolder(path, {
            readFileSync,
        });

        const shapes = collection.getTrait('shape0') as NFTGenerativeTraitImage;
        shapes.options.forEach((s) => {
            assert.isDefined(s.image, `image ${s.value}`);
        });

        const colormap = collection.getTrait('shape0_colormap') as NFTGenerativeTraitColormap;
        colormap.options.forEach((s) => {
            assert.isDefined(s.colors, `colormap ${s.value}`);
            assert.equal(s.colors.length, 256, `colormap ${s.value}`);
        });
        assert.equal(collection.getMaxBitSize(), 11);
    });

    it('getImage', async () => {
        const collection = NFTGenerativeCollectionClass.loadFromFolder(path, {
            readFileSync,
        });
        const dna = '11111111001';
        //Generate image by formatting SVG
        await collection.getImage(new BN(dna, 2), mergeOptions);
    });

    describe('ipfs-mock', () => {
        const mockNode = MockIPFS.getLocal();
        let ipfs: IPFS;

        before(async () => {
            await mockNode.start();
            ipfs = createIpfsHttpClient(mockNode.ipfsOptions);
        });

        after(async () => {
            await mockNode.stop();
            console.log('done stopping IPFS mock node');
        });

        it('uploadIPFS', async () => {
            const collection = NFTGenerativeCollectionClass.loadFromFolder(path, { readFileSync });
            await collection.uploadIPFS(ipfs);

            // Check collection image URLs are ipfs hashes
            const shapes = collection.getTrait('shape0') as NFTGenerativeTraitImage;
            shapes.options.forEach((s) => {
                assert.isDefined(s.image, `image ${s.value}`);
            });

            const addedContent = await mockNode.getAddedContent();

            //3 items added
            const shape0_0 = addedContent[0].content!;
            const shape0_1 = addedContent[1].content!;
            const collectionContent = addedContent[2].content!;

            assert.equal(shapes.options[0].image!.toString(), shape0_0.toString(), 'shape0_0');
            assert.equal(shapes.options[1].image!.toString(), shape0_1.toString(), 'shape0_1');
            assert.deepEqual(collection.getJsonMetadata(), JSON.parse(collectionContent.toString()), 'collection');

            /*
            //fails as mock node needs mocked result
            const test = (await client.add(Buffer.from('test'))).cid
            const expected = Buffer.concat(await asyncIterableToArray(client.get(test)))
            console.debug(expected)
            */

            /*
            const cidExpectedResults = Buffer.concat(await asyncIterableToArray(client.get(cid)))
            console.debug(cidExpectedResults.toString())
            */
            /*
            const shapeUrlAndData = shapes.options.map(s => { return { image: s.image, image_url: s.image_url } })

            const addedContent = await mockNode.getAddedContent()
            const addedContentUrlAndData = addedContent.map(c => { return { image: Buffer.from(c.content!), image_url: c.path } })

            assert.deepEqual(shapeUrlAndData, addedContentUrlAndData)
            */

            //Fix tests to check if same hash
        });
    });
    describe('ipfs-core', () => {
        let ipfs: IPFS;

        before(async () => {
            ['./.ipfs'].map((p) => {
                if (existsSync(p)) rmSync(p, { recursive: true });
            });

            //Write data to docs database
            ipfs = await createIpfsNode({
                repo: './.ipfs',
            });
        });

        after(async () => {
            await ipfs.stop();
            ['./.ipfs'].map((p) => {
                if (existsSync(p)) rmSync(p, { recursive: true });
            });
        });

        it('uploadIPFS', async () => {
            const collection = NFTGenerativeCollectionClass.loadFromFolder(path, { readFileSync });
            const cid = await collection.uploadIPFS(ipfs);

            // Check collection image URLs
            const shapes = collection.getTrait('shape0') as NFTGenerativeTraitImage;
            const layers = await Promise.all(
                shapes.options.map(async (s) => {
                    return Buffer.concat(await asyncIterableToArray(ipfs.cat(s.image_url!.replace('ipfs://', ''))));
                }),
            );
            shapes.options.forEach((s, i) => {
                assert.isDefined(s.image_url, `${s.value}.image_url undefined`);
                assert.equal(s.image!.toString(), layers[i].toString(), `${s.value}.image != IPFS Result`);
            });

            //Check collection.json
            const collectionContent = Buffer.concat(await asyncIterableToArray(ipfs.cat(cid)));
            assert.deepEqual(collection.getJsonMetadata(), JSON.parse(collectionContent.toString()), 'collection');

            //Load from IPFS
            const collection2 = await NFTGenerativeCollectionClass.loadFromIPFS(ipfs, cid);
            assert.deepEqual(collection2.getJsonMetadata(), collection.getJsonMetadata(), 'loadFromIPFS');
        });
    });
});
