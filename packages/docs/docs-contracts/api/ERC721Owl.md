## ERC721Owl

This implements the standard OwlProtocol `ERC721` contract that is an
extension of Openzeppelin's `ERC721BurnableUpgradeable`. Initializations
happens through initializers for compatibility with a EIP1167 minimal-proxy
deployment strategy.

### MINTER_ROLE

```solidity
bytes32 MINTER_ROLE
```

### URI_ROLE

```solidity
bytes32 URI_ROLE
```

### ROYALTY_ROLE

```solidity
bytes32 ROYALTY_ROLE
```

### VERSION

```solidity
string VERSION
```

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### baseURI

```solidity
string baseURI
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address _admin, string _name, string _symbol, string baseURI_, address _forwarder, address _receiver, uint96 _feeNumerator) external virtual
```

Initializes an ERC721Owl contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | admin for contract |
| _name | string | name for contract |
| _symbol | string | symbol for contract |
| baseURI_ | string | base URI for contract |
| _forwarder | address | address for trusted forwarder for open GSN |
| _receiver | address | address of receiver of royalty fees |
| _feeNumerator | uint96 | numerator of royalty fee percentage (numerator / 10000) |

### proxyInitialize

```solidity
function proxyInitialize(address _admin, string _name, string _symbol, string baseURI_, address _forwarder, address _receiver, uint96 _feeNumerator) external virtual
```

Initializes contract through beacon proxy (replaces constructor in
proxy pattern)

### __ERC721Owl_init

```solidity
function __ERC721Owl_init(address _admin, string _name, string _symbol, string baseURI_, address _forwarder, address _receiver, uint96 _feeNumerator) internal
```

### __ERC721Owl_init_unchained

```solidity
function __ERC721Owl_init_unchained(string baseURI_) internal
```

### grantMinter

```solidity
function grantMinter(address to) public
```

Must have DEFAULT_ADMIN_ROLE

Grants MINTER_ROLE to `to`

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address tos |

### grantUriRole

```solidity
function grantUriRole(address to) public
```

Must have DEFAULT_ADMIN_ROLE

Grants URI_ROLE to `a`

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |

### grantRoyaltyRole

```solidity
function grantRoyaltyRole(address to) public
```

Must have DEFAULT_ADMIN_ROLE

Grants ROYALTY_ROLE to {a}

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |

### mint

```solidity
function mint(address to, uint256 tokenId) public virtual
```

Must have MINTER_ROLE

Allows MINTER_ROLE to mint NFTs

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |
| tokenId | uint256 | tokenId value |

### safeMint

```solidity
function safeMint(address to, uint256 tokenId) public virtual
```

Must have MINTER_ROLE

Allows caller to mint NFTs (safeMint)

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |
| tokenId | uint256 | tokenId value |

### setBaseURI

```solidity
function setBaseURI(string baseURI_) public
```

Must have URI_ROLE role!

Allows setting the baseURI

| Name | Type | Description |
| ---- | ---- | ----------- |
| baseURI_ | string | set the baseURI value. |

### _baseURI

```solidity
function _baseURI() internal view returns (string)
```

Overrides OZ internal baseURI getter.

### contractURI

```solidity
function contractURI() public view returns (string)
```

Returns collection-wide URI-accessible metadata

### exists

```solidity
function exists(uint256 tokenId) external view returns (bool)
```

exposing `_exists`

### setTokenRoyalty

```solidity
function setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) external
```

exposing `_setTokenRoyalty`

### setDefaultRoyalty

```solidity
function setDefaultRoyalty(address receiver, uint96 feeNumerator) external
```

Exposing `_setDefaultRoyalty`

### _msgSender

```solidity
function _msgSender() internal view returns (address)
```

use {OwlBase._msgSender()}

### _msgData

```solidity
function _msgData() internal view returns (bytes)
```

use {OwlBase._msgData()}

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

### __gap

```solidity
uint256[49] __gap
```

