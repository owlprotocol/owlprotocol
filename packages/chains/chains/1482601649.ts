import type { Chain } from "../src/types.js";
export default {
  "name": "Nebula Mainnet",
  "chain": "green-giddy-denebola",
  "rpc": [
    "https://nebula.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://mainnet.skalenodes.com/v1/green-giddy-denebola",
    "wss://mainnet-proxy.skalenodes.com/v1/ws/green-giddy-denebola"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "sFUEL",
    "symbol": "sFUEL",
    "decimals": 18
  },
  "infoURL": "https://nebulachain.io/",
  "shortName": "nebula-mainnet",
  "chainId": 1482601649,
  "networkId": 1482601649,
  "explorers": [
    {
      "name": "nebula",
      "url": "https://green-giddy-denebola.explorer.mainnet.skalenodes.com",
      "icon": {
        "url": "ipfs://QmfQkfmQuoUUUKwF1yCcrPEzFcWLaqNyiSv5YMcSj6zs74",
        "width": 500,
        "height": 500,
        "format": "png"
      },
      "standard": "EIP3091"
    }
  ],
  "testnet": false,
  "slug": "nebula"
} as const satisfies Chain;