## MinterBreeding

Decentralized NFT Minter breeding contract

Breeder NFT minter contracts. Every time [`breed(...)`](#breed) or [`safeBreed(...)`](#safebreed) is called, a
new NFT id is automatically generated based on the genetics of both parents.

See [`RosalindDNA`](./RosalindDNA) for more details.

Breeding configuration is set once when the contract is initially deployed,
and can be updated at any time through the [`setBreedingRules(...)`](#setbreedingrules) function.

Once [`breed(...)`](#breed) is called, the contract logic will execute as follows:

Suppose two parents:
```
parent1 = 0000 | 0001 | 0011 | 0111 // DNA for parent1 (4 genes)
parent2 = 1111 | 1110 | 1100 | 1000 // DNA for parent2 (4 genes)
parents = [parent1, parent2]

child = 0000 | 0000 | 0000 | 0000 // Fresh slate for child
for (gene in parentGenes) // loop through how many genes we have (4 genes)
    randomParent = pickRandom(parent1, parent2) // pick a parent randomly
    geneBitmask = 1111 | 0000 | 0000 | 0000 // setup a bitmask for gene
    parentGene = randomParent & geneBitmask // isolate the specific gene
    // if randomParent = parent1, parentGene =
    // 1111 | 0000 | 0000 | 0000
    child = child | parent // combine parent and child genes for that slot
    // child = 1111 | 0000 | 0000 | 0000
 ```

If mutations are enabled, it will additionally check for if a mutation
occurred. If so, the parent gene will be replaced entirely with random bit
entropy.

See [`RosalindDNA._breed(...)`](./RosalindDNA#_breed) for the specific breeding implementation.

As all Minter contracts interact with existing NFTs, MinterCore expects two
standard functions exposed by the NFT:
- `mint(address to, uint256 tokenId)`
- `safeMint(address to, uint256 tokenId)`

Additionally, Minter contracts must have required permissions for minting. In
the case that you're using ERC721Owl, you'll do that with
[`ERC721Owl.grantMinter(...)`](./ERC721Owl#grantminter).

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### lastBredTime

```solidity
mapping(uint256 => uint256) lastBredTime
```

### _breedingRules

```solidity
struct MinterBreeding.BreedingRules _breedingRules
```

### BreedingRules

```solidity
struct BreedingRules {
  uint8 requiredParents;
  uint16 generationCooldownMultiplier;
  uint8[] genes;
  uint256 breedCooldownSeconds;
  uint256[] mutationRates;
}
```

### SetBreedingRules

```solidity
event SetBreedingRules(uint8 requiredParents, uint16 generationCooldownMultiplier, uint256 breedCooldownSeconds, uint8[] genes, uint256[] mutationRates)
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, struct MinterBreeding.BreedingRules breedingRules, address _forwarder) external
```

This function is usually called through ERC1167Factory cloning and not directly.

MinterAutoId initialization parameters.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | user to grant admin privileges |
| _mintFeeToken | address | ERC20 token address to use for minting (ZeroAddress if none) |
| _mintFeeAddress | address | address to transfer minting payments to |
| _mintFeeAmount | uint256 | Number of tokens to charge users (0 if none) |
| _nftContractAddr | address | NFT address to mint |
| breedingRules | struct MinterBreeding.BreedingRules | Breeding configuration. See [`setBreedingRules(...)`](#setbreedingrules). |
| _forwarder | address | OpenGSN forwarder address to use |

### proxyInitialize

```solidity
function proxyInitialize(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, struct MinterBreeding.BreedingRules breedingRules, address _forwarder) external
```

This function is usually called through ERC1167Factory cloning and not directly.

MinterAutoId initialization parameters.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | user to grant admin privileges |
| _mintFeeToken | address | ERC20 token address to use for minting (ZeroAddress if none) |
| _mintFeeAddress | address | address to transfer minting payments to |
| _mintFeeAmount | uint256 | Number of tokens to charge users (0 if none) |
| _nftContractAddr | address | NFT address to mint |
| breedingRules | struct MinterBreeding.BreedingRules | Breeding configuration. See [`setBreedingRules(...)`](#setbreedingrules). |
| _forwarder | address | OpenGSN forwarder address to use |

### __MinterBreeding_init

```solidity
function __MinterBreeding_init(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, struct MinterBreeding.BreedingRules breedingRules, address _forwarder) internal
```

This function is usually called through ERC1167Factory cloning and not directly.

MinterAutoId initialization parameters.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | user to grant admin privileges |
| _mintFeeToken | address | ERC20 token address to use for minting (ZeroAddress if none) |
| _mintFeeAddress | address | address to transfer minting payments to |
| _mintFeeAmount | uint256 | Number of tokens to charge users (0 if none) |
| _nftContractAddr | address | NFT address to mint |
| breedingRules | struct MinterBreeding.BreedingRules | Breeding configuration. See [`setBreedingRules(...)`](#setbreedingrules). |
| _forwarder | address | OpenGSN forwarder address to use |

### __MinterBreeding_init_unchained

```solidity
function __MinterBreeding_init_unchained(struct MinterBreeding.BreedingRules breedingRules) private
```

This function is usually called through ERC1167Factory cloning and not directly.

MinterAutoId initialization parameters.

| Name | Type | Description |
| ---- | ---- | ----------- |
| breedingRules | struct MinterBreeding.BreedingRules | Breeding configuration. See [`setBreedingRules(...)`](#setbreedingrules). |

### breed

```solidity
function breed(uint256[] parents) public returns (uint256 dna)
```

Create a new type of species and define attributes.

| Name | Type | Description |
| ---- | ---- | ----------- |
| parents | uint256[] | list of parent NFT tokenIds to breed |

### safeBreed

```solidity
function safeBreed(uint256[] parents) public returns (uint256 dna)
```

Create a new type of species and define attributes.

| Name | Type | Description |
| ---- | ---- | ----------- |
| parents | uint256[] | list of parent NFT tokenIds to breed |

### setBreedingRules

```solidity
function setBreedingRules(uint8 requiredParents, uint16 generationCooldownMultiplier, uint256 breedCooldownSeconds, uint8[] genes, uint256[] mutationRates) public
```

Set breeding rule configuration

| Name | Type | Description |
| ---- | ---- | ----------- |
| requiredParents | uint8 | how many parents are required to breed a new species. |
| generationCooldownMultiplier | uint16 | **Note**: this enables generation counting, which will be stored in the first 8 bits of the dna. All breeds will require the breedCooldownSeconds as a baseline. On top of that, `breedCooldownMultiplier * generationNumber` seconds will be added to the cooldown for those species. |
| breedCooldownSeconds | uint256 | baseline cooldown for ALL NFTs to wait until breeding functionality becomes available again. **TODO** - link simpleEncoder |
| genes | uint8[] | how would you like the specie genes to be stored? You likely want to use the `simpleEncoder` function in order to setup these values. Otherwise, more can be read on [`RosalindDNA`](./RosalindDNA). **TODO** - link GenMutationRates |
| mutationRates | uint256[] | probability checks for DNA mutations. Under the hood, [`RosalindDNA`](./RosalindDNA) generates a random uint256 for every gene and checks if the uint256 is less than the corresponding mutationRate. Each mutationRate must correspond to it's gene in `genes`.   - If a mutation rate value is set to * 2^256-1, it will ALWAYS mutate.   - If a mutation rate is set to 2^255-1, it will mutate 50% of the time.   - If a mutation rate is set to 2^254-1, it will mutate 25% of the time, and so on. |

### _setBreedingRules

```solidity
function _setBreedingRules(uint8 requiredParents, uint16 generationCooldownMultiplier, uint256 breedCooldownSeconds, uint8[] genes, uint256[] mutationRates) private
```

Underlying function callable internally

### _breedSpecies

```solidity
function _breedSpecies(uint256[] parents) internal returns (uint256 dna)
```

Internal function to do the heavy lifting for breeding

| Name | Type | Description |
| ---- | ---- | ----------- |
| parents | uint256[] | parents to use for breeding |

### getBreedingRules

```solidity
function getBreedingRules() public view returns (uint8 requiredParents, uint16 generationCooldownMultiplier, uint256 breedCooldownSeconds, uint8[] genes, uint256[] mutationRates)
```

Returns breeding configuration

| Name | Type | Description |
| ---- | ---- | ----------- |
| requiredParents | uint8 | number of parents required |
| generationCooldownMultiplier | uint16 | generation cooldowns |
| breedCooldownSeconds | uint256 | number of seconds to cooldown |
| genes | uint8[] | 256-bit gene split locations |
| mutationRates | uint256[] | mutation rate locations |

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
function setBreedingRules(uint8 requiredParents, uint16 generationCooldownMultiplier, uint256 breedCooldownSeconds, uint8[] genes, uint256[] mutationRates) external returns (uint256 tokenId)
```

Create a new type of species and define attributes.

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | minted token id |

### getBreedingRules

```solidity
function getBreedingRules() external view returns (uint8 requiredParents, uint16 generationCooldownMultiplier, uint256 breedCooldownSeconds, uint8[] genes, uint256[] mutationRates)
```

Returns the current breeding rules used for a species

## IERC721OwlAttributes

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

