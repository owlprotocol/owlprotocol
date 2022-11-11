import BN from 'bn.js';

export function sliceBin(b: BN, maxBitLength: number, start: number, end: number): string {
    const bin = b.toString(2).padStart(maxBitLength, '0');
    return bin.slice(start, end);
}

export function binToNumber(bin: string): number {
    return parseInt(bin, 2);
}
