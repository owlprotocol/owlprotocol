//@ts-nocheck
import {
    Box,
    useTheme,
    Button,
    FormControl,
    FormErrorMessage,
} from "@chakra-ui/react";
import {
    Config,
    Contract,
    EthSendStatus as ContractSendStatus,
} from "@owlprotocol/web3-redux";
import { useForm } from "react-hook-form";
import { AbiInputList } from "../AbiInput/AbiInputList/index.js";
import { AbiInputType } from "../AbiInput/AbiInput/index.js";
import { WalletConnect } from "../../WalletConnect/index.js";

export interface ContractSendFormProps {
    networkId: string;
    address: string | undefined;
    account?: string;
    namePrefix?: string;
    name: string | undefined;
    inputs: {
        name: string;
        type: AbiInputType;
    }[];
}

export const ContractSendForm = ({
    networkId,
    address,
    account,
    namePrefix = "",
    name,
    inputs = [],
}: ContractSendFormProps) => {
    const { themes } = useTheme();

    const { setValue, setError, clearErrors, getFieldState, formState, watch } =
        useForm();
    const { errors } = formState;
    const inputErrors = Object.values(errors);
    const args = watch(inputs.map((i) => i.name));

    const [configAccount] = Config.hooks.useAccount();
    const from = account ?? configAccount;

    const argsDefined =
        args.length > 0
            ? args.reduce((acc, curr) => acc && !!curr, !!args[0])
            : true;
    const noInputErrors =
        inputErrors.length > 0
            ? inputErrors.reduce((acc, curr) => acc && !curr, !inputErrors[0])
            : true;
    const validArgs = argsDefined && noInputErrors;

    const [sendTx, { error: sendError, contractSend }] =
        Contract.hooks.useContractSend(networkId, address, name, args, {
            from,
        });
    const { status, transactionHash, receipt, confirmations } =
        contractSend ?? {};

    // EVM error
    const error = sendError;
    const isError = !!error;

    const isPendingSig = status == ContractSendStatus.PENDING_SIGNATURE;
    const isPendingConf = status == ContractSendStatus.PENDING_CONFIRMATION;
    const isPending = isPendingSig || isPendingConf;

    let isPendingText: string | undefined;
    if (isPendingSig) isPendingText = "Waiting for signature...";
    else if (isPendingConf) isPendingText = "Waiting for confirmation...";

    const isDisabled = !validArgs || isPending;

    let resultText: string | undefined;
    if (transactionHash && !confirmations)
        resultText = `Transaction hash: ${transactionHash}`;
    else if (transactionHash && confirmations && receipt.blockNumber)
        resultText = `Transaction hash: ${transactionHash} Confirmed at block:${receipt.blockNumber}`;

    return (
        <Box borderRadius="md" bg={themes.color3} color="white" p={3}>
            <Box mb={6}>
                <span>{namePrefix}</span>
                <b>{name}</b>&nbsp;
            </Box>
            <FormControl isInvalid={isError}>
                <AbiInputList
                    inputs={inputs}
                    {...{
                        setValue,
                        setError,
                        clearErrors,
                        getFieldState,
                        formState,
                    }}
                />
                {isError && (
                    <FormErrorMessage>Error: {error?.message}</FormErrorMessage>
                )}
                <WalletConnect networkId={networkId}>
                    <Button
                        isDisabled={isDisabled}
                        isLoading={isPending}
                        loadingText={isPendingText}
                        onClick={sendTx}
                        bg={themes.color1}
                        mb={3}
                    >
                        Send
                    </Button>
                </WalletConnect>
                {resultText}
            </FormControl>
        </Box>
    );
};
