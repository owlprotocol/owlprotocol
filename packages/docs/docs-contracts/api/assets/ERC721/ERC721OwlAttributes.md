## ERC721OwlAttributes

This implementation is an extension of OwlProtocol's base [`ERC721Owl`](./ERC721Owl)
that enables on-chain encoding. In most uses of `ERC721`, contract deployers
have chosen to keep all metadata off-chain. While this is
economical in terms of gas costs it also disallows on-chain actors
(first-party or third-party) to deploy contracts that depend on the metadata.
This contract solves the latter without sacrificing on the former.

In this contract, each `tokenId` is auto-incremented, solely determined by
the order of the mint. Each `tokenId` is also paired with a `dna` at the time
of mint. The `dna` will hold an encoding of all attributes for that
specific `tokenId`, stored in the `dnas` mapping.

A "dna" will be stored in its decimal form, however all the metadata can
be decoded from its binary form, given the configuration of its "genes". A
"gene" represents a potential attribute that a `tokenId` can posses. The
size of the "gene" (how many bits it will be allocated in the binary form)
will be determined by the amount of possible options the attribute (that the
"gene" represents) can have.

A quick exemplification of the concept of "genes": Suppose an
[`ERC721OwlAttributes`](./ERC721OwlAttributes) instance with 3 attributes and 4 options for each
attribute: 4 options can be encoded into two bits (log(4) = 2). Since there
are three total attributes, the `tokenId`s in this [`ERC721OwlAttributes`](./ERC721OwlAttributes)
instance will require 6 bits for encoding. Suppose the attributes options are
in arrays:

```
attributes1 = [option1, ..., option4]
attributes2 = [option1, ..., option4]
attributes3 = [option1, ..., option4]
```

So if a `tokenId` was minted with a "dna" that had a binary format of
`01 10 11`, that `tokenId`'s metadata would be:
- `option2` for `attributes1`
- `option3` for `attributes2`
- `option4` for `attributes3`

`01 10 11` in its decimal form is 27 which is what would be mapped to the
`tokenId` it was assigned during minting.

If it were ever required, the genes array for this [`ERC721OwlAttribtues`](./ERC721OwlAttribtues)
instance would be `[0, 2, 4, 6]`. They are, in order, the index ranges of
each "gene" in the binary format of the "dna". The genes array must begin at
0 and be strictly increasing. The max size of a "dna" is 256 bits so no
element in the genes should be above 255 (it is a uint8[] array).

The `dnas` mapping can be dynamically updated by `DNA_ROLE` through the
`updateDna()` function.

### DNA_ROLE

```solidity
bytes32 DNA_ROLE
```

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### dnas

```solidity
mapping(uint256 => uint256) dnas
```

### nextId

```solidity
struct CountersUpgradeable.Counter nextId
```

### initialize

```solidity
function initialize(address _admin, string _name, string _symbol, string baseURI_, address _forwarder, address _receiver, uint96 _feeNumerator) external virtual
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
function proxyInitialize(address _admin, string _name, string _symbol, string baseURI_, address _forwarder, address _receiver, uint96 _feeNumerator) external virtual
```

Initializes contract through beacon proxy (replaces constructor in
proxy pattern)

### __ERC721OwlAttributes_init

```solidity
function __ERC721OwlAttributes_init(address _admin, string _name, string _symbol, string baseURI_, address _forwarder, address _receiver, uint96 _feeNumerator) internal
```

### __ERC721OwlAttributes_init_unchained

```solidity
function __ERC721OwlAttributes_init_unchained() internal
```

### grantDna

```solidity
function grantDna(address to) public
```

Must have DEFAULT_ADMIN_ROLE

Grants DNA_ROLE to `to`

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |

### tokenURI

```solidity
function tokenURI(uint256 tokenId) public view virtual returns (string uri)
```

returns uri for token metadata.

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | tokenId metadata to fetch |

| Name | Type | Description |
| ---- | ---- | ----------- |
| uri | string | at which metadata is housed |

### mint

```solidity
function mint(address to, uint256 dna) public virtual
```

Must have MINTER_ROLE

Allows MINTER_ROLE to mint NFTs

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |
| dna | uint256 | of next tokenId |

### safeMint

```solidity
function safeMint(address to, uint256 dna) public virtual
```

Must have MINTER_ROLE

Allows caller to mint NFTs (safeMint)

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |
| dna | uint256 | of next tokenId |

### updateDna

```solidity
function updateDna(uint256 tokenId, uint256 dna) external
```

Must have DNA_ROLE

Allows changing the dna of a tokenId

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | whose dna to change |
| dna | uint256 | new dna for the provided tokenId |

### getDna

```solidity
function getDna(uint256 tokenId) external view returns (uint256)
```

Getter for dna of tokenId

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | whose dna to change |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | dna of tokenId |

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

