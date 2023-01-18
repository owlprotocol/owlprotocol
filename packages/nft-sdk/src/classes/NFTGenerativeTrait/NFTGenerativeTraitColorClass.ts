import { NFTGenerativeTraitBaseClass } from './NFTGenerativeTraitBaseClass.js';
import { NFTGenerativeTraitColor, RGB } from '../../types/index.js';
import { rgbToHex } from '../../utils/hex.js';

export class NFTGenerativeTraitColorClass extends NFTGenerativeTraitBaseClass implements NFTGenerativeTraitColor {
    readonly type: NFTGenerativeTraitColor['type'];
    readonly min: NFTGenerativeTraitColor['min'];
    readonly max: NFTGenerativeTraitColor['max'];
    readonly colormap: NFTGenerativeTraitColor['colormap'];
    readonly abi!: NFTGenerativeTraitColor['abi'];

    constructor(attribute: NFTGenerativeTraitColor) {
        super(attribute);
        this.type = attribute.type;
        this.min = attribute.min;
        this.max = attribute.max;
        this.colormap = attribute.colormap;
    }

    minGene(): number {
        return this.min ?? 0;
    }

    maxGene(): number {
        return this.max ?? 255;
    }

    /** Decode gene value from DNA to attribute value */
    decode(gene: number): number {
        //Check metadata value in range
        if (gene < this.minGene()) throw new Error(`Invalid value ${gene} < this.min ${this.minGene()}`);
        else if (gene > this.maxGene()) throw new Error(`Invalid value ${gene} > this.max ${this.maxGene()}`);
        return gene;
    }

    /** Encode attribute value to gene */
    encode(attribute: number): number {
        //Check metadata value in range
        if (attribute < this.minGene()) throw new Error(`Invalid value ${attribute} < this.min ${this.minGene()}`);
        else if (attribute > this.maxGene()) throw new Error(`Invalid value ${attribute} > this.max ${this.maxGene()}`);
        return attribute;
    }

    format(attribute: number, dependencyValues: Record<string, any>) {
        const colormap = dependencyValues[this.colormap];
        if (colormap === undefined)
            throw new Error(
                `Error formatting ${this.name}. Dependencies do not contain colormap \'${this.colormap
                }\': ${JSON.stringify(dependencyValues)}`,
            );
        const colors = colormap.colors;
        return this.hex(attribute, colors);
    }

    dependencies() {
        return [this.colormap];
    }

    /**
     * Convert to RGB color
     * @param gene
     * @param colormap 255 length RGB color array
     */
    rgb(gene: number, colormap: RGB[]): RGB {
        const result = this.decode(gene);
        return colormap[result];
    }

    /**
     * Convert to RGB color hex
     * @param gene
     * @param colormap 255 length RGB color array
     */
    hex(gene: number, colormap: RGB[]): string {
        const [r, g, b] = this.rgb(gene, colormap);
        return rgbToHex(r, g, b);
    }

    /** Other */
    getJsonFormat() {
        return {
            ...super.getJsonFormat(),
            min: this.minGene(),
            max: this.maxGene(),
            colormap: this.colormap,
        };
    }

    getAmountOfTraits() {
        return this.maxGene() - this.minGene();
    }
}
