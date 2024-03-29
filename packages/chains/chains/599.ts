import type { Chain } from "../src/types.js";
export default {
  "name": "Metis Goerli Testnet",
  "chain": "ETH",
  "rpc": [
    "https://metis-goerli-testnet.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://goerli.gateway.metisdevops.link"
  ],
  "faucets": [
    "https://goerli.faucet.metisdevops.link"
  ],
  "nativeCurrency": {
    "name": "Goerli Metis",
    "symbol": "METIS",
    "decimals": 18
  },
  "infoURL": "https://www.metis.io",
  "shortName": "metis-goerli",
  "chainId": 599,
  "networkId": 599,
  "explorers": [
    {
      "name": "blockscout",
      "url": "https://goerli.explorer.metisdevops.link",
      "standard": "EIP3091"
    }
  ],
  "parent": {
    "type": "L2",
    "chain": "eip155-4",
    "bridges": [
      {
        "url": "https://testnet-bridge.metis.io"
      }
    ]
  },
  "icon": {
    "url": "ipfs://QmbWKNucbMtrMPPkHG5ZmVmvNUo8CzqHHcrpk1C2BVQsEG/2022_H-Brand_Stacked_WhiteGreen.svg",
    "format": "svg",
    "height": 512,
    "width": 512
  },
  "testnet": true,
  "slug": "metis-goerli-testnet"
} as const satisfies Chain;