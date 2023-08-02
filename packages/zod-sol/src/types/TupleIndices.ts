//https://stackoverflow.com/questions/73919926/typescript-declare-type-of-index-of-tuple
export type TupleIndices<T extends readonly any[]> =
    Extract<keyof T, `${number}`> extends `${infer N extends number}` ? N : never;
