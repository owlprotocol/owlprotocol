//CreateCRUD Worker
import * as Worker from 'web-worker';

export function createCRUDWorker() {
    const url = new URL('./worker.js', import.meta.url);
    const worker = new Worker.default(url, { type: 'module' });
    return worker;
}

export function createCRUDWorkers(num: number) {
    const workers: Worker[] = []
    for (let i = 0; i < num; i++) {
        workers.push(createCRUDWorker())
    }
    return workers
}
