import type { Chain } from "../src/types.js";
export default {
  "name": "BeOne Chain Mainnet",
  "chain": "BOC",
  "icon": {
    "url": "ipfs://QmbVLQnaMDu86bPyKgCvTGhFBeYwjr15hQnrCcsp1EkAGL",
    "width": 500,
    "height": 500,
    "format": "png"
  },
  "rpc": [
    "https://beone-chain.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://dataseed1.beonechain.com",
    "https://dataseed2.beonechain.com",
    "https://dataseed-us1.beonechain.com",
    "https://dataseed-us2.beonechain.com",
    "https://dataseed-uk1.beonechain.com",
    "https://dataseed-uk2.beonechain.com"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "BeOne Chain Mainnet",
    "symbol": "BOC",
    "decimals": 18
  },
  "infoURL": "https://beonechain.com",
  "shortName": "BOC",
  "chainId": 818,
  "networkId": 818,
  "slip44": 8181,
  "explorers": [
    {
      "name": "BeOne Chain Mainnet",
      "url": "https://beonescan.com",
      "standard": "EIP3091"
    }
  ],
  "testnet": false,
  "slug": "beone-chain"
} as const satisfies Chain;