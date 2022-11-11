// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @dev Library for reading and writing strings to specific storage slots.
* Example usage to set ERC1967 implementation slot:
 * ```
 * contract ERC1967 {
 *   bytes32 internal constant _CONTRACT_URI_SLOT = keccak256('CONTRACT_URI');
 *
 *   function contractURI() public view returns (string memory) {
 *       return StorageSlotString.getStringSlot(_CONTRACT_URI_SLOT).value;
 *   }
 *
 *   function setContractURI(string memory uri) external onlyRole(CONTRACT_URI_ROLE) {
 *       StorageSlotString.getStringSlot(_CONTRACT_URI_SLOT).value = uri;
 *   }
 * }
 * ```
 */
library StorageSlotString {
    struct StringSlot {
        string value;
    }

    /**
     * @dev Returns an `StringSlot` with member `value` located at `slot`.
     */
    function getStringSlot(bytes32 slot) internal pure returns (StringSlot storage r) {
        /// @solidity memory-safe-assembly
        assembly {
            r.slot := slot
        }
    }
}
