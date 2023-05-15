import { AbiInput } from 'web3-utils';

export type AbiInputTypeInt =
    | 'uint256'
    | 'int256'
    | 'uint128'
    | 'int128'
    | 'uint64'
    | 'int64'
    | 'uint32'
    | 'int32'
    | 'uint16'
    | 'int16'
    | 'uint8'
    | 'int8';
export type AbiInputTypeIntArray =
    | 'uint256[]'
    | 'int256[]'
    | 'uint128[]'
    | 'int128[]'
    | 'uint64[]'
    | 'int64[]'
    | 'uint32[]'
    | 'int32[]'
    | 'uint16[]'
    | 'int16[]'
    | 'uint8[]'
    | 'int8[]';

export type AbiInputTypeString = 'string';
export type AbiInputTypeStringArray = 'string[]';
export type AbiInputTypeBool = 'bool';
export type AbiInputTypeBoolArray = 'bool[]';
export type AbiInputTypeAddress = 'address';
export type AbiInputTypeAddressArray = 'address[]';
export type AbiInputType =
    | AbiInputTypeInt
    | AbiInputTypeIntArray
    | AbiInputTypeString
    | AbiInputTypeStringArray
    | AbiInputTypeBool
    | AbiInputTypeBoolArray
    | AbiInputTypeAddress
    | AbiInputTypeAddressArray;

export interface AbiInputExtended extends AbiInput {
    type: AbiInputType;
    [key: string]: any;
}
