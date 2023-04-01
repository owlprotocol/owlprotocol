import { assert } from 'chai';
import { NFTGenerativeTraitNumberClass } from './NFTGenerativeTraitNumberClass.js';
import { NFTGenerativeTraitNumber } from '../../types/index.js';
import { validateNFTGenerativeTrait } from '../../validation/index.js';

describe('NFTGenerativeTraitNumberClass', () => {
    const attributeDef: NFTGenerativeTraitNumber = {
        name: 'power',
        type: 'number',
        min: 2,
        max: 18,
    };
    const attribute = new NFTGenerativeTraitNumberClass(attributeDef);

    // legacy - from bitShifting times
    it.skip('encode', () => {
        const val = attribute.encode(7);
        //Offset by min value
        assert.equal(val, 6, 'encode');
    });

    // legacy - from bitShifting times
    it.skip('decode', () => {
        const val = attribute.decode(6);
        //Offset by min value
        assert.equal(val, 7, 'decode');
    });

    it('getAmountOfTraits', () => {
        assert.equal(attribute.getAmountOfTraits(), 16, 'getAmountOfTraits');
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
