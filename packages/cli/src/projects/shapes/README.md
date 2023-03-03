# Shapes Demo Project

NFT Vector Shapes demo by Owl Protocol.
This simple demo showcases the general project structure for generative layered collections and can serve as a template for creating a custom generative collection that uses Dynamic NFT mechanics such as crafting, equipment, or breeding.

### Project Structure

## Layers

Defines the various layers of your generative NFT.

-   Each subfolder `/layers/<TRAIT>` defines an NFT layer with various options
-   800x800 SVG
-   Transparent Background SVG (except for bg layer)
-   Standard file names lowercase and with `_` as space separator

## Collection

The collection is defined by general properties such as its `name` & `description` and most important of all, a set of `traits` which define the different `attributes` a generated NFT can have.

-   The `collection.json` file defines the generative attributes of the collection

_Owl Protocol team can help generating this file._

## Tokens

Generate NFTs stored in `/tokens` folder that stores metadata under `/tokens/metadata/<DNA>.json` and images under `/tokens/images/<DNA>.svg`.
