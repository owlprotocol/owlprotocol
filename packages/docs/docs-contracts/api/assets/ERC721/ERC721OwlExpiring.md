## ERC721OwlExpiring

This implementation is an extension of OwlProtocol's base [`ERC721Owl`](./ERC721Owl)
contract. After a set amount of time determined at mint, the `tokenId` will
no longer belong to the minter. The update is not done through a transaction
but rather by overriding standaring [`ERC721Owl`](./ERC721Owl) view function to return
`null` results after token expiry has passed.

The default `mint(address,uint256)` is disabled in favor of a new signature
that allows setting of an expiry time.

Initially, setting the expiry time is done by `MINTER_ROLE` during the minting
process however consequent updates to the expiry time (but before expiry has
taken place) must be done by `EXPIRY_ROLE`. After expiry, `tokenId` is able to
reminted by `MINTER_ROLE` but can also be extended by `EXPIRY_ROLE`

### EXPIRY_ROLE

```solidity
bytes32 EXPIRY_ROLE
```

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### expires

```solidity
mapping(uint256 => uint256) expires
```

### initialize

```solidity
function initialize(address _admin, string _name, string _symbol, string baseURI_, address _forwarder, address _receiver, uint96 _feeNumerator) external
```

Initializes contract (replaces constructor in proxy pattern)

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | owner |
| _name | string | name |
| _symbol | string | symbol |
| baseURI_ | string | uri |
| _forwarder | address | trusted forwarder address for openGSN |
| _receiver | address | address of receiver of royalty fees |
| _feeNumerator | uint96 | numerator of fee proportion (numerator / 10000) |

### proxyInitialize

```solidity
function proxyInitialize(address _admin, string _name, string _symbol, string baseURI_, address _forwarder, address _receiver, uint96 _feeNumerator) external
```

Initializes contract through beacon proxy (replaces constructor in
proxy pattern)

### __ERC721OwlExpiring_init

```solidity
function __ERC721OwlExpiring_init(address _admin, string _name, string _symbol, string baseURI_, address _forwarder, address _receiver, uint96 _feeNumerator) internal
```

### __ERC721OwlExpiring_init_unchained

```solidity
function __ERC721OwlExpiring_init_unchained() internal
```

### grantExpiry

```solidity
function grantExpiry(address to) public
```

Must have DEFAULT_ADMIN_ROLE

Grants EXPIRY_ROLE to `to`

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |

### ownerOf

```solidity
function ownerOf(uint256 tokenId) public view returns (address)
```

See [`IERC721.ownerOf(...)`](./IERC721#ownerof).

### tokenURI

```solidity
function tokenURI(uint256 tokenId) public view returns (string)
```

See [`IERC721Metadata.tokenURI(...)`](./IERC721Metadata#tokenuri).

### approve

```solidity
function approve(address to, uint256 tokenId) public virtual
```

See [`IERC721.approve(...)`](./IERC721#approve).

### getApproved

```solidity
function getApproved(uint256 tokenId) public view returns (address)
```

See [`IERC721.getApproved(...)`](./IERC721#getapproved).

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 tokenId) public
```

See [`IERC721.transferFrom(...)`](./IERC721#transferfrom).

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId) public
```

See [`IERC721.safeTransferFrom(...)`](./IERC721#safetransferfrom).

### mint

```solidity
function mint(address, uint256) public pure
```

function disabled

### safeMint

```solidity
function safeMint(address, uint256) public pure
```

function disabled

### mint

```solidity
function mint(address to, uint256 tokenId, uint256 expireTime) public
```

Must have MINTER_ROLE

Allows MINTER_ROLE to mint NFTs

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |
| tokenId | uint256 | tokenId value |
| expireTime | uint256 |  |

### safeMint

```solidity
function safeMint(address to, uint256 tokenId, uint256 expireTime) public
```

Must have MINTER_ROLE

Allows caller to mint NFTs (safeMint)

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |
| tokenId | uint256 | tokenId value |
| expireTime | uint256 |  |

### extendExpiry

```solidity
function extendExpiry(uint256 tokenId, uint256 extendAmount) external
```

Must have EXPIRY_ROLE.

`expires` mapping is updated with new expire time

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | to update |
| extendAmount | uint256 | amount of time to extend by |

### getExpiry

```solidity
function getExpiry(uint256 tokenId) external view returns (uint256)
```

exposes read access to `expires` mapping

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | expireTime block.timestamp of when tokenId expires |

### _expired

```solidity
function _expired(uint256 tokenId) internal view virtual returns (bool)
```

checks if tokenId is expired

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool expired |

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

ERC165 Support

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | bytes4 | hash of the interface testing for |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool whether interface is supported |

