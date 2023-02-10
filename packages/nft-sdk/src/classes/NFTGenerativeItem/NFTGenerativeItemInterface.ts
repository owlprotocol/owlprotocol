import { Options as MergeImagesOptions } from 'merge-images';
import type { NFTGenerativeItem } from '../../types/NFTGenerativeItem.js';
import type { NFTGenerativeCollectionInterface } from '../NFTGenerativeCollection/NFTGenerativeCollectionInterface.js';

//@ts-expect-error
export interface NFTGenerativeItemInterface<
    Collection extends NFTGenerativeCollectionInterface = NFTGenerativeCollectionInterface,
> extends NFTGenerativeItem<Collection> {
    readonly collection: Collection;
    readonly attributes: NFTGenerativeItem<Collection>['attributes'];
    readonly children: Collection['children'] extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Collection['children']]: NFTGenerativeItemInterface<Collection['children'][K]> }
        : undefined;

    genes(): ReturnType<Collection['attributesToGenes']>;
    genesWithChildren(): ReturnType<Collection['attributesToGenesWithChildren']>;

    dna(): ReturnType<Collection['attributesToDna']>;
    dnaWithChildren(): ReturnType<Collection['attributesToDnaWithChildren']>;

    fullDna(): ReturnType<Collection['attributesToFullDna']>;
    fullDnaWithChildren(): ReturnType<Collection['attributesToFullDnaWithChildren']>;

    attributesFormatted(): ReturnType<Collection['attributesToAttributesFormatted']>;
    attributesFormattedWithChildren(): ReturnType<Collection['attributesToAttributesFormattedWithChildren']>;

    getImage(mergeOptions?: MergeImagesOptions, width?: number, height?: number): Promise<string | undefined>;
    getImageWithChildren(
        mergeOptions?: MergeImagesOptions,
        width?: number,
        height?: number,
    ): Promise<string | undefined>;

    /***** Full with Children *****/

    /*
    getJsonMetadata(): Promise<{
        attributes: NFTGenerativeItem<Collection>['attributes'];
    }>;
    getJsonMetadataFull(): Promise<{
        attributes: Awaited<ReturnType<NFTGenerativeItemInterface<Collection>['getJsonMetadata']>>;
        children: Collection['children'] extends Record<string, NFTGenerativeCollectionInterface>
        ? {
            [K in keyof Collection['children']]: Awaited<
                ReturnType<NFTGenerativeItemInterface<Collection['children'][K]>['getJsonMetadata']>
            >;
        }
        : undefined;
    }>;
    */
    withAttribute(name: keyof Collection['traits'], value: string | number): NFTGenerativeItemInterface<Collection>;
    withChild(
        name: keyof Collection['children'],
        value: Collection['children'][keyof Collection['children']],
    ): NFTGenerativeItem<Collection>;
}
