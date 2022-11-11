import { Box, useTheme, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Config, Contract, ContractSendStatus } from '@owlprotocol/web3-redux';
import { useForm } from 'react-hook-form';
import type { AbiItem } from '@owlprotocol/web3-redux/src/utils/web3-utils/index.js';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AbiInputList } from '../AbiInput/AbiInputList/index.js';
import { WalletConnect } from '../../WalletConnect/index.js';

export interface ContractDeployFormProps {
    networkId: string;
    account?: string;
    namePrefix?: string;
    name: string | undefined;
    abi: AbiItem[];
    bytecode: string;
}

export const ContractDeployForm = ({
    networkId,
    account,
    namePrefix = '',
    name = 'constructor',
    abi,
    bytecode,
}: ContractDeployFormProps) => {
    const dispatch = useDispatch();

    const { themes } = useTheme();
    const constructor = abi.find((f) => f.type === 'constructor');
    const inputs = constructor?.inputs as any[];

    const { setValue, setError, clearErrors, getFieldState, formState, watch } = useForm();
    const { errors } = formState;
    const inputErrors = Object.values(errors);
    const args = watch(inputs.map((i) => i.name));

    const [configAccount] = Config.hooks.useAccount();
    const [configNetworkId] = Config.hooks.useNetworkId();
    const from = account ?? configAccount;
    const currNetworkId = networkId ?? configNetworkId;

    const argsDefined = args.length > 0 ? args.reduce((acc, curr) => acc && !!curr, !!args[0]) : true;
    const noInputErrors =
        inputErrors.length > 0 ? inputErrors.reduce((acc, curr) => acc && !curr, !inputErrors[0]) : true;
    const validArgs = argsDefined && noInputErrors;

    const [address, setAddress] = useState<string | undefined>();
    const action = useMemo(() => {
        if (currNetworkId && abi && bytecode && from && args) {
            return Contract.actions.deploy({
                networkId: currNetworkId,
                abi,
                bytecode,
                from,
                args,
                onSuccess: setAddress,
            });
        }
    }, [abi, bytecode, from, currNetworkId, args]);
    //Callback
    const deploy = useCallback(() => {
        if (action) dispatch(action);
    }, [dispatch, action]);

    const { status, transactionHash, receipt, confirmations } = {} as any;

    // EVM error
    const error = undefined as any; //deployError;
    const isError = !!error;

    const isPendingSig = status == ContractSendStatus.PENDING_SIGNATURE;
    const isPendingConf = status == ContractSendStatus.PENDING_CONFIRMATION;
    const isPending = isPendingSig || isPendingConf;

    let isPendingText: string | undefined;
    if (isPendingSig) isPendingText = 'Waiting for signature...';
    else if (isPendingConf) isPendingText = 'Waiting for confirmation...';

    const isDisabled = !validArgs || isPending;

    let resultText: string | undefined;
    if (transactionHash && !confirmations) resultText = `Transaction hash: ${transactionHash}`;
    else if (transactionHash && confirmations && receipt.blockNumber)
        resultText = `Transaction hash: ${transactionHash} Confirmed at block:${receipt.blockNumber}`;

    return (
        <Box borderRadius="md" bg={themes.color3} color="white" p={3}>
            <Box mb={6}>
                <span>{namePrefix}</span>
                <b>{name}</b>&nbsp;
            </Box>
            <FormControl isInvalid={isError}>
                <AbiInputList inputs={inputs} {...{ setValue, setError, clearErrors, getFieldState, formState }} />
                {isError && <FormErrorMessage>Error: {error?.message}</FormErrorMessage>}
                <WalletConnect networkId={networkId}>
                    <Button
                        isDisabled={isDisabled}
                        isLoading={isPending}
                        loadingText={isPendingText}
                        onClick={deploy}
                        bg={themes.color1}
                        mb={3}
                    >
                        Deploy
                    </Button>
                </WalletConnect>
                {resultText}
                {address}
            </FormControl>
        </Box>
    );
};
