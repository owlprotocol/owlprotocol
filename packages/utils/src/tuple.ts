//Tuple Head/Tail
export type Head<T extends any[]> = T extends [...infer Head, any] ? Head : any[];
export type Tail<T extends any[]> = T extends [any, ...infer Tail] ? Tail : any[];

//Concat string literals
export type Concat<T extends readonly string[] = readonly string[], Separator extends string = ','> =
    T extends readonly [string] ? T[0] :
    //@ts-expect-error
    `${T[0]}${Separator}${Concat<Tail<T>, Separator>}`

//TODO: Re-use tuple utils
//Repeat string literal
//https://stackoverflow.com/questions/65336900/template-literal-types-typescript-repeat
export type RepeatString<S extends string, N extends number> = RepeatStringRec<S, TupleOf<unknown, N>>
type RepeatStringRec<S extends string, T extends unknown[]> =
    T["length"] extends 1 ? S : `${S}${RepeatStringRec<S, DropFirst<T>>}`

type TupleOf<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;
type DropFirst<T extends readonly unknown[]> = T extends readonly [any?, ...infer U] ? U : [...T];

//Substraction
//https://acidcoder.medium.com/typescript-two-numeric-literal-types-subtraction-9553e8981c9
type CreateArrayWithLengthX<
    LENGTH extends number,
    ACC extends unknown[] = [],
> = ACC['length'] extends LENGTH
    ? ACC
    : CreateArrayWithLengthX<LENGTH, [...ACC, 1]>

export type Subtraction<LARGER extends number, SMALLER extends number, GAP extends number[] = []> =
    [...GAP, ...CreateArrayWithLengthX<SMALLER>]['length'] extends [...CreateArrayWithLengthX<LARGER>]['length']
    ? GAP['length']
    : Subtraction<LARGER, SMALLER, [1, ...GAP]>
