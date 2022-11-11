import { NFTGenerativeCollection } from './NFTGenerativeCollection.js';
import { AttributeValue } from './NFTGenerativeTrait/NFTGenerativeTrait.js';

export interface NFTGenerativeItem<Collection extends NFTGenerativeCollection = NFTGenerativeCollection> {
    readonly collection: Collection;
    readonly attributes: { [K in keyof Collection['traits']]: AttributeValue };
    readonly children?: Collection['children'] extends Record<string, NFTGenerativeCollection>
    ? { [K in keyof Collection['children']]: NFTGenerativeItem<Collection['children'][K]> }
    : undefined;
}
