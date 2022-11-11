import type { IPFS } from 'ipfs-core-types';
import type { CID } from 'ipfs-http-client';
import type { BytesLike } from '@ethersproject/bytes';
import type { Options as MergeImagesOptions } from 'merge-images';
import type {
    NFTGenerativeCollection,
    JSONEncodable,
    AttributeFormatted,
    AttributeValue,
    NFTGenerativeItem,
} from '../../types/index.js';
import type { NFTGenerativeTraitBaseInterface } from '../NFTGenerativeTrait/NFTGenerativeTraitBaseInterface.js';
//import type { NFTGenerativeItem } from '../NFTGenerativeItem/NFTGenerativeItem.js';

export type Gene = number;
export type ValueOrArray<T> = T | ValueOrArray<T>[];

export interface NFTGenerativeCollectionInterface<
    Traits extends Record<string, NFTGenerativeTraitBaseInterface> = Record<string, NFTGenerativeTraitBaseInterface>,
    Children extends Record<string, NFTGenerativeCollectionInterface> | undefined = undefined,
> extends NFTGenerativeCollection<Traits, Children> {
    readonly traits: Traits;
    readonly children?: Children;

    /***** Collection Info*****/
    traitKeys(): keyof Traits[];
    childrenKeys(): Children extends Record<string, NFTGenerativeCollectionInterface> ? keyof Children[] : undefined;
    getJsonMetadata(): {
        traits: { [K in keyof Traits]: JSONEncodable };
    };
    getJsonMetadataWithChildren(): {
        traits: { [K in keyof Traits]: JSONEncodable };
        children: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: ReturnType<Children[K]['getJsonMetadataWithChildren']> }
        : undefined;
    };
    abi(): ('uint8' | 'uint16' | 'int8' | 'int16')[];
    abiWithChildren(): ValueOrArray<'uint8' | 'uint16' | 'int8' | 'int16'>;

    /** Factory */
    create({
        attributes,
        children,
    }: {
        attributes: { [K in keyof Traits]: AttributeValue };
        children?: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['create']>[0] }
        : undefined;
    }): NFTGenerativeItem<NFTGenerativeCollectionInterface>;
    createFromDna({
        dna,
        children,
    }: {
        dna: string;
        children?: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['createFromDna']>[0] }
        : undefined;
    }): NFTGenerativeItem<NFTGenerativeCollectionInterface>;
    createFromFullDna(fullDna: string): NFTGenerativeItem<NFTGenerativeCollectionInterface>;

    /** DNA to Genes */
    dnaToGene(dna: BytesLike, name: keyof Traits): Gene;
    dnaToGenes(dna: BytesLike): { [K in keyof Traits]: Gene };
    dnaToGenesWithChildren({
        dna,
        children,
    }: {
        dna: BytesLike;
        children?: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['dnaToGenesWithChildren']>[0] }
        : undefined;
    }): {
        genes: { [K in keyof Traits]: Gene };
        children: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: ReturnType<Children[K]['dnaToGenesWithChildren']> }
        : undefined;
    };

    /** DNA to Attributes */
    dnaToAttribute(dna: BytesLike, name: keyof Traits): AttributeValue;
    dnaToAttributes(dna: BytesLike): { [K in keyof Traits]: AttributeValue };
    dnaToAttributesWithChildren({
        dna,
        children,
    }: {
        dna: BytesLike;
        children?: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['dnaToAttributesWithChildren']>[0] }
        : undefined;
    }): {
        attributes: { [K in keyof Traits]: AttributeValue };
        children?: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: ReturnType<Children[K]['dnaToAttributesWithChildren']> }
        : undefined;
    };

    attributesToAttributesFormatted(attributes: { [K in keyof Traits]: AttributeValue }): {
        [K in keyof Traits]: AttributeFormatted;
    };
    attributesToAttributesFormattedWithChildren({
        attributes,
        children,
    }: {
        attributes: { [K in keyof Traits]: AttributeValue };
        children?: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['attributesToAttributesFormattedWithChildren']>[0] }
        : undefined;
    }): {
        attributes: { [K in keyof Traits]: Gene };
        children: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: ReturnType<Children[K]['attributesToAttributesFormattedWithChildren']> }
        : undefined;
    };

    dnaToAttributesFormatted(dna: BytesLike): { [K in keyof Traits]: AttributeFormatted };
    dnaToAttributesWithChildrenFormatted({
        dna,
        children,
    }: {
        dna: BytesLike;
        children?: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['dnaToAttributesWithChildrenFormatted']>[0] }
        : undefined;
    }): {
        attributes: { [K in keyof Traits]: AttributeFormatted };
        children: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: ReturnType<Children[K]['dnaToAttributesWithChildrenFormatted']> }
        : undefined;
    };

    /** Attribute to Gene */
    attributeToGene(attribute: AttributeValue, name: keyof Traits): Gene;
    attributesToGenes(attributes: { [K in keyof Traits]: AttributeValue }): { [K in keyof Traits]: Gene };
    attributesToGenesWithChildren({
        attributes,
        children,
    }: {
        attributes: { [K in keyof Traits]: AttributeValue };
        children?: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['attributesToGenesWithChildren']>[0] }
        : undefined;
    }): {
        genes: { [K in keyof Traits]: Gene };
        children: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: ReturnType<Children[K]['attributesToGenesWithChildren']> }
        : undefined;
    };

    /** Gene to DNA */
    genesToDna(genes: { [K in keyof Traits]: Gene }): string;
    genesToDnaWithChildren({
        genes,
        children,
    }: {
        genes: { [K in keyof Traits]: Gene };
        children?: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['genesToDnaWithChildren']>[0] }
        : undefined;
    }): {
        dna: string;
        children: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: ReturnType<Children[K]['genesToDnaWithChildren']> }
        : undefined;
    };

    /** Attributes to DNA */
    attributesToDna(attributes: { [K in keyof Traits]: AttributeValue }): string;
    attributesToDnaWithChildren({
        attributes,
        children,
    }: {
        attributes: { [K in keyof Traits]: AttributeValue };
        children?: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['attributesToDnaWithChildren']>[0] }
        : undefined;
    }): {
        dna: string;
        children: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: ReturnType<Children[K]['attributesToDnaWithChildren']> }
        : undefined;
    };

    /** Full DNA to DNA */
    fullDnaToDna(fullDna: BytesLike): string;
    fullDnaToDnaWithChildren(fullDna: BytesLike): {
        dna: string;
        children: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: ReturnType<Children[K]['fullDnaToDnaWithChildren']> }
        : undefined;
    };

    /** Attributes to Full DNA */
    attributesToFullDna(attributes: { [K in keyof Traits]: AttributeValue }): string;
    attributesToFullDnaWithChildren({
        attributes,
        children,
    }: {
        attributes: { [K in keyof Traits]: AttributeValue };
        children?: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['attributesToFullDnaWithChildren']>[0] }
        : undefined;
    }): {
        fullDna: string;
        children: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: ReturnType<Children[K]['attributesToFullDnaWithChildren']> }
        : undefined;
    };

    getImage(
        attributes: { [K in keyof Traits]: AttributeFormatted },
        mergeOptions?: MergeImagesOptions,
        width?: number,
        height?: number,
    ): Promise<string | undefined>;

    getImageWithChildren(
        {
            attributes,
            children,
        }: {
            attributes: {
                [K in keyof Traits]: AttributeFormatted;
            };
            children?: Children extends Record<string, NFTGenerativeCollectionInterface>
            ? { [K in keyof Children]: Parameters<Children[K]['getImageWithChildren']>[0] }
            : undefined;
        },
        mergeOptions?: MergeImagesOptions,
        width?: number,
        height?: number,
    ): Promise<string | undefined>;

    /***** Upload IPFS */
    uploadIPFS(client: IPFS): Promise<CID>;
}
