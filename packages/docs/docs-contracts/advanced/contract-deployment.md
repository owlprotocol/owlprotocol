---
sidebar_position: 1
---

# Contract Deployment

[EIP-155]: https://eips.ethereum.org/EIPS/eip-155
[EIP-165]: https://eips.ethereum.org/EIPS/eip-165
[EIP-1820]: https://eips.ethereum.org/EIPS/eip-1820
[EIP-2470]: https://eips.ethereum.org/EIPS/eip-2470
[EIP-1014]: https://eips.ethereum.org/EIPS/eip-1014
[EIP-1167]: https://eips.ethereum.org/EIPS/eip-1167
[EIP-2470]: https://eips.ethereum.org/EIPS/eip-2470

[ether.js]: https://github.com/ethers-io/ethers.js/
[web3.js]: https://github.com/web3/web3.js

[ERC1167Factory]: ../../owlprotocol-contracts/contracts/proxy/ERC1167/ERC1167Factory.sol
[UpgradeableBeacon]: ../../owlprotocol-contracts/contracts/proxy/Beacon/UpgradeableBeacon.sol
[BeaconProxy]: ../../owlprotocol-contracts/contracts/proxy/Beacon/BeaconProxy.sol

[factories.ts]: ../../owlprotocol-contracts/src/ethers/factories.ts
[deterministicFactories.ts]: ../../owlprotocol-contracts/src/ethers/deterministicFactories.ts
[proxy1167Factories.ts]: ../../owlprotocol-contracts/src/ethers/proxy1167Factories.ts
[beaconProxyFactories.ts]: ../../owlprotocol-contracts/src/ethers/beaconProxyFactories.ts

Owl Protocol is designed to support the deployment of many smart contracts. As such we have designed 3 advanced deployment strategies to enable deterministic, cheap, and upgradeable smart contracts.

## Deployment Infrastructure
These deployment strategies rely on key pieces of blockchain infrastructure:
- [EIP-1014]: CREATE2 opcode for deterministic deployment
- [EIP-2470]: A CREATE2 deployer, deployed using Nick's method to ensure multichain addressing and implemented by [Arachnid/deterministic-deployment-proxy](https://github.com/Arachnid/deterministic-deployment-proxy)
- [ERC1167Factory]: A more advanced deployer, enabling atomic initialization (call an initializer after constructor), deployment of [EIP-1167] proxies, and enabling optional address-based replay protection (only msg.sender can re-deploy to same address).

### CREATE2
`CREATE2` opcode introduced by [EIP-1014] enables deterministic deployment of smart contracts based on the sender `address`, the `initCodeHash`, and a user provided `salt`. This decouples the deployed smart contract's address from the nonce of the account as is the case with the regular `CREATE` opcode. We can use `CREATE2` to then build larger primitives such as the [EIP-2470](https://eips.ethereum.org/EIPS/eip-2470) universal deployer that enables multichain deployment of smart contracts to the same address.

### EIP2470 Singleton Factory
We use the [Arachnid/deterministic-deployment-proxy](https://github.com/Arachnid/deterministic-deployment-proxy) deployed at [`0x4e59b44847b379578588920ca78fbf26c0b4956c`](https://etherscan.io/address/0x4e59b44847b379578588920ca78fbf26c0b4956ccode) on all EVM chains that support pre-[EIP-155] transactions (enabling transaction replay). Using the deterministic deployer, we can be guaranteed that our smart contracts can be deployed at matching cross-chain addresses without the need to manage a private key.

The factory is already deployed on most popular chains such as Ethereum, Polygon, and BNB Chain but you can deploy it with:
```
hh deploy --tags DeterministicDeployer --network <NETWORK>
```
*Note: This requires network configuration with RPC connection and a funded wallet to fund the deploy transaction. Network must support non-EIP155 transactions.*

### ERC1167Factory
This contract designed by Owl Protocol, is meant to extend the capabilities of the [EIP-2470] Factory, by enabling additional security features:
* Initialization: Our contracts are meant to be used by proxies and therefore use the [initializer](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeableinitializers) pattern with empty constructors. This presents the challenge however of having to atomically initialize the contract post-deployment. For this the [ERC1167Factory] supports a `initData` parameter that encodes arbitrary call data to be sent to the contract post deployment.
* [EIP-1167] proxies: The factory can be used to deploy minimal proxies that DELEGATECALL to an implementation contract. This comes with a slight long-term transactional overhead due to the extra DELEGATECALL, but enables cheap repeat deployment for large contracts.
* Salt Protection: Due to the usage of initalizers and proxies, an additional risk is introduced by the possibility of an attacker deploying "fake" clones of the contract at the same address on other EVM chains. To mitigate this, if initData, or a proxy implementation is specified, the CREATE2 salt MUST be determined by `keccak256` hash of the salt + additional data. This ensures that if 2 contracts have the same address, they MUST be initialized with the same data.
* Salt Sender Protection: In additional to the initData, user's MAY optionally send a sender address parameter (which MUST match the `msg.sender`), which will be used as an additional salt to guarantee that ONLY the original sender can re-deploy the contract to the same address on a different blockchain.

For deterministic deployment to work, the [ERC1167Factory] must itself be deployed at the same address on EVM chains. Therefore we use the EIP2470 Factory to deploy it. The [ERC1167Factory] is already deployed on most popular chains such as Ethereum and Polygon but you can deploy it with:
```
hh deploy --tags ERC1167Factory --network <NETWORK>
```
*Note: This requires network configuration with RPC connection and a funded wallet to fund the deploy transaction.*
## Deployment Strategies
Once the [ERC1167ProxyFactory] is deployed, we can explore the 3 different deployment strategies for our contracts.
* Static Regular: Regular deployment that triggers initializer
* ERC1167 Minimal Proxy: Transparent proxy that DELEGATECALL to implementation (cheaper deployment, transactional overhead due DELEGATECALL)
* BeaconProxy: Transparent proxy that DELEGATECALL to beacon (upgradeable if beacon, transactional overhead due to SLOAD address + CALL to beacon + DELEGATECALL to implementation)

*Note: All of these strategies can be deployed with msgSender specified or not. We HIGHLY RECOMMEND doing so as this removes the risk of someone initializing a clone of your contract on a separate chain.*

A 4th possible possible solution is to deploy a minimal proxy to a the beacon proxy implementation though this adds additional overhead & complexity.

### Static Regular
Contract is deployed using deterministic deployment.
```solidity
function deployDeterministic(
        bytes32 salt,
        bytes memory codeData,
        bytes memory initData,
        address msgSender
    ) external returns (address)
```
**Optional Parameters**
- `bytes memory initData`: set to `0x` if you want to **not** call any initializer.
- `address msgSender`: set to `msg.sender` to protect deployment by this sender. Set to `address(0)` if you want to enable to re-deploy on other chains (**NOT** recommended except for implementation contracts).

### [EIP-1167] Minimal Proxy
Contract is deployed using an [EIP-1167] clone. An [EIP-1167] proxy is an optimized proxy that DELEGATECALL's to a static `implementation` address that stores the bytecode.

Here the `bytes memory codeData` is replaced by a `address implementation`.
```solidity
function cloneDeterministic(
        address implementation,
        bytes32 salt,
        bytes memory initData,
        address msgSender
    ) external returns (address instance)
```
**Optional Parameters**
Same as **Static Regular** deployment.

The Owl Protocol contract implementations are already deployed on most popular chains such as Ethereum, Polygon, and BNB Chain but you can deploy them with:
```
hh deploy --tags Implementations --network <NETWORK>
```
*Note: This requires network configuration with RPC connection and a funded wallet to fund the deploy transactions. Contracts will be deployed at the **SAME** deterministic addresses as on Ethereum.*

You may then deploy clone proxies to your chosing.

### Beacon Proxy
This is the most complex form of deployment. Beacon proxies enable upgradability of smart contracts in a one to many fashion. This means the owner of the beacon, can upgrade ALL proxies that point to it.
A beacon proxy relies on 2 other contracts, an `implementation` which stores the bytecode (similar to ERC1167), and a `beacon` which stores the address of the `implementation`. This beacon is then used by the proxy (aka beacon proxy), to query the current implementation address and DELEGATECALL to it.
We use the following contracts:
* `implementation`: Any contract
* `beacon`: [UpgradeableBeacon](./contracts/proxy/Beacon/UpgradeableBeacon.sol)
* `proxy`: [BeaconProxy](./contracts/proxy/Beacon/BeaconProxy.sol)

This dependency can be visualized as:
`proxy` -> `beacon` -> `implementation`

The beacon proxy enables upgradeability in 2 ways:
* Upgrade `beacon` -> `implementation`: Managed by the `admin` of the beacon. Changes the `implementation` for ALL proxies that point to it.
* Upgrade `proxy` -> `beacon`: Managed by the `admin` of the proxy. Changes the `beacon` that the `proxy` points to.

**Implementation**
This can be any contract. However, we find it important to have a brief discussion on initialization. Because the `BeaconProxy` is initializable itself, our implementation contracts have 2 types of initialization. Regular `initialize(memory data)` with the `initializer` modifer, and `proxyInitialize(memory data)` with the `onlyInitializing` modifier. The `onlyInitializing` modifier enables calling the initializer white the `BeaconProxy` is itself initializing.

**Beacon Initialization**
The beacon is initialized by setting the admin and implementation address.
```solidity
function initialize(
    address _admin,
    address implementation_
) external initializer
```

**Proxy Initialization**
The beacon proxy is initialized by setting the admin, the beacon address, and an optional post upgrade call. The post upgrade DELEGATECALL to the implementation, is done while the contract has `initializing = true` and therefore we recommend call the `proxyInitialize` method of our contracts.
```solidity
function initialize(
        address _admin,
        address _beaconAddress,
        bytes memory data
    ) external initializer {
        assert(_BEACON_SLOT == bytes32(uint256(keccak256('eip1967.proxy.beacon')) - 1));
        _upgradeBeaconToAndCall(_beaconAddress, data, false);

        __Ownable_init();
        _transferOwnership(_admin);
}
```


The Owl Protocol managed beacon's are already deployed on most popular chains such as Ethereum, Polygon, and BNB Chain but you can deploy them with:
```
hh deploy --tags UpgradeableBeacon --network <NETWORK>
```
*Note: This requires network configuration with RPC connection and a funded wallet to fund the deploy transactions. Contracts will be deployed at the deterministic addresses based on **YOUR** address.*

You may then deploy beacon proxies to your chosing.


## Typescript Libraries
To enable easier deployment using our 3 strategies, Owl Protocol has developed TS libraries similar to [hardhat-deploy#deterministicDeployment](https://github.com/wighawag/hardhat-deploy#4-deterministicdeployment-ability-to-specify-a-deployment-factory) to go along with our smart contracts. We use the [ether.js] library for these but deployed contracts can also be used with [web3.js].


* [factories.ts]: Regular ethers factories
* [deterministicFactories.ts]: Ethers factory wrappers that use the same API but use deterministic deployment using the [ERC1167Factory] for deterministic deployment
* [proxy1167Factories.ts]: Ethers factory wrappers that use the same API but use deterministic deployment using the [ERC1167Factory] for deterministic [EIP-1167] clone deployment
* [beaconProxyFactories.ts]: Ethers factory wrappers that use the same API but use deterministic deployment using the [ERC1167Factory] with for deterministic [EIP-1167] clone deployment
