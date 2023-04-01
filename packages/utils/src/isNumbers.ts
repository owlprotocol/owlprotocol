export function isNumbers(array: any): array is number[] {
    return Array.isArray(array) && typeof array[0] === 'number';
}
