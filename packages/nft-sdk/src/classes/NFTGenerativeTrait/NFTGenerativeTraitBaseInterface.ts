import { JSONEncodable, NFTGenerativeTraitBase } from '../../types/index.js';

export interface NFTGenerativeTraitBaseInterface extends NFTGenerativeTraitBase {
    bitSize(): 8 | 16 | 24 | 32 | 48 | 64 | 96 | 128 | 196 | 256;
    byteSize(): 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24 | 32;
    getJsonFormat(): JSONEncodable;
    decode(gene: number): string | number;
    encode(attribute: number | string): number;
    format(attribute: number | string, dependencyValues: Record<string, any>): any;
    dependencies(): string[];
    randomAttribute(): string | number;
}
