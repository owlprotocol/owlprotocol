import { NFTGenerativeTraitBaseClass } from './NFTGenerativeTraitBaseClass.js';
import type {
    NFTGenerativeTraitColormap,
    JSONEncodable,
    NFTGenerativeTraitColormapOption,
    RGB,
} from '../../types/index.js';

export const whiteGradient = new Array(256).fill([0, 0, 0]).map(([r, g, b], i) => [r + i, g + i, b + i]) as RGB[];
export const blackGradient = new Array(256).fill([255, 255, 255]).map(([r, g, b], i) => [r - i, g - i, b - i]) as RGB[];

export class NFTGenerativeTraitColormapClass extends NFTGenerativeTraitBaseClass implements NFTGenerativeTraitColormap {
    readonly type: NFTGenerativeTraitColormap['type'];
    readonly options: NFTGenerativeTraitColormap['options'];
    readonly abi!: NFTGenerativeTraitColormap['abi'];

    constructor(attribute: NFTGenerativeTraitColormap) {
        super(attribute);
        this.type = attribute.type;
        this.options = attribute.options.map((c) => {
            if (!c.colors) {
                if (c.value === 'white') return { value: 'white', colors: whiteGradient };
                if (c.value === 'black') return { value: 'black', colors: blackGradient };
                throw new Error(`Colormap option ${c.value} has undefined colors.`);
            }

            return c;
        });
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

    /** Encode attribute value to gene */
    encode(attribute: string): number {
        const idx = this.options.findIndex((v) => v.value === attribute);
        if (idx === -1)
            throw new Error(`Invalid value ${attribute} not found in this.options ${this.options.map((v) => v.value)}`);
        return idx;
    }

    format(attribute: string): NFTGenerativeTraitColormapOption {
        return this.options.find((p) => p.value == attribute)!;
    }

    /** Other */
    /**
     * List attribute depedencies {attribute_name}
     */
    dependsOn(): string[] {
        return [];
    }

    getJsonFormat() {
        return {
            ...super.getJsonFormat(),
            options: this.options as unknown as JSONEncodable[],
        };
    }

    getAmountofTraits() {
        return this.options.length;
    }
}
