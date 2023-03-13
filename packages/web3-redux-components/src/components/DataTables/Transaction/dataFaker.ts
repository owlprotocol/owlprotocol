import { faker } from '@faker-js/faker'

export type Item = {
    networkId: string;
    txnHash: string;
    method: string;
    blockNumber: number;
    age: string;
    from: string;
    to: string;
    value: number;
    fee: number;
}

const range = (len: number) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newItem = (): Item => {
    return {
        networkId: faker.helpers.shuffle<string>([
            '1',
            '2',
            '3',
        ])[0]!,
        txnHash: faker.datatype.string(),
        method: faker.helpers.shuffle<string>([
            'transfer',
            'swap tokens',
            'claim',
            'deposit',
            'execute',
            'add liquidity',
        ])[0]!,
        blockNumber: faker.datatype.number(1000),
        age: faker.date.recent().toDateString(),
        from: faker.datatype.string(),
        to: faker.datatype.string(),
        value: faker.datatype.number(10000),
        fee: faker.datatype.number({ min: 0.001, max: 0.1 }),
    }
}

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Item[] => {
        const len = lens[depth]!
        return range(len).map((d): Item => {
            return {
                ...newItem(),
                //@ts-expect-error
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}
