import { assert } from "chai";
import * as Contracts from "@owlprotocol/contracts";
import type { ERC721Mintable } from "@owlprotocol/contracts/lib/types/ethers/types.js";
import type { ERC721MintableInitializeArgs } from "@owlprotocol/contracts/lib/types/utils/ERC721Mintable.js";
import ethers, { Signer } from "ethers";
import Web3 from "web3";

import { sleep } from "@owlprotocol/utils";
import { interfaces } from "@owlprotocol/contracts";
import { ContractName, NetworkWithObjects } from "@owlprotocol/web3-models";
import { NetworkCRUDActions, ContractCRUDActions, ConfigCRUDActions } from "@owlprotocol/web3-actions";
import { getTestNetwork } from "@owlprotocol/web3-sagas";
import { ContractDexie, ERC165Dexie, ContractDexieHelpers } from "@owlprotocol/web3-dexie";
import { createStore, StoreType } from "../store.js";

//@ts-expect-error
ethers.utils.Logger.setLogLevel("ERROR");

describe(`${ContractName}/sagas/dbChange.ts`, () => {
    let store: StoreType;

    let from: string;
    let signer: Signer;

    let networkId: string;
    let network1336: NetworkWithObjects;
    let web3: Web3;

    let factoriesDeterministicInit: ReturnType<typeof Contracts.Ethers.getDeterministicInitializeFactories>;

    beforeEach(async () => {
        //Re-start network
        network1336 = getTestNetwork();
        networkId = network1336.networkId;
        web3 = network1336.web3!;
        //Check balance using ethers
        const provider = new ethers.providers.Web3Provider(web3.currentProvider as any);
        const privateKey = ethers.utils.hexZeroPad(ethers.utils.hexlify(1), 32);
        signer = new ethers.Wallet(privateKey, provider);
        from = await signer.getAddress();
        const ONE_ETH = ethers.utils.parseUnits("1", "ether");
        const fromBalance = await provider.getBalance(from);

        if (fromBalance.lt(ONE_ETH)) {
            const accounts = await web3.eth.getAccounts();
            await web3.eth.sendTransaction({
                from: accounts[0],
                to: from,
                value: ONE_ETH.sub(fromBalance).toString(),
            });
        }

        //Deploy universal deployer, implementations, beacons, ERC1820
        const hre = {
            provider,
            signers: [signer],
            network: {
                name: "ganache",
                config: {
                    chainId: 1336,
                },
            },
        };
        await Contracts.Deploy.DeterministicDeployerDeploy(hre);
        await Contracts.Deploy.ProxyFactoryDeploy(hre);
        await Contracts.Deploy.ERC1820Deploy(hre);
        await Contracts.Deploy.ImplementationsDeploy(hre);
        await Contracts.Deploy.UpgradeableBeaconDeploy(hre);

        //Use Factories to derive deterministic addresses
        const factories = Contracts.Ethers.getFactories(signer);
        const cloneFactory = factories.ERC1167Factory.attach(Contracts.Utils.ERC1167Factory.ERC1167FactoryAddress);
        factoriesDeterministicInit = Contracts.Ethers.getDeterministicInitializeFactories(
            factories,
            cloneFactory,
            from,
        );

        //Store
        store = createStore();
        store.dispatch(NetworkCRUDActions.actions.create({ networkId }));
        //TODO: Separate Encoded/Object actions
        store.dispatch(NetworkCRUDActions.actions.reduxUpsert({ networkId, web3 }));
    });

    describe("ERC721Mintable - Detection", () => {
        let ERC721MintableFactory: typeof factoriesDeterministicInit.ERC721Mintable;
        let ERC721Mintable: ERC721Mintable;
        let tokenName = 0;
        let token: ERC721MintableInitializeArgs;

        beforeEach(async () => {
            token = {
                admin: from,
                contractUri: `token.${tokenName}.com`,
                gsnForwarder: ethers.constants.AddressZero,
                name: `Token ${tokenName}`,
                symbol: `TK${tokenName}`,
                initBaseURI: `token.${tokenName}.com/token`,
                feeReceiver: from,
                feeNumerator: 0,
            };
            ERC721MintableFactory = factoriesDeterministicInit.ERC721Mintable;
            tokenName++;
        });

        it("Manual", async () => {
            ERC721Mintable = await ERC721MintableFactory.deploy(
                ...Contracts.Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token),
            );
            //Add Contract to store manually
            store.dispatch(
                ContractCRUDActions.actions.create({
                    networkId,
                    address: ERC721Mintable.address,
                }),
            );
            await sleep(2000);

            //Exists
            assert.isDefined(
                ContractDexie.get({
                    networkId,
                    address: ERC721Mintable.address.toLowerCase(),
                }),
            );
            const iface165 = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC165.interfaceId,
            });
            assert.isDefined(iface165, "iface165");
            const iface721 = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC721.interfaceId,
            });
            assert.isDefined(iface721, "iface721");
            const iface721Metadata = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC721Metadata.interfaceId,
            });
            assert.isDefined(iface721Metadata, "iface721Metadata");

            //Metadata
            const returnValue = await ContractDexieHelpers.IERC721Metadata.callDB.name(
                networkId,
                ERC721Mintable.address,
                [],
            );

            const name = returnValue ? returnValue[0] : undefined;
            assert.equal(name, token.name, "name");
        });

        it("ERC1820 - Past", async () => {
            //Past Event trigger
            ERC721Mintable = await ERC721MintableFactory.deploy(
                ...Contracts.Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token),
            );
            //Add ERC1820 Contract, detect the registration event from ERC721
            store.dispatch(
                ContractCRUDActions.actions.create({
                    networkId,
                    address: Contracts.Utils.ERC1820.registryAddress.toLowerCase(),
                }),
            );
            await sleep(2000);

            const iface1820 = await ERC165Dexie.get({
                networkId,
                address: Contracts.Utils.ERC1820.registryAddress.toLowerCase(),
                interfaceId: interfaces.IERC1820.interfaceId,
            });
            assert.isDefined(iface1820, "iface1820");

            //Exists
            assert.isDefined(
                ContractDexie.get({
                    networkId,
                    address: ERC721Mintable.address.toLowerCase(),
                }),
            );
            const iface165 = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC165.interfaceId,
            });
            assert.isDefined(iface165, "iface165");
            const iface721 = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC721.interfaceId,
            });
            assert.isDefined(iface721, "iface721");
            const iface721Metadata = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC721Metadata.interfaceId,
            });
            assert.isDefined(iface721Metadata, "iface721Metadata");

            //Metadata
            const returnValue = await ContractDexieHelpers.IERC721Metadata.callDB.name(
                networkId,
                ERC721Mintable.address,
                [],
            );

            const name = returnValue ? returnValue[0] : undefined;
            assert.equal(name, token.name, "name");
        });

        it("ERC1820 - Subscribe", async () => {
            //Add ERC1820 Contract, detect the registration event from ImplementerSet
            store.dispatch(
                ContractCRUDActions.actions.create({
                    networkId,
                    address: Contracts.Utils.ERC1820.registryAddress.toLowerCase(),
                }),
            );
            await sleep(1000);
            //Subscription Trigger
            ERC721Mintable = await ERC721MintableFactory.deploy(
                ...Contracts.Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token),
            );
            await sleep(2000);

            const iface1820 = await ERC165Dexie.get({
                networkId,
                address: Contracts.Utils.ERC1820.registryAddress.toLowerCase(),
                interfaceId: interfaces.IERC1820.interfaceId,
            });
            assert.isDefined(iface1820, "iface1820");

            //Exists
            assert.isDefined(
                ContractDexie.get({
                    networkId,
                    address: ERC721Mintable.address.toLowerCase(),
                }),
            );
            const iface165 = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC165.interfaceId,
            });
            assert.isDefined(iface165, "iface165");
            const iface721 = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC721.interfaceId,
            });
            assert.isDefined(iface721, "iface721");
            const iface721Metadata = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC721Metadata.interfaceId,
            });
            assert.isDefined(iface721Metadata, "iface721Metadata");

            //Metadata
            const returnValue = await ContractDexieHelpers.IERC721Metadata.callDB.name(
                networkId,
                ERC721Mintable.address,
                [],
            );

            const name = returnValue ? returnValue[0] : undefined;
            assert.equal(name, token.name, "name");
        });

        it("Account Asset Transfer - Past", async () => {
            ERC721Mintable = await ERC721MintableFactory.deploy(
                ...Contracts.Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token),
            );
            //Past Transfer event trigger
            const tx = await ERC721Mintable.mint(from, 1);
            await tx.wait();
            await sleep(1000);
            //Add account to config, detect asset transfer to account
            store.dispatch(
                ConfigCRUDActions.actions.create({
                    id: "0",
                    networkId,
                    account: from,
                }),
            );
            await sleep(2000);

            //Exists
            assert.isDefined(
                ContractDexie.get({
                    networkId,
                    address: ERC721Mintable.address.toLowerCase(),
                }),
            );
            const iface165 = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC165.interfaceId,
            });
            assert.isDefined(iface165, "iface165");
            const iface721 = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC721.interfaceId,
            });
            assert.isDefined(iface721, "iface721");
            const iface721Metadata = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC721Metadata.interfaceId,
            });
            assert.isDefined(iface721Metadata, "iface721Metadata");

            //Metadata
            const returnValue = await ContractDexieHelpers.IERC721Metadata.callDB.name(
                networkId,
                ERC721Mintable.address,
                [],
            );

            const name = returnValue ? returnValue[0] : undefined;
            assert.equal(name, token.name, "name");
        });

        it("Account Asset Transfer - Subscribe", async () => {
            ERC721Mintable = await ERC721MintableFactory.deploy(
                ...Contracts.Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token),
            );
            //Add account to config, detect asset transfer to account
            store.dispatch(
                ConfigCRUDActions.actions.create({
                    id: "0",
                    networkId,
                    account: from,
                }),
            );
            await sleep(1000);
            //Subscribe Transfer event trigger
            const tx = await ERC721Mintable.mint(from, 1);
            await tx.wait();
            await sleep(2000);

            //Exists
            assert.isDefined(
                ContractDexie.get({
                    networkId,
                    address: ERC721Mintable.address.toLowerCase(),
                }),
            );
            const iface165 = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC165.interfaceId,
            });
            assert.isDefined(iface165, "iface165");
            const iface721 = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC721.interfaceId,
            });
            assert.isDefined(iface721, "iface721");
            const iface721Metadata = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC721Metadata.interfaceId,
            });
            assert.isDefined(iface721Metadata, "iface721Metadata");

            //Metadata
            const returnValue = await ContractDexieHelpers.IERC721Metadata.callDB.name(
                networkId,
                ERC721Mintable.address,
                [],
            );

            const name = returnValue ? returnValue[0] : undefined;
            assert.equal(name, token.name, "name");
        });
    });
});
