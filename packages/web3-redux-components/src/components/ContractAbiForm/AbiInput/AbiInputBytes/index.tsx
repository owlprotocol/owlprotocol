import { useCallback } from 'react';
import { Input, useTheme } from '@chakra-ui/react';
import { UseFormClearErrors, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import Web3 from 'web3';

export type AbiInputBytesType = 'bytes32' | 'bytes24' | 'bytes16' | 'bytes12' | 'bytes8' | 'bytes4' | 'bytes2';

export function isBytesType(type: string): type is AbiInputBytesType {
    return type.startsWith('bytes');
}

export interface AbiInputBytesProps {
    type: AbiInputBytesType;
    name: string;
    setValue?: UseFormSetValue<any>;
    setError?: UseFormSetError<any>;
    clearErrors?: UseFormClearErrors<any>;
}

const isBytes = Web3.utils.isHexStrict;
//eslint-disable-next-line @typescript-eslint/no-empty-function
export const AbiInputBytes = ({ type, name, setValue, setError, clearErrors }: AbiInputBytesProps) => {
    const { themes } = useTheme();
    const onChange = useCallback(
        ({ target: { value } }: { target: { value: string } }) => {
            setValue && setValue(name, value);
        },
        [name, setValue],
    );

    const sizeStr = type.replace('bytes', '');
    const size = parseInt(sizeStr);

    const onBlur = useCallback(
        ({ target: { value } }: { target: { value: string } }) => {
            if (!isBytes(value)) setError && setError(name, { type: 'custom', message: 'invalid bytes' });
            else {
                const currSize = Web3.utils.hexToBytes(value).length;
                if (currSize != size)
                    setError &&
                        setError(name, {
                            type: 'custom',
                            message: `invalid bytes size ${currSize}. Expected ${size}.`,
                        });
                else clearErrors && clearErrors(name);
            }
        },
        [name, size, setError, clearErrors],
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
            onBlur={onBlur}
        />
    );
};
