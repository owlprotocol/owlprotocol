import { Canvas, Image } from 'canvas';
import { assert } from 'chai';
import { ethers } from 'ethers';
import { omit } from 'lodash-es';

import { writeFileSync } from 'fs';
import { collectionShapes } from './shapes.js';
import { traitColormap } from './colormap.js';
import { svgToString } from '../../src/utils/svgToString.js';
import { NFTGenerativeTraitImageOption } from '../../src/index.js';

describe('NFTGenerativeCollectionClass', () => {
    const mergeOptions = { Canvas, Image };

    describe('shapes', () => {
        const bgCircle =
            // eslint-disable-next-line quotes
            "<svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='50' fill='#ffffff' /></svg>";
        const fgCircle =
            // eslint-disable-next-line quotes
            "<svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='40' fill='#000000' stroke='#808080' stroke-width='0' /></svg>";
        const outputImage =
            // eslint-disable-next-line quotes
            "<svg xmlns='http://www.w3.org/2000/svg' version='1.2' width='800' height='800' viewBox='0 0 800 800'><svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='50' fill='#ffffff' /></svg><svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='40' fill='#000000' stroke='#808080' stroke-width='0' /></svg></svg>";

        //colormap, imageBg, imageFg, strokeWidth, bgColor, fillColor, strokeColor, faction
        const dnaElements = [
            '00000000', //white
            '00000000',
            '00000000', //circle, circle
            '00000000', //0
            '11111111',
            '00000000',
            '10000000', //black, white, grey
            '00000000', //earth
        ];
        const dna =
            '0x' +
            parseInt(dnaElements.join(''), 2)
                .toString(16)
                .padStart(2 * dnaElements.length, '0');
        const genes = {
            colormap: 0,
            imageBg: 0,
            imageFg: 0,
            strokeWidth: 0,
            bgColor: 255,
            fillColor: 0,
            strokeColor: 128,
            faction: 0,
        };
        const attributes = {
            colormap: 'white',
            imageBg: 'circle',
            imageFg: 'circle',
            strokeWidth: 0,
            bgColor: 255,
            fillColor: 0,
            strokeColor: 128,
            faction: 'earth',
        };
        const attributesFormatted = {
            colormap: traitColormap.options[0],
            imageBg: {
                value: 'circle',
                image: bgCircle,
                image_url: 'bgCircle.svg',
            },
            imageFg: {
                value: 'circle',
                image: fgCircle,
                image_url: 'fgCircle.svg',
            },
            strokeWidth: 0,
            bgColor: '#ffffff',
            fillColor: '#000000',
            strokeColor: '#808080',
            faction: 'earth',
        };
        const fullDna = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [dna, []]);

        it('abi', () => {
            assert.deepEqual(collectionShapes.abi(), [
                'uint8',
                'uint8',
                'uint8',
                'uint8',
                'uint8',
                'uint8',
                'uint8',
                'uint8',
            ]);
        });

        it('dnaToGenes', () => {
            assert.deepEqual(collectionShapes.dnaToGenes(dna), genes, 'dnaToGenes');
        });

        it('dnaToAttributes', () => {
            assert.deepEqual(collectionShapes.dnaToAttributes(dna), attributes, 'dnaToAttributes');
        });

        it('genesToDna', () => {
            assert.equal(collectionShapes.genesToDna(genes), dna, 'genesToDna');
        });

        it('attributesToGenes', () => {
            assert.deepEqual(collectionShapes.attributesToGenes(attributes), genes, 'attributesToGenes');
        });

        it('dnaToAttributesFormatted', () => {
            const result = collectionShapes.dnaToAttributesFormatted(dna);
            assert.deepEqual(
                omit(result, ['imageBg', 'imageFg']),
                omit(attributesFormatted, ['imageBg', 'imageFg']),
                'dnaToAttributesFormatted',
            );

            assert.equal(
                (result.imageBg as NFTGenerativeTraitImageOption).image,
                attributesFormatted.imageBg.image.toString(),
                'imageBg.image',
            );
            assert.equal(
                (result.imageFg as NFTGenerativeTraitImageOption).image,
                attributesFormatted.imageFg.image.toString(),
                'imageFg.image',
            );

            assert.deepEqual(result.imageBg, attributesFormatted.imageBg, 'imageBg');
            assert.deepEqual(result.imageFg, attributesFormatted.imageFg, 'imageFg');
        });

        it('fullDnaToDna', () => {
            assert.deepEqual(collectionShapes.fullDnaToDna(fullDna), dna, 'fullDnaToDna');
        });

        it('fullDnaToDnaWithChildren', () => {
            assert.deepEqual(collectionShapes.fullDnaToDnaWithChildren(fullDna), { dna }, 'fullDnaToDnaWithChildren');
        });

        it('attributesToFullDna', () => {
            assert.deepEqual(collectionShapes.attributesToFullDna(attributes), fullDna, 'attributesToFullDna');
        });

        it('attributesToFullDnaWithChildren', () => {
            assert.deepEqual(
                collectionShapes.attributesToFullDnaWithChildren({ attributes }),
                { fullDna },
                'attributesToFullDnaWithChildren',
            );
        });

        it('getImage', async () => {
            //Generate image by formatting SVG
            const image = await collectionShapes.getImage(attributesFormatted, mergeOptions);
            assert.equal(svgToString(image!.toString()), svgToString(outputImage));
            writeFileSync('./testdata/shapes/output/circleOnCircle.svg', image!.toString());
        });
    });
});
