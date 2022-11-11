//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './SourceRandom.sol';

/**
 * @dev Library used for combining uint256-encoded genes
 * Named Rosalind after chemist
 * Rosalind Franklin who discovered double-helix and significantly
 * furthered our understanding of DNAs molecular structure.
 */
library RosalindDNA {
    // First 8 bits are generation
    uint256 private constant GENERATION_MASK = 0x00000000000000FF;

    /**
     * @dev Breeds multiple parents DNA, returning a new combined
     * @param parentsDNA N different parent DNAs
     * @param genes start indices of each gene.
     * First index should ALWAYS be 0. Using [0, 128] splits
     * the DNA into two genes of equal length
     * @param randomSeed random value to use for gene splicing
     * @return childDNA combined child DNA
     */
    function breedDNASimple(
        uint256[] memory parentsDNA,
        uint8[] memory genes,
        uint256 randomSeed
    ) internal pure returns (uint256 childDNA) {
        // Loop genes
        for (uint16 geneIdx = 0; geneIdx < genes.length; geneIdx++) {
            // Gene details
            uint16 geneStartIdx = genes[geneIdx];
            uint16 geneEndIdx = geneIdx < genes.length - 1 ? genes[geneIdx + 1] : 256;

            // Select parent
            uint8 randomParentIdx = uint8(SourceRandom.getSeededRandom(randomSeed, geneIdx) % parentsDNA.length);
            uint256 selectedParent = parentsDNA[randomParentIdx];

            // Isolate our gene
            uint256 bitmask = get256Bitmask(geneStartIdx, geneEndIdx);
            uint256 gene = selectedParent & bitmask;

            // Save genes to childDNA
            childDNA = childDNA | gene;
        }

        return childDNA;
    }

    /**
     * @dev Breeds multiple parents DNA, returning a new combined DNA
     * Allows for random mutations to occur, producing random bits instead.
     * @param parentsDNA N different parent DNAs
     * @param genes start indicies of each gene.
     * First index should ALWAYS be 0. Using [0, 128] splits
     * the DNA into two genes of equal length
     * @param randomSeed random value to use for gene splicing
     * @param mutationRates probability that a random gene is picked vs. mutated.
     * A higher mutation rate means a higher probability of having a random gene.
     * The mutation rate m is a probability of m/(2^256-1) or in other words the
     * probability that geneRandomnessSeed <= m. We therefore assign a mutated
     * gene at the following rates according to m:
     * 0 = 000... => 0%
     * 2^254-1 = 001... => 25%
     * 2^255-1 = 011... => 50%
     * 2^255 + 2^254 -1 => 75%
     * 2^256-1 = 111... => 100% Always mutate
     * Calculated probability as a function: 1/2^(256-m)
     * @return childDNA combined child DNA with mutations occuring.
     */
    function breedDNAWithMutations(
        uint256[] memory parentsDNA,
        uint8[] memory genes,
        uint256 randomSeed,
        uint256[] memory mutationRates
    ) internal pure returns (uint256 childDNA) {
        // Breed normally
        childDNA = breedDNASimple(parentsDNA, genes, randomSeed);

        // Add mutations
        childDNA = generateMutations(childDNA, genes, randomSeed, mutationRates);
    }

    /**
     * @dev Mutates encoded DNA
     * @param dna existing DNA to mutate
     * @param genes start indicies of each gene.
     * First index should ALWAYS be 0. Using [0, 128] splits
     * the DNA into two genes of equal length
     * @param randomSeed random value to use for gene splicing
     * @param mutationRates probability that a random gene is picked vs. mutated.
     * A higher mutation rate means a higher probability of having a random gene.
     * The mutation rate m is a probability of m/(2^256-1) or in other words the
     * probability that geneRandomnessSeed <= m. We therefore assign a mutated
     * gene at the following rates according to m:
     * 0 = 000... => 0%
     * 2^254-1 = 001... => 25%
     * 2^255-1 = 011... => 50%
     * 2^255 + 2^254 -1 => 75%
     * 2^256-1 = 111... => 100% Always mutate
     * Calculated probability as a function: 1/2^(256-m)
     * @return mutatedDNA combined child DNA with mutations occuring.
     */
    function generateMutations(
        uint256 dna,
        uint8[] memory genes,
        uint256 randomSeed,
        uint256[] memory mutationRates
    ) internal pure returns (uint256 mutatedDNA) {
        // Start with empty mask (no mutations)
        uint256 mutationMask;

        // Loop genes, create a mutation mask
        // I.e. mutationMask = 11101011101011110000111
        // Then once at the end: mutatedDNA = mutationMask & randomSeed
        for (uint256 geneIdx = 0; geneIdx < genes.length; geneIdx++) {
            // Decide if we want to mutate
            uint256 geneMutationSeed = SourceRandom.getSeededRandom(randomSeed, geneIdx);
            if (geneMutationSeed > mutationRates[geneIdx])
                // Skip to the next gene if we shouldn't mutate
                continue;

            // Note our mutation in mutationMask
            uint16 geneStartIdx = genes[geneIdx];
            uint16 geneEndIdx = geneIdx < genes.length - 1 ? genes[geneIdx + 1] : 255;

            uint256 bitmask = get256Bitmask(geneStartIdx, geneEndIdx);
            mutationMask = mutationMask | bitmask;
        }

        // Source new mutations from our existing dna + random seed, then merge
        uint256 mutations = SourceRandom.getSeededRandom(dna, randomSeed);
        mutatedDNA = mutations & mutationMask;

        // Merge existing DNA after slicing out mutation genes
        dna = dna & (~mutationMask);
        mutatedDNA = dna | mutatedDNA;
    }

    /**
     * @dev Sets an offsprings generation (increases max parent +1)
     * @param child child dna
     * @param parentsDNA array of parent dna
     */
    function setGenCount(uint256 child, uint256[] memory parentsDNA) internal pure returns (uint256) {
        // Discover oldest parent
        uint256 oldestParent;
        for (uint256 i = 0; i < parentsDNA.length; i++) {
            uint256 parentAge = uint8(parentsDNA[i] & GENERATION_MASK);
            if (parentAge > oldestParent) oldestParent = parentAge;
        }

        // 255 == oldest generation allowed
        if (oldestParent == type(uint8).max) revert('Max generation reached!');

        // Remove any age from child
        child = child & ~GENERATION_MASK;
        // Set new age
        child = child | (oldestParent + 1);

        return child;
    }

    /**
     * @dev Gets the generation for a specimen
     * @param child child dna to read specimen age
     */
    function getGenCount(uint256 child) internal pure returns (uint8) {
        // Returns the age of generation
        return uint8(child & GENERATION_MASK);
    }

    /**
     * @dev Generates a 256-bit bitmask from startBit:endBit
     * @param startBit beginning of mask
     * @param endBit end of mask
     * @return bitMask combined bitmask
     */
    function get256Bitmask(uint16 startBit, uint16 endBit) internal pure returns (uint256 bitMask) {
        uint256 bitMaskStart = type(uint256).max << startBit;
        uint256 bitMaskEnd = type(uint256).max >> (256 - endBit);
        bitMask = bitMaskStart & bitMaskEnd;
    }
}
