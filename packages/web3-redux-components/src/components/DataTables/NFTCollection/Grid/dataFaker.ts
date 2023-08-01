import { faker } from '@faker-js/faker'

export type Item = {
    address: string;
    networkId: number;
    title: string;
    isVerified: boolean;
    description: string;
    assetAvatarSrc: string;
    assetPreviewSrc: string;
}

const range = (len: number) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newItem = (): Item => ({
    networkId: 1,
    address: faker.finance.ethereumAddress(),
    title: faker.lorem.sentences(),
    isVerified: faker.datatype.boolean(),
    description: faker.lorem.lines(),
    assetAvatarSrc: faker.image.abstract(80, 80, true),
    assetPreviewSrc: faker.image.abstract(400, 400, true),
    // volume: faker.datatype.number(500),
})

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
