import type { Chain } from "../src/types.js";
export default {
  "name": "DFK Chain Test",
  "chain": "DFK",
  "icon": {
    "url": "ipfs://QmQB48m15TzhUFrmu56QCRQjkrkgUaKfgCmKE8o3RzmuPJ",
    "width": 500,
    "height": 500,
    "format": "png"
  },
  "rpc": [
    "https://dfk-chain-test.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://subnets.avax.network/defi-kingdoms/dfk-chain-testnet/rpc"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Jewel",
    "symbol": "JEWEL",
    "decimals": 18
  },
  "infoURL": "https://defikingdoms.com",
  "shortName": "DFKTEST",
  "chainId": 335,
  "networkId": 335,
  "explorers": [
    {
      "name": "ethernal",
      "url": "https://explorer-test.dfkchain.com",
      "icon": {
        "url": "ipfs://QmdwQDr6vmBtXmK2TmknkEuZNoaDqTasFdZdu3DRw8b2wt",
        "width": 1000,
        "height": 1628,
        "format": "png"
      },
      "standard": "none"
    }
  ],
  "testnet": true,
  "slug": "dfk-chain-test"
} as const satisfies Chain;