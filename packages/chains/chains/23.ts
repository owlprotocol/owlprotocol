import type { Chain } from "../src/types.js";
export default {
  "name": "ELA-DID-Sidechain Testnet",
  "chain": "ETH",
  "rpc": [],
  "faucets": [],
  "nativeCurrency": {
    "name": "Elastos",
    "symbol": "tELA",
    "decimals": 18
  },
  "infoURL": "https://elaeth.io/",
  "shortName": "eladidt",
  "chainId": 23,
  "networkId": 23,
  "testnet": true,
  "slug": "ela-did-sidechain-testnet"
} as const satisfies Chain;