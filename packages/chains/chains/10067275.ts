import type { Chain } from "../src/types.js";
export default {
  "name": "Plian Testnet Subchain 1",
  "chain": "Plian",
  "rpc": [
    "https://plian-testnet-subchain-1.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://testnet.plian.io/child_test"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Plian Token",
    "symbol": "TPI",
    "decimals": 18
  },
  "infoURL": "https://plian.org/",
  "shortName": "plian-testnet-l2",
  "chainId": 10067275,
  "networkId": 10067275,
  "explorers": [
    {
      "name": "piscan",
      "url": "https://testnet.plian.org/child_test",
      "standard": "EIP3091"
    }
  ],
  "parent": {
    "chain": "eip155-16658437",
    "type": "L2"
  },
  "testnet": true,
  "slug": "plian-testnet-subchain-1"
} as const satisfies Chain;