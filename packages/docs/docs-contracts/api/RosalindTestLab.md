## RosalindTestLab

**INTERNAL TOOL**
Used to test RosalindDNA library.

### breedDNASimple

```solidity
function breedDNASimple(uint256[] parents, uint8[] genes, uint256 randomSeed) public pure returns (uint256)
```

Breeds multiple parents DNA, returning a new combined

| Name | Type | Description |
| ---- | ---- | ----------- |
| parents | uint256[] | N different parent DNAs |
| genes | uint8[] | start indicies of each gene. First index should ALWAYS be 0. Using [0, 128] splits the DNA into two genes of equal length |
| randomSeed | uint256 | random value to use for gene splicing |

### breedDNAWithMutations

```solidity
function breedDNAWithMutations(uint256[] parents, uint8[] genes, uint256 randomSeed, uint256[] mutationRates) public pure returns (uint256 childDNA)
```

Breeds multiple parents DNA, returning a new combined DNA
Allows for random mutations to occur, producing random bits instead.

| Name | Type | Description |
| ---- | ---- | ----------- |
| parents | uint256[] | N different parent DNAs |
| genes | uint8[] | start indicies of each gene. First index should ALWAYS be 0. Using [0, 128] splits the DNA into two genes of equal length |
| randomSeed | uint256 | random value to use for gene splicing |
| mutationRates | uint256[] | probability that a random gene is picked vs. mutated. A higher mutation rate means a higher probability of having a random gene. The mutation rate m is a probability of m/(2^256-1) or in other words the probability that geneRandomnessSeed <= m. We therefore assign a mutated gene at the following rates according to m: 0 = 000... => 0% 2^254-1 = 001... => 25% 2^255-1 = 011... => 50% 2^255 + 2^254 -1 => 75% 2^256-1 = 111... => 100% Always mutate Calculated probability as a function: 1/2^(256-m) |

| Name | Type | Description |
| ---- | ---- | ----------- |
| childDNA | uint256 | combined child DNA with mutations occuring. |

### generateMutations

```solidity
function generateMutations(uint256 dna, uint8[] genes, uint256 randomSeed, uint256[] mutationRates) public pure returns (uint256 mutatedDNA)
```

Mutates encoded DNA

| Name | Type | Description |
| ---- | ---- | ----------- |
| dna | uint256 | existing DNA to mutate |
| genes | uint8[] | start indicies of each gene. First index should ALWAYS be 0. Using [0, 128] splits the DNA into two genes of equal length |
| randomSeed | uint256 | random value to use for gene splicing |
| mutationRates | uint256[] | probability that a random gene is picked vs. mutated. A higher mutation rate means a higher probability of having a random gene. The mutation rate m is a probability of m/(2^256-1) or in other words the probability that geneRandomnessSeed <= m. We therefore assign a mutated gene at the following rates according to m: 0 = 000... => 0% 2^254-1 = 001... => 25% 2^255-1 = 011... => 50% 2^255 + 2^254 -1 => 75% 2^256-1 = 111... => 100% Always mutate Calculated probability as a function: 1/2^(256-m) |

| Name | Type | Description |
| ---- | ---- | ----------- |
| mutatedDNA | uint256 | combined child DNA with mutations occuring. |

### getGenCount

```solidity
function getGenCount(uint256 child) public pure returns (uint256)
```

Gets the generation for a specimen

| Name | Type | Description |
| ---- | ---- | ----------- |
| child | uint256 | child dna to read specimen age |

### setGenCount

```solidity
function setGenCount(uint256 child, uint256[] parents) public pure returns (uint256)
```

Sets an offsprings generation (increases max parent +1)

| Name | Type | Description |
| ---- | ---- | ----------- |
| child | uint256 | child dna |
| parents | uint256[] | array of parent dna |

