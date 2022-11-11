import { useCallback, useEffect } from 'react';
import { Checkbox, FormLabel, HStack, useTheme } from '@chakra-ui/react';
import { UseFormSetValue } from 'react-hook-form';

export type AbiInputBoolType = 'bool';

export interface AbiInputBoolProps {
    type: AbiInputBoolType;
    name: string;
    setValue?: UseFormSetValue<any>;
}

export const AbiInputBool = ({ type, name, setValue }: AbiInputBoolProps) => {
    const { themes } = useTheme();
    const onChange = useCallback(
        ({ target: { checked } }: { target: { checked: boolean } }) => {
            setValue && setValue(name, checked);
        },
        [name, setValue],
    );

    useEffect(() => {
        setValue && setValue(name, false);
    }, [name, setValue]);

    let placeholder: string;
    if (!name) placeholder = `${type}`;
    else placeholder = `${name} (${type})`;

    return (
        <HStack alignItems={'center'}>
            <Checkbox
                bg={themes.color6}
                onChange={onChange}
                onBlur={undefined}
                defaultChecked={undefined}
                checked={undefined}
            />
            <FormLabel color={themes.color8} m={0}>
                {placeholder}
            </FormLabel>
        </HStack>
    );
};
