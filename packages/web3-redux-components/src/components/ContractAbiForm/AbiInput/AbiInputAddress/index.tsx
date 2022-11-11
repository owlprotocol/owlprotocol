import { useCallback } from 'react';
import { Input, useTheme } from '@chakra-ui/react';
import { UseFormClearErrors, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import Web3 from 'web3';

export type AbiInputAddressType = 'address';

export interface AbiInputAddressProps {
    type: AbiInputAddressType;
    name: string;
    setValue?: UseFormSetValue<any>;
    setError?: UseFormSetError<any>;
    clearErrors?: UseFormClearErrors<any>;
}

const isAddress = Web3.utils.isAddress;
export const AbiInputAddress = ({ type, name, setValue, setError, clearErrors }: AbiInputAddressProps) => {
    const { themes } = useTheme();
    const onChange = useCallback(
        ({ target: { value } }: { target: { value: string } }) => {
            if (!isAddress(value)) {
                if (value.length > 0) {
                    setError && setError(name, { type: 'custom', message: 'invalid address' });
                } else {
                    clearErrors && clearErrors(name);
                }
                setValue && setValue(name, undefined);
            } else {
                clearErrors && clearErrors(name);
                setValue && setValue(name, value);
            }
        },
        [clearErrors, name, setError, setValue],
    );

    let placeholder: string;
    if (!name) placeholder = `${type}`;
    else placeholder = `${name} (${type})`;

    return (
        <Input
            type="text"
            p={4}
            border={0}
            w={'100%'}
            borderRadius={8}
            bg={themes.color6}
            color={themes.color8}
            placeholder={placeholder}
            _placeholder={{ color: themes.color8 }}
            onChange={onChange}
        />
    );
};
