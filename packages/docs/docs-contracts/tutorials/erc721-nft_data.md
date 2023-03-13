---
sidebar_position: 2
sidebar_label: 'DNFT Data Encoding'
slug: '/tutorial-nftdata'
---

# NFT Data Encoding - ERC721Dna

## Tutorial

The **ERC721Dna** smart contract is used to encode useful data on-chain for an NFT.

> Contract: [ERC721DnaBase.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721DnaBase.sol)

By itself, it doesn't do much except primarily managing the `dna` field and overriding `tokenURI` to also return the DNA.

```javascript
/***** Dna *****/
    /**
     * @dev returns uri for token metadata. If no baseURI, returns Dna as string
     * @param tokenId tokenId metadata to fetch
     * @return uri at which metadata is housed
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        string memory baseURI = _baseURI();
        bytes memory dnaRaw = getDna(tokenId);
        string memory dnaString = dnaRaw.encode();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, dnaString)) : dnaString;
    }
```

However, when combined with the **NFT-SDK** and a Schema JSON, we're able to provide much more information
about an NFT, its intent, and usage than before.

> **This tutorial is in development.**
