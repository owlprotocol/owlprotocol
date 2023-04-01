export type Head<T extends any[]> = T extends [...infer Head, any] ? Head : any[];
export type Tail<T extends any[]> = T extends [any, ...infer Tail] ? Tail : any[];
export type Concat<T extends readonly string[] = readonly string[], Separator extends string = ','> =
    T extends readonly [string] ? T[0] :
    //@ts-expect-error
    `${T[0]}${Separator}${Concat<Tail<T>, Separator>}`
