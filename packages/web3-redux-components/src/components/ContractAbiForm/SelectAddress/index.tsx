import { useTheme, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Select, CreatableSelect } from "chakra-react-select";
import { Contract } from "@owlprotocol/web3-redux";
import { useForm, useController } from "react-hook-form";
import { compact, flatten, intersection, uniq } from "lodash-es";
import Web3 from "web3";
import { useCallback, useState } from "react";

const web3 = new Web3();
const coder = web3.eth.abi;

//https://codesandbox.io/s/648uv
//https://codesandbox.io/s/chakra-react-select-react-hook-form-usecontroller-single-select-typescript-v3-3hvkm
//https://github.com/csandman/chakra-react-select/tree/v3#react-hook-form
export interface Props {
    networkId: string;
    indexFilter?: string[] | undefined;
    showOtherAddresses?: boolean;
    creatable?: boolean;
    onChangeHandler?: (
        value: string | undefined,
        error: Error | undefined
    ) => void;
}
export const SelectAddress = ({
    networkId,
    indexFilter,
    showOtherAddresses = false,
    creatable = false,
    onChangeHandler = (value) =>
        console.log(`SelectAddress.onChange(${value})`),
}: Props) => {
    const { themes } = useTheme();

    const [error, setError] = useState<Error | undefined>();
    const [, setValue] = useState<string | undefined>();

    const [contracts] = Contract.hooks.useWhere({ networkId });
    const tags = uniq(compact(flatten(contracts.map((c) => c.tags))));

    //Options map tags to list of contracts with them
    const options = tags.map((t) => {
        return {
            label: t,
            options: contracts
                .filter((c: any) => c.networkId === networkId)
                .map((c: any) => {
                    return { label: c.address, value: c.address };
                }),
        };
    });

    if (showOtherAddresses) {
        const contractsUnLabelled = contracts
            .filter((c: any) => {
                if (!c.tags) return true;
                //Not in filter
                const intersect = intersection(c.tags, indexFilter);
                return intersect.length == 0;
            })
            .map((c: any) => {
                return { label: c.address, value: c.address };
            });
        options.push({ label: "Other", options: contractsUnLabelled });
    }

    const { control } = useForm<{ address: string | undefined }>({});
    const {
        field: { ref },
    } = useController<{ address: string | undefined }>({
        name: "address",
        control,
    });

    const onChangeValidate = useCallback(
        (_value: string) => {
            if (typeof _value == "boolean") {
                setError(undefined);
                setValue(_value);
                onChangeHandler(_value, undefined);
                return;
            }

            //Empty
            if (_value.length == 0) {
                setError(undefined);
                setValue(undefined);
                onChangeHandler(undefined, undefined);
                return;
            }

            //Address
            //TODO: Update input field value
            if (Web3.utils.isAddress(_value.toLowerCase())) {
                _value = Web3.utils.toChecksumAddress(_value);
            }

            //Validate
            try {
                coder.encodeParameter("address", _value);
                //Format is valid
                setError(undefined);
                setValue(_value);
                onChangeHandler(_value, undefined);
            } catch (_error: any) {
                setError(_error);
                setValue(_value);
                onChangeHandler(_value, _error);
                return;
            }
        },
        [onChangeHandler]
    );

    return (
        <>
            <FormControl isInvalid={!!error}>
                {creatable ? (
                    <CreatableSelect
                        ref={ref}
                        placeholder="Select address"
                        //@ts-ignore
                        options={options}
                        //@ts-ignore
                        onChange={(data) => onChangeValidate(data?.value)}
                        chakraStyles={{
                            container: (provided: any) => ({
                                ...provided,
                                bg: themes.color6,
                                color: themes.color8,
                                border: 0,
                                borderColor: themes.color6,
                                borderRadius: "8px",
                                p: "6px 4px",
                            }),
                            downChevron: (provided: any) => ({
                                ...provided,
                                color: themes.color8,
                                w: 24,
                                h: 24,
                            }),
                            placeholder: (provided: any) => ({
                                ...provided,
                                color: themes.color8,
                                fontWeight: 600,
                                fontSize: 16,
                            }),
                            dropdownIndicator: (provided: any) => ({
                                ...provided,
                                bg: themes.color6,
                            }),
                            indicatorSeparator: (provided: any) => ({
                                ...provided,
                                display: "none",
                            }),
                        }}
                    />
                ) : (
                    <Select
                        ref={ref}
                        placeholder="Select address"
                        options={options}
                        //@ts-ignore
                        onChange={(data) => onChangeValidate(data?.value)}
                        chakraStyles={{
                            container: (provided: any) => ({
                                ...provided,
                                bg: themes.color5,
                                color: themes.color8,
                                border: 0,
                                borderColor: "transparent",
                                borderRadius: 12,
                                p: "6px 4px",
                            }),
                            downChevron: (provided: any) => ({
                                ...provided,
                                color: themes.color8,
                                w: 24,
                                h: 24,
                            }),
                            placeholder: (provided: any) => ({
                                ...provided,
                                color: themes.color8,
                                fontWeight: 600,
                                fontSize: 16,
                            }),
                            dropdownIndicator: (provided: any) => ({
                                ...provided,
                                bg: themes.color5,
                            }),
                            indicatorSeparator: (provided: any) => ({
                                ...provided,
                                display: "none",
                            }),
                        }}
                    />
                )}
                <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
        </>
    );
};

export default SelectAddress;
