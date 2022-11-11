import { assert } from 'chai';
import { NFTGenerativeTraitColorClass } from './NFTGenerativeTraitColorClass.js';
import { NFTGenerativeTraitColor, RGB } from '../../types/index.js';

describe('NFTGenerativeTraitColorClass', () => {
    describe('formatting', () => {
        const attributeDef: NFTGenerativeTraitColor = {
            name: 'bg_color',
            type: 'color',
            min: 0,
            max: 255,
            colormap: 'bg_colormap',
        };
        const attribute = new NFTGenerativeTraitColorClass(attributeDef);
        const colormap = new Array(255).fill([255, 255, 255]).map(([r, g, b], i) => [r - i, g - i, b - i]) as RGB[];

        it('rgb', () => {
            assert.deepEqual(attribute.rgb(1, colormap), [254, 254, 254], 'rgb');
        });

        it('hex', () => {
            assert.deepEqual(attribute.hex(1, colormap), '#fefefe', 'hex');
        });
    });
});
