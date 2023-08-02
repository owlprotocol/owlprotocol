//ADVANCED TUPLE
//https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html#mapped-types-on-tuples-and-arrays
type MapToPromise<T> = { [K in keyof T]: Promise<T[K]> };
type Coordinate = [number, number];
type PromiseCoordinate = MapToPromise<Coordinate>;

//https://www.youtube.com/watch?v=nK6qW_NsPvc
//https://stackoverflow.com/questions/74838395/typescript-convert-tuple-of-objects-to-object-with-keys-the-common-property-valu
type TupleToObject<T extends readonly string[]> = {
    [Idx in T[number]]: Idx
}
type X_Object = TupleToObject<["name"]>


type TupleToObject2<T extends readonly { first: string, last: string }[]> = {
    [Idx in T[number]as Idx["first"]]: Idx["last"]
}
type X_Object2 = TupleToObject2<[{ first: "john", last: "doe" }, { first: "jane", last: "xxx" }]>


type TupleToTuple<T extends readonly string[]> = {
    [Idx in keyof T]: T[Idx]
}
type X_Tuple = TupleToTuple<["name"]>


//https://stackoverflow.com/questions/73919926/typescript-declare-type-of-index-of-tuple
export type TupleIndices<T extends readonly any[]> =
    Extract<keyof T, `${number}`> extends `${infer N extends number}` ? N : never;

export { }
