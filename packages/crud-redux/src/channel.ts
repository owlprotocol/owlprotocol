import { BroadcastChannel } from 'broadcast-channel';

//const q = new PQueue.default()

export const channel: BroadcastChannel = new BroadcastChannel('crud-redux', { type: 'simulate' })

/*
async function main() {
    const channel = new BroadcastChannel('foobar');
    channel.postMessage('I am not alone');
    channel.onmessage = msg => console.dir(msg);

    const channel2 = new BroadcastChannel('foobar');
    channel2.onmessage = msg => console.dir(msg);

    const channel3 = new BroadcastChannel('foobar');
    channel3.onmessage = msg => console.dir(msg);
}

main()
*/
