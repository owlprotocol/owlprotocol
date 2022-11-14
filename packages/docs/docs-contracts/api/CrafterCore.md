## CrafterCore

Base contract that all Crafter contracts will inherit from

### Create

```solidity
event Create(address creator, struct PluginsCore.Ingredient[] inputs, struct PluginsCore.Ingredient[] outputs)
```

### Update

```solidity
event Update(uint256 craftableAmount)
```

### Craft

```solidity
event Craft(uint256 craftedAmount, uint256 craftableAmount, address user)
```

### burnAddress

```solidity
address burnAddress
```

### craftableAmount

```solidity
uint96 craftableAmount
```

### inputs

```solidity
struct PluginsCore.Ingredient[] inputs
```

### outputs

```solidity
struct PluginsCore.Ingredient[] outputs
```

### __CrafterCore_init

```solidity
function __CrafterCore_init(address _admin, address _burnAddress, struct PluginsCore.Ingredient[] _inputs, struct PluginsCore.Ingredient[] _outputs, address _forwarder) internal
```

performs validations that `_inputs` and `_outputs` are valid and
creates the configuration

### __CrafterCore_init_unchained

```solidity
function __CrafterCore_init_unchained(address _burnAddress, struct PluginsCore.Ingredient[] _inputs, struct PluginsCore.Ingredient[] _outputs) internal
```

performs validations that `_inputs` and `_outputs` are valid and
creates the configuration

### getInputs

```solidity
function getInputs() public view returns (struct PluginsCore.Ingredient[] _inputs)
```

Returns all inputs (without `amounts` or `tokenIds`)

### getOutputs

```solidity
function getOutputs() public view returns (struct PluginsCore.Ingredient[] _outputs)
```

Returns all outputs (without `amounts` or `tokenIds`)

### getInputIngredient

```solidity
function getInputIngredient(uint256 index) public view returns (enum PluginsCore.TokenType token, enum PluginsCore.ConsumableType consumableType, address contractAddr, uint256[] amounts, uint256[] tokenIds)
```

Returns all details for a specific ingredient (including
amounts/tokenIds)

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | uint256 | ingredient index to return details for |

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | enum PluginsCore.TokenType | token type |
| consumableType | enum PluginsCore.ConsumableType | consumable type |
| contractAddr | address | token contract address |
| amounts | uint256[] | amount of each token |
| tokenIds | uint256[] | token ids |

### getOutputIngredient

```solidity
function getOutputIngredient(uint256 index) public view returns (enum PluginsCore.TokenType token, enum PluginsCore.ConsumableType consumableType, address contractAddr, uint256[] amounts, uint256[] tokenIds)
```

Returns all details for a specific ingredient (including
amounts/tokenIds)

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | uint256 | ingredient index to return details for |

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | enum PluginsCore.TokenType | token type |
| consumableType | enum PluginsCore.ConsumableType | consumable type |
| contractAddr | address | token contract address |
| amounts | uint256[] | amount of each token |
| tokenIds | uint256[] | token ids |

### _validateInputs

```solidity
function _validateInputs(struct PluginsCore.Ingredient[] _inputs) internal
```

calls PluginsCore._validateInputs(_inputs, inputs)

### _useInputs

```solidity
function _useInputs(uint256[][] _inputERC721Ids, uint256 amount) internal
```

call PluginsCore._useInputs(inputs, from, burnAddress,
_inputERC721Ids, amount)

### _validateOutputs

```solidity
function _validateOutputs(struct PluginsCore.Ingredient[] _outputs, uint256 _craftableAmount) internal returns (uint256)
```

validates outputs array of ingredients

| Name | Type | Description |
| ---- | ---- | ----------- |
| _outputs | struct PluginsCore.Ingredient[] | the output array of the Crafter initializer |
| _craftableAmount | uint256 | the amount of times the recipe may be crafted |

### _createOutputsArr

```solidity
function _createOutputsArr(struct PluginsCore.Ingredient[] _outputs, uint256 _craftableAmount, uint256 erc721Amount) internal pure returns (uint256[][])
```

Creating a static 2d array

| Name | Type | Description |
| ---- | ---- | ----------- |
| _outputs | struct PluginsCore.Ingredient[] | the output array of the Crafter initializer |
| _craftableAmount | uint256 | the amount of times the recipe may be crafted |
| erc721Amount | uint256 | the number of erc721 tokens to be used as output |

### _addOutputs

```solidity
function _addOutputs(uint256 amount, uint256[][] _outputsERC721Ids, address from) internal virtual
```

function must be overriden by child contract. Adding
process is too different between the contract for
abstraction

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | sets of outputs to deposit |
| _outputsERC721Ids | uint256[][] | erc721 `tokenId`s to use as outputs |
| from | address | if transferring, address to transfer outputs from |

### _removeOutputs

```solidity
function _removeOutputs(uint96 amount, address to) internal virtual
```

function must be overriden by child contract. Removal
process is too different between the contracts for
abstraction

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint96 | sets of outputs to remove |
| to | address | address to send outputs to |

### __gap

```solidity
uint256[46] __gap
```

