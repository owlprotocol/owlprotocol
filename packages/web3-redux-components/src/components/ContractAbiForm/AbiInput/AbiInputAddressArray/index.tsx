import { useEffect, useMemo, useState } from 'react';
import { Box, Button, FormLabel, HStack, List, ListItem, useTheme } from '@chakra-ui/react';
import { UseFormClearErrors, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import { AbiInputAddress } from '../AbiInputAddress/index.js';

export type AbiInputAddressArrayType = 'address[]';

export interface AbiInputAddressArrayProps {
    type: AbiInputAddressArrayType;
    name: string;
    setValue?: UseFormSetValue<any>;
    setError?: UseFormSetError<any>;
    clearErrors?: UseFormClearErrors<any>;
}

//eslint-disable-next-line @typescript-eslint/no-empty-function
export const AbiInputAddressArray = ({ type, name, setValue, setError, clearErrors }: AbiInputAddressArrayProps) => {
    const { themes } = useTheme();

    const [length, setLength] = useState<number>(0);
    const incr = () => setLength(length + 1);
    const decr = () => setLength(length - 1);
    useEffect(() => {
        setLength(0);
    }, [type, name, setValue, setError, clearErrors]);

    const names = useMemo(() => {
        const arr = Array(length)
            .fill(name)
            .map((n, idx) => {
                return `${n}[${idx}]`;
            });
        return arr;
    }, [name, length]);

    let placeholder: string;
    if (!name) placeholder = `${type}`;
    else placeholder = `${name} (${type})`;

    return (
        <>
            <FormLabel color={themes.color8} mb={3}>
                {placeholder}
            </FormLabel>
            {names.length == 0 && 'Empty []'}
            <List>
                {names.map((name) => {
                    return (
                        <Box mb={3} key={name}>
                            <ListItem key={name}>
                                <HStack alignItems={'center'}>
                                    <AbiInputAddress
                                        name={name}
                                        type={'address'}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                    <Button onClick={decr}>Delete</Button>
                                </HStack>
                            </ListItem>
                        </Box>
                    );
                })}
            </List>
            <Button onClick={incr}>Add</Button>
        </>
    );
};
