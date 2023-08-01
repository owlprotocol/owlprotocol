// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @dev Library for reading and writing mapping(uint256 => uint256) to specific storage slots.
 */
library StorageSlotMappingpUInt256UInt256 {
    struct MapppingUInt256UInt256Slot {
        mapping(uint256 => uint256) value;
    }

    /**
     * @dev Returns an `MapppingUInt256UInt256Slot` with member `value` located at `slot`.
     */
    function getMapppingUInt256UInt256Slot(bytes32 slot) internal pure returns (MapppingUInt256UInt256Slot storage r) {
        /// @solidity memory-safe-assembly
        assembly {
            r.slot := slot
        }
    }
}
