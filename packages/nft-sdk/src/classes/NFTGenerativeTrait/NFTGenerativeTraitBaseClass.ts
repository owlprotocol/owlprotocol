import { omitBy, isUndefined } from 'lodash-es';

import { NFTGenerativeTraitBaseInterface } from './NFTGenerativeTraitBaseInterface.js';
import type { NFTGenerativeTraitBase, JSONEncodable } from '../../types/index.js';
import { validateNFTGenerativeTrait } from '../../validation/index.js';

export abstract class NFTGenerativeTraitBaseClass implements NFTGenerativeTraitBaseInterface {
    readonly name: NFTGenerativeTraitBase['name'];
    readonly type: NFTGenerativeTraitBase['type'];
    readonly display_type: NFTGenerativeTraitBase['display_type'];
    readonly description: NFTGenerativeTraitBase['description'];
    readonly abi: NFTGenerativeTraitBase['abi'];

    constructor(trait: NFTGenerativeTraitBase) {
        //Validate value bit size
        validateNFTGenerativeTrait(trait);

        this.name = trait.name;
        this.type = trait.type;
        this.display_type = trait.display_type;
        this.description = trait.description;
        this.abi = trait.abi;
    }

    bitSize() {
        const size = parseInt((this.abi ?? 'uint8').replace('uint', '').replace('int', ''));
        return size as 8 | 16;
    }

    byteSize() {
        return (this.bitSize() / 8) as 1 | 2;
    }

    getJsonFormat(): JSONEncodable {
        return omitBy(
            {
                name: this.name,
                type: this.type,
                display_type: this.display_type,
                description: this.description,
                abi: this.abi,
            },
            isUndefined,
        ) as Record<string, string | number>;
    }

    minGene(): number {
        return 0;
    }

    maxGene(): number {
        return 2 ** this.bitSize();
    }

    decode(gene: number): number | string {
        //Check metadata value in range
        const min = this.minGene();
        const max = this.maxGene();
        if (gene < min) throw new Error(`Invalid value ${gene} < this.min ${min}`);
        else if (gene > max) throw new Error(`Invalid value ${gene} > this.max ${max}`);
        return gene;
    }

    abstract encode(attribute: string | number): number;
    abstract format(attribute: string | number, dependencyValues: Record<string, any>): any;
    abstract randomAttribute(): string | number;

    dependencies(): string[] {
        return [];
    }
}
