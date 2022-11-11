import ganache from 'ganache';
import { ethers } from 'ethers'
//import hardhat from 'hardhat';
export const privateKey = '0x0000000000000000000000000000000000000000000000000000000000000001'
const balance = ethers.utils.parseUnits('100', 'ether').toHexString()

export const getWeb3Provider = () => {
    return ganache.provider({
        wallet: {
            accounts: [{ balance, secretKey: privateKey }]
        },
        logging: { quiet: true }
    });
    //return hardhat.network.provider;
};
