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
            data[networkId].push({ id: address });
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

        data[networkId][contract.id]['0x1111'] = {
            name: casual.title,
            image: "https://loremflickr.com/600/600",
            attributes: [{
                "trait_type": "Base",
                "value": "Starfish"
            },
            {
                "trait_type": "Eyes",
                "value": "Big"
            }],
        }
    })

    return data;
}

const contracts = createDatabase();
const server = jsonServer.create()
const router = jsonServer.router(contracts)

// middlewares
server.use(jsonServer.defaults())

server.get('/:networkId/:address/metadata', (req, res) => {
    const { networkId, address } = req.params
    res.jsonp(contracts[networkId][address])
})

server.get('/:networkId/:address/metadata/:tokenId', (req, res) => {
    const { networkId, address, tokenId } = req.params
    res.jsonp(contracts[networkId][address][tokenId])
})

server.use(jsonServer.bodyParser)
server.use(router)

server.listen(3020, () => {
    console.log('Metadata server is running')
    console.log('check: http://localhost:3020/31337')
})
