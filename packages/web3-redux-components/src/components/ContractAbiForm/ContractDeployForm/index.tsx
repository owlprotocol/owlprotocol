import { Box, useTheme, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Config, Contract, ContractSendStatus } from '@owlprotocol/web3-redux';
import { useForm } from 'react-hook-form';
import type { AbiItem } from '@owlprotocol/web3-redux/src/utils/web3-utils/index.js';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AbiInputList } from '../AbiInput/AbiInputList/index.js';
import { WalletConnect } from '../../WalletConnect/index.js';
import { DeployType } from '@owlprotocol/web3-redux/src/contract/actions/deploy.js';

export interface ContractDeployFormProps {
    networkId: string;
    namePrefix?: string;
    abi: AbiItem[];
    bytecode?: string;
    deployType: DeployType;
    deploySalt?: string;
    deploySaltSenderDeterministic?: boolean;
    deployImplementationAddress?: string;
    deployBeaconAddress?: string;
    label?: string;
    tags?: string[];
}

export const ContractDeployForm = ({
    networkId,
    namePrefix = '',
    abi,
    bytecode,
    deployType,
    deploySalt,
    deploySaltSenderDeterministic,
    deployImplementationAddress,
    deployBeaconAddress,
    label,
    tags
}: ContractDeployFormProps) => {
    const dispatch = useDispatch();

    const [from] = Config.hooks.useAccount()

    const { themes } = useTheme();
    const constructor = abi.find((f) => {
        if (deployType === Contract.enums.DeployType.REGULAR) return f.type === 'constructor'
        else if (deployType === Contract.enums.DeployType.INITIALIZE) return f.name === 'initialize' && f.type === 'function'
        else if (deployType === Contract.enums.DeployType.PROXY_1167) return f.name === 'initialize' && f.type === 'function'
        else if (deployType === Contract.enums.DeployType.PROXY_BEACON) return f.name === 'proxyInitialize' && f.type === 'function'
    });
    let name = 'constructor'
    if (deployType === Contract.enums.DeployType.INITIALIZE) name = 'initialize'
    else if (deployType === Contract.enums.DeployType.PROXY_1167) name = 'initialize'
    else if (deployType === Contract.enums.DeployType.PROXY_BEACON) name = 'proxyInitialize'

    const inputs = constructor ? constructor?.inputs as any[] : [];
    if (deployType != Contract.enums.DeployType.REGULAR && !inputs) throw new Error(`Cannot find inputs for ${name}(...)`)

    const { setValue, setError, clearErrors, getFieldState, formState, watch } = useForm();
    const { errors } = formState;
    const inputErrors = Object.values(errors);
    const args = watch(inputs.map((i) => i.name));

    const argsDefined = args.length > 0 ? args.reduce((acc, curr) => acc && !!curr, !!args[0]) : true;
    const noInputErrors =
        inputErrors.length > 0 ? inputErrors.reduce((acc, curr) => acc && !curr, !inputErrors[0]) : true;
    const validArgs = argsDefined && noInputErrors;

    const [address, setAddress] = useState<string | undefined>();
    const action = useMemo(() => {
        if (networkId && abi && from && args) {
            return Contract.actions.deploy({
                networkId,
                abi,
                bytecode,
                deployImplementationAddress,
                //@ts-expect-error
                deployBeaconAddress,
                args,
                from,
                deployType,
                deploySalt,
                deploySaltSenderDeterministic,
                onSuccess: setAddress,
                label,
                tags
            });
        }
    }, [
        networkId, abi, bytecode,
        deployImplementationAddress, deployBeaconAddress, deployType,
        deploySalt, deploySaltSenderDeterministic,
        args, from,
        setAddress,
        label,
        tags
    ]);
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
