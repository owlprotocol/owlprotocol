import fs from 'fs'
import * as IPFS from 'ipfs-core'

// create and push generated folders and files to IPFS
export const importFilesToIPFS = async (dataBasePath: string) => {
    const files = fs.readdirSync(dataBasePath)

    const ipfs = await IPFS.create()

    console.log(files)
    console.log(`Pushing ${files.length} folders`)

    for await (const result of ipfs.addAll(files)) {
        console.log('IPFS: ', result)
    }

    return console.log('importFilesToIPFS done');
}
