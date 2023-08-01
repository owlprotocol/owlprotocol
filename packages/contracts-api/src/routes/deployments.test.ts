import { DeploymentMethod } from "@owlprotocol/contracts-proxy";
import { Collection } from "@owlprotocol/contracts-sdk";
import { appRouter } from "../router";

// async function deployERC721() {
//     const router = appRouter.createCaller({});
//     let contractAddress: string;
//     try {
//         // const deployResult = await router.collection.postCollection({
//         const deployResult = await router.deploy.ERC721MintableAutoId({
//             networkId: "80001",
//             deployParams: {
//                 deploymentMethod: "DETERMINISTIC" as DeploymentMethod,
//             },
//             contractParams: {
//                 symbol: "MY",
//                 name: "My collection",
//                 _admin: "0x434C7df2f06D6CD172a28cb71e2AFE6E1b974DBC",
//             },
//         });
//         contractAddress = deployResult.contractAddress;
//     } catch (e) {
//         console.log(e);
//         throw e;
//     }
//
//     if (!contractAddress) {
//         console.log("No contract address");
//         return;
//     }
//
//     try {
//         const mintResult = await router.abi.ERC721MintableAutoId.mint({
//             networkId: "80001",
//             address: contractAddress,
//             contractParams: {
//                 to: "0x434C7df2f06D6CD172a28cb71e2AFE6E1b974DBC",
//             },
//         });
//         console.log(mintResult.result);
//     } catch (e) {
//         console.log(e);
//         throw e;
//     }
//
//     // TODO: deploy tokenURI provider
//     // try {
//     //     const result = await router.abi.ERC721MintableAutoId.tokenURI({
//     //         networkId: "80001",
//     //         address: contractAddress,
//     //         contractParameters: {
//     //             tokenId: "1",
//     //         },
//     //     });
//     //     console.log(result.result);
//     // } catch (e) {
//     //     console.log(e);
//     //     throw e;
//     // }
// }

// async function deployERC20() {
//     const router = appRouter.createCaller({});
//     let contractAddress: string;
//     try {
//         // const deployResult = await router.collection.postCollection({
//         const deployResult = await router.deploy.ERC20Mintable({
//             networkId: "80001",
//             deployParams: {
//                 deploymentMethod: "DETERMINISTIC" as DeploymentMethod,
//             },
//             contractParams: {
//                 symbol: "MY",
//                 name: "My Token",
//                 _admin: "0x434C7df2f06D6CD172a28cb71e2AFE6E1b974DBC",
//             },
//         });
//         contractAddress = deployResult.contractAddress;
//     } catch (e) {
//         console.log(e);
//         throw e;
//     }
//
//     if (!contractAddress) {
//         console.log("No contract address");
//         return;
//     }
//
//     try {
//         const mintResult = await router.abi.ERC20Mintable.mint({
//             networkId: "80001",
//             address: contractAddress,
//             contractParams: {
//                 to: "0x434C7df2f06D6CD172a28cb71e2AFE6E1b974DBC",
//                 amount: "100",
//             },
//         });
//         console.log(mintResult.result);
//     } catch (e) {
//         console.log(e);
//         throw e;
//     }
//
//     try {
//         const mintResult = await router.abi.ERC20Mintable.balanceOf({
//             networkId: "80001",
//             address: contractAddress,
//             contractParams: {
//                 to: "0x434C7df2f06D6CD172a28cb71e2AFE6E1b974DBC",
//                 amount: "100",
//             },
//         });
//         console.log(mintResult.result);
//     } catch (e) {
//         console.log(e);
//         throw e;
//     }
// }
