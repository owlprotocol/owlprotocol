// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC2981Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";

interface IERC2981Consumer is IERC2981Upgradeable {
    function royaltyProvider() external view returns (address);

    function setRoyaltyProvider(address _royaltyProvider) external;
}
