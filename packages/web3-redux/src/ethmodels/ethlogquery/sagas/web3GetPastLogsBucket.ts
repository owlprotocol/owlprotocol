const sizes = [10000000, 5000000, 1000000, 500000, 100000, 50000, 10000, 5000, 1000, 500, 100]; //, 50, 10];
const minSize = sizes[sizes.length - 1];
//Returns buckets from small to large starting from 0-to
export function* findBuckets(from: number, to: number) {
    const fromMod = from % minSize === 0 ? from : from - (from % minSize) + minSize;
    let toMod = to - (to % minSize); //smallest bucket
    if (toMod != to) {
        //Initial bucket remainder
        yield { from: toMod, to };
    }

    while (toMod > fromMod) {
        for (const size of sizes) {
            if (toMod % size == 0 && toMod - size >= fromMod) {
                //valid bucket
                yield { from: toMod - size, to: toMod };
                toMod = toMod - size;
                break;
            }
        }
    }

    if (fromMod != from) {
        //Last bucket remainder
        yield { from, to: fromMod };
    }
}

export function* splitBucket(from: number, to: number) {
    const fromMod = from - (from % minSize);
    let toMod = to - (to % minSize); //smallest bucket
    const range = toMod - fromMod;
    const size = sizes.find((x) => x < range); //find next range
    if (size) {
        while (toMod > fromMod) {
            yield { from: toMod - size, to: toMod };
            toMod = toMod - size;
        }
    }
}
