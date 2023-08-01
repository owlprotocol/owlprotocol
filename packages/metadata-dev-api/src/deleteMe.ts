import * as fs from 'fs';
export {};

// const dataBasePath = `${process.cwd()}/data`;
const contracts: any = null;
// import {Deployments} from "@owlprotocol/contracts";
//
// // Generate JSON object with mock data for each contracts
// function createDatabase() {
//     const items = Object.entries(Deployments.anvil);
//
//     if (items.length < 1) return;
//     console.log('\n> createDatabase')
//
//     let data: any = {
//         [networkId]: []
//     };
//
//     items.map((contract: any, idx) => {
//         const [name, object] = contract;
//
//         if (name.indexOf("Mintable") > 1) {
//             // Include Mintable contracts only
//             const { address } = object.default;
//             data[networkId].push({ id: name, address });
//         }
//     });
//
//     data[networkId].map((contract: any) => {
//         const collectionMetadata = CONTRACT_METADATA
//
//         data[networkId][contract.id] = {
//             metadata: collectionMetadata
//         }
//
//         for (let i = 0; i <= 10; i++) {
//             data[networkId][contract.id][i] = const TOKEN_METADATA
//         }
//     })
//
//     console.log(`> ${data[networkId].length} items created\n`)
//
//     return data;
// }
//
// const contracts = createDatabase();

// Util function:
// Fetch an image an save locally
// const fetchImageAndSave = async (path: string, filename: string) => {
//     const imageUrl = "https://loremflickr.com/600/600"
//
//     fetch(imageUrl)
//         .then((res: any) =>
//             res.body.pipe(fs.createWriteStream(`${path}/${filename}.jpg`))
//         )
// }
//
//
// // Create Folder structure based on data
// export function createDataFolders(dataBasePath: string) {
//     console.log('\n> createDataFolders\n')
//
//     const { existsSync, mkdirSync } = fs
//     // wipe all data dir. not sure if needed.
//     // fs.rmSync(dataBasePath, { recursive: true, force: true });
//
//     Object.keys(contracts).map(networkId => {
//         contracts[networkId].map((obj: any) => {
//             try {
//                 if (!existsSync(dataBasePath)) {
//                     mkdirSync(dataBasePath);
//                 }
//
//                 const contractPath = `${dataBasePath}/${obj.id}`;
//                 const path1 = `${contractPath}/token-metadata`
//                 const path2 = `${contractPath}/token-image`
//
//                 if (!existsSync(path1)) {
//                     mkdirSync(path1, { recursive: true });
//                 }
//
//                 if (!existsSync(path2)) {
//                     mkdirSync(path2, { recursive: true });
//                 }
//
//                 // write contract metadata JSON
//                 fs.writeFileSync(`${dataBasePath}/${obj.id}/contract-metadata.json`, JSON.stringify(CONTRACT_METADATA))
//
//                 // Fetch image and write into contract folder
//                 fetchImageAndSave(contractPath, 'contract-image')
//
//                 // write token-metadata JSON
//                 fs.writeFileSync(`${path1}/data.json`, JSON.stringify(TOKEN_METADATA))
//
//                 // Fetch image and write into token-image
//                 fetchImageAndSave(path2, 'image')
//             } catch (err) {
//                 console.error('FS: ', err);
//             }
//         })
//     })
// }
