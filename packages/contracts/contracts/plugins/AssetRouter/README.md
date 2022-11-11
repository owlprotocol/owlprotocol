# Crafter Example Flows

## How should a player interact with Crafter?

Through a front-end, a player will interact primarily with the `craft()` function, as well as with the getter functions to access information regarding the recipe (input and output ingredients).

Calling craft in all cases takes an unsigned integer, `craftAmount`, of the number of times to execute the recipe. In the case of ERC-721 inputs, a 2-dimensional array - an array of token ID arrays for each ingredient - is required as input.

## How should a game developer interact with Crafter?

Game developers will interact, again, through a front-end, with the initializer - where the recipe is defined - as well as the `deposit()` and `withdraw()` functions.

To specify a recipe through the initializer, a list of input and output ingredients must be provided. Similarly, the `deposit()` and `withdraw()` functions allow interaction with the output ingredients stored on the contract.

Additional documentation can be found at [CrafterTransferDocs](../../../../owlprotocol-contracts-docs/docs/contract-docs/CrafterTransfer.md) and [CrafterMintDocs](../../../../owlprotocol-contracts-docs/docs/contract-docs/CrafterMint.md)
