import express from 'express';
import casual from 'casual';
import Identicon from 'identicon.js';
import * as ethers from 'ethers';

const jsonHeaders = { 'Content-Type': 'application/json' };

const imageSize = 420;
const createdAt = casual.unix_time;

const port = 3020;

export interface Response {
    statusCode: number;
    body: any;
    headers: any;
}

// TODO: interface for ContractMetadata
function getContractMetadata(contractName: string, contractId: string, networkId: string): any {
    return {
        name: `${contractName}-${contractId}`,
        description: `NFT Collection ${contractId} is a ${contractName} on network ${networkId}`,
        image: `http://localhost:${port}/${networkId}/${contractName}/${contractId}/contract-image`,
        createdAt
    }
}

// TODO: interface for TokenMetadata
function getTokenMetadata(networkId: string, contractName: string, contractId: string, tokenId: string): any {
    const hash = ethers.utils.keccak256(Buffer.from(tokenId + contractId + contractName));
    const seed = Buffer.from(hash).readInt32BE();
    casual.seed(seed)
    return {
        name: `${contractName}-${contractId}-${tokenId}`,
        description: `Token ${tokenId} is a part of ${contractName} ${contractId} on network ${networkId}`,
        attributes: [
            {
                "trait_type": "color",
                "value": casual.color_name
            },
            {
                "trait_type": "id",
                "value": casual.building_number
            },
            {
                "trait_type": "name",
                "value": casual.name
            }
        ],
    }
}

function getIdenticon(hash: string): Response {
    const length = hash.length;
    if (length < 15) {
        const missing = 15 - length;
        hash += ' '.repeat(missing);
    }

    const data = new Identicon(hash, imageSize).toString()

    const body = Buffer.from(data, 'base64');
    const headers = { 'Content-Type': 'image/png', 'Content-Length': data.length };
    const statusCode = 200;

    const response = {
        headers,
        statusCode,
        body
    }

    return response
}

function getContractImage(contractName: string, contractId: string): Response {
    const hash = contractName + contractId;
    return getIdenticon(hash);
}

function getTokenImage(networkId: string, contractName: string, contractId: string, tokenId: string): Response {
    const hash = networkId + contractName + contractId + tokenId;
    return getIdenticon(hash);
}

export function startServer() {
    const app = express();

    app.get('/:networkId/:contractName/:contractId/contract-metadata', async (req, res) => {
        const { networkId, contractName, contractId } = req.params
        const body = getContractMetadata(contractName, contractId, networkId)
        res.header(jsonHeaders).send(JSON.stringify(body));
    })

    app.get('/:networkId/:contractName/:contractId/contract-image', async (req, res) => {
        const { contractName, contractId } = req.params;

        const { statusCode, headers, body } = getContractImage(contractName, contractId);
        res.status(statusCode).header(headers).send(body);
    })

    app.get('/:networkId/:contractName/:contractId/token-metadata/:tokenId', async (req, res) => {
        const { networkId, contractName, contractId, tokenId } = req.params
        const body = getTokenMetadata(networkId, contractName, contractId, tokenId)
        res.header(jsonHeaders).send(JSON.stringify(body));
    })

    app.get('/:networkId/:contractName/:contractId/token-image/:tokenId', async (req, res) => {
        const { networkId, contractName, contractId, tokenId } = req.params

        const { statusCode, headers, body } = getTokenImage(networkId, contractName, contractId, tokenId);
        res.status(statusCode).header(headers).send(body);
    })


    app.listen(port, () => {
        console.log(`App is running at http://localhost:${port}`)
    })

}
