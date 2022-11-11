import { NFTCollection } from './NFTCollection.js';
import { NFTGenerativeTraitBase } from './NFTGenerativeTrait/NFTGenerativeTraitBase.js';

/** NFTGenerativeCollection Interface describing a generative collection */
export interface NFTGenerativeCollection<
    T extends Record<string, NFTGenerativeTraitBase> = Record<string, NFTGenerativeTraitBase>,
    C extends Record<string, NFTGenerativeCollection> | undefined = undefined,
> extends NFTCollection {
    readonly traits: T;
    readonly children?: C;
    readonly generatedImageType?: 'svg' | 'png';
}
