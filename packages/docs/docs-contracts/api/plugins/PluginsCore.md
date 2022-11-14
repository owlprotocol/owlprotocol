## PluginsCore

Abstract contract with types and utilities that will be used by many (if
not all) Plugins contracts

### RouterError

```solidity
event RouterError(uint256 routeId, address sender, bytes data)
```

### ConsumableType

```solidity
enum ConsumableType {
  unaffected,
  burned,
  NTime
}
```

### TokenType

```solidity
enum TokenType {
  erc20,
  erc721,
  erc1155
}
```

### Ingredient

```solidity
struct Ingredient {
  enum PluginsCore.TokenType token;
  enum PluginsCore.ConsumableType consumableType;
  address contractAddr;
  uint256[] amounts;
  uint256[] tokenIds;
}
```

### nUse

```solidity
mapping(uint256 => uint256) nUse
```

### usedERC721Inputs

```solidity
mapping(address => mapping(uint256 => uint256)) usedERC721Inputs
```

### _useInputs

```solidity
function _useInputs(struct PluginsCore.Ingredient[] inputs, address from, address burnAddress, uint256[][] _inputERC721Ids, uint256 amount) internal
```

will use/consume inputs as dicatated by the configuration

| Name | Type | Description |
| ---- | ---- | ----------- |
| inputs | struct PluginsCore.Ingredient[] | set of inputs in the configuration |
| from | address | address to use/consume inputs from |
| burnAddress | address | in case configuration requires a burn address to transfer items to |
| _inputERC721Ids | uint256[][] | set of ERC721 `tokenId`s, if applicable Example of `_inputERC721Ids` with `amount = 2` with 3 `Ingredient`s in `inputs` with `TokenType.ERC721` ``` [  [1, 2]  [3, 4]  [5, 6] ] ``` |
| amount | uint256 | sets of inputs to use/consume |

### _validateInputs

```solidity
function _validateInputs(struct PluginsCore.Ingredient[] _inputs, struct PluginsCore.Ingredient[] inputs) internal
```

validates inputs array of ingredients

| Name | Type | Description |
| ---- | ---- | ----------- |
| _inputs | struct PluginsCore.Ingredient[] | the inputted array to the Crafter initializer |
| inputs | struct PluginsCore.Ingredient[] | storage array of inputs, copied from _inputs |

### __gap

```solidity
uint256[48] __gap
```

