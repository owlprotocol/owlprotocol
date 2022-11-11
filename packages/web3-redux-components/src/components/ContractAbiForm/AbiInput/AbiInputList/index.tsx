import { Box, FormControl, FormErrorMessage } from '@chakra-ui/react';
import {
    UseFormClearErrors,
    UseFormGetFieldState,
    UseFormSetError,
    UseFormSetValue,
    UseFormStateReturn,
} from 'react-hook-form';
import { AbiInputType, AbiInput } from '../AbiInput/index.js';

//Similar to AbiItem interface
export interface AbiInputListProps {
    inputs: {
        name: string;
        type: AbiInputType;
    }[];
    setValue?: UseFormSetValue<any>;
    setError?: UseFormSetError<any>;
    clearErrors?: UseFormClearErrors<any>;
    getFieldState?: UseFormGetFieldState<any>;
    formState?: UseFormStateReturn<any>;
}

export const AbiInputList = ({
    inputs,
    setValue,
    setError,
    clearErrors,
    getFieldState,
    formState,
}: AbiInputListProps) => {
    return (
        <>
            {inputs.map(({ name, type }: any, key: number) => {
                const { error } = (getFieldState && getFieldState(name, formState)) ?? { error: undefined };
                return (
                    <Box mb={3} key={key}>
                        <FormControl isRequired={type != 'bool'} isInvalid={!!error}>
                            <AbiInput
                                name={name}
                                type={type}
                                setValue={setValue}
                                setError={setError}
                                clearErrors={clearErrors}
                            />
                            {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
                        </FormControl>
                    </Box>
                );
            })}
        </>
    );
};
