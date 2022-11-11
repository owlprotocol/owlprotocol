import { useCallback } from 'react';
import { Input, useTheme } from '@chakra-ui/react';
import { UseFormSetValue } from 'react-hook-form';

export type AbiInputStringType = 'string';

export interface AbiInputStringProps {
    type: AbiInputStringType;
    name: string;
    setValue?: UseFormSetValue<any>;
}

export const AbiInputString = ({ type, name, setValue }: AbiInputStringProps) => {
    const { themes } = useTheme();
    const onChange = useCallback(
        ({ target: { value } }: { target: { value: string } }) => {
            setValue && setValue(name, value);
        },
        [name, setValue],
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
