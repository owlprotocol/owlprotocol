import { Canvas, Image } from 'canvas';
import { assert } from 'chai';
import * as MockIPFS from 'mockipfs';
import type { IPFS } from 'ipfs-core-types';
import { create as createIpfsHttpClient } from 'ipfs-http-client';
// eslint-disable-next-line import/no-unresolved
import { create as createIpfsNode } from 'ipfs-core';

import { BN } from 'bn.js';
import { Buffer } from 'buffer';
import { readFileSync, existsSync, rmSync } from 'node:fs';
import { NFTGenerativeCollectionClass } from './NFTGenerativeCollectionClass.js';
import { NFTGenerativeTraitImage } from '../../types/index.js';
import { asyncIterableToArray } from '../../utils/asyncIterableToArray.js';

describe('NFTGenerativeCollectionClass - Examples/shapes-png', () => {
    const mergeOptions = { Canvas, Image };
    const path = '../nft-project-demos/shapes-png';

    it('loadFromFolder', () => {
        const collection = NFTGenerativeCollectionClass.loadFromFolder(path, {
            readFileSync,
        });

        const shapes0 = collection.getTrait('shape0') as NFTGenerativeTraitImage;
        shapes0.options.forEach((s) => {
            if ('blank' == s.value) {
                assert.isUndefined(s.image_url, `${s.value}.image_url defined`);
                assert.isUndefined(s.image, `${s.value}.image defined`);
                return;
            }

            assert.isDefined(s.image, `image ${s.value}`);
            assert.isDefined(s.image_url, `image_url ${s.value}`);
        });
        const shapes1 = collection.getTrait('shape1') as NFTGenerativeTraitImage;
        shapes1.options.forEach((s) => {
            if ('blank' == s.value) {
                assert.isUndefined(s.image_url, `${s.value}.image_url defined`);
                assert.isUndefined(s.image, `${s.value}.image defined`);
                return;
            }

            assert.isDefined(s.image, `image ${s.value}`);
            assert.isDefined(s.image_url, `image_url ${s.value}`);
        });
        const shapes2 = collection.getTrait('shape2') as NFTGenerativeTraitImage;
        shapes2.options.forEach((s) => {
            if ('blank' == s.value) {
                assert.isUndefined(s.image_url, `${s.value}.image_url defined`);
                assert.isUndefined(s.image, `${s.value}.image defined`);
                return;
            }

            assert.isDefined(s.image, `image ${s.value}`);
            assert.isDefined(s.image_url, `image_url ${s.value}`);
        });
        const shapes3 = collection.getTrait('shape3') as NFTGenerativeTraitImage;
        shapes3.options.forEach((s) => {
            if ('blank' == s.value) {
                assert.isUndefined(s.image_url, `${s.value}.image_url defined`);
                assert.isUndefined(s.image, `${s.value}.image defined`);
                return;
            }

            assert.isDefined(s.image, `image ${s.value}`);
            assert.isDefined(s.image_url, `image_url ${s.value}`);
        });

        assert.equal(collection.getMaxBitSize(), 8);
    });

    it('getImage', async () => {
        const collection = NFTGenerativeCollectionClass.loadFromFolder(path, {
            readFileSync,
        });
        const dna = '01100000';
        const dnaBN = new BN(dna, 2);

        //Generate image by formatting PNG
        const merged = await collection.getImage(dnaBN, mergeOptions);

        const expectedPath = './testdata/merge_images_png/circle_square.png';
        const expected = readFileSync(expectedPath);

        assert.deepEqual(expected, merged);
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
            const shapes0 = collection.getTrait('shape0') as NFTGenerativeTraitImage;
            shapes0.options.forEach((s) => {
                if ('blank' == s.value) {
                    assert.isUndefined(s.image_url, `${s.value}.image_url defined`);
                    assert.isUndefined(s.image, `${s.value}.image defined`);
                    return;
                }

                assert.isDefined(s.image, `image ${s.value}`);
                assert.isDefined(s.image_url, `image_url ${s.value}`);
            });
            const shapes1 = collection.getTrait('shape1') as NFTGenerativeTraitImage;
            shapes1.options.forEach((s) => {
                if ('blank' == s.value) {
                    assert.isUndefined(s.image_url, `${s.value}.image_url defined`);
                    assert.isUndefined(s.image, `${s.value}.image defined`);
                    return;
                }

                assert.isDefined(s.image, `image ${s.value}`);
                assert.isDefined(s.image_url, `image_url ${s.value}`);
            });
            const shapes2 = collection.getTrait('shape2') as NFTGenerativeTraitImage;
            shapes2.options.forEach((s) => {
                if ('blank' == s.value) {
                    assert.isUndefined(s.image_url, `${s.value}.image_url defined`);
                    assert.isUndefined(s.image, `${s.value}.image defined`);
                    return;
                }

                assert.isDefined(s.image, `image ${s.value}`);
                assert.isDefined(s.image_url, `image_url ${s.value}`);
            });
            const shapes3 = collection.getTrait('shape3') as NFTGenerativeTraitImage;
            shapes3.options.forEach((s) => {
                if ('blank' == s.value) {
                    assert.isUndefined(s.image_url, `${s.value}.image_url defined`);
                    assert.isUndefined(s.image, `${s.value}.image defined`);
                    return;
                }

                assert.isDefined(s.image, `image ${s.value}`);
                assert.isDefined(s.image_url, `image_url ${s.value}`);
            });

            const addedContent = await mockNode.getAddedContent();
            const collectionContent = addedContent[addedContent.length - 1].content!;

            //3 items added
            // const shape0_0 = addedContent[0].content!
            // const shape0_1 = addedContent[1].content!
            // const collectionContent = addedContent[2].content!
            //
            // assert.equal(shapes.options[0].image.toString(), shape0_0.toString(), 'shape0_0')
            // assert.equal(shapes.options[1].image.toString(), shape0_1.toString(), 'shape0_1')
            // console.log('fddfh')
            assert.deepEqual(collection.getJsonMetadata(), JSON.parse(collectionContent.toString()), 'collection');
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
                    if (!s.image_url) return Buffer.from([]);

                    return Buffer.concat(await asyncIterableToArray(ipfs.cat(s.image_url.replace('ipfs://', ''))));
                }),
            );
            shapes.options.forEach((s, i) => {
                if ('blank' == s.value) {
                    assert.isUndefined(s.image_url, `${s.value}.image_url defined`);
                    assert.isUndefined(s.image, `${s.value}.image defined`);
                    return;
                }

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
