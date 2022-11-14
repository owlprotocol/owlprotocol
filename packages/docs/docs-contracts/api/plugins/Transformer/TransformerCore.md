## TransformerCore

abstract contract that contains all the utilities and types required for
Transformer contract

### GeneTransformType

```solidity
enum GeneTransformType {
  none,
  add,
  sub,
  mult,
  set
}
```

### GeneMod

```solidity
struct GeneMod {
  enum TransformerCore.GeneTransformType geneTransformType;
  uint256 value;
}
```

### transform

```solidity
function transform(uint256 currDna, uint8[] genes, struct TransformerCore.GeneMod[] modifications) internal pure returns (uint256 newDna)
```

Uses bitmask to transform inputted DNA according to modifications

| Name | Type | Description |
| ---- | ---- | ----------- |
| currDna | uint256 | original DNA, represented in base 10 |
| genes | uint8[] | array representing start indexes of genes within binary representation of currDna |
| modifications | struct TransformerCore.GeneMod[] | array describing modifications to each gene |

| Name | Type | Description |
| ---- | ---- | ----------- |
| newDna | uint256 | the transformed DNA |

### get256Bitmask

```solidity
function get256Bitmask(uint16 startBit, uint16 endBit) internal pure returns (uint256 bitMask)
```

Generates a 256-bit bitmask from startBit:endBit

| Name | Type | Description |
| ---- | ---- | ----------- |
| startBit | uint16 | beginning of mask |
| endBit | uint16 | end of mask |

| Name | Type | Description |
| ---- | ---- | ----------- |
| bitMask | uint256 | combined bitmask |

