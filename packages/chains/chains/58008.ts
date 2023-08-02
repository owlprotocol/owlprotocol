import type { Chain } from "../src/types.js";
export default {
  "name": "Sepolia PGN (Public Goods Network)",
  "chain": "ETH",
  "rpc": [
    "https://sepolia-pgn-public-goods-network.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://sepolia.publicgoods.network"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Sepolia Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "features": [
    {
      "name": "EIP155"
    },
    {
      "name": "EIP1559"
    }
  ],
  "infoURL": "https://publicgoods.network/",
  "shortName": "sepPGN",
  "chainId": 58008,
  "networkId": 58008,
  "icon": {
    "url": "ipfs://QmUVJ7MLCEAfq3pHVPFLscqRMiyAY5biVgTkeDQCmAhHNS",
    "width": 574,
    "height": 574,
    "format": "svg"
  },
  "explorers": [
    {
      "name": "blockscout",
      "url": "https://explorer.sepolia.publicgoods.network",
      "icon": {
        "url": "ipfs://QmYtUimyqHkkFxYdbXXRbUqNg2VLPUg6Uu2C2nmFWowiZM",
        "width": 551,
        "height": 540,
        "format": "png"
      },
      "standard": "EIP3091"
    }
  ],
  "parent": {
    "type": "L2",
    "chain": "eip155-11155111",
    "bridges": [
      {
        "url": "https://pgn-bridge.vercel.app/bridge"
      }
    ]
  },
  "testnet": false,
  "slug": "sepolia-pgn-public-goods-network"
} as const satisfies Chain;