import jsonServer from 'json-server'
import casual from 'casual'
import { Deployments } from "@owlprotocol/contracts";

// Network ID
const networkId = "31337";

function createDatabase() {
    let data: any = {
        [networkId]: []
    };

    Object.entries(Deployments.anvil).map((contract: any, idx) => {
        const [name, object] = contract;

        if (name.indexOf("Mintable") > 1) {
            // Include Mintable contracts only
            const { address } = object.default;
            data[networkId].push({ id: name, address });
        }
    });

    data[networkId].map((contract: any) => {
        const collectionMetadata = {
            name: casual.title,
            description: casual.description,
            image: "https://loremflickr.com/600/600",
            createdAt: casual.unix_time,
        }

        data[networkId][contract.id] = {
            metadata: collectionMetadata
        }

        for (let i = 0; i <= 10; i++) {
            data[networkId][contract.id][i] = {
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
        }
    })

    return data;
}

const contracts = createDatabase();
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
    res.jsonp(contracts[networkId][address].image)
})

server.get('/:networkId/:address/token-metadata/:tokenId', (req, res) => {
    const { networkId, address, tokenId } = req.params
    res.jsonp(contracts[networkId][address][tokenId])
})

server.get('/:networkId/:address/token-image/:tokenId', (req, res) => {
    const { networkId, address, tokenId } = req.params
    // res.jsonp(contracts[networkId][address][tokenId])
    res.jsonp({ notsure: 1 })
})

server.use(jsonServer.bodyParser)
server.use(router)

server.listen(3020, () => {
    console.log('Metadata server is running')
    console.log('check: http://localhost:3020/31337')
})
