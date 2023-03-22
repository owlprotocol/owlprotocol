import { Canvas, Image } from 'canvas';
import { assert } from 'chai';
import { ethers } from 'ethers';
import { omit } from 'lodash-es';
import { readFileSync, writeFileSync } from 'fs';

import { collectionShapesPNG, bgCirclePNG, fgCirclePNG } from './shapesPNG.js';
import { NFTGenerativeTraitImageOption } from '../../src/index.js';

describe('NFTGenerativeCollectionClass', () => {
    const mergeOptions = { Canvas, Image };

    describe('shapesPNG', () => {
        const outputFile = './testdata/shapesPNG/output/circleOnCircle.png';
        const outputImage = readFileSync(outputFile, 'base64');
        //imageBg, imageFg
        const dnaElements = [
            '00000000',
            '00000000', //circle, circle
        ];
        const dna =
            '0x' +
            parseInt(dnaElements.join(''), 2)
                .toString(16)
                .padStart(2 * dnaElements.length, '0');
        const genes = {
            imageBg: 0,
            imageFg: 0,
        };
        const attributes = {
            imageBg: 'circle',
            imageFg: 'circle',
        };
        const attributesFormatted = {
            imageBg: {
                value: 'circle',
                image: bgCirclePNG,
                image_url: 'bgCircle.png',
            },
            imageFg: {
                value: 'circle',
                image: fgCirclePNG,
                image_url: 'fgCircle.png',
            },
        };
        const fullDna = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [dna, []]);

        it('abi', () => {
            assert.deepEqual(collectionShapesPNG.abi(), ['uint8', 'uint8']);
        });

        it('dnaToGenes', () => {
            assert.deepEqual(collectionShapesPNG.dnaToGenes(dna), genes, 'dnaToGenes');
        });

        it('dnaToAttributes', () => {
            assert.deepEqual(collectionShapesPNG.dnaToAttributes(dna), attributes, 'dnaToAttributes');
        });

        it('genesToDna', () => {
            assert.equal(collectionShapesPNG.genesToDna(genes), dna, 'genesToDna');
        });

        it('attributesToGenes', () => {
            assert.deepEqual(collectionShapesPNG.attributesToGenes(attributes), genes, 'attributesToGenes');
        });

        it('dnaToAttributesFormatted', () => {
            const result = collectionShapesPNG.dnaToAttributesFormatted(dna);
            assert.deepEqual(
                omit(result, ['imageBg', 'imageFg']),
                omit(attributesFormatted, ['imageBg', 'imageFg']),
                'dnaToAttributesFormatted',
            );

            assert.equal(
                (result.imageBg as NFTGenerativeTraitImageOption).image,
                attributesFormatted.imageBg.image,
                'imageBg.image',
            );
            assert.equal(
                (result.imageFg as NFTGenerativeTraitImageOption).image,
                attributesFormatted.imageFg.image,
                'imageFg.image',
            );

            assert.deepEqual(result.imageBg, attributesFormatted.imageBg, 'imageBg');
            assert.deepEqual(result.imageFg, attributesFormatted.imageFg, 'imageFg');
        });

        it('fullDnaToDna', () => {
            assert.deepEqual(collectionShapesPNG.fullDnaToDna(fullDna), dna, 'fullDnaToDna');
        });

        it('fullDnaToDnaWithChildren', () => {
            assert.deepEqual(
                collectionShapesPNG.fullDnaToDnaWithChildren(fullDna),
                { dna },
                'fullDnaToDnaWithChildren',
            );
        });

        it('attributesToFullDna', () => {
            assert.deepEqual(collectionShapesPNG.attributesToFullDna(attributes), fullDna, 'attributesToFullDna');
        });

        it('attributesToFullDnaWithChildren', () => {
            assert.deepEqual(
                collectionShapesPNG.attributesToFullDnaWithChildren({ attributes }),
                { fullDna },
                'attributesToFullDnaWithChildren',
            );
        });

        it('getImage', async () => {
            //Generate image by formatting SVG
            const image = await collectionShapesPNG.getImage(attributesFormatted, mergeOptions);
            assert.equal(image, outputImage);
            writeFileSync(outputFile, Buffer.from(image!, 'base64'));
        });
    });
});
