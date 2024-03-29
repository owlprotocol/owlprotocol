import type { Chain } from "../src/types.js";
export default {
  "name": "GoChain Testnet",
  "chain": "GO",
  "rpc": [
    "https://gochain-testnet.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://testnet-rpc.gochain.io"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "GoChain Coin",
    "symbol": "GO",
    "decimals": 18
  },
  "infoURL": "https://gochain.io",
  "shortName": "got",
  "chainId": 31337,
  "networkId": 31337,
  "slip44": 6060,
  "explorers": [
    {
      "name": "GoChain Testnet Explorer",
      "url": "https://testnet-explorer.gochain.io",
      "standard": "EIP3091"
    }
  ],
  "testnet": true,
  "slug": "gochain-testnet"
} as const satisfies Chain;