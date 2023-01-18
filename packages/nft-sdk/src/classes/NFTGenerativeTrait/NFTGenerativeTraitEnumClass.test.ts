import { assert } from 'chai';
import { NFTGenerativeTraitEnumClass } from './NFTGenerativeTraitEnumClass.js';
import { NFTGenerativeTraitEnum } from '../../types/index.js';

describe('NFTGenerativeTraitEnumClass', () => {
    const attributeDef: NFTGenerativeTraitEnum = {
        name: 'faction',
        type: 'enum',
        options: ['earth', 'wind', 'fire', 'water'],
    };
    const attribute = new NFTGenerativeTraitEnumClass(attributeDef);

    it('encode', () => {
        const val = attribute.encode('fire');
        assert.equal(val, 2, 'encode');
    });

    it('decode', () => {
        const val = attribute.decode(2);
        assert.deepEqual('fire', val, 'decode');
    });

    it('getAmountOfTraits', () => {
        assert.equal(attribute.getAmountOfTraits(), 4, 'getAmountOfTraits');
    });

    describe('formatting', () => {
        const attributeDef: NFTGenerativeTraitEnum = {
            name: 'faction',
            type: 'enum',
            options: ['earth ${subfaction}', 'wind ${subfaction}', 'fire ${subfaction}', 'water ${subfaction}'],
        };
        const attribute = new NFTGenerativeTraitEnumClass(attributeDef);

        it('dependencies', () => {
            assert.deepEqual(attribute.dependencies(), ['subfaction'], 'dependencies');
        });

        // TODO: this makes no sense, I assume the attribute passed in should be 'earth' or the gene for earth?
        it.skip('format', () => {
            assert.deepEqual(attribute.format('faction', { subfaction: 'europe' }), 'earth europe', 'format');
        });
    });
});
