## ERC1155Mintable

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

### contractURI_

```solidity
string contractURI_
```

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
function initialize(address _admin, string uri_, string newContractURI, address _forwarder, address _receiver, uint96 _feeNumerator) external
```

Initializes an ERC721Owl contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | admin for contract |
| uri_ | string | uri for contract |
| newContractURI | string | new uri for contract |
| _forwarder | address | address for trusted forwarder for open GSN |
| _receiver | address | address of receiver of royalty fees |
| _feeNumerator | uint96 | numerator of royalty fee percentage (numerator / 10000) |

### proxyInitialize

```solidity
function proxyInitialize(address _admin, string uri_, string newContractURI, address _forwarder, address _receiver, uint96 _feeNumerator) external
```

### __ERC1155Mintable_init

```solidity
function __ERC1155Mintable_init(address _admin, string uri_, string newContractURI, address _forwarder, address _receiver, uint96 _feeNumerator) internal
```

### __ERC1155Mintable_init_unchained

```solidity
function __ERC1155Mintable_init_unchained(string newContractURI) internal
```

### grantMinter

```solidity
function grantMinter(address to) public
```

Must have DEFAULT_ADMIN_ROLE

Grants MINTER_ROLE to [`a(...)`](#a)

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |

### grantUriRole

```solidity
function grantUriRole(address to) public
```

Must have DEFAULT_ADMIN_ROLE

Grants URI_ROLE to [`a(...)`](#a)

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |

### grantRoyaltyRole

```solidity
function grantRoyaltyRole(address to) public
```

Must have DEFAULT_ADMIN_ROLE

Grants ROYALTY_ROLE to [`a(...)`](#a)

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |

### mint

```solidity
function mint(address to, uint256 id, uint256 amount, bytes data) public
```

Must have MINTER_ROLE

Allows MINTER_ROLE to mint NFTs

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |
| id | uint256 | tokenId value |
| amount | uint256 | to mint |
| data | bytes | for hooks |

### mintBatch

```solidity
function mintBatch(address to, uint256[] ids, uint256[] amounts, bytes data) public
```

Must have MINTER_ROLE

Allows caller to mint NFTs (safeMint)

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |
| ids | uint256[] | id values |
| amounts | uint256[] | to mint |
| data | bytes | for hooks |

### setURI

```solidity
function setURI(string newuri) public
```

Must have URI_ROLE role!

Allows setting the uri

| Name | Type | Description |
| ---- | ---- | ----------- |
| newuri | string | set the baseURI value. |

### setContractURI

```solidity
function setContractURI(string newContractURI) public
```

Must have URI_ROLE role!

Allows setting the contract uri

| Name | Type | Description |
| ---- | ---- | ----------- |
| newContractURI | string | set the contractURI_ value. |

### contractURI

```solidity
function contractURI() public view returns (string)
```

Defines collection-wide metadata that is URI-accessible

### setTokenRoyalty

```solidity
function setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) external
```

Exposing `_setTokenRoyalty`

### setDefaultRoyalty

```solidity
function setDefaultRoyalty(address receiver, uint96 feeNumerator) external
```

Exposing `_setDefaultRoyalty`

### _msgSender

```solidity
function _msgSender() internal view returns (address)
```

the following 3 functions are all required for OpenGSN integration

### _msgData

```solidity
function _msgData() internal view returns (bytes)
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

