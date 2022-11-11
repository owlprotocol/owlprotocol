//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Probability {
    /**
     * @dev returns a sample of the random variable described by distribution
     * @param seed an inputted random seed
     * @param distribution array of cumulative probability distribution
     * @return index randomly selected index of distribution
     */
    function probabilityDistribution(uint256 seed, uint256[] memory distribution)
        internal
        pure
        returns (uint256 index)
    {
        uint256 seedMod = (seed % distribution[distribution.length - 1]);
        for (uint256 j = 0; j < distribution.length; j++) if (seedMod < distribution[j]) return j;

        return 0;
    }
}
