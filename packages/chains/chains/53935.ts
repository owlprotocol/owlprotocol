import type { Chain } from "../src/types.js";
export default {
  "name": "DFK Chain",
  "chain": "DFK",
  "icon": {
    "url": "ipfs://QmQB48m15TzhUFrmu56QCRQjkrkgUaKfgCmKE8o3RzmuPJ",
    "width": 500,
    "height": 500,
    "format": "png"
  },
  "rpc": [
    "https://dfk-chain.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Jewel",
    "symbol": "JEWEL",
    "decimals": 18
  },
  "infoURL": "https://defikingdoms.com",
  "shortName": "DFK",
  "chainId": 53935,
  "networkId": 53935,
  "explorers": [
    {
      "name": "ethernal",
      "url": "https://explorer.dfkchain.com",
      "icon": {
        "url": "ipfs://QmdwQDr6vmBtXmK2TmknkEuZNoaDqTasFdZdu3DRw8b2wt",
        "width": 1000,
        "height": 1628,
        "format": "png"
      },
      "standard": "none"
    }
  ],
  "testnet": false,
  "slug": "dfk-chain"
} as const satisfies Chain;