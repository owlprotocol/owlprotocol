/** Tests showcasing UInt1Array use */
import BN from 'bn.js';
import { assert } from 'chai';
import { sliceBin, binToNumber } from './BufferUtils.js';

describe('BufferUtils', () => {
    it('sliceBin', () => {
        const n = new BN('1101', 2); //1101
        assert.equal('11', sliceBin(n, 4, 0, 2));
    });

    it('binToNumber', () => {
        assert.equal(binToNumber('1111'), 15);
    });
});
