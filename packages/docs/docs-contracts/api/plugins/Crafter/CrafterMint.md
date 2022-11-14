## CrafterMint

Contract module that enables crafting of different types of assets
(ERC20, ERC721, ERC1155) whose crafting outputs are minted to the caller.

Crafting configuration is designated by two [`PluginsCore.Ingredient`](./PluginsCore#ingredient)`[]`. One array is the
`inputs` and the other is the `outputs`. The contract allows for the `inputs`
to be redeemed for the `outputs`, `craftableAmount` times.

```
struct Ingredient {
    TokenType token;
    ConsumableType consumableType;
    address contractAddr;
    uint256[] amounts;
    uint256[] tokenIds;
}
```

Configuration is set in the initializers and cannot be edited once the
contract has been launched Other configurations will require their own
contract to be deployed

However, `craftableAmount` can be dynamically updated through the [`deposit(...)`](#deposit)
and [`withdraw(...)`](#withdraw) functions which are only accessible to `DEFAULT_ADMIN_ROLE`

Each Ingredient has a `consumableType` field.* This field is for the `inputs`
elements and ignored by the `outputs` elements. ERC20 and ERC1155 `inputs`
elements can be `unaffected` or `burned`. `unaffected` will check for
ownership/balance while `burned` will send the asset(s) to the `burnAddress`.
ERC721 inputs can be `NTime` or `burned`. `NTime` allows for a specfic
`tokenId` to only be used 'n times', as defined by contract deployer.

ERC20 `inputs` and `outputs` elements should have one number in the `amounts`
array denoting ERC20 token amount requirement.* `tokenIds` should be empty.

NTime consumable type ERC721 inputs should have empty `tokenIds` and
`amounts[0]` equal to `n` - the maximum number of times the input can be
used.* Burned ERC721 `inputs` elements should have * empty `amounts` and
`tokenIds` array. This contract accepts *all* `tokenId`s from an ERC721
contract as inputs. ERC721 `outputs` elements must have empty `amounts`
array. `tokenIds` array length should be `craftableAmount`. The `tokenIds`
array will contain the `tokenIds` to be transferred out when [`craft(...)`](#craft) is
called. Important to note that output transfers will be from the *end* of the
array since `.pop()` is used.

ERC1155 `inputs` and `outputs` elements should have the length of `amounts`
and `tokenIds` array be the same. The indices will be linked where each index
denotes how much of each ERC1155 `tokenId` is required.

This module is used through composition. It can be deployed to create
crafting logic with asset contracts that are already on chain and active;
plug-and-play, so to speak.

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address _admin, address _burnAddress, uint96 _craftableAmount, struct PluginsCore.Ingredient[] _inputs, struct PluginsCore.Ingredient[] _outputs, address _forwarder) external
```

Initializes contract (replaces constructor in proxy pattern)

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | owner, can control outputs on contract |
| _burnAddress | address | Burn address for burn inputs |
| _craftableAmount | uint96 | limit on the number of times this configuration can be crafted |
| _inputs | struct PluginsCore.Ingredient[] | inputs for configuration |
| _outputs | struct PluginsCore.Ingredient[] | outputs for configuration |
| _forwarder | address | trusted forwarder address for openGSN |

### proxyInitialize

```solidity
function proxyInitialize(address _admin, address _burnAddress, uint96 _craftableAmount, struct PluginsCore.Ingredient[] _inputs, struct PluginsCore.Ingredient[] _outputs, address _forwarder) external
```

Initializes contract through beacon proxy (replaces constructor in
proxy pattern)

### __CrafterMint_init

```solidity
function __CrafterMint_init(address _admin, address _burnAddress, uint96 _craftableAmount, struct PluginsCore.Ingredient[] _inputs, struct PluginsCore.Ingredient[] _outputs, address _forwarder) internal
```

performs validations that `_inputs` and `_outputs` are valid and
creates the configuration

### __CrafterMint_init_unchained

```solidity
function __CrafterMint_init_unchained(uint96 _craftableAmount, struct PluginsCore.Ingredient[] _outputs) internal
```

performs validations that `_inputs` and `_outputs` are valid and
creates the configuration

### deposit

```solidity
function deposit(uint96 amount, uint256[][] _outputsERC721Ids) public
```

Must be `DEFAULT_ADMIN_ROLE`.

Used to deposit configuration outputs.

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint96 | How many more times the configuration should be craftable |
| _outputsERC721Ids | uint256[][] | 2D-array of ERC721 tokens used in crafting Example of `_outputERC721Ids` with `amount = 2` with 3 `Ingredient`s in `outputs` with `TokenType.ERC721` ``` [  [1, 2]  [3, 4]  [5, 6] ] ``` |

### _deposit

```solidity
function _deposit(uint96 amount, uint256[][] _outputsERC721Ids) internal
```

Must be `DEFAULT_ADMIN_ROLE`

Used to deposit configuration outputs. This is only ever directly
called in intializations.

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint96 | How many times the configuration should be craftable |
| _outputsERC721Ids | uint256[][] | 2D-array of ERC721 tokens used in crafting |

### withdraw

```solidity
function withdraw(uint96 amount) external
```

Must be `DEFAULT_ADMIN_ROLE`

Used to withdraw configuration outputs out of contract by decreasing
`craftableAmount`.

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint96 | How many sets of outputs should be withdrawn |

### craft

```solidity
function craft(uint96 amount, uint256[][] _inputERC721Ids) external
```

Craft `amount`

Used to craft. Consumes inputs and mints outputs.

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint96 | How many times to craft |
| _inputERC721Ids | uint256[][] | Array of pre-approved NFTs for crafting usage. Example of `_inputERC721Ids` with `amount = 2` with 3 `Ingredient`s in `inputs` with `TokenType.ERC721` ``` [  [1, 2]  [3, 4]  [5, 6] ] ``` |

### _addOutputs

```solidity
function _addOutputs(uint256 amount, uint256[][] _outputsERC721Ids, address) internal
```

adds outputs to the contract balances

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | sets of outputs to add |
| _outputsERC721Ids | uint256[][] | if there are ERC721 tokens present, supply their `tokenId`s Example of `_outputERC721Ids` with `amount = 2` with 3 `Ingredient`s in `outputs` with `TokenType.ERC721` ``` [  [1, 2]  [3, 4]  [5, 6] ] ``` |
|  | address |  |

### _removeOutputs

```solidity
function _removeOutputs(uint96 amount, address to) internal
```

removes outputs from the contract balances. If to != address(0),
then assets are also minted to that address

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint96 | sets of outputs to remove |
| to | address | address to send outputs to, if applicable |

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

ERC165 Support

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | bytes4 | hash of the interface testing for |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool whether interface is supported |

