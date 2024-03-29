import type { Chain } from "../src/types.js";
export default {
  "name": "Arbitrum Rinkeby",
  "title": "Arbitrum Testnet Rinkeby",
  "chainId": 421611,
  "shortName": "arb-rinkeby",
  "chain": "ETH",
  "networkId": 421611,
  "nativeCurrency": {
    "name": "Arbitrum Rinkeby Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "rpc": [
    "https://arbitrum-rinkeby.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://rinkeby.arbitrum.io/rpc"
  ],
  "faucets": [
    "http://fauceth.komputing.org?chain=421611&address=${ADDRESS}"
  ],
  "infoURL": "https://arbitrum.io",
  "explorers": [
    {
      "name": "arbiscan-testnet",
      "url": "https://testnet.arbiscan.io",
      "standard": "EIP3091"
    },
    {
      "name": "arbitrum-rinkeby",
      "url": "https://rinkeby-explorer.arbitrum.io",
      "standard": "EIP3091"
    }
  ],
  "parent": {
    "type": "L2",
    "chain": "eip155-4",
    "bridges": [
      {
        "url": "https://bridge.arbitrum.io"
      }
    ]
  },
  "testnet": true,
  "slug": "arbitrum-rinkeby"
} as const satisfies Chain;