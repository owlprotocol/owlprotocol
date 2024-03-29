import type { Chain } from "../src/types.js";
export default {
  "name": "pegglecoin",
  "chain": "42069",
  "rpc": [],
  "faucets": [],
  "nativeCurrency": {
    "name": "pegglecoin",
    "symbol": "peggle",
    "decimals": 18
  },
  "infoURL": "https://teampeggle.com",
  "shortName": "PC",
  "chainId": 42069,
  "networkId": 42069,
  "testnet": false,
  "slug": "pegglecoin"
} as const satisfies Chain;