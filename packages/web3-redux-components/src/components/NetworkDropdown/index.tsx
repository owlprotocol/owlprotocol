import { useState } from 'react';
import { Box, Select, useTheme } from '@chakra-ui/react';
import NetworkIcon from '../NetworkIcon/index.js';

const DEFAULT_CHAINS = ['Ethereum', 'Arbitrum', 'Optimism', 'Polygon', 'Binance', 'Moonbeam', 'Moonriver'];

export interface Props {
    options?: string[];
    handleChange?: any;
}
export const NetworkDropdown = ({ options = [], handleChange }: Props) => {
    const { themes } = useTheme();
    const [selectedNetwork, setSelectedNetwork] = useState('1');
    const _options = [...DEFAULT_CHAINS, ...options];

    const _onChange = (value: any) => {
        setSelectedNetwork(value);
        handleChange(value, 'networkId');
    };

    return (
        <Box
            h={'52px'}
            display={'flex'}
            alignItems={'center'}
            borderRadius={8}
            bg={themes.color6}
            color={themes.color8}
        >
            <Box p={2} pr={0}>
                <NetworkIcon networkId={selectedNetwork} size={20} />
            </Box>
            <Select
                border={0}
                bg={themes.color6}
                color={themes.color8}
                placeholder="Select a Network"
                onChange={({ target }: any) => _onChange(target.value)}
            >
                {_options.map((item, key) => (
                    <option key={key}>{item}</option>
                ))}
            </Select>
        </Box>
    );
};

export default NetworkDropdown;
