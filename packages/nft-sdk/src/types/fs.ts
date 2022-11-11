import type { readFileSync } from 'fs';

/**
 * Filesystem Interface
 */
export interface Fs {
    readFileSync: typeof readFileSync;
}
