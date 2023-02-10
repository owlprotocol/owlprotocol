import { isUndefined, omit, random } from 'lodash-es';
import type { IPFS } from 'ipfs-core-types';
import type { CID } from 'ipfs-http-client';
import { NFTGenerativeTraitBaseClass } from './NFTGenerativeTraitBaseClass.js';
import { NFTGenerativeTraitImage, NFTGenerativeTraitImageOption } from '../../types/index.js';

export class NFTGenerativeTraitImageClass extends NFTGenerativeTraitBaseClass implements NFTGenerativeTraitImage {
    readonly type: NFTGenerativeTraitImage['type'];
    readonly image_type: NFTGenerativeTraitImage['image_type'];
    readonly abi!: NFTGenerativeTraitImage['abi'];
    probabilities: NFTGenerativeTraitImage['probabilities'];

    options: NFTGenerativeTraitImage['options'];

    constructor(attribute: NFTGenerativeTraitImage) {
        super(attribute);
        this.type = attribute.type;
        this.options = attribute.options;
        this.image_type = attribute.image_type;
        this.probabilities = attribute.probabilities;
    }

    minGene(): number {
        return 0;
    }

    maxGene(): number {
        return this.options.length;
    }

    /** Decode gene value from DNA to attribute value */
    decode(gene: number): string {
        //Check metadata value in range
        if (gene < this.minGene()) throw new Error(`Invalid value ${gene} < this.min ${this.minGene()}`);
        else if (gene > this.maxGene()) throw new Error(`Invalid value ${gene} > this.max ${this.maxGene()}`);
        return this.options[gene].value;
    }

    /**
     * List attribute dependencies {attribute_name}
     */
    dependencies(): string[] {
        //Regex for {param}
        const regex = new RegExp(/(?<=[$][{]\s*).*?(?=\s*})/gs);
        const matches = new Set<string>();

        this.options.forEach((t) => {
            //Image name dependencies
            t.value.match(regex)?.map((m) => matches.add(m));

            //Image rendering dependencies for SVG
            if (this.image_type === 'svg') {
                t.image?.match(regex)?.map((m) => matches.add(m));
            }
        });

        return [...matches];
    }

    /** Decode gene value from DNA & format using dependencies */
    format(attribute: string, dependencyValues: Record<string, string>): NFTGenerativeTraitImageOption {
        let result = this.options.find((c) => c.value == attribute)!;
        const dependencies = this.dependencies();

        dependencies.forEach((d) => {
            const dVal = dependencyValues[d];
            if (dVal === undefined)
                throw new Error(
                    `Error formatting ${this.name}. Dependencies do not contain \'${d}\': ${JSON.stringify(
                        dependencyValues,
                    )}`,
                );

            result = {
                ...result,
                value: result.value.replaceAll(`$\{${d}}`, dVal),
            };
            if (result.image && this.image_type === 'svg') {
                //Format image
                const image = result.image.replaceAll(`$\{${d}}`, dVal);
                result = { ...result, image };
            }
        });

        return result;
    }

    /** Encode attribute value to gene */
    encode(attribute: string): number {
        const idx = this.options.findIndex((v) => v.value === attribute);
        if (idx === -1)
            throw new Error(`Invalid value ${attribute} not found in this.options ${this.options.map((v) => v.value)}`);
        return idx;
    }

    /** Pick a random attribute value.
     * Assumes probabilities have been normalized
     */
    randomAttribute(): string {
        if (isUndefined(this.probabilities)) {
            // Uniform distribution
            const floating = false;
            // Max is inclusive
            const max = this.options.length - 1;

            const randomAttributeIdx = random(max, floating);

            return this.decode(randomAttributeIdx);
        }

        const probabilities = this.probabilities!;
        const randomFloat = random(true);

        let cumulative = 0;
        let i = 0;
        for (; i < probabilities.length; i++) {
            cumulative += probabilities[i];

            if (cumulative >= randomFloat) {
                break;
            }
        }

        const pickedAttribute = i;
        return this.decode(pickedAttribute);
    }

    /**
     * Upload image layer options to IPFS, return list of CIDs.
     *
     * @param client
     */
    async uploadIPFS(client: IPFS): Promise<(CID | undefined)[]> {
        const cids = await Promise.all(
            this.options.map(async (s) => {
                if (!s.image) return;
                const result = await client.add(s.image);
                const cid = result.cid;
                return cid;
            }),
        );
        return cids;
    }

    /** Other */
    getJsonFormat() {
        const options = this.options.map((v) => {
            return omit(v, 'image');
        });
        return {
            ...super.getJsonFormat(),
            options,
            image_type: this.image_type,
        };
    }

    getAmountOfTraits() {
        return this.options.length;
    }
}
