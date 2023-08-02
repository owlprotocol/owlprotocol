// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @dev Library for reading and writing mapping(uint256 => bytes) to specific storage slots.
 */
library StorageSlotMappingUInt256Bytes {
    struct MapppingUInt256BytesSlot {
        mapping(uint256 => bytes) value;
    }

    /**
     * @dev Returns an `MapppingUInt256BytesSlot` with member `value` located at `slot`.
     */
    function getMapppingUInt256BytesSlot(bytes32 slot) internal pure returns (MapppingUInt256BytesSlot storage r) {
        /// @solidity memory-safe-assembly
        assembly {
            r.slot := slot
        }
    }
}
