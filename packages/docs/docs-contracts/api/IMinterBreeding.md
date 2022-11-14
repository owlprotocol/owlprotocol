## IMinterBreeding

### breed

```solidity
function breed(uint256[] parents) external returns (uint256 tokenId)
```

Create a new type of species and define attributes.

### safeBreed

```solidity
function safeBreed(uint256[] parents) external returns (uint256 tokenId)
```

Create a new type of species and define attributes.

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | minted token id |

### setBreedingRules

```solidity
function setBreedingRules(uint8 requiredParents, uint256 breedCooldownSeconds, uint8[] genes, uint256[] mutationRates) external returns (uint256 tokenId)
```

Create a new type of species and define attributes.

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | minted token id |

### getBreedingRules

```solidity
function getBreedingRules() external view returns (uint8 requiredParents, uint256 breedCooldownSeconds, uint8[] genes, uint256[] mutationRates)
```

Returns the current breeding rules used for a species

