## Transformer

Contract module that enables "transformation" of {ERC721OwlAttributes}
tokens. The assumption with {ERC721OwlAttributes} is that the attributes of
one individual token are encoded into a number, called "dna". This number is
then mapped to the `tokenId`. Transforming configuration is set by one
{Ingredient}[] (the inputs) and a {GeneMod}[] (the modifications). The inputs
are the cost for the modifications to go through (as set by the contract
deployer).

```
enum GeneTransformType {
    none,
    add,
    sub,
    mult,
    set
}

struct GeneMod {
    GeneTransformType geneTransformType;
    uint256 value;
}

struct Ingredient {
    TokenType token;
    ConsumableType consumableType;
    address contractAddr;
    uint256[] amounts;
    uint256[] tokenIds;
}
```

Once the {Ingredient}s in the `inputs` array have been used/consumed, the
contract will update the "dna" associated with the `tokenId` submitted by the
user. See {ERC721OwlAttributes} for an in-depth explanation of how "dna"
encodes `tokenId` attributes.

### version

```solidity
string version
```

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### Transform

```solidity
event Transform(address nftAddr, uint256 tokenId, uint256 oldDna, uint256 newDna)
```

### burnAddress

```solidity
address burnAddress
```

### inputs

```solidity
struct PluginsCore.Ingredient[] inputs
```

### nftAddr

```solidity
address nftAddr
```

### genes

```solidity
uint8[] genes
```

### modifications

```solidity
struct TransformerCore.GeneMod[] modifications
```

### initialize

```solidity
function initialize(address _admin, address _burnAddress, struct PluginsCore.Ingredient[] _inputs, uint8[] _genes, struct TransformerCore.GeneMod[] _modifications, address _nftAddr, address _forwarder) external
```

Initializes contract (replaces constructor in proxy pattern)

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | owner, no special permissions as of current release |
| _burnAddress | address | Burn address for burn inputs |
| _inputs | struct PluginsCore.Ingredient[] | input ingredients for configuration |
| _genes | uint8[] | array denoting start location of genes within the 256 bit DNA |
| _modifications | struct TransformerCore.GeneMod[] | array denoting the modifications to be made upon each gene after transformation |
| _nftAddr | address | the address of the ERC721Owl contract |
| _forwarder | address | trusted forwarder address for open GSN |

### proxyInitialize

```solidity
function proxyInitialize(address _admin, address _burnAddress, struct PluginsCore.Ingredient[] _inputs, uint8[] _genes, struct TransformerCore.GeneMod[] _modifications, address _nftAddr, address _forwarder) external
```

Initializes contract through beacon proxy (replaces constructor in
proxy pattern)

### __Transformer_init

```solidity
function __Transformer_init(address _admin, address _burnAddress, struct PluginsCore.Ingredient[] _inputs, uint8[] _genes, struct TransformerCore.GeneMod[] _modifications, address _nftAddr, address _forwarder) internal
```

performs validations that `_inputs` are valid and
creates the configuration

### __Transformer_init_unchained

```solidity
function __Transformer_init_unchained(address _burnAddress, struct PluginsCore.Ingredient[] _inputs, uint8[] _genes, struct TransformerCore.GeneMod[] _modifications, address _nftAddr) internal
```

performs validations that `_inputs` and are valid and
creates the configuration

### transform

```solidity
function transform(uint256 tokenId, uint256[][] _inputERC721Ids) external
```

the transformer instance from which this method is called from
must have ERC721OwlAttributes DNA_ROLE

Used to transform. Consumes inputs and modifies DNA of inputted NFT
token.

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | ID of NFT token to transform |
| _inputERC721Ids | uint256[][] | Array of pre-approved NFTs for crafting usage. |

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

