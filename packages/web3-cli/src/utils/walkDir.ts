import { opendir } from "fs/promises";
import path from "path";

export async function* walkDir(dir: string): AsyncGenerator<string> {
    for await (const d of await opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* walkDir(entry);
        else if (d.isFile()) yield entry;
    }
}
