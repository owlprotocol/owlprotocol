import { Canvas, Image } from 'canvas';
import { assert } from 'chai';
import { ethers } from 'ethers';
import { omit } from 'lodash-es';
import { readFileSync, writeFileSync } from 'fs';

import { collectionShapesPNGNested } from './shapesPNGNested.js';
import { bgCirclePNG, fgCirclePNG } from './shapesPNG.js';
import { NFTGenerativeTraitImageOption } from '../types/index.js';

describe('NFTGenerativeCollectionClass', () => {
    const mergeOptions = { Canvas, Image };

    describe('shapesPNGNested', () => {
        const abi = ['uint8'];
        const abiWithChildren = [['uint8'], [['uint8']]] as any;
        const outputFile = './testdata/shapesPNGNested/output/circleOnCircle.png';
        const outputImage = readFileSync(outputFile, 'base64');
        //imageBg, imageFg
        const dna = '0x00';
        const dnaWithChildren = {
            dna,
            children: {
                imageFg: {
                    dna: '0x00',
                },
            },
        };
        const genes = {
            imageBg: 0,
        };
        const genesWithChildren = {
            genes,
            children: {
                imageFg: {
                    genes: {
                        imageFg: 0,
                    },
                },
            },
        };
        const attributes = {
            imageBg: 'circle',
        };
        const attributesWithChildren = {
            attributes,
            children: {
                imageFg: {
                    attributes: {
                        imageFg: 'circle',
                    },
                },
            },
        };
        const attributesFormatted = {
            imageBg: {
                value: 'circle',
                image: bgCirclePNG,
                image_url: 'bgCircle.png',
            },
        };
        const attributesFormattedWithChildren = {
            attributes: attributesFormatted,
            children: {
                imageFg: {
                    attributes: {
                        imageFg: {
                            value: 'circle',
                            image: fgCirclePNG,
                            image_url: 'fgCircle.png',
                        },
                    },
                },
            },
        };

        it('abi', () => {
            assert.deepEqual(collectionShapesPNGNested.abi(), abi);
        });

        it('abiWithChildren', () => {
            assert.deepEqual(collectionShapesPNGNested.abiWithChildren(), abiWithChildren);
        });

        it('dnaToGenes', () => {
            assert.deepEqual(collectionShapesPNGNested.dnaToGenes(dna), genes);
        });

        it('dnaToGenesWithChildren', () => {
            //@ts-expect-error
            assert.deepEqual(collectionShapesPNGNested.dnaToGenesWithChildren(dnaWithChildren), genesWithChildren);
        });

        it('dnaToAttributes', () => {
            assert.deepEqual(collectionShapesPNGNested.dnaToAttributes(dna), attributes);
        });
        it('dnaToAttributesWithChildren', () => {
            assert.deepEqual(
                collectionShapesPNGNested.dnaToAttributesWithChildren(dnaWithChildren),
                attributesWithChildren,
            );
        });

        it('genesToDna', () => {
            assert.deepEqual(collectionShapesPNGNested.genesToDna(genes), dna);
        });
        it('genesToDnaWithChildren', () => {
            //@ts-expect-error
            assert.deepEqual(collectionShapesPNGNested.genesToDnaWithChildren(genesWithChildren), dnaWithChildren);
        });

        it('attributesToGenes', () => {
            assert.deepEqual(collectionShapesPNGNested.attributesToGenes(attributes), genes);
        });

        it('attributesToGenesWithChildren', () => {
            assert.deepEqual(
                //@ts-expect-error
                collectionShapesPNGNested.attributesToGenesWithChildren(attributesWithChildren),
                genesWithChildren,
            );
        });

        it('dnaToAttributesFormatted', () => {
            const result = collectionShapesPNGNested.dnaToAttributesFormatted(dna);
            assert.deepEqual(
                omit(result, ['imageBg']),
                omit(attributesFormatted, ['imageBg']),
                'dnaToAttributesFormatted',
            );

            assert.equal(
                (result.imageBg as NFTGenerativeTraitImageOption).image,
                attributesFormatted.imageBg.image,
                'imageBg.image',
            );
            assert.deepEqual(result.imageBg, attributesFormatted.imageBg, 'imageBg');
        });

        it('dnaToAttributesFormattedWithChildren', () => {
            //@ts-expect-error
            const result = collectionShapesPNGNested.dnaToAttributesWithChildrenFormatted(dnaWithChildren);

            assert.deepEqual(
                omit(result.attributes, ['imageBg']),
                omit(attributesFormattedWithChildren.attributes, ['imageBg']),
                'imageBg',
            );
            assert.deepEqual(
                omit(result.children.imageFg.attributes, ['imageFg']),
                omit(attributesFormattedWithChildren.children.imageFg.attributes, ['imageFg']),
                'imageFg',
            );

            assert.equal(
                (result.attributes.imageBg as NFTGenerativeTraitImageOption).image,
                attributesFormattedWithChildren.attributes.imageBg.image,
                'imageBg.image',
            );

            assert.equal(
                (result.children.imageFg.attributes.imageFg as NFTGenerativeTraitImageOption).image,
                attributesFormattedWithChildren.children.imageFg.attributes.imageFg.image,
                'imageFg.image',
            );
        });

        it('fullDnaToDna', () => {
            const fullDna = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], ['0x00', []]);
            assert.deepEqual(collectionShapesPNGNested.fullDnaToDna(fullDna), dna, 'fullDnaToDna');
        });

        it('fullDnaToDnaWithChildren', () => {
            const fullDnaChild = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], ['0x00', []]);
            const fullDna = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], ['0x00', [fullDnaChild]]);
            assert.deepEqual(
                collectionShapesPNGNested.fullDnaToDnaWithChildren(fullDna),
                dnaWithChildren,
                'fullDnaToDnaWithChildren',
            );
        });

        it('attributesToFullDna', () => {
            const fullDna = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], ['0x00', []]);
            assert.deepEqual(collectionShapesPNGNested.attributesToFullDna(attributes), fullDna, 'attributesToFullDna');
        });

        it('attributesToFullDnaWithChildren', () => {
            const fullDnaChild = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], ['0x00', []]);
            const fullDna = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], ['0x00', [fullDnaChild]]);
            assert.deepEqual(
                collectionShapesPNGNested.attributesToFullDnaWithChildren(attributesWithChildren),
                { fullDna, children: { imageFg: { fullDna: fullDnaChild } } },
                'attributesToFullDnaWithChildren',
            );
        });

        it('getImageWithChildren', async () => {
            //Generate image by formatting SVG
            const image = await collectionShapesPNGNested.getImageWithChildren(
                //@ts-expect-error
                attributesFormattedWithChildren,
                mergeOptions,
            );
            assert.equal(image, outputImage);
            writeFileSync(outputFile, Buffer.from(image!, 'base64'));
        });
    });
});
