import { faker } from '@faker-js/faker'
import { ColumnSort, SortingState } from '@tanstack/react-table'

export type Item = {
    address: string;
    networkId: number;
    createdAt: string;
    assetAvatarSrc: string;
    title: string;
    participants: number;
    volume: number;
    recipes: number;
    isVerified: boolean;
    collectionPreviewSrcs: string[];
}

export type ApiResponse = {
    data: Item[]
    meta: {
        totalRowCount: number
    }
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
        networkId: faker.helpers.shuffle<Item['networkId']>([
            1,
            10,
            56,
            137,
        ])[0]!,
        address: faker.finance.ethereumAddress(),
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

const data = makeData(200)

//simulates a backend api
export const fetchData = (
    start: number,
    size: number,
    sorting: SortingState
) => {
    const dbData = [...data]
    if (sorting.length) {
        const sort = sorting[0] as ColumnSort
        const { id, desc } = sort as { id: keyof Person; desc: boolean }
        dbData.sort((a, b) => {
            if (desc) {
                return a[id] < b[id] ? 1 : -1
            }
            return a[id] > b[id] ? 1 : -1
        })
    }

    return {
        data: dbData.slice(start, start + size),
        meta: {
            totalRowCount: dbData.length,
        },
    }
}
