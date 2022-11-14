## ICrafter

Crafting contracts interface

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

### deposit

```solidity
function deposit(uint96 amount, uint256[][] _outputsERC721Ids) external
```

Must be `DEFAULT_ADMIN_ROLE`. Automatically sends from
`_msgSender()`

Used to deposit configuration outputs.

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint96 | How many more times the configuration should be craftable |
| _outputsERC721Ids | uint256[][] | 2D-array of ERC721 tokens used in crafting Example of `_outputERC721Ids` with `amount = 2` with 3 `Ingredient`s in `outputs` with `TokenType.ERC721` ``` [  [1, 2]  [3, 4]  [5, 6] ] ``` |

### withdraw

```solidity
function withdraw(uint96 amount) external
```

Must be `DEFAULT_ADMIN_ROLE`

Used to withdraw configuration outputs out of contract to the
caller. Will also decrease `craftableAmount`

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint96 | How many sets of outputs should be withdrawn |

### craft

```solidity
function craft(uint96 amount, uint256[][] _inputERC721Ids) external
```

Craft `amount`

Used to craft. Consumes inputs and transfers outputs.

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint96 | How many times to craft |
| _inputERC721Ids | uint256[][] | Array of pre-approved NFTs for crafting usage. Example of `_inputERC721Ids` with `amount = 2` with 3 `Ingredient`s in `inputs` with `TokenType.ERC721` ``` [  [1, 2]  [3, 4]  [5, 6] ] ``` |

