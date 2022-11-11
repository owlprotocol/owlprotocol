import { BN } from 'bn.js';
import { Canvas, Image } from 'canvas';
import { assert } from 'chai';
import { Buffer } from 'buffer';
import { readFileSync } from 'node:fs';
import { join } from 'path';

import { NFTGenerativeCollectionClass } from './NFTGenerativeCollectionClass.js';
import { NFTGenerativeCollection, NFTGenerativeTrait, RGB } from '../../types/index.js';
import { svgToString } from '../../utils/svgToString.js';

describe('NFTGenerativeCollectionClass - Examples/svg_single', () => {
    const mergeOptions = { Canvas, Image };

    const whiteGradient = new Array(256).fill([0, 0, 0]).map(([r, g, b], i) => [r + i, g + i, b + i]) as RGB[];
    const blackGradient = new Array(256).fill([255, 255, 255]).map(([r, g, b], i) => [r - i, g - i, b - i]) as RGB[];
    const folder = './testdata/svg_single';
    const circleSVG = readFileSync(join(folder, 'input/circle.svg'), 'utf-8');
    const squareSVG = readFileSync(join(folder, 'input/square.svg'), 'utf-8');

    const traitColormap: NFTGenerativeTrait = {
        name: 'colormap',
        type: 'colormap',
        options: [
            { value: 'white', colors: whiteGradient },
            { value: 'black', colors: blackGradient },
        ],
    };

    //image_url can be dummy data
    const traitImage: NFTGenerativeTrait = {
        name: 'image',
        type: 'image',
        image_type: 'svg',
        options: [
            {
                value: 'circle',
                image: Buffer.from(circleSVG),
                image_url: 'circle.svg',
            },
            {
                value: 'rectangle',
                image: Buffer.from(squareSVG),
                image_url: 'rectangle.svg',
            },
        ],
    };

    const traitStrokeWidth: NFTGenerativeTrait = {
        name: 'stroke_width',
        type: 'number',
        min: 1,
        max: 4,
    };

    const traitBgColor: NFTGenerativeTrait = {
        name: 'bg_color',
        type: 'color',
        min: 0,
        max: 255,
        colormap: 'colormap',
    };

    const traitFillColor: NFTGenerativeTrait = {
        name: 'fill_color',
        type: 'color',
        min: 0,
        max: 255,
        colormap: 'colormap',
    };

    const traitStrokeColor: NFTGenerativeTrait = {
        name: 'stroke_color',
        type: 'color',
        min: 0,
        max: 255,
        colormap: 'colormap',
    };

    const collectionDef: NFTGenerativeCollection = {
        name: 'Test Collection',
        traits: [traitColormap, traitImage, traitStrokeWidth, traitBgColor, traitFillColor, traitStrokeColor],
    };
    const collection = new NFTGenerativeCollectionClass(collectionDef);

    it('getMaxBitSize', () => {
        assert.equal(collection.getMaxBitSize(), 28, 'getMaxBitSize');
    });

    it('getGeneConfig', () => {
        assert.deepEqual(collection.getGeneConfig(), [0, 1, 2, 4, 12, 20, 28], 'getGeneConfig');
    });

    it('getImage', async () => {
        //White Circle  Stroke  BlackBg     WhiteFill   GreyStroke
        //0     0       00      11111111    00000000    10000000
        const dnaEnc = '0000111111110000000010000000';
        const dna = new BN(dnaEnc, 2);
        //Generate image by formatting SVG
        const image = await collection.getImage(dna, mergeOptions);

        //Manually generated
        const path = join(folder, 'output/circle_white.svg');
        const expected = readFileSync(path, 'utf-8');
        assert.equal(svgToString(image.toString()), svgToString(expected));
    });

    it('getImage', async () => {
        //Black Square  Stroke  WhiteBg     BlackFill   GreyStroke
        //1     1       00      11111111    00000000    10000000
        const dnaEnc = '1100111111110000000010000000';
        const dna = new BN(dnaEnc, 2);
        //Generate image by formatting SVG
        const image = await collection.getImage(dna, mergeOptions);

        //Manually generated
        const path = join(folder, 'output/square_black.svg');
        const expected = readFileSync(path, 'utf-8');
        assert.equal(svgToString(image.toString()), svgToString(expected));
    });
});
