export interface EthLogFilterInput {
    address: string;
    topic0: string;
    topic1: string;
    topic2: string;
    topic3: string;
}
export function getEthLogFilter(item: EthLogFilterInput) {
    const { address, topic0, topic1, topic2, topic3 } = item;
    let topics: (string | null)[];
    //Strip topics to last null
    if (topic3 !== "*") {
        topics = [
            topic0 === "*" ? null : topic0,
            topic1 === "*" ? null : topic1,
            topic2 === "*" ? null : topic2,
            topic3,
        ];
    } else if (topic2 !== "*") {
        topics = [topic0 === "*" ? null : topic0, topic1 === "*" ? null : topic1, topic2];
    } else if (topic1 !== "*") {
        topics = [topic0 === "*" ? null : topic0, topic1];
    } else if (topic0 !== "*") {
        topics = [topic0];
    } else {
        topics = [];
    }

    const options = {
        address: address === "*" ? null : address,
        topics,
    };
    return options;
}
