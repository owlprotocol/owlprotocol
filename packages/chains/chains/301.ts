import type { Chain } from "../src/types.js";
export default {
  "name": "Bobaopera",
  "chain": "Bobaopera",
  "rpc": [
    "https://bobaopera.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://bobaopera.boba.network",
    "wss://wss.bobaopera.boba.network",
    "https://replica.bobaopera.boba.network",
    "wss://replica-wss.bobaopera.boba.network"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Boba Token",
    "symbol": "BOBA",
    "decimals": 18
  },
  "infoURL": "https://boba.network",
  "shortName": "Bobaopera",
  "chainId": 301,
  "networkId": 301,
  "explorers": [
    {
      "name": "Bobaopera block explorer",
      "url": "https://blockexplorer.bobaopera.boba.network",
      "standard": "none"
    }
  ],
  "testnet": false,
  "slug": "bobaopera"
} as const satisfies Chain;