import { UseFormClearErrors, UseFormSetError, UseFormSetValue } from 'react-hook-form';

import { AbiInputAddress, AbiInputAddressType } from '../AbiInputAddress/index.js';
import { AbiInputAddressArray, AbiInputAddressArrayType } from '../AbiInputAddressArray/index.js';
import { AbiInputBool, AbiInputBoolType } from '../AbiInputBool/index.js';
import { AbiInputBytes, AbiInputBytesType, isBytesType } from '../AbiInputBytes/index.js';
import { AbiInputNumber, AbiInputNumberType, isNumberType } from '../AbiInputNumber/index.js';
import { AbiInputString, AbiInputStringType } from '../AbiInputString/index.js';

export type AbiInputType =
    | AbiInputAddressType
    | AbiInputAddressArrayType
    | AbiInputBoolType
    | AbiInputBytesType
    | AbiInputNumberType
    | AbiInputStringType;

export interface AbiInputProps {
    type: AbiInputType;
    name: string;
    setValue?: UseFormSetValue<any>;
    setError?: UseFormSetError<any>;
    clearErrors?: UseFormClearErrors<any>;
}

export const AbiInput = ({ type, name, setValue, setError, clearErrors }: AbiInputProps) => {
    if (type === 'address')
        return (
            <AbiInputAddress
                type={type}
                name={name}
                setValue={setValue}
                setError={setError}
                clearErrors={clearErrors}
            />
        );
    else if (type === 'address[]') return <AbiInputAddressArray type={type} name={name} />;
    else if (type === 'bool') return <AbiInputBool type={type} name={name} setValue={setValue} />;
    else if (isBytesType(type))
        return (
            <AbiInputBytes type={type} name={name} setValue={setValue} setError={setError} clearErrors={clearErrors} />
        );
    else if (isNumberType(type))
        return <AbiInputNumber type={type} name={name} setValue={setValue} setError={setError} />;
    else if (type === 'string') return <AbiInputString type={type} name={name} setValue={setValue} />;

    return <>Error invalid type {type}</>;
};
