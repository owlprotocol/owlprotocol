module.exports = {
    contracts_directory: './src/solidity',
    contracts_build_directory: './src/abi',
    compilers: {
        solc: {
            version: '0.8.12', // Fetch exact version from solc-bin (default: truffle's version)
            settings: {
                // See the solidity docs for advice about optimization and evmVersion
                parser: 'solcjs',
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
                evmVersion: 'berlin',
            },
        },
    },
};
