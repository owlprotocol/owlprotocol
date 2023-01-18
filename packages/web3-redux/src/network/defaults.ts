import { Network } from './model/interface.js';
import {
    ETHERSCAN_API_KEY,
    GANACHE_RPC,
    MAINNET_RPC,
    ROPSTEN_RPC,
    RINKEBY_RPC,
    GOERLI_RPC,
    KOVAN_RPC,
    POLYGON_RPC,
    POLYGON_MUMBAI_RPC,
    ARBITRUM_RPC,
    ARBITRUM_RINKEBY_RPC,
    OPTIMISM_RPC,
    OPTIMISM_KOVAN_RPC,
    OPTIMISM_GNOSIS_RPC,
    AVALANCHE_RPC,
    AVALANCHE_FUJI_RPC,
    BSC_MAINNET_RPC,
    BSC_TESTNET_RPC,
    GNOSIS_CHAIN_RPC,
    ETC_MAINNET_RPC,
    ETC_KOTTI_RPC,
    MAINNET_EXPLORER,
    MAINNET_EXPLORER_API,
    ROPSTEN_EXPLORER,
    ROPSTEN_EXPLORER_API,
    RINKEBY_EXPLORER,
    GOERLI_EXPLORER,
    GOERLI_EXPLORER_API,
    KOVAN_EXPLORER,
    KOVAN_EXPLORER_API,
    POLYGON_EXPLORER,
    POLYGON_EXPLORER_API,
    POLYGON_MUMBAI_EXPLORER,
    POLYGON_MUMBAI_EXPLORER_API,
    ARBITRUM_EXPLORER,
    ARBITRUM_EXPLORER_API,
    OPTIMISM_GNOSIS_EXPLORER,
    AVALANCHE_EXPLORER,
    AVALANCHE_FUJI_EXPLORER,
    BSC_MAINNET_EXPLORER,
    BSC_TESTNET_EXPLORER,
    GNOSIS_CHAIN_EXPLORER,
    ETC_MAINNET_EXPLORER,
    ETC_KOTTI_EXPLORER,
    OPTIMISM_GNOSIS_EXPLORER_API,
    AVALANCHE_EXPLORER_API,
    AVALANCHE_FUJI_EXPLORER_API,
    BSC_MAINNET_EXPLORER_API,
    BSC_TESTNET_EXPLORER_API,
    GNOSIS_CHAIN_EXPLORER_API,
    ETC_MAINNET_EXPLORER_API,
    ETC_KOTTI_EXPLORER_API,
    ANVIL_RPC,
} from '../environment.js';

const ETHER = {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
};

const MATIC = {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
};

const xDAI = {
    name: 'xDAI',
    symbol: 'xDAI',
    decimals: 18,
};

const AVAX = {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
};

const BNB = {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
};

const KOT = {
    name: 'Kotti Ether',
    symbol: 'KOT',
    decimals: 18,
};

const ETC = {
    name: 'Ethereum Clasic Ether',
    symbol: 'ETC',
    decimals: 18,
};

export const defaultNetworks = () => {
    return {
        '31337': {
            networkId: '31337',
            name: 'anvil',
            currency: ETHER,
            web3Rpc: ANVIL_RPC()
        },
        '1337': {
            networkId: '1337',
            name: 'ganache',
            currency: ETHER,
            web3Rpc: GANACHE_RPC(),
        },
        '1336': {
            networkId: '1336',
            name: 'ganache2',
            currency: ETHER,
            web3Rpc: GANACHE_RPC(),
        },
        '1': {
            networkId: '1',
            name: 'Mainnet',
            currency: ETHER,
            web3Rpc: MAINNET_RPC(),
            explorerUrl: MAINNET_EXPLORER(),
            explorerApiUrl: MAINNET_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0x9e59Ea5333cD4f402dAc320a04fafA023fe3810D',
            forwarder: '0xAa3E82b4c4093b4bA13Cb5714382C99ADBf750cA',
            versionRegistry: '0x97B6ebd38f2000B6E446DE24D9805606b882A1C5',
        },
        '3': {
            networkId: '3',
            name: 'Ropsten',
            currency: ETHER,
            web3Rpc: ROPSTEN_RPC(),
            explorerUrl: ROPSTEN_EXPLORER(),
            explorerApiUrl: ROPSTEN_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0xAa3E82b4c4093b4bA13Cb5714382C99ADBf750cA',
            forwarder: '0xeB230bF62267E94e657b5cbE74bdcea78EB3a5AB',
            versionRegistry: '0x9e59Ea5333cD4f402dAc320a04fafA023fe3810D',
            paymaster: '0x5fba514fC9d7215fb22ada57Cd1E20167ba8Fd32',
        },
        '4': {
            networkId: '4',
            name: 'Rinkeby',
            currency: ETHER,
            web3Rpc: RINKEBY_RPC(),
            explorerUrl: RINKEBY_EXPLORER(),
            explorerApiUrl: ROPSTEN_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0x6650d69225CA31049DB7Bd210aE4671c0B1ca132',
            forwarder: '0x83A54884bE4657706785D7309cf46B58FE5f6e8a',
            versionRegistry: '0xedD8C4103acAd42F7478021143E29e1B05aD85C6',
            paymaster: '0xA6e10aA9B038c9Cddea24D2ae77eC3cE38a0c016',
        },
        '42': {
            networkId: '42',
            name: 'Kovan',
            currency: ETHER,
            web3Rpc: KOVAN_RPC(),
            explorerUrl: KOVAN_EXPLORER(),
            explorerApiUrl: KOVAN_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0x727862794bdaa3b8Bc4E3705950D4e9397E3bAfd',
            forwarder: '0x7eEae829DF28F9Ce522274D5771A6Be91d00E5ED',
            versionRegistry: '0x7380D97dedf9B8EEe5bbE41422645aA19Cd4C8B3',
            paymaster: ' 0xB19D34ca1A6B37E84cc87E3F7D0893AD897e7b5D',
        },
        '5': {
            networkId: '5',
            name: 'Goerli',
            web3Rpc: GOERLI_RPC(),
            explorerUrl: GOERLI_EXPLORER(),
            explorerApiUrl: GOERLI_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
        },
        '137': {
            networkId: '137',
            name: 'Polygon',
            currency: MATIC,
            web3Rpc: POLYGON_RPC(),
            explorerUrl: POLYGON_EXPLORER(),
            explorerApiUrl: POLYGON_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0x6C28AfC105e65782D9Ea6F2cA68df84C9e7d750d',
            forwarder: '0xdA78a11FD57aF7be2eDD804840eA7f4c2A38801d',
            versionRegistry: '0x4Fe8824c885D67613848c94a15dce7680897f33E',
            paymaster: '0x9d47218ce8b8F123Efbb1Db3E0DdBe6490Cf77E1',
        },
        '80001': {
            networkId: '80001',
            name: 'Polygon Mumbai Testnet',
            currency: ETHER,
            web3Rpc: POLYGON_MUMBAI_RPC(),
            explorerUrl: POLYGON_MUMBAI_EXPLORER(),
            explorerApiUrl: POLYGON_MUMBAI_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0x6646cD15d33cE3a6933e36de38990121e8ba2806',
            forwarder: '0x4d4581c01A457925410cd3877d17b2fd4553b2C5',
            versionRegistry: '0x4Fe8824c885D67613848c94a15dce7680897f33E',
            paymaster: '0xcA94aBEdcC18A10521aB7273B3F3D5ED28Cf7B8A',
        },
        '42161': {
            networkId: '42161',
            name: 'Arbitrum One',
            currency: ETHER,
            web3Rpc: ARBITRUM_RPC(),
            explorerUrl: ARBITRUM_EXPLORER(),
            explorerApiUrl: ARBITRUM_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
        },
        '421611': {
            networkId: '421611',
            name: 'Arbitrum Rinkeby',
            currency: ETHER,
            web3Rpc: ARBITRUM_RINKEBY_RPC(),
        },
        '10': {
            networkId: '10',
            name: 'Optimism',
            currency: ETHER,
            web3Rpc: OPTIMISM_RPC(),
            relayHub: '0x6f00F1A7BdB7E2E407385263B239090bCdb6b442',
            forwarder: '0x67097a676FCb14dc0Ff337D0D1F564649aD94715',
            versionRegistry: '0xD8Cf3315FFD1A3ec74Dc2B02908AF60e5E330472',
            paymaster: '0x28E036dB9727a9d5ee9373DBAAe14B422D83a017',
        },
        '69': {
            networkId: '69',
            name: 'Optimism Kovan',
            currency: ETHER,
            web3Rpc: OPTIMISM_KOVAN_RPC(),
            relayHub: '0xceEd6F194C07EB606ae0F3899DdfA7dE8a4ABcB5',
            forwarder: '0x39A2431c3256028a07198D2D27FD120a1f81ecae',
            versionRegistry: '0xf7D1b4f7B20B4bC1b4dc1E09B709edA31123193c',
            paymaster: '0x6B43C92C4661c8555D5D060144457D9bF0fD0D34',
        },
        '300': {
            networkId: '300',
            name: 'Optimism Gnosis Chain',
            currency: xDAI,
            web3Rpc: OPTIMISM_GNOSIS_RPC(),
            explorerUrl: OPTIMISM_GNOSIS_EXPLORER(),
            explorerApiUrl: OPTIMISM_GNOSIS_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0x6f00F1A7BdB7E2E407385263B239090bCdb6b442',
            forwarder: '0x67097a676FCb14dc0Ff337D0D1F564649aD94715',
            versionRegistry: '0xD8Cf3315FFD1A3ec74Dc2B02908AF60e5E330472',
            paymaster: '0x28E036dB9727a9d5ee9373DBAAe14B422D83a017',
        },
        '43114': {
            networkId: '43114',
            name: 'Avalanche',
            currency: AVAX,
            web3Rpc: AVALANCHE_RPC(),
            explorerUrls: AVALANCHE_EXPLORER(),
            explorerApiUrls: AVALANCHE_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0xafAFDac90164e4b2D4e39a1ac3e9dBC635dbbEA5',
            forwarder: '0x01a5a06C5Ba6E5f8FC9CB060492fae1b3d03c69d',
            paymaster: '0x10E207898E76137bb27b31609a275b0635080632',
        },
        '43113': {
            networkId: '43113',
            name: 'Avalanche Fuji Testnet',
            currency: AVAX,
            web3Rpc: AVALANCHE_FUJI_RPC(),
            explorerUrl: AVALANCHE_FUJI_EXPLORER(),
            explorerApiUrl: AVALANCHE_FUJI_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0x0321ABDba4dCf3f3AeCf463Def8F866568BC5174',
            forwarder: '0xDFdA581eE8bf25Ade192DE74BcaE0A60b9860B33',
            paymaster: '0x9552C037217B46398B1c928e0e5b086C5f5F4aB3',
        },
        '56': {
            networkId: '56',
            name: 'BSC Mainnet',
            currency: BNB,
            web3Rpc: BSC_MAINNET_RPC(),
            explorerUrls: BSC_MAINNET_EXPLORER(),
            explorerApiUrls: BSC_MAINNET_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0xAa3E82b4c4093b4bA13Cb5714382C99ADBf750cA',
            forwarder: '0xeB230bF62267E94e657b5cbE74bdcea78EB3a5AB',
            versionRegistry: '0x9e59Ea5333cD4f402dAc320a04fafA023fe3810D',
            paymaster: '0x01a5a06C5Ba6E5f8FC9CB060492fae1b3d03c69d',
        },
        '97': {
            networkId: '97',
            name: 'BSC Testnet',
            currency: BNB,
            web3Rpc: BSC_TESTNET_RPC(),
            explorerUrl: BSC_TESTNET_EXPLORER(),
            explorerApiUrl: BSC_TESTNET_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0xAa3E82b4c4093b4bA13Cb5714382C99ADBf750cA',
            forwarder: '0xeB230bF62267E94e657b5cbE74bdcea78EB3a5AB',
            versionRegistry: '0x9e59Ea5333cD4f402dAc320a04fafA023fe3810D',
            paymaster: '0x01a5a06C5Ba6E5f8FC9CB060492fae1b3d03c69d',
        },
        '100': {
            networkId: '100',
            name: 'Gnosis Chain',
            currency: xDAI,
            web3Rpc: GNOSIS_CHAIN_RPC(),
            explorerUrl: GNOSIS_CHAIN_EXPLORER(),
            explorerApiUrl: GNOSIS_CHAIN_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0x727862794bdaa3b8Bc4E3705950D4e9397E3bAfd',
            forwarder: '0x7eEae829DF28F9Ce522274D5771A6Be91d00E5ED',
            versionRegistry: '0x7380D97dedf9B8EEe5bbE41422645aA19Cd4C8B3',
            paymaster: '0x9e59Ea5333cD4f402dAc320a04fafA023fe3810D',
        },
        '61': {
            networkId: '1',
            name: 'ETC Mainnet',
            currency: ETC,
            web3Rpc: ETC_MAINNET_RPC(),
            explorerUrl: ETC_MAINNET_EXPLORER(),
            explorerApiUrl: ETC_MAINNET_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0xDC8B38D05Be14818EE6d1cc4E5245Df6C52A684E',
            forwarder: '0x0DEEF5a1e5bF8794A5145e052E24A852a081AF65',
            versionRegistry: '0x581648Bb9dB7e36360B8B551Cdaf23c481f106c3',
        },
        '6': {
            networkId: '6',
            name: 'Kotti ETC Testnet',
            currency: KOT,
            web3Rpc: ETC_KOTTI_RPC(),
            explorerUrl: ETC_KOTTI_EXPLORER(),
            explorerApiUrl: ETC_KOTTI_EXPLORER_API(),
            explorerApiKey: ETHERSCAN_API_KEY(),
            relayHub: '0xAdB0B519873860F396F8d6642286C179A5A0770D',
            forwarder: '0x255fc98fE2C2564CF361E6dCD233862f884826E5',
            versionRegistry: '0x581648Bb9dB7e36360B8B551Cdaf23c481f106c3',
            paymaster: '0x41ddb318BB35cA0aD54b52f5b1708ff860161dCc',
        },
    } as { [networkId: string]: Network | undefined };
};

export default defaultNetworks;
