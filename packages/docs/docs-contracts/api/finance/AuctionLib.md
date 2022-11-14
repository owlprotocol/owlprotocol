## AuctionLib

Basic auction structures used through auction contracts.

### TokenType

```solidity
enum TokenType {
  erc721,
  erc1155
}
```

### Asset

```solidity
struct Asset {
  enum AuctionLib.TokenType token;
  address contractAddr;
  uint256 tokenId;
}
```

