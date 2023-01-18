import { NFTGenerativeTraitBaseClass } from './NFTGenerativeTraitBaseClass.js';
import type { NFTGenerativeTraitEnum, NFTGenerativeTraitEnumOption, JSONEncodable } from '../../types/index.js';
export class NFTGenerativeTraitEnumClass extends NFTGenerativeTraitBaseClass implements NFTGenerativeTraitEnum {
    readonly type: NFTGenerativeTraitEnum['type'];
    readonly options: NFTGenerativeTraitEnum['options'];
    readonly abi!: NFTGenerativeTraitEnum['abi'];

    constructor(attribute: NFTGenerativeTraitEnum) {
        super(attribute);
        this.type = attribute.type;
        this.options = attribute.options;
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
        return this.options[gene];
    }

    /**
     * List attribute depedencies {attribute_name}
     */
    dependencies(): string[] {
        //Regex for {param}
        const regex = new RegExp(/(?<=[$][{]\s*).*?(?=\s*})/gs);
        const matches = new Set<string>();

        this.options.forEach((t) => {
            t.match(regex)?.map((m) => matches.add(m));
        });

        return [...matches];
    }

    /** Decode gene value from DNA & format using dependencies */
    format(attribute: string, dependencyValues: Record<string, string>): string {
        let result = attribute;
        const dependencies = this.dependencies();

        dependencies.forEach((d) => {
            const dVal = dependencyValues[d];
            if (dVal === undefined) {
                throw new Error(
                    `Error formatting ${this.name}. Dependencies do not contain \'${d}\': ${JSON.stringify(
                        dependencyValues,
                    )}`,
                );
            }
            result = result.replaceAll(`$\{${d}}`, dVal);
        });

        return result;
    }

    /** Encode attribute value to gene */
    encode(attribute: string): number {
        const idx = this.options.findIndex((v) => v === attribute);
        if (idx === -1)
            throw new Error(`Invalid value ${attribute} not found in this.options ${this.options.map((v) => v)}`);
        return idx;
    }

    /** Other */
    getJsonFormat() {
        return {
            ...super.getJsonFormat(),
            options: this.options as unknown as JSONEncodable[],
        };
    }

    getAmountOfTraits() {
        return this.options.length;
    }
}
