import { assert, expect } from 'chai';
import { NFTGenerativeTraitNumberClass } from './NFTGenerativeTraitNumberClass.js';
import { NFTGenerativeTraitNumber } from '../../types/index.js';
import { validateNFTGenerativeTrait, InvalidNFTGenerativeTrait } from '../../validation/index.js';

describe('NFTGenerativeTraitNumberClass', () => {
    const attributeDef: NFTGenerativeTraitNumber = {
        name: 'power',
        type: 'number',
        min: 1,
        max: 17,
    };
    const attribute = new NFTGenerativeTraitNumberClass(attributeDef);

    it('encode', () => {
        const val = attribute.encode(7);
        //Offset by min value
        assert.equal(val, 6, 'encode');
    });

    it('decode', () => {
        const val = attribute.decode(6);
        //Offset by min value
        assert.equal(val, 7, 'decode');
    });

    it('getAmountofTraits', () => {
        assert.equal(attribute.getAmountofTraits(), 16, 'getAmountofTraits');
    });

    it.skip('validateNFTGenerativeTraitNumberOptions', () => {
        //Valid options range
        validateNFTGenerativeTrait(attribute);
        //Invalid options range - too small
        //expect(() => validateNFTGenerativeTrait({ ...attribute, bitSize: 3 })).throw(InvalidNFTGenerativeTrait);
        //Invalid options range - too large
        //expect(() => validateNFTGenerativeTrait({ ...attribute, bitSize: 257 })).throw(InvalidNFTGenerativeTrait);
    });
});
