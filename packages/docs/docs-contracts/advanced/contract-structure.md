---
sidebar_position: 2
---

# Contract Structure

[EIP-20]: https://eips.ethereum.org/EIPS/eip-20
[EIP-721]: https://eips.ethereum.org/EIPS/eip-721
[EIP-1155]: https://eips.ethereum.org/EIPS/eip-1155
[EIP-155]: https://eips.ethereum.org/EIPS/eip-155
[EIP-165]: https://eips.ethereum.org/EIPS/eip-165
[EIP-1820]: https://eips.ethereum.org/EIPS/eip-1820
[EIP-2470]: https://eips.ethereum.org/EIPS/eip-2470
[EIP-1014]: https://eips.ethereum.org/EIPS/eip-1014
[EIP-1167]: https://eips.ethereum.org/EIPS/eip-1167
[EIP-2470]: https://eips.ethereum.org/EIPS/eip-2470

[ether.js]: https://github.com/ethers-io/ethers.js/
[web3.js]: https://github.com/web3/web3.js
[Typechain]: https://github.com/dethcrypto/TypeChain
[HRE]: https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment
[ts-node]: https://github.com/TypeStrong/ts-node
[esbuild]: https://github.com/evanw/esbuild
[hardhat-shorthand]: https://github.com/NomicFoundation/hardhat/tree/main/packages/hardhat-shorthand
[@typechain/hardhat]: https://www.npmjs.com/package/@typechain/hardhat

[OwlBase]: ../../owlprotocol-contracts/contracts/common/OwlBase.sol
[ContractURI]: ../../owlprotocol-contracts/contracts/common/ContractURI.sol
[RouterReceiver]: ../../owlprotocol-contracts/contracts/common/RouterReceiver.sol
[ERC2981Setter]: ../../owlprotocol-contracts/contracts/assets/common/ERC2981Setter.sol
[AccessControl]: https://docs.openzeppelin.com/contracts/4.x/api/access#AccessControl
[src/artifacts/]: ../../owlprotocol-contracts/src/artifacts/
[src/artifacts.ts]: ../../owlprotocol-contracts/src/artifacts/artifacts.ts
[src/artifacts-js.ts]: ../../owlprotocol-contracts/src/artifacts/artifacts-js.ts

[contracts/]: ../../owlprotocol-contracts/contracts/
[contracts/common/]: ../../owlprotocol-contracts/contracts/common
[contracts/proxy/]: ../../owlprotocol-contracts/contracts/proxy
[contracts/assets/]: ../../owlprotocol-contracts/contracts/assets
[contracts/plugins/]: ../../owlprotocol-contracts/contracts/plugins

[src/ethers/]: ../../owlprotocol-contracts/src/ethers/
[src/web3/]: ../../owlprotocol-contracts/src/web3/
[src/utils/]: ../../owlprotocol-contracts/src/utils/
[src/utils/IERC721.ts]: ../../owlprotocol-contracts/src/utils/IERC721.ts
[src/utils/ERC721Mintable.ts]: ../../owlprotocol-contracts/src/utils/ERC721Mintable.ts
[test/]: ../../owlprotocol-contracts/test/
[test/hardhat/assets/ERC721/ERC721Mintable.test.ts]: ../../owlprotocol-contracts/test/hardhat/assets/ERC721/ERC721Mintable.test.ts

[src/deploy/]: ../../owlprotocol-contracts/src/deploy/
[src/deploy/common/Implementations.ts]: ../../owlprotocol-contracts/src/deploy/common/Implementations.ts
[src/deploy/common/UpgradeableBeacon.ts]: ../../owlprotocol-contracts/src/deploy/common/UpgradeableBeacon.ts

[deploy/]: ../../owlprotocol-contracts/deploy/
[esbuild.config.mjs]: ../../owlprotocol-contracts/esbuild.config.mjs

[factories.ts]: ../../owlprotocol-contracts/src/ethers/factories.ts
[deterministicFactories.ts]: ../../owlprotocol-contracts/src/ethers/deterministicFactories.ts
[proxy1167Factories.ts]: ../../owlprotocol-contracts/src/ethers/proxy1167Factories.ts
[beaconProxyFactories.ts]: ../../owlprotocol-contracts/src/ethers/beaconProxyFactories.ts

Owl Protocol contracts are designed to be re-usable as much as possible and avoid code duplication where possible to reduce attack surface. As such, all of our contract share a similar structure and also come with pre-configured utilities to enable easier integration in projects.

## TL;DR
All contracts share the following

**Solidity**
* Solidity sourced stored under [contracts/]
* An `IMyContract.sol` counterpart to the implementation, that only defines the interface. Documentation for `external` functions, is usually written in the `IMyContract.sol` and functions that implement the interface will use `@inheritdoc` tags to avoid duplicate documentation (except where necessary).
* An empty `constructor() {}` replaced in favor of using an `initialize(bytes memory data)` function.
* [AccessControl] for role management
* [ContractURI] for [contract-level-metadata](https://docs.opensea.io/docs/contract-level-metadata)
* [RouterReceiver] for [opengsn.org](https://opengsn.org/) support
* [EIP-165] support implementing the proper `interfaceId` of the contract and it's parents' interfaceIds
* [EIP-1820] support, registering with the contract registry (if existing). **BOTH** its [EIP-165] `interfaceId` and a custom [EIP-1820] `interfaceId` (defined as `interfaceId | 0x00000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF`) are registered
* [OwlBase] that inherits [AccessControl], [ContractURI], and [RouterReceiver]

**Typescript**
* Generated artifacts in [src/artifacts/]
* Exported [ether.js] contract & factory types generated with [Typechain]
* Exported [web3.js] contract types generated with [Typechain]
* [ether.js] factories for regular, deterministic, and [EIP-1167] proxy deployment explored under []
* A utils file named `MyContract.ts` under [src/utils/] defining common utilities such as initialization parameters, & exporting an [EIP-165] `interfaceId`
* Ethers-based deployment script under [src/deploy/] that is hardhat-agnostic and only requires an [ether.js] instance and a signer. Removing the dependency on hardhat enables usage outside of the [HRE], and therefore packaging the deployment logic as part of the npm package for usage in other environments such as in the browser or using another [ether.js] provider.
* [HRE]-based deployment script under [deploy/] designed to be used for local development with Hardhat. This usually calls the the [src/deploy] script with additional [HRE]-specific logic such as saving the deployment artifact.
* Test suite under [test/] for unit tests. Test suites usually use the [src/deploy/] script for the relevant contract to deploy.


## Creating a contract
* We use the following subfolders to categorize contracts
    - [contracts/common/] logic shared across contracts
    - [contracts/proxy/] contract proxies such as [EIP-1167] factory
    - [contracts/assets/] crypto assets such as [EIP-20], [EIP-721], or [EIP-1155]
    - [contracts/plugins/] plugin contracts for dynamic NFT mechanics such as Crafting or Breeding
* Write the Solidity interface contract `IMyContract.sol` along with some documentation:
    - What data needs to be accessible by other smart contracts?
    - What instead can simply be stored as metadata in the `contractURI` ?
* Write the Soldity implementation contract `MyContract.sol` that implements the interface:
    - What storage variables are required?
        - Can you use existing OpenZeppelin struct primitives such as `Counter` or `EnumerableSet`?
        - Write the contract's `__MyContract_init_unchained` that initializes **ONLY** the storage variables introduced by the smart contract & registers the contract with [EIP-1820] registry using `type(IMyContract)`
    - What contracts should the contract inherit from? How should the contract be initialized?
        - Write the contract's `__MyContract_init internal` that intializes all parent `__Parent_init_unchained` functions and lastly calls `__MyContract_init_unchained`
        - expose `__MyContract_init` using `initialize external initializer` and `proxyInitialier external onlyInitializing` functions
    - What configurations can be updated in the future? The less the better while maintaing all utility requirements.
    - What permissions are required to be configured with [AccessControl] to allow for updates?

Make sure to have [hardhat-shorthand] installed globally.
Compile your Solidity code incrementally as you develop with:
```bash
hh compile
```


## Export Contract Artifacts
Contract artifacts are generated by hardhat and stored under [src/artifacts/]. However, hardhat generates artifacts for ALL contracts, including dependencies (eg. OpenZeppelin).

For easier usage, specific contract artifacts re-exported in [src/artifacts.ts] (.json) & [src/artifacts-js.ts] (for ESBUILD).
* Edit [src/artifacts.ts] to export `src/artifacts/**/MyContract.sol/MyContract.json`
* Edit [src/artifacts-js.ts] to export `src/artifacts/**/MyContract.sol/MyContract.js`

The duplicate artifacts files may be a bit confusing. The reason they are required is Hardhat uses [ts-node] to transpile the code at runtime, which expects the artifacts to be exported with `.json`, but when packaging as an npm library, [esbuild] converts to `.json` artifacts to `.js` modules. The fix to this, esbuild is patched in the resolution plugin [esbuild.config.mjs] which replaces the [src/artifacts.ts] with [src/artifacts-js.ts]. This enables using the artifacts both with hardhat locally (`hh deploy`, `hh test`) and distribute the generated artifacts in an npm package.


## [Typechain] types
[Typechain] can be used to generate Typescript types for the smart contracts. We do **NOT** use the [@typechain/hardhat] plugin as it only supports generating types for 1 framework.

Generated [Typechain] types for [ether.js] and [web3.js] using:
```bash
npm run generate-types
```

## [ether.js] factories
Once the artifacts and types have been generated & exported, you can now create the factory helpers to make it easier to deploy the contract.
* Edit [factories.ts] to export the `MyContract__factory`

The [deterministicFactories.ts], [proxy1167Factories.ts], and [beaconProxyFactories.ts] will automatically extend their types as they depend on [factories.ts]. No change necessary.

## Contract Utilities
In additon to factories, contracts may also export a set of utilities that are specific to them for easier interaction. A common use case is exporting the [EIP-165] `interfaceId` or exporting a key-value type definition of tuples used by contract with a parsing function to encode/decode from the tuple to key-value definition.


### [EIP-165] `interfaceId`
Export the [EIP-165] `interfaceId` of the contract. This can then be used by libraries looking to identify contracts that implement the interface.

An example from [src/utils/IERC721.ts]
```typescript
import { utils } from 'ethers';
import { IERC721 } from '../artifacts';
import { IERC721Interface as Interface } from '../ethers/types';
import { interfaceId } from './IERC165';

export const IERC721Interface = new utils.Interface(IERC721.abi) as Interface;
export const IERC721InterfaceId = interfaceId(IERC721Interface);
```

### Tuples as Key-Value
Export utility functions that wrap tuples as key-value objects.

The following example from [src/utils/ERC721Mintable.ts] shows wrapping the initializer parameters as a key-value interface `ERC721MintableInitializeArgs` that can then be parsed using `flattenInitArgsERC721Mintable` to a regular tuple used by the `initialize` function.
```typescript
import type { ERC721Mintable } from '../ethers/types';

export interface ERC721MintableInitializeArgs {
    admin: Parameters<ERC721Mintable['initialize']>[0];
    contractUri: Parameters<ERC721Mintable['initialize']>[1];
    gsnForwarder: Parameters<ERC721Mintable['initialize']>[2];
    name: Parameters<ERC721Mintable['initialize']>[3];
    symbol: Parameters<ERC721Mintable['initialize']>[4];
    initBaseURI: Parameters<ERC721Mintable['initialize']>[5];
    feeReceiver: Parameters<ERC721Mintable['initialize']>[6];
    feeNumerator: Parameters<ERC721Mintable['initialize']>[7];
}

export function flattenInitArgsERC721Mintable(args: ERC721MintableInitializeArgs) {
    const { admin, contractUri, gsnForwarder, name, symbol, initBaseURI, feeReceiver, feeNumerator } = args;
    return [admin, contractUri, gsnForwarder, name, symbol, initBaseURI, feeReceiver, feeNumerator] as Parameters<
        ERC721Mintable['initialize']
    >;
}
```

## Deploy Script
If you updated the [factories.ts] file, the [src/deploy/common/Implementations.ts] and [src/deploy/common/UpgradeableBeacon.ts] deployment scripts will already be up to date to deploy an `implementation` smart contract and an `beacon` smart contract that points to it. Note that **NEITHER** of these contracts is usable and they should be used to then deploy [EIP-1167] proxies to the `implementation` or beacon proxies to the `beacon`.

Test that your contract is deployed by trying deploying locally. The `UpgradeableBeacon` script depends on the `Implementations` script so will automatically deploy all.
```bash
hh deploy --tags UpgradeableBeacon
...
hardhat  MyContract  implementation     deployed  0x0000...
...
hardhat  MyContract  beacon             deployed  0x0000...
```

For production deployments, you will need to write your own deploy script under [src/deploy/] that deploys [EIP-1167] proxies to the `implementation` or beacon proxies to the `beacon`.

## Mocha Test
If the regular [src/deploy/common/Implementations.ts] and [src/deploy/common/UpgradeableBeacon.ts] deployment scripts are working, you can then move on to writing Typescript unit tests for your smart contracts.

Unit tests should implement a `before()` clause that deploys all of the shared contracts that enable deterministic deployment, notably the [EIP-2470] deployer and the [EIP1167Factory].

```typescript
describe('ERC721Mintable', function () {
    let signers: SignerWithAddress[];
    let factories: Factories;
    let deterministicFactories: InitializeFactories;
    let ERC721MintableFactory: typeof deterministicFactories.ERC721Mintable;
    let ERC721Mintable: ERC721Mintable;

    let tokenName = 0;

    let token: ERC721MintableInitializeArgs;

    before(async () => {
        await deployProxyNick(hre as any);
        await deployProxyFactory(hre as any);

        signers = await ethers.getSigners();
        const signer = signers[0];
        const signerAddress = signer.address;

        factories = getFactories(signer);
        deterministicFactories = getDeterministicInitializeFactories( factories, signerAddress);
        ERC721MintableFactory = deterministicFactories.ERC721Mintable;
    });

    //...
```

For each unit test, you should then deploy a [EIP-1167] proxy contract with a unique salt:
```typescript
    //...
    beforeEach(async () => {
        token = {
            admin: signers[0].address,
            contractUri: `token.${tokenName}.com`,
            gsnForwarder: ethers.constants.AddressZero,
            name: `Token ${tokenName}`,
            symbol: `TK${tokenName}`,
            initBaseURI: `token.${tokenName}.com/token`,
            feeReceiver: signers[0].address,
            feeNumerator: 0,
        };
        const initializerArgs = flattenInitArgsERC721Mintable(token);
        ERC721Mintable = await ERC721MintableFactory.deploy(...initializerArgs);

        tokenName++;
    });
    //...
```

Then write your individual unit tests. You should **ONLY** test functionality that is custom to your contracts or some parent logic that has been overriden by your contract. Duplicate tests (eg. regular [EIP-721] transfer functionality) is **unecessary**.
```typescript
    //...
    it('name', async () => {
        const result = await ERC721Mintable.name();
        expect(result).to.be.eq(token.name);
    });
    //...
```

For more info, check out the example test for [test/hardhat/assets/ERC721/ERC721Mintable.test.ts].



