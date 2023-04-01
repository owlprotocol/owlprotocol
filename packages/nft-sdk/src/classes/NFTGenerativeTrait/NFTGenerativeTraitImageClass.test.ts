import { assert } from 'chai';
import { NFTGenerativeTraitImageClass } from './NFTGenerativeTraitImageClass.js';
import { NFTGenerativeTraitImage } from '../../types/index.js';

describe('NFTGenerativeTraitImageClass', () => {
    describe('formatting', () => {
        //image_url can be dummy data
        const attributeDef: NFTGenerativeTraitImage = {
            name: 'faction',
            type: 'image',
            image_type: 'svg',
            options: [
                {
                    value: 'earth ${subfaction}',
                    image: '<>${bg_color}</>',
                    image_url: 'earth.svg',
                },
                {
                    value: 'wind ${subfaction',
                    image: '<>${bg_color}</>',
                    image_url: 'wind.svg',
                },
                {
                    value: 'fire ${subfaction}',
                    image: '<>${bg_color}</>',
                    image_url: 'fire.svg',
                },
                {
                    value: 'water ${subfaction}',
                    image: '<>${bg_color}</>',
                    image_url: 'water.svg',
                },
            ],
        };
        const attribute = new NFTGenerativeTraitImageClass(attributeDef);

        it('dependencies', () => {
            assert.deepEqual(attribute.dependencies(), ['subfaction', 'bg_color'], 'dependencies');
        });

        // TODO: this makes no sense, I assume the attribute passed in should be 'earth' or the gene for earth?
        it.skip('format', () => {
            const attributeFormatted = attribute.format('faction', {
                subfaction: 'europe',
                bg_color: 'black',
            });
            assert.equal(attributeFormatted.value, 'earth europe', 'format.value');
            assert.equal(attributeFormatted.image, '<>black</>', 'format.image');
        });
    });
});
