//Nick's method universal deployer
//https://github.com/Arachnid/deterministic-deployment-proxy
import { utils } from 'ethers';

export const proxyAddress = '0x4e59b44847b379578588920ca78fbf26c0b4956c';
export const deploymentTx =
    '0xf8a58085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222';
export const deploymentSignerAddress = '0x3fab184622dc19b6109349b94811493bf2a45362';
export const deploymentGasPrice = utils.parseUnits('100', 'gwei');
export const deploymentGasLimit = 100000;
export const deploymentGasExpected = 68131;
export const deploymentCostLimit = deploymentGasPrice.mul(deploymentGasLimit);
export const deploymentCostExpected = deploymentGasPrice.mul(deploymentGasExpected);
