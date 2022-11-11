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

    it('getAmountofTraits', () => {
        assert.equal(attribute.getAmountofTraits(), 4, 'getAmountofTraits');
    });

    describe('formatting', () => {
        const attributeDef: NFTGenerativeTraitEnum = {
            name: 'faction',
            type: 'enum',
            options: ['earth ${subfaction}', 'wind ${subfaction', 'fire ${subfaction}', 'water ${subfaction}'],
        };
        const attribute = new NFTGenerativeTraitEnumClass(attributeDef);

        it('dependencies', () => {
            assert.deepEqual(attribute.dependencies(), ['subfaction'], 'dependencies');
        });

        it('format', () => {
            assert.deepEqual(attribute.format('faction', { subfaction: 'europe' }), 'earth europe', 'format');
        });
    });
});
