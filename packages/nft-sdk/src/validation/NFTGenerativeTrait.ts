import Ajv from 'ajv';
import { isUndefined, sum } from 'lodash-es';

import { NFTGenerativeTrait as NFTGenerativeTraitSchema } from '../schemas/index.js';
import { NFTGenerativeTraitBase } from '../types/NFTGenerativeTrait/NFTGenerativeTraitBase.js';
import { isNFTGenerativeTraitEnum } from '../types/NFTGenerativeTrait/NFTGenerativeTraitEnum.js';
import { isNFTGenerativeTraitColor } from '../types/NFTGenerativeTrait/NFTGenerativeTraitColor.js';
import {
    isNFTGenerativeTraitColormap,
    isNFTGenerativeTraitImage,
    isNFTGenerativeTraitNumber,
} from '../types/NFTGenerativeTrait/index.js';

export const validateNFTGenerativeTrait = (trait: NFTGenerativeTraitBase) => {
    let valueRange: number;
    if (isNFTGenerativeTraitEnum(trait) || isNFTGenerativeTraitImage(trait)) {
        valueRange = trait.options.length;

        // Validate and normalize probabilities
        if (!isUndefined(trait.probabilities)) {
            const currProbabilities = trait.probabilities;
            if (currProbabilities.length != valueRange) {
                throw new Error(`${trait.name}.probabilities.length != ${trait.name}.options.length`);
            }

            const totalProbability = sum(currProbabilities);

            trait.probabilities = currProbabilities.map((val) => val / totalProbability);
        }
    } else if (isNFTGenerativeTraitColormap(trait)) {
        trait.options.map((m, i) => {
            if (m.colors && m.colors.length != 256)
                throw new Error(`${trait.name}.options.${i}.colors.length ${m.colors.length} != 256`);
        });
        valueRange = trait.options.length;
    } else if (isNFTGenerativeTraitNumber(trait) || isNFTGenerativeTraitColor(trait)) {
        //@ts-expect-error
        if (!trait.max) trait.max = 255;
        //@ts-expect-error
        if (!trait.min) trait.min = 0;
        valueRange = trait.max - trait.min;
    } else {
        throw new Error(`${trait.name} invalid attribute type ${trait.type}`);
    }
    const bitSize = parseInt((trait.abi ?? 'uint8').replace('uint', '').replace('int', ''));
    if (2 ** bitSize < valueRange) {
        //Check if value bit size large enough
        throw new InvalidNFTGenerativeTrait(`${trait.name} bitSize 2^${bitSize} < valueRange ${valueRange}`);
    }
};

const ajv = new Ajv();
export function isNFTGenerativeTrait(encoding: Record<string, any>): encoding is NFTGenerativeTraitBase {
    const valid = ajv.validate(NFTGenerativeTraitSchema, encoding);
    if (!valid) {
        const err = new Error(ajv.errors?.map((e) => e.message).join(', '));
        console.error(err);
    }

    return valid;
}

export class InvalidNFTGenerativeTrait extends Error {
    constructor(msg?: string) {
        if (!msg) super();
        else super(msg);

        this.name = 'InvalidNFTGenerativeTrait';
    }
}
