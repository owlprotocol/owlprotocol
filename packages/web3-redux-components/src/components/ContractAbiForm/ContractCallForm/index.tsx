//@ts-nocheck
import { Box, useTheme, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Config, Contract } from '@owlprotocol/web3-redux';
import { useForm } from 'react-hook-form';
import { AbiInputType } from '../AbiInput/AbiInput/index.js';
import { AbiInputList } from '../AbiInput/AbiInputList/index.js';

export interface ContractCallFormProps {
    networkId: string;
    address: string;
    namePrefix?: string;
    name: string;
    inputs: {
        name: string;
        type: AbiInputType;
    }[];
}

export const ContractCallForm = ({ networkId, address, namePrefix = '', name, inputs = [] }: ContractCallFormProps) => {
    const { themes } = useTheme();

    const { setValue, setError, clearErrors, getFieldState, formState, watch } = useForm();
    const { errors } = formState;
    const inputErrors = Object.values(errors);
    const args = watch(inputs.map((i) => i.name));
    const argsDefined = args.length > 0 ? args.reduce((acc, curr) => acc && !!curr, !!args[0]) : true;
    const noInputErrors =
        inputErrors.length > 0 ? inputErrors.reduce((acc, curr) => acc && !curr, !inputErrors[0]) : true;
    const validArgs = argsDefined && noInputErrors;

    const [returnValue, { error: callError }] = Contract.hooks.useContractCall(networkId, address, name, args, {
        //@ts-expect-error
        sync: validArgs ? 'once' : false,
    });

    console.debug({ returnValue, callError, inputErrors, args, validArgs });

    // EVM error
    const error = callError;
    const isError = !!error;

    let resultText: string | undefined;
    if (returnValue) resultText = `Return value: ${returnValue}`;

    return (
        <Box borderRadius="md" bg={themes.color3} color="white" p={3}>
            <Box mb={6}>
                <span>{namePrefix}</span>
                <b>{name}</b>&nbsp;
            </Box>
            <FormControl isInvalid={isError}>
                <AbiInputList inputs={inputs} {...{ setValue, setError, clearErrors, getFieldState, formState }} />
                {isError && <FormErrorMessage>Error: {error?.message}</FormErrorMessage>}
                {resultText}
            </FormControl>
        </Box>
    );
};
