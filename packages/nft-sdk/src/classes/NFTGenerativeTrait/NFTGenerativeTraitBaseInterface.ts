import { JSONEncodable, NFTGenerativeTraitBase } from '../../types/index.js';

export interface NFTGenerativeTraitBaseInterface extends NFTGenerativeTraitBase {
    bitSize(): 8 | 16;
    byteSize(): 1 | 2;
    getJsonFormat(): JSONEncodable;
    decode(gene: number): string | number;
    encode(attribute: number | string): number;
    format(attribute: number | string, dependencyValues: Record<string, any>): any;
    dependencies(): string[];
    randomAttribute(): string | number;
}
