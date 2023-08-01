import { faker } from '@faker-js/faker'
import { ColumnSort, SortingState } from '@tanstack/react-table'

export type Item = {
    address: string;
    networkId: number;
    title: string;
    isVerified: boolean;
    description: string;
    assetAvatarSrc: string;
    assetPreviewSrc: string;
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

const newItem = (): Item => ({
    networkId: faker.helpers.shuffle<Item['networkId']>([
        1,
        10,
        56,
        137,
    ])[0]!,
    address: faker.finance.ethereumAddress(),
    title: faker.lorem.sentences(),
    isVerified: faker.datatype.boolean(),
    description: faker.lorem.lines(),
    assetAvatarSrc: faker.image.abstract(80, 80, true),
    assetPreviewSrc: faker.image.abstract(400, 400, true),
})

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Item[] => {
        const len = lens[depth]!
        return range(len).map((d): Item => {
            return {
                ...newItem(),
            }
        })
    }

    return makeDataLevel()
}

const data = makeData(50)

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
