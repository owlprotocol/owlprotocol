## IMinterAutoId

Decentralized NFT Minter contract

### mint

```solidity
function mint() external returns (uint256 nextTokenId)
```

Create a new type of species and define attributes.

### safeMint

```solidity
function safeMint() external returns (uint256 nextTokenId)
```

Create a new type of species and define attributes.

### setNextTokenId

```solidity
function setNextTokenId(uint256 nextTokenId_) external
```

Used to set the starting nextTokenId value.
Used to save situtations where someone mints directly

