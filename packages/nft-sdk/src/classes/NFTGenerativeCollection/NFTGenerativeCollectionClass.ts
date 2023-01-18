import type { IPFS } from 'ipfs-core-types';
import type { CID } from 'ipfs-http-client';
import { pick, omitBy, isUndefined, mapValues, keys, values, compact, isEmpty, uniq } from 'lodash-es';
import mergeImages, { Options as MergeImagesOptions } from 'merge-images';
import { BytesLike } from '@ethersproject/bytes';
import { ethers } from 'ethers';
import { Buffer } from 'buffer';
import { join } from 'path';

import type { Gene, NFTGenerativeCollectionInterface } from './NFTGenerativeCollectionInterface.js';
import {
    AttributeFormatted,
    AttributeValue,
    isNFTGenerativeTraitImage,
    NFTGenerativeCollection,
    isNFTGenerativeTraitColormap,
    Fs,
    NFTGenerativeTraitImageOption,
} from '../../types/index.js';

import { mergeSVG } from '../../utils/mergeSVG.js';
import { defaultColormapOptions } from '../../utils/colormap.js';
import { asyncIterableToArray } from '../../utils/asyncIterableToArray.js';
import { TopologicalSort } from '../../utils/TopologicalSort.js';

import {
    createFromNFTGenerativeGenerativeAttributeBase,
    NFTGenerativeTraitClassInvalid,
    NFTGenerativeTraitColorClass,
    NFTGenerativeTraitColormapClass,
    NFTGenerativeTraitNumberClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitImageClass,
} from '../NFTGenerativeTrait/index.js';

import type { NFTGenerativeTraitBaseInterface } from '../NFTGenerativeTrait/NFTGenerativeTraitBaseInterface.js';
import type { NFTGenerativeItemInterface } from '../NFTGenerativeItem/NFTGenerativeItemInterface.js';
import { NFTGenerativeItemClass } from '../NFTGenerativeItem/NFTGenerativeItemClass.js';

const isEmptyOrUndefined = (x: any) => isUndefined(x) || isEmpty(x);

export class Unimplemented extends Error {
    constructor(msg?: string) {
        if (!msg) super('Unimplemented');
        else super(`Unimplemented: ${msg}`);

        this.name = 'Unimplemented';
    }
}

export class NFTGenerativeCollectionClassAttributeNotFound extends Error {
    constructor(msg?: string) {
        if (!msg) super('Attribute not found');
        else super(`Attribute not found: ${msg}`);

        this.name = 'NFTGenerativeCollectionClassAttributeNotFound';
    }
}

export class NFTGenerativeCollectionClassAttributeDNAOutOfRange extends Error {
    constructor(msg?: string) {
        if (!msg) super('DNA out of range');
        else super(`DNA out of range: ${msg}`);

        this.name = 'NFTGenerativeCollectionClassAttributeDNAOutOfRange';
    }
}

export class NFTGenerativeCollectionClass<
    Traits extends Record<string, NFTGenerativeTraitBaseInterface> = Record<string, NFTGenerativeTraitBaseInterface>,
    Children extends Record<string, NFTGenerativeCollectionInterface> | undefined = undefined,
> implements NFTGenerativeCollectionInterface<Traits, Children>
{
    readonly name: NFTGenerativeCollectionInterface['name'];
    readonly description: NFTGenerativeCollectionInterface['description'];
    readonly image: NFTGenerativeCollectionInterface['image'];
    readonly external_url: NFTGenerativeCollectionInterface['external_url'];
    readonly seller_fee_basis_points: NFTGenerativeCollectionInterface['seller_fee_basis_points'];
    readonly fee_recipient: NFTGenerativeCollectionInterface['fee_recipient'];
    readonly generatedImageType: NFTGenerativeCollectionInterface['generatedImageType'];

    readonly traits: Traits;
    readonly children?: Children;

    private constructor({
        name,
        description,
        image,
        external_url,
        seller_fee_basis_points,
        fee_recipient,
        traits,
        children,
        generatedImageType,
    }: NFTGenerativeCollection<Traits, Children>) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.external_url = external_url;
        this.seller_fee_basis_points = seller_fee_basis_points;
        this.fee_recipient = fee_recipient;
        this.generatedImageType = generatedImageType;

        this.traits = traits;
        this.children = children;
    }

    static fromData(collection: NFTGenerativeCollection) {
        const traits = mapValues(collection.traits, (c) => createFromNFTGenerativeGenerativeAttributeBase(c));
        //@ts-expect-error
        const children = mapValues(collection.children, (c) => NFTGenerativeCollectionClass.fromData(c)) as any;

        return new NFTGenerativeCollectionClass({
            ...collection,
            traits,
            children,
        });
    }

    static fullDnaDecode(fullDna: BytesLike): [string, string[]] {
        return ethers.utils.defaultAbiCoder.decode(['bytes', 'bytes[]'], fullDna) as [string, string[]];
    }

    static fullDnaEncode(dna: BytesLike, childDna: BytesLike[]): string {
        return ethers.utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [dna, childDna]) as string;
    }

    /**
     * Load existing collection from IPFS.
     * Load the specification, then load all image layers.
     *
     * @param client
     * @param path
     */
    static async loadFromIPFS(client: IPFS, path: CID | string): Promise<NFTGenerativeCollectionClass> {
        const collectionSpecBuff = Buffer.concat(await asyncIterableToArray(client.cat(path)));
        const collectionSpec = JSON.parse(collectionSpecBuff.toString());
        const collection = new NFTGenerativeCollectionClass(collectionSpec);
        return collection;
    }

    /** Static Factory Functions */
    /**
     * Factory function loading collection from json specification and image assets.
     *
     * Some sensible defaults if user forgets to specify:
     *  - (TODO) TraitImage.name = subfolder name, TraitImage.options[i].name = file name, TraitImage.options[i].image_type = file type
     *  - (TODO) bitSize largest bit value
     *  - Colormap traits can use default options `grey`, `rg`, `rb`, `gb` if not colors provided.
     * @param path
     * @param fs module to enable any fs implementation
     * @returns
     */
    static loadFromFolder(path: string, fs: Fs): NFTGenerativeCollectionClass {
        const rootDir = path;
        const collectionFile = join(rootDir, 'collection.json');
        const layersDir = join(rootDir, 'layers');

        const collectionSpecInput = JSON.parse(fs.readFileSync(collectionFile, 'utf-8')) as NFTGenerativeCollection;

        const traits = mapValues(collectionSpecInput.traits, (trait) => {
            if (isNFTGenerativeTraitImage(trait)) {
                //Load image
                const folder = join(layersDir, trait.name);
                const options = trait.options.map((option) => {
                    if (!option.image_url) return option;

                    const filePath = join(folder, option.image_url);
                    const file = fs.readFileSync(filePath);
                    return { ...option, image: file };
                });

                return { ...trait, options };
            } else if (isNFTGenerativeTraitColormap(trait)) {
                //Add default colormap option definitions (grey, rg, rb, gb)
                const options = trait.options.map((option) => {
                    const colors = option.colors ?? defaultColormapOptions[option.value];
                    if (!colors) throw new Error(`Colormap ${trait.name} option ${option.value} missing colors`);

                    return { ...option, colors };
                });

                return { ...trait, options };
            }
            return trait;
        });

        const collectionSpec = { ...collectionSpecInput, traits };
        //@ts-expect-error
        const collection = new NFTGenerativeCollectionClass(collectionSpec);

        return collection;
    }

    /***** Factory *****/
    create({
        attributes,
        children,
    }: {
        attributes: { [K in keyof Traits]: AttributeValue };
        children?: Children extends Record<
            string,
            NFTGenerativeCollectionInterface<Record<string, NFTGenerativeTraitBaseInterface>, undefined>
        >
        ? { [K in keyof Children]: Parameters<Children[K]['create']>[0] }
        : undefined;
    }) {
        //@ts-expect-error
        return NFTGenerativeItemClass.fromAttributes({ collection: this, attributes, children });
    }

    createFromDna({
        dna,
        children,
    }: {
        dna: string;
        children: Children extends Record<
            string,
            NFTGenerativeCollectionInterface<Record<string, NFTGenerativeTraitBaseInterface>, undefined>
        >
        ? { [K in keyof Children]: Parameters<Children[K]['createFromDna']>[0] }
        : undefined;
    }): NFTGenerativeItemInterface<
        NFTGenerativeCollectionInterface<Record<string, NFTGenerativeTraitBaseInterface>, undefined>
    > {
        return this.create(this.dnaToAttributesWithChildren({ dna, children }));
    }

    createFromFullDna(
        fullDna: string,
    ): NFTGenerativeItemInterface<
        NFTGenerativeCollectionInterface<Record<string, NFTGenerativeTraitBaseInterface>, undefined>
    > {
        return this.createFromDna(this.fullDnaToDnaWithChildren(fullDna));
    }

    /***** Collection Info*****/
    traitKeys() {
        return Object.keys(this.traits) as unknown as keyof Traits[];
    }
    childrenKeys() {
        const keys = this.children ? (Object.keys(this.children) as unknown as keyof Children[]) : undefined;
        return keys as Children extends Record<string, NFTGenerativeCollectionInterface> ? keyof Children[] : undefined;
    }
    getJsonMetadata() {
        const traitsJSON = mapValues(this.traits, (trait) => trait.getJsonFormat());
        const asJson = omitBy(
            {
                name: this.name,
                description: this.description,
                image: this.image,
                external_url: this.external_url,
                seller_fee_basis_points: this.seller_fee_basis_points,
                fee_recipient: this.fee_recipient,
                traits: traitsJSON,
            },
            isUndefined,
        ) as any;

        return asJson;
    }

    getJsonMetadataWithChildren() {
        const metadata = this.getJsonMetadata();
        const children = this.children ? mapValues(this.children, (c) => c.getJsonMetadataWithChildren()) : undefined;
        return {
            ...metadata,
            children,
        };
    }

    /**
     * Get abi encoding from traits and child collections
     * @returns abi encoding
     */
    abi() {
        const abi = mapValues(this.traits, (t) => t.abi ?? 'uint8');
        return Object.values(abi);
    }

    abiWithChildren() {
        const abiChildren = this.children
            ? mapValues(this.children, (c) => {
                return c.abiWithChildren();
            })
            : [];

        return [this.abi(), ...Object.values(abiChildren)];
    }

    /** DNA to Genes */
    dnaToGene(dna: BytesLike, name: keyof Traits) {
        return this.dnaToGenes(dna)[name];
    }
    dnaToGenes(dna: BytesLike) {
        const data = ethers.utils.arrayify(dna);
        let p = 0;
        return mapValues(this.traits, (t) => {
            const byteSize = t.byteSize();
            const bytes = [];
            for (let i = 0; i < byteSize; i++) {
                bytes.push(data[p]);
                p++;
            }
            return ethers.BigNumber.from(bytes).toNumber();
        });
    }
    dnaToGenesWithChildren({
        dna,
        children,
    }: {
        dna: BytesLike;
        children: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['dnaToGenesWithChildren']>[0] }
        : undefined;
    }) {
        const genes = this.dnaToGenes(dna);
        const existingChildren = pick(this.children, keys(omitBy(children, isUndefined))) as Record<string, NFTGenerativeCollectionInterface>;
        const genesChildren =
            this.children && children
                ? mapValues(existingChildren, (c, k) => {
                    return c.dnaToGenesWithChildren(children[k]);
                })
                : undefined;
        return omitBy({ genes, children: genesChildren }, isEmptyOrUndefined) as {
            genes: { [K in keyof Traits]: number };
            children: Children extends Record<
                string,
                NFTGenerativeCollectionInterface<Record<string, NFTGenerativeTraitBaseInterface>, undefined>
            >
            ? { [K in keyof Children]: ReturnType<Children[K]['dnaToGenesWithChildren']> }
            : undefined;
        };
    }

    /** DNA to Attributes */
    dnaToAttribute(dna: BytesLike, name: keyof Traits) {
        const gene = this.dnaToGene(dna, name);
        const trait = this.traits[name];
        return trait.decode(gene);
    }
    dnaToAttributes(dna: BytesLike) {
        const genes = this.dnaToGenes(dna);
        return mapValues(this.traits, (t, k) => t.decode(genes[k]));
    }
    dnaToAttributesWithChildren({
        dna,
        children,
    }: {
        dna: BytesLike;
        children?: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['dnaToAttributesWithChildren']>[0] }
        : undefined;
    }) {
        const attributes = this.dnaToAttributes(dna);
        const existingChildren = pick(this.children, keys(omitBy(children, isUndefined))) as Record<string, NFTGenerativeCollectionInterface>;
        const childrenAttributes =
            this.children && children
                ? mapValues(existingChildren, (c, k) => {
                    return c.dnaToAttributesWithChildren(children[k]);
                })
                : undefined;

        return omitBy({ attributes, children: childrenAttributes }, isEmptyOrUndefined) as {
            attributes: { [K in keyof Traits]: AttributeValue };
            children?: Children extends Record<string, NFTGenerativeCollectionInterface>
            ? { [K in keyof Children]: ReturnType<Children[K]['dnaToAttributesWithChildren']> }
            : undefined;
        };
    }

    /** Attribute to Gene */
    attributeToGene(attribute: any, name: keyof Traits): Gene {
        return this.traits[name].encode(attribute);
    }
    attributesToGenes(attributes: { [K in keyof Traits]: AttributeValue }): { [K in keyof Traits]: Gene } {
        return mapValues(this.traits, (t, i) => {
            const attribute = attributes[i];
            if (t instanceof NFTGenerativeTraitColorClass || t instanceof NFTGenerativeTraitNumberClass) {
                if (typeof attribute != 'number')
                    throw new Error(`${t.name} require number attribute. Invalid: ${attribute}`);
                return t.encode(attribute);
            } else if (
                t instanceof NFTGenerativeTraitColormapClass ||
                t instanceof NFTGenerativeTraitEnumClass ||
                t instanceof NFTGenerativeTraitImageClass
            ) {
                if (typeof attribute != 'string')
                    throw new Error(`${t.name} require string attribute. Invalid: ${attribute}`);
                return t.encode(attribute);
            }

            throw new NFTGenerativeTraitClassInvalid();
        });
    }
    attributesToGenesWithChildren({
        attributes,
        children,
    }: {
        attributes: { [K in keyof Traits]: AttributeValue };
        children: Children extends Record<
            string,
            NFTGenerativeCollectionInterface<Record<string, NFTGenerativeTraitBaseInterface>, undefined>
        >
        ? { [K in keyof Children]: Parameters<Children[K]['attributesToGenesWithChildren']>[0] }
        : undefined;
    }) {
        const genes = this.attributesToGenes(attributes);
        const existingChildren = pick(this.children, keys(omitBy(children, isUndefined))) as Record<string, NFTGenerativeCollectionInterface>;
        const genesChildren =
            this.children && children
                ? mapValues(existingChildren, (c, k) => {
                    return c.attributesToGenesWithChildren(children[k]);
                })
                : undefined;
        return omitBy({ genes, children: genesChildren }, isEmptyOrUndefined) as {
            genes: { [K in keyof Traits]: number };
            children: Children extends Record<
                string,
                NFTGenerativeCollectionInterface<Record<string, NFTGenerativeTraitBaseInterface>, undefined>
            >
            ? { [K in keyof Children]: ReturnType<Children[K]['attributesToGenesWithChildren']> }
            : undefined;
        };
    }

    /** Gene to DNA */
    genesToDna(genes: { [K in keyof Traits]: Gene }): string {
        //TODO: Fix sorting bug
        return ethers.utils.solidityPack(this.abi(), Object.values(genes));
    }
    genesToDnaWithChildren({
        genes,
        children,
    }: {
        genes: { [K in keyof Traits]: Gene };
        children: Children extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Children]: Parameters<Children[K]['genesToDnaWithChildren']>[0] }
        : undefined;
    }) {
        const dna = this.genesToDna(genes);
        const existingChildren = pick(this.children, keys(omitBy(children, isUndefined))) as Record<string, NFTGenerativeCollectionInterface>;
        const dnaChildren =
            this.children && children
                ? mapValues(existingChildren, (c, k) => {
                    return c.genesToDnaWithChildren(children[k]);
                })
                : undefined;

        return omitBy({ dna, children: dnaChildren }, isEmptyOrUndefined) as {
            dna: string;
            children: Children extends Record<string, NFTGenerativeCollectionInterface>
            ? { [K in keyof Children]: ReturnType<Children[K]['genesToDnaWithChildren']> }
            : undefined;
        };
    }

    /** Attributes to DNA */
    attributesToDna(attributes: { [K in keyof Traits]: AttributeValue }): string {
        return this.genesToDna(this.attributesToGenes(attributes));
    }
    attributesToDnaWithChildren({
        attributes,
        children,
    }: {
        attributes: { [K in keyof Traits]: AttributeValue };
        children: Children extends Record<
            string,
            NFTGenerativeCollectionInterface<Record<string, NFTGenerativeTraitBaseInterface>, undefined>
        >
        ? { [K in keyof Children]: Parameters<Children[K]['attributesToDnaWithChildren']>[0] }
        : undefined;
    }) {
        const dna = this.attributesToDna(attributes);
        // @ts-ignore
        const existingChildren = pick(this.children, keys(omitBy(children, isUndefined))) as Record<string, NFTGenerativeCollectionInterface>;
        const dnaChildren =
            this.children && children
                ? mapValues(existingChildren, (c, k) => {
                    return c.attributesToDnaWithChildren(children[k]);
                })
                : undefined;

        return omitBy({ dna, children: dnaChildren }, isEmptyOrUndefined) as {
            dna: string;
            children: Children extends Record<string, NFTGenerativeCollectionInterface>
            ? { [K in keyof Children]: ReturnType<Children[K]['attributesToDnaWithChildren']> }
            : undefined;
        };
    }

    /** Full DNA to DNA */
    fullDnaToDna(fullDna: BytesLike): string {
        const [dna] = NFTGenerativeCollectionClass.fullDnaDecode(fullDna);
        return dna;
    }
    fullDnaToDnaWithChildren(fullDna: BytesLike) {
        const [dna, fullDnaChildren] = NFTGenerativeCollectionClass.fullDnaDecode(fullDna);
        let i = 0;
        const dnaChildren = this.children
            ? omitBy(
                mapValues(this.children, (c) => {
                    if (fullDnaChildren[i] != undefined && fullDnaChildren[i] != '0x') {
                        const result = c.fullDnaToDnaWithChildren(fullDnaChildren[i]);
                        i++;
                        return result;
                    } else {
                        i++;
                        return undefined;
                    }
                }),
                isUndefined,
            )
            : undefined;

        return omitBy({ dna, children: dnaChildren }, isEmptyOrUndefined) as {
            dna: string;
            children: Children extends Record<string, NFTGenerativeCollectionInterface>
            ? { [K in keyof Children]: ReturnType<Children[K]['fullDnaToDnaWithChildren']> }
            : undefined;
        };
    }

    /** Attributes to Full DNA */
    attributesToFullDna(attributes: { [K in keyof Traits]: AttributeValue }): string {
        const dna = this.attributesToDna(attributes);
        return NFTGenerativeCollectionClass.fullDnaEncode(dna, []);
    }

    attributesToFullDnaWithChildren({
        attributes,
        children,
    }: {
        attributes: { [K in keyof Traits]: AttributeValue };
        children?: Children extends Record<
            string,
            NFTGenerativeCollectionInterface<Record<string, NFTGenerativeTraitBaseInterface>, undefined>
        >
        ? { [K in keyof Children]: Parameters<Children[K]['attributesToFullDnaWithChildren']>[0] }
        : undefined;
    }) {
        const dna = this.attributesToDna(attributes);
        const fullDnaChildren =
            this.children && children
                ? mapValues(this.children, (c, k) => {
                    if (children[k]) {
                        return c.attributesToFullDnaWithChildren(children[k]);
                    } else {
                        return {
                            fullDna: '0x'
                        };
                    }
                })
                : undefined;

        const fullDnaChildrenFlat = fullDnaChildren ? Object.values(fullDnaChildren).map((r) => r.fullDna) : [];
        const fullDna = NFTGenerativeCollectionClass.fullDnaEncode(dna, fullDnaChildrenFlat);
        return omitBy({ fullDna, children: fullDnaChildren }, isEmptyOrUndefined) as {
            fullDna: string;
            children: Children extends Record<string, NFTGenerativeCollectionInterface>
            ? { [K in keyof Children]: ReturnType<Children[K]['attributesToFullDnaWithChildren']> }
            : undefined;
        };
    }

    /**
     * This assumes that the trait.name matches the collection metadata trait key
     * @param attributes
     */
    attributesToAttributesFormatted(attributes: { [K in keyof Traits]: AttributeValue }): {
        [K in keyof Traits]: AttributeFormatted;
    } {
        // console.debug(attributes);

        const topsort = new TopologicalSort<string, string>(new Map());
        Object.values(this.traits).forEach((t) => {
            topsort.addNode(t.name, t.name);
        });

        Object.values(this.traits).forEach((t) => {
            t.dependencies().forEach((d) => {
                topsort.addEdge(d, t.name);
            });
        });
        const sorted = [...topsort.sort().keys()];
        // console.debug(sorted);

        //console.debug(traits.map((t) => t.name));
        const attributesFormatted: Record<string, any> = {};

        // console.debug(this.traits);

        sorted.forEach((name) => {
            const t = this.traits[name];
            //console.debug({ attributes, attributesFormatted, name: t.name });
            attributesFormatted[t.name] = t.format(attributes[t.name], attributesFormatted);
        });

        return attributesFormatted as any;
    }

    attributesToAttributesFormattedWithChildren({
        attributes,
        children,
    }: {
        attributes: { [K in keyof Traits]: AttributeValue };
        children: Children extends Record<
            string,
            NFTGenerativeCollectionInterface<Record<string, NFTGenerativeTraitBaseInterface>, undefined>
        >
        ? { [K in keyof Children]: Parameters<Children[K]['attributesToAttributesFormattedWithChildren']>[0] }
        : undefined;
    }) {
        const attributesFormatted = this.attributesToAttributesFormatted(attributes);
        const existingChildren = pick(this.children, keys(omitBy(children, isUndefined))) as Record<string, NFTGenerativeCollectionInterface>;
        const attributesFormattedChildren =
            this.children && children
                ? mapValues(existingChildren, (c, k) => {
                    return c.attributesToAttributesFormattedWithChildren(children[k]);
                })
                : undefined;

        return omitBy(
            { attributes: attributesFormatted, children: attributesFormattedChildren },
            isEmptyOrUndefined,
        ) as {
            attributes: { [K in keyof Traits]: Gene };
            children: Children extends Record<string, NFTGenerativeCollectionInterface>
            ? { [K in keyof Children]: ReturnType<Children[K]['attributesToAttributesFormattedWithChildren']> }
            : undefined;
        };
    }

    /**
     * Convert DNA to Metadata Attribute Formatted.
     * Calling  dnaToAttribute() on all traits.
     *
     * @param dna
     * @returns name or number of assigned value formatted
     */
    dnaToAttributesFormatted(dna: BytesLike): { [K in keyof Traits]: AttributeFormatted } {
        return this.attributesToAttributesFormatted(this.dnaToAttributes(dna));
    }

    dnaToAttributesWithChildrenFormatted({
        dna,
        children,
    }: {
        dna: BytesLike;
        children: Children extends Record<
            string,
            NFTGenerativeCollectionInterface<Record<string, NFTGenerativeTraitBaseInterface>, undefined>
        >
        ? { [K in keyof Children]: Parameters<Children[K]['dnaToAttributesWithChildrenFormatted']>[0] }
        : undefined;
    }) {
        const result = this.attributesToAttributesFormattedWithChildren(
            //@ts-expect-error
            this.dnaToAttributesWithChildren({ dna, children }),
        );

        return omitBy(result, isEmptyOrUndefined) as unknown as {
            attributes: { [K in keyof Traits]: AttributeFormatted };
            children: Children extends Record<string, NFTGenerativeCollectionInterface>
            ? { [K in keyof Children]: ReturnType<Children[K]['dnaToAttributesWithChildrenFormatted']> }
            : undefined;
        };
    }

    /***** Encoding *****/
    async getImage(
        attributes: { [K in keyof Traits]: AttributeFormatted },
        mergeOptions?: MergeImagesOptions,
        width = 800,
        height = 800,
    ): Promise<string | undefined> {

        if (!this.generatedImageType) return undefined;

        //TODO: Cache
        //Render image layers
        const imageLayers = mapValues(this.traits, (t, k) => {
            if (t instanceof NFTGenerativeTraitImageClass) {
                return (attributes[k] as NFTGenerativeTraitImageOption).image;
            }
            return undefined;
        });

        const layers = compact(values(imageLayers));

        if ('svg' == this.generatedImageType) {
            const svg = mergeSVG(layers, width, height);
            return svg;
        } else if (this.generatedImageType == 'png') {
            // Image type is png
            const image = await mergeImages(
                layers.map((l) => Buffer.from(l, 'base64')),
                mergeOptions,
            );
            const imageData = image.replace('data:image/png;base64,', '');
            return imageData;
        } else {
            return undefined;
        }
    }

    async getImageWithChildren(
        {
            attributes,
            children,
        }: {
            attributes: { [K in keyof Traits]: AttributeFormatted };
            children: Children extends Record<
                string,
                NFTGenerativeCollectionInterface<Record<string, NFTGenerativeTraitBaseInterface>, undefined>
            >
            ? { [K in keyof Children]: Parameters<Children[K]['getImageWithChildren']>[0] }
            : undefined;
        },
        mergeOptions?: mergeImages.Options | undefined,
        width?: number | undefined,
        height?: number | undefined,
    ): Promise<string | undefined> {

        if (!this.generatedImageType) return undefined;

        const image = this.getImage(attributes, mergeOptions, width, height);

        const existingChildren = pick(this.children, keys(omitBy(children, isUndefined))) as Record<string, NFTGenerativeCollectionInterface>;
        const imagesChildren =
            this.children && children
                ? omitBy(
                    mapValues(existingChildren, (c, k) => {
                        if (children[k]) return c.getImageWithChildren(children[k], mergeOptions, width, height);
                    }),
                    isUndefined,
                )
                : undefined;

        const layers = compact(await Promise.all([image, ...Object.values(imagesChildren ?? [])]));

        if ('svg' == this.generatedImageType) {
            const svg = mergeSVG(layers, width, height);
            return svg;
        } else if (this.generatedImageType == 'png') {
            // Image type is png
            const image = await mergeImages(
                layers.map((l) => Buffer.from(l, 'base64')),
                mergeOptions,
            );
            const imageData = image.replace('data:image/png;base64,', '');
            return imageData;
        } else {
            return undefined;
        }
    }

    async uploadIPFS(client: IPFS): Promise<CID> {
        const imageTraits = Object.values(this.traits).filter(
            (trait) => trait instanceof NFTGenerativeTraitImageClass,
        ) as NFTGenerativeTraitImageClass[];

        await Promise.all(
            imageTraits.map((trait) => {
                return trait.uploadIPFS(client);
            }),
        );

        const collectionJSON = this.getJsonMetadata();
        const collectionIpfsResult = await client.add(JSON.stringify(collectionJSON));
        return collectionIpfsResult.cid;
    }

    /**
     * Not recommended, but necessary for now because traits are readonly
     * @param ipfsGateway
     * @param ipfsHash
     */
    async loadImages(ipfsGateway: string, ipfsHash: string): Promise<void>{

        for (const traitKey in this.traits) {

            const trait = this.traits[traitKey];

            if (!isNFTGenerativeTraitImage(trait)) {
                continue;
            }

            const options: Array<NFTGenerativeTraitImageOption> = [];

            for (const option of trait.options) {
                let image_url = option.image_url;
                if (!image_url) {
                    options.push(option);
                    continue;
                }

                // TODO: use ipfs-http-client for IPFS
                // TODO: use a more robust method of redirecting IPFS calls to an arbitrary gateway
                let image;
                image_url = image_url.replace('ipfs://', ipfsGateway + '/')

                try {
                    const res = await fetch(image_url);

                    if (trait.image_type === 'svg') {
                        image = await res.text();
                    } else {
                        // png
                        image = await res.arrayBuffer();
                        image = Buffer.from(image).toString('base64');
                    }
                } catch (err) {
                    console.error(`img fetch error: ${image_url}`, err);
                    throw err;
                }

                // image cache key was too restrictive, you can have the same option.value on
                // multiple traits, that are different images - still not perfect
                // TODO: this should be exhaustive, or have a hash of the image?
                const path = `${ipfsHash}/layer/${trait.name}/${option.value}`;

                // cache.set(path, image);

                // image_url = path;

                const newOption: NFTGenerativeTraitImageOption = {
                    ...option,
                    image,
                    // image_url,
                };

                options.push(newOption);
            }

            trait.options = options;

            this.traits[traitKey] = trait;
        }
    }

    async loadImagesWithChildren(ipfsGateway: string, ipfsHash: string): Promise<void> {
        await this.loadImages(ipfsGateway, ipfsHash);
        if (this.children) {
            for (const childKey in this.children) {
                const child = this.children[childKey] as NFTGenerativeCollectionClass;
                await child.loadImagesWithChildren(ipfsGateway, ipfsHash);
            }
        }
    }
}
