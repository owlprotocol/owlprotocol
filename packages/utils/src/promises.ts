/**
 * Await all promises in key-value, return object with results
 * @param promises
 */
export async function awaitAllObj<T extends Record<any, Promise<any>> = Record<string, Promise<any>>>(promises: T) {
    //Await all concurrently
    await Promise.all(Object.values(promises));

    //@ts-expect-error
    const results: { [K in keyof T]: Awaited<T[K]> } = {}
    for (let [k, p] of Object.entries(promises)) {
        results[k as keyof T] = await p
    }

    return results;
}
