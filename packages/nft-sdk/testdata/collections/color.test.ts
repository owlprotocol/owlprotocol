import { assert } from 'chai';
import { ethers } from 'ethers';
import { collectionColor } from './color.js';
import { traitColormap } from './colormap.js';

describe('NFTGenerativeCollectionClass', () => {
    describe('color/colormap attribute', () => {
        const dna = '0x' + parseInt('0000000000000010', 2).toString(16).padStart(4, '0');
        const genes = { colormap: 0, bgColor: 2 };
        const attributes = { colormap: 'white', bgColor: 2 };
        const attributesFormatted = { colormap: traitColormap.options[0], bgColor: '#020202' };
        const fullDna = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [dna, []]);

        it('abi', () => {
            assert.deepEqual(collectionColor.abi(), ['uint8', 'uint8']);
        });

        it('dnaToGenes', () => {
            assert.deepEqual(collectionColor.dnaToGenes(dna), genes, 'dnaToGenes');
        });

        it('dnaToAttributes', () => {
            assert.deepEqual(collectionColor.dnaToAttributes(dna), attributes, 'dnaToAttributes');
        });

        it('genesToDna', () => {
            assert.equal(collectionColor.genesToDna(genes), dna, 'genesToDna');
        });

        it('attributesToGenes', () => {
            assert.deepEqual(collectionColor.attributesToGenes(attributes), genes, 'attributesToGenes');
        });

        it('dnaToAttributesFormatted', () => {
            assert.deepEqual(
                collectionColor.dnaToAttributesFormatted(dna),
                attributesFormatted,
                'dnaToAttributesFormatted',
            );
        });

        it('fullDnaToDna', () => {
            assert.deepEqual(collectionColor.fullDnaToDna(fullDna), dna, 'fullDnaToDna');
        });

        it('fullDnaToDnaWithChildren', () => {
            assert.deepEqual(collectionColor.fullDnaToDnaWithChildren(fullDna), { dna }, 'fullDnaToDnaWithChildren');
        });

        it('attributesToFullDna', () => {
            assert.deepEqual(collectionColor.attributesToFullDna(attributes), fullDna, 'attributesToFullDna');
        });

        it('attributesToFullDnaWithChildren', () => {
            assert.deepEqual(
                collectionColor.attributesToFullDnaWithChildren({ attributes }),
                { fullDna },
                'attributesToFullDnaWithChildren',
            );
        });
    });
});
