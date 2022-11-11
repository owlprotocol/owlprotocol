import { useCallback } from 'react';
import {
    useTheme,
    NumberInput,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';
import { UseFormSetError, UseFormSetValue } from 'react-hook-form';
import BN from 'bn.js';
import { type } from 'os';

export type AbiInputNumberType =
    | 'uint256'
    | 'uint128'
    | 'uint64'
    | 'uint32'
    | 'uint16'
    | 'uint8'
    | 'uint4'
    | 'int256'
    | 'int128'
    | 'int64'
    | 'int32'
    | 'int16'
    | 'int8'
    | 'int4';

export function isNumberType(type: string): type is AbiInputNumberType {
    return type.startsWith('uint') || type.startsWith('int');
}

export interface AbiInputNumberProps {
    type: AbiInputNumberType;
    name: string;
    setValue?: UseFormSetValue<any>;
    setError?: UseFormSetError<any>;
}

//https://github.com/chakra-ui/chakra-ui-docs/issues/914

const ZERO = new BN(0);
const TWO = new BN(2);
//eslint-disable-next-line @typescript-eslint/no-empty-function
export const AbiInputNumber = ({ type, name, setValue }: AbiInputNumberProps) => {
    const { themes } = useTheme();
    const onChange = useCallback(
        (valueAsString: string) => {
            setValue && setValue(name, valueAsString);
        },
        [name, setValue],
    );

    //integer sign & size
    const signed = type.startsWith('int');
    const sizeStr = signed ? type.replace('int', '') : type.replace('uint', '');
    const size = parseInt(sizeStr);
    const jsNum = size <= 52; //valid js number

    //Range compute
    const pow = signed ? new BN(size - 1) : new BN(size);
    const min = signed ? TWO.pow(pow) : ZERO;
    const max = TWO.pow(pow);

    let placeholder: string;
    if (!name) placeholder = `${type}`;
    else placeholder = `${name} (${type})`;

    return (
        <NumberInput
            min={jsNum ? min.toNumber() : undefined}
            max={jsNum ? max.toNumber() : undefined}
            clampValueOnBlur={jsNum} //disable if BN number
            border={0}
            w={'100%'}
            borderRadius={8}
            bg={themes.color6}
            color={themes.color8}
            placeholder={placeholder}
            onChange={onChange}
        >
            <NumberInputField placeholder={placeholder} />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    );
};
