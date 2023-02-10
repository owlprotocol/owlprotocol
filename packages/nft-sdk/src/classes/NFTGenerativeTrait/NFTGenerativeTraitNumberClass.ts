import { random } from 'lodash-es';
import { NFTGenerativeTraitBaseClass } from './NFTGenerativeTraitBaseClass.js';
import { NFTGenerativeTraitNumber } from '../../types/index.js';

export class NFTGenerativeTraitNumberClass extends NFTGenerativeTraitBaseClass implements NFTGenerativeTraitNumber {
    readonly type: NFTGenerativeTraitNumber['type'];
    readonly min: NFTGenerativeTraitNumber['min'];
    readonly max: NFTGenerativeTraitNumber['max'];

    constructor(attribute: NFTGenerativeTraitNumber) {
        super(attribute);
        this.type = attribute.type;
        this.min = attribute.min;
        this.max = attribute.max;
    }

    minGene(): number {
        return this.min;
    }

    maxGene(): number {
        return this.max;
    }

    /** Decode gene value from DNA to attribute value */
    decode(gene: number): number {
        //Check metadata value in range
        if (gene < this.min) throw new Error(`Invalid value ${gene} < this.min ${this.min}`);
        else if (gene > this.max) throw new Error(`Invalid value ${gene} > this.max ${this.max}`);
        return gene;
    }

    /** Pick a random attribute value.
     * Assumes probabilities have been normalized
     */
    randomAttribute(): number {
        const floating = false;
        return random(this.min, this.max, floating);
    }

    /** Encode attribute value to gene */
    encode(attribute: number): number {
        //Check metadata value in range
        if (attribute < this.min) throw new Error(`Invalid value ${attribute} < this.min ${this.min}`);
        else if (attribute > this.max) throw new Error(`Invalid value ${attribute} > this.max ${this.max}`);
        return attribute;
    }

    format(attribute: number) {
        return attribute;
    }

    /** Other */
    getJsonFormat() {
        return {
            ...super.getJsonFormat(),
            min: this.min,
            max: this.max,
        };
    }

    getAmountOfTraits() {
        return this.max - this.min;
    }
}
