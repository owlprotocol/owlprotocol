import jsonServer from 'json-server'
import casual from 'casual'
import { Deployments } from "@owlprotocol/contracts";
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as IPFS from 'ipfs-core'

let contracts: any = null;

const dataBasePath = `${process.cwd()}/data`;

// Network ID
const networkId = "31337";

const CONTRACT_METADATA = {
    name: casual.title,
    description: casual.description,
    image: "https://loremflickr.com/600/600",
    createdAt: casual.unix_time,
}

const TOKEN_METADATA = {
    name: casual.title,
    image: "https://loremflickr.com/600/600",
    attributes: [{
        "trait_type": "color",
        "value": casual.color_name
    },
    {
        "trait_type": "id",
        "value": casual.building_number
    }],
}

// Generate JSON object with mock data for each contracts
function createDatabase() {
    const items = Object.entries(Deployments.anvil);

    if (items.length < 1) return;
    console.log('\n> createDatabase')

    let data: any = {
        [networkId]: []
    };

    items.map((contract: any, idx) => {
        const [name, object] = contract;

        if (name.indexOf("Mintable") > 1) {
            // Include Mintable contracts only
            const { address } = object.default;
            data[networkId].push({ id: name, address });
        }
    });

    data[networkId].map((contract: any) => {
        const collectionMetadata = CONTRACT_METADATA

        data[networkId][contract.id] = {
            metadata: collectionMetadata
        }

        for (let i = 0; i <= 10; i++) {
            data[networkId][contract.id][i] = TOKEN_METADATA
        }
    })

    console.log(`> ${data[networkId].length} items created\n`)

    return data;
}

contracts = createDatabase();

// Util function:
// Fetch an image an save locally
const fetchImageAndSave = async (path: string, filename: string) => {
    const imageUrl = "https://loremflickr.com/600/600"

    fetch(imageUrl)
        .then((res: any) =>
            res.body.pipe(fs.createWriteStream(`${path}/${filename}.jpg`))
        )
}

// Create Folder structure based on data
function createDataFolders() {
    console.log('\n> createDataFolders\n')

    const { existsSync, mkdirSync } = fs
    // wipe all data dir. not sure if needed.
    // fs.rmSync(dataBasePath, { recursive: true, force: true });

    Object.keys(contracts).map(networkId => {
        contracts[networkId].map((obj: any) => {
            try {
                if (!existsSync(dataBasePath)) {
                    mkdirSync(dataBasePath);
                }

                const contractPath = `${dataBasePath}/${obj.id}`;
                const path1 = `${contractPath}/token-metadata`
                const path2 = `${contractPath}/token-image`

                if (!existsSync(path1)) {
                    mkdirSync(path1, { recursive: true });
                }

                if (!existsSync(path2)) {
                    mkdirSync(path2, { recursive: true });
                }

                // write contract metadata JSON
                fs.writeFileSync(`${dataBasePath}/${obj.id}/contract-metadata.json`, JSON.stringify(CONTRACT_METADATA))

                // Fetch image and write into contract folder
                fetchImageAndSave(contractPath, 'contract-image')

                // write token-metadata JSON
                fs.writeFileSync(`${path1}/data.json`, JSON.stringify(TOKEN_METADATA))

                // Fetch image and write into token-image
                fetchImageAndSave(path2, 'image')
            } catch (err) {
                console.error('FS: ', err);
            }
        })
    })
}

createDataFolders();

// create and push generated folders + files to IPFS
const importFilesToIPFS = async () => {
    console.log('\n> importFilesToIPFS')

    // create IPFS instance and push folders & files
    const files = fs.readdirSync(dataBasePath)
    const ipfs = await IPFS.create()
    console.log(files)
    console.log(`> about to push: ${files.length} folders\n`)

    for await (const result of ipfs.addAll(files)) {
        console.log('IPFS: ', result)
    }

    return console.log('> importFilesToIPFS done');
}

// importFilesToIPFS();

// HTTP JSONP server
function startHTTPServer() {
    if (!contracts) return;
    console.log('\n> startHTTPServer\n')

    const server = jsonServer.create()
    const router = jsonServer.router(contracts)

    // middlewares
    server.use(jsonServer.defaults())

    server.get('/:networkId/:address/contract-metadata', (req, res) => {
        const { networkId, address } = req.params
        res.jsonp(contracts[networkId][address])
    })

    server.get('/:networkId/:address/contract-image', (req, res) => {
        const { networkId, address } = req.params
        res.jsonp(contracts[networkId][address].metadata.image)
    })

    server.get('/:networkId/:address/token-metadata/:tokenId', (req, res) => {
        const { networkId, address, tokenId } = req.params
        res.jsonp(contracts[networkId][address][tokenId])
    })

    server.get('/:networkId/:address/token-image/:tokenId', (req, res) => {
        const { networkId, address, tokenId } = req.params
        res.jsonp(contracts[networkId][address][tokenId].image)
    })

    server.use(jsonServer.bodyParser)
    server.use(router)

    server.listen(3020, () => {
        console.log('Metadata server is running')
        console.log('check: http://localhost:3020/31337')
    })

}

startHTTPServer();
