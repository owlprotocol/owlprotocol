//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library BitmaskLib {
    /**
     * @dev Generates a 256-bit bitmask from startBit:endBit
     * @param startBit beginning of mask
     * @param endBit end of mask
     * @return bitMask combined bitmask
     */
    function get256Bitmask(uint8 startBit, uint8 endBit) internal pure returns (uint256 bitMask) {
        uint256 bitMaskStart = type(uint256).max << startBit;
        uint256 bitMaskEnd = type(uint256).max >> (256 - endBit);
        bitMask = bitMaskStart & bitMaskEnd;
    }

    /**
     * @dev select bits from uint256 by & operation with bitmask
     * @param data bits to select from
     * @param startBit beginning of mask
     * @param endBit end of mask
     */
    function selectBits(
        uint256 data,
        uint8 startBit,
        uint8 endBit
    ) internal pure returns (uint256) {
        uint256 bitmask = BitmaskLib.get256Bitmask(startBit, endBit);
        return data & bitmask;
    }

}
