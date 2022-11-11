import { useState } from 'react';
import { HStack, Input, Select, useTheme } from '@chakra-ui/react';
import Icon from '../Icon/index.js';

const DEFAULT_CURRENCIES = ['USD', 'EURO'];

export interface Props {
    currencyOptions?: string[];
    minAmount: number;
    maxAmount: number;
    handleChange: (amount: number, currency: string) => undefined;
}

const CurrencyInputAndSelect = ({
    currencyOptions = DEFAULT_CURRENCIES,
    minAmount,
    maxAmount,
    handleChange,
}: Props) => {
    const { themes } = useTheme();
    const [currentAmount, setAmount] = useState(0);
    const [currentCurrency, setCurrentCurrency] = useState('USD');

    const _handleAmountChange = ({ target }: any) => {
        setAmount(target.value);
        handleChange(target.value, currentCurrency);
    };

    const _handleCurrencyChange = ({ target }: any) => {
        setCurrentCurrency(target.value);
        handleChange(currentAmount, target.value);
    };

    return (
        <HStack bg={themes.color6} align={'center'} h={'44px'} borderRadius={12} px={1}>
            <Input
                type={'number'}
                onChange={_handleAmountChange}
                border={0}
                bg={'transparent'}
                min={minAmount}
                max={maxAmount}
            />
            <Icon icon={currentCurrency} />
            <Select
                borderRadius={12}
                bg={themes.color5}
                border={0}
                w={'84px'}
                h={'36px'}
                fontSize={12}
                onChange={_handleCurrencyChange}
                flexShrink={0}
            >
                {currencyOptions.map((opt: string) => (
                    <option key={opt}>{opt}</option>
                ))}
            </Select>
        </HStack>
    );
};

export default CurrencyInputAndSelect;
