import { assert } from 'chai';
import { ethers } from 'ethers';
import { NFTGenerativeCollectionClass, NFTGenerativeTraitEnumClass } from '../classes/index.js';
import { NFTGenerativeCollectionInterface } from '../classes/NFTGenerativeCollection/NFTGenerativeCollectionInterface.js';
import { collectionEnum, traitEnum } from '../collections/enum.js';
import { NFTGenerativeTraitEnum } from '../types/index.js';

describe('NFTGenerativeCollectionClass', () => {
    describe('enum attribute', () => {
        const dna = '0x' + parseInt('00000010', 2).toString(16).padStart(2, '0');
        const genes = { faction: 2 };
        const attributes = { faction: 'fire' };
        const fullDna = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [dna, []]);

        it('abi', () => {
            assert.deepEqual(collectionEnum.abi(), ['uint8']);
        });

        it('dnaToGenes', () => {
            assert.deepEqual(collectionEnum.dnaToGenes(dna), genes, 'dnaToGenes');
        });

        it('dnaToAttributes', () => {
            assert.deepEqual(collectionEnum.dnaToAttributes(dna), attributes, 'dnaToAttributes');
        });

        it('genesToDna', () => {
            assert.equal(collectionEnum.genesToDna(genes), dna, 'genesToDna');
        });

        it('attributesToGenes', () => {
            assert.deepEqual(collectionEnum.attributesToGenes(attributes), genes, 'attributesToGenes');
        });

        it('fullDnaToDna', () => {
            assert.deepEqual(collectionEnum.fullDnaToDna(fullDna), dna, 'fullDnaToDna');
        });

        it('fullDnaToDnaWithChildren', () => {
            assert.deepEqual(collectionEnum.fullDnaToDnaWithChildren(fullDna), { dna }, 'fullDnaToDnaWithChildren');
        });

        it('attributesToFullDna', () => {
            assert.deepEqual(collectionEnum.attributesToFullDna(attributes), fullDna, 'attributesToFullDna');
        });

        it('attributesToFullDnaWithChildren', () => {
            assert.deepEqual(
                collectionEnum.attributesToFullDnaWithChildren({ attributes }),
                { fullDna },
                'attributesToFullDnaWithChildren',
            );
        });
    });

    describe('nested', () => {
        const dnaParent = '0x' + parseInt('00000010', 2).toString(16).padStart(2, '0');
        const dnaChild = '0x' + parseInt('00000000', 2).toString(16).padStart(2, '0');
        const dna = { dna: dnaParent, children: { region: { dna: dnaChild } } };
        const genes = { genes: { faction: 2 }, children: { region: { genes: { region: 0 } } } };
        const attributes = {
            attributes: { faction: 'fire' },
            children: { region: { attributes: { region: 'north' } } },
        };
        const fullDnaChild = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [dnaChild, []]);
        const fullDna = ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [dnaParent, [fullDnaChild]]);

        let parentCollection: NFTGenerativeCollectionClass<
            { faction: NFTGenerativeTraitEnumClass },
            {
                region: NFTGenerativeCollectionInterface<{ region: NFTGenerativeTraitEnumClass }>;
            }
        >;

        before(() => {
            const regionEnum: NFTGenerativeTraitEnum = {
                name: 'region',
                type: 'enum',
                options: ['north', 'east', 'south', 'west'],
            };

            //@ts-expect-error
            parentCollection = NFTGenerativeCollectionClass.fromData({
                name: 'Faction Region',
                traits: { faction: traitEnum },
                //@ts-expect-error
                children: {
                    region: {
                        name: 'Region',
                        traits: { region: regionEnum },
                    },
                },
            });
        });

        it('abiWithChildren', () => {
            assert.deepEqual(parentCollection.abiWithChildren(), [['uint8'], [['uint8']]]);
        });

        it('dnaToGenesWithChildren', () => {
            assert.deepEqual(parentCollection.dnaToGenesWithChildren(dna), genes, 'dnaToGenesWithChildren');
        });

        it('dnaToAttributesWithChildren', () => {
            assert.deepEqual(parentCollection.dnaToAttributesWithChildren(dna), attributes, 'dnaToAttributes');
        });

        it('genesToDnaWithChildren', () => {
            assert.deepEqual(parentCollection.genesToDnaWithChildren(genes), dna, 'genesToDnaWithChildren');
        });

        it('attributesToGenesWithChildren', () => {
            assert.deepEqual(
                parentCollection.attributesToGenesWithChildren(attributes),
                genes,
                'attributesToGenesWithChildren',
            );
        });

        it('fullDnaToDnaWithChildren', () => {
            assert.deepEqual(parentCollection.fullDnaToDnaWithChildren(fullDna), dna, 'fullDnaToDnaWithChildren');
        });

        it('attributesToFullDnaWithChildren', () => {
            assert.deepEqual(
                parentCollection.attributesToFullDnaWithChildren(attributes),
                { fullDna, children: { region: { fullDna: fullDnaChild } } },
                'attributesToFullDnaWithChildren',
            );
        });
    });
});
