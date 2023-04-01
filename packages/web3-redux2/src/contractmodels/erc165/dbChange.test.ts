import { assert } from "chai";
import * as Contracts from "@owlprotocol/contracts";
import type { ERC721Mintable } from "@owlprotocol/contracts/lib/types/ethers/types.js";
import type { ERC721MintableInitializeArgs } from "@owlprotocol/contracts/lib/types/utils/ERC721Mintable.js";
import ethers, { Signer } from "ethers";
import Web3 from "web3";

import { sleep } from "@owlprotocol/utils";
import { interfaces } from "@owlprotocol/contracts";
import { ERC165Name, NetworkWithObjects, ADDRESS_1 } from "@owlprotocol/web3-models";
import { NetworkCRUDActions, ERC165CRUDActions, ConfigCRUDActions } from "@owlprotocol/web3-actions";
import { ContractDexieHelpers } from "@owlprotocol/web3-dexie";
import { getTestNetwork } from "@owlprotocol/web3-sagas";

import { createStore, StoreType } from "../../store.js";

//@ts-expect-error
ethers.utils.Logger.setLogLevel("ERROR");

describe(`${ERC165Name}/sagas/dbChange.ts`, () => {
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
    });

    beforeEach(async () => {
        //Store
        store = createStore();
        store.dispatch(NetworkCRUDActions.actions.create({ networkId }));
        store.dispatch(NetworkCRUDActions.actions.reduxUpsert({ networkId, web3 }));
    });

    describe("ERC721", () => {
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
            ERC721Mintable = await ERC721MintableFactory.deploy(
                ...Contracts.Utils.ERC721Mintable.flattenInitArgsERC721Mintable(token),
            );
        });

        it("ERC721", async () => {
            store.dispatch(
                ConfigCRUDActions.actions.create({
                    id: "0",
                    account: ADDRESS_1,
                }),
            );
            await sleep(1000);
            store.dispatch(
                ERC165CRUDActions.actions.create({
                    networkId,
                    address: ERC721Mintable.address,
                    interfaceId: interfaces.IERC721.interfaceId,
                }),
            );
            await sleep(1000);

            //Balance
            const returnValue = await ContractDexieHelpers.IERC721.callDB.balanceOf(networkId, ERC721Mintable.address, [
                ADDRESS_1,
            ]);

            const balance = returnValue ? returnValue[0] : undefined;
            //@ts-expect-error
            assert.equal(balance, "0", "balance");
        });

        it("ERC721Metadata", async () => {
            store.dispatch(
                ERC165CRUDActions.actions.create({
                    networkId,
                    address: ERC721Mintable.address,
                    interfaceId: interfaces.IERC721Metadata.interfaceId,
                }),
            );
            await sleep(1000);

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
