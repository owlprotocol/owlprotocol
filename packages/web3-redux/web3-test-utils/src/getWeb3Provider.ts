import ganache from "ganache";
import { ethers } from "ethers";
import Web3 from "web3";
//import hardhat from 'hardhat';
export const privateKey = "0x0000000000000000000000000000000000000000000000000000000000000001";
const balance = ethers.utils.parseUnits("100", "ether").toHexString();

export const getTestWeb3Provider = () => {
    return ganache.provider({
        wallet: {
            accounts: [{ balance, secretKey: privateKey }],
        },
        logging: { quiet: true },
    });
    //return hardhat.network.provider;
};

export const getTestNetwork = () => {
    return { networkId: "1337", web3: new Web3(getTestWeb3Provider() as any) };
};
