import { T_Encoded_Base } from '@owlprotocol/crud-redux';
import type { AbiItem } from 'web3-utils';

export interface ContractInterfaceId {
    readonly interfaceId: string;
}

export interface ContractInterface extends ContractInterfaceId, T_Encoded_Base {
    readonly abi: AbiItem[];
}

export const ContractInterfaceIndex = 'interfaceId';
