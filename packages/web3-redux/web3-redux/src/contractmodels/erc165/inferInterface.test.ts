import { assert } from "chai";
import * as Contracts from "@owlprotocol/contracts";
import type { ERC721Mintable } from "@owlprotocol/contracts/lib/types/typechain/ethers/index.js";
import type { ERC721MintableInitializeArgs } from "@owlprotocol/contracts/lib/types/utils/ERC721Mintable.js";
import ethers, { Signer } from "ethers";
import Web3 from "web3";

import { sleep } from "@owlprotocol/utils";
import { interfaces } from "@owlprotocol/contracts";
import { ERC165Name, NetworkWithObjects, ADDRESS_1, validateEthCall } from "@owlprotocol/web3-models";
import { ContractCustomActions, inferInterfaceAction, NetworkCRUDActions } from "@owlprotocol/web3-actions";

import { ContractCustomDexie, ERC165Dexie, EthCallDexie } from "@owlprotocol/web3-dexie";
import { getTestNetwork } from "@owlprotocol/web3-test-utils";
import { createStore, StoreType } from "../../store.js";

//@ts-expect-error
ethers.utils.Logger.setLogLevel("ERROR");

describe(`${ERC165Name}/sagas/inferInterface.ts`, () => {
    let store: StoreType;

    let from: string;
    let signer: Signer;

    let networkId: string;
    let network1336: NetworkWithObjects;
    let web3: Web3;

    let factoriesDeterministicInit: ReturnType<typeof Contracts.Ethers.getDeterministicInitializeFactories>;

    before(async () => {
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
        await Contracts.Deploy.ProxyFactoryDeploy(hre);
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
    });

    beforeEach(async () => {
        //Store
        store = createStore();
        store.dispatch(NetworkCRUDActions.actions.create({ networkId }));
        store.dispatch(NetworkCRUDActions.actions.reduxUpsert({ networkId, web3 }));
    });

    describe("infer", () => {
        let ERC721MintableFactory: typeof factoriesDeterministicInit.ERC721Mintable;
        let ERC721Mintable: ERC721Mintable;
        let tokenName = 0;
        let token: ERC721MintableInitializeArgs;

        beforeEach(async () => {
            token = {
                admin: from,
                contractUri: `token.${tokenName}.com`,
                name: `Token ${tokenName}`,
                symbol: `TK${tokenName}`,
            };
            ERC721MintableFactory = factoriesDeterministicInit.ERC721Mintable;
            tokenName++;
            ERC721Mintable = await ERC721MintableFactory.deploy(
                ...Contracts.Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token),
            );
        });

        it("ERC165 supportsInterface()", async () => {
            store.dispatch(
                inferInterfaceAction({
                    networkId,
                    address: ERC721Mintable.address,
                }),
            );
            await sleep(1000);

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

            //Metadata called because IERC165 added
            const returnValue = await ContractCustomDexie.IERC721Metadata.callDB.name(
                networkId,
                ERC721Mintable.address,
                [],
            );

            const name = returnValue ? returnValue[0] : undefined;
            assert.equal(name, token.name, "name");
        });

        it("ERC721 ownerOf, ERC721Metadata tokenUri", async () => {
            //Requires tokenId 1 to be minted
            const tx = await ERC721Mintable.mint(ADDRESS_1, 1);
            await tx.wait();

            //Set ERC165 Interface to false to mock non-support
            const addAction = ContractCustomActions.IERC165.supportsInterface({
                networkId,
                to: ERC721Mintable.address.toLowerCase(),
                args: [interfaces.IERC165.interfaceId],
            });
            const addInput = validateEthCall(addAction.payload);
            await EthCallDexie.add({ ...addInput, returnValue: [false] });

            store.dispatch(
                inferInterfaceAction({
                    networkId,
                    address: ERC721Mintable.address,
                }),
            );
            await sleep(1000);

            const iface165 = await ERC165Dexie.get({
                networkId,
                address: ERC721Mintable.address.toLowerCase(),
                interfaceId: interfaces.IERC165.interfaceId,
            });
            assert.isUndefined(iface165, "iface165");
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

            //Metadata called because IERC165 added
            const returnValue = await ContractCustomDexie.IERC721Metadata.callDB.name(
                networkId,
                ERC721Mintable.address,
                [],
            );

            const name = returnValue ? returnValue[0] : undefined;
            assert.equal(name, token.name, "name");
        });
    });
});
