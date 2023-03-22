import { assert } from 'chai';
import { waterEnumItem, fireEnumItem } from '../../../testdata/collections/index.js';

describe('NFTGenerativeItemClass', () => {
    it('withAttribute', () => {
        const result = waterEnumItem.withAttribute('faction', 'fire');
        const expected = fireEnumItem;
        assert.equal(result.dna, expected.dna);
    });
});
