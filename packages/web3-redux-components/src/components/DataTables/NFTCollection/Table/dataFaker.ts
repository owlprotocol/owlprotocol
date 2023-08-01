import { faker } from '@faker-js/faker'

export type Item = {
    createdAt: string;
    assetAvatarSrc: string;
    title: string;
    participants: number;
    volume: number;
    recipes: number;
    isVerified: boolean;
    collectionPreviewSrcs: string[];
}

const range = (len: number) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newItem = (): Item => {
    const collectionPreviewSrcs = [faker.image.abstract(80, 80, true),
    faker.image.abstract(80, 80, true), faker.image.abstract(80, 80, true),
    faker.image.abstract(80, 80, true), faker.image.abstract(80, 80, true)];

    return {
        assetAvatarSrc: faker.image.abstract(80, 80, true),
        title: faker.internet.domainWord(),
        collectionPreviewSrcs,
        participants: faker.datatype.number(500),
        volume: faker.datatype.number(500),
        recipes: faker.datatype.number(500),
        createdAt: faker.date.recent().toDateString(),
        isVerified: faker.datatype.boolean(),
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
