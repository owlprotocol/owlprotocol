// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {EnumerableSetUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol';

import {IERC721Dna} from './IERC721Dna.sol';
import {IERC1155Dna} from '../ERC1155/IERC1155Dna.sol';

library ERC721TopDownDnaLib {
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.UintSet;

    function getDna(
        mapping(uint256 => bytes) storage inherentDna,
        EnumerableSetUpgradeable.AddressSet storage childContracts721,
        mapping(uint256 => mapping(address => uint256)) storage childTokenIdOf721,
        EnumerableSetUpgradeable.AddressSet storage childContracts1155,
        mapping(uint256 => mapping(address => EnumerableSetUpgradeable.UintSet)) storage childTokenIdOf1155,
        uint256 tokenId
    ) public view returns (bytes memory) {
        address[] memory childContracts721Addresses = childContracts721.values();
        address[] memory childContracts1155Addresses = childContracts1155.values();

        bytes[] memory childDnas = new bytes[](childContracts721Addresses.length + childContracts1155Addresses.length);

        for (uint256 i = 0; i < childContracts721Addresses.length; i++) {
            address childContract = childContracts721Addresses[i];
            uint256 childTokenId = childTokenIdOf721[tokenId][childContract];
            bytes memory childDna;
            if (childTokenId != 0) {
                childDna = IERC721Dna(childContract).getDna(childTokenId);
            } else {
                childDna = new bytes(0);
            }
            childDnas[i] = childDna;
        }

        for (uint256 i = 0; i < childContracts1155Addresses.length; i++) {
            address childContract = childContracts1155Addresses[i];
            uint256[] memory childTokenIds = childTokenIdOf1155[tokenId][childContract].values();

            //Set of 1155 dnas
            bytes[] memory childChildDnas = new bytes[](childTokenIds.length);
            for (uint256 j = 0; j < childTokenIds.length; j++) {
                childChildDnas[j] = IERC1155Dna(childContract).getDna(childTokenIds[j]);
            }

            //Decode as bytes[]
            childDnas[i] = abi.encode(childChildDnas);
        }

        //Decode recursively as (bytes, bytes[])
        bytes memory dna = abi.encode(inherentDna[tokenId], childDnas);
        return dna;
    }
}
