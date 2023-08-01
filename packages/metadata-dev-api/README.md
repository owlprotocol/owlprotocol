# Metadata Dev API
API to test contract and token metadata and images.

## Run
`pnpm run build && pnpm run start`

## Endpoints

* Contract metadata: `http://localhost:3020/:networkId/:contractName/:contractId/contract-metadata`
* Contract image: `http://localhost:3020/:networkId/:contractName/:contractId/contract-image`
* Token metadata: `http://localhost:3020/:networkId/:contractName/:contractId/token-metadata/:tokenId`
* Token image: `http://localhost:3020/:networkId/:contractName/:contractId/token-image/:tokenId`

## Examples
```
http://localhost:3020/31337/ERC721/1/contract-image
http://localhost:3020/31337/ERC721/1/contract-metadata
http://localhost:3020/31337/ERC721/1/token-metadata/1
http://localhost:3020/31337/ERC721/1/token-image/1
```
