/**
 * Typescript implementation of ERC1167 library pure functions
 */
import { utils } from "ethers";
import type { BaseContract } from "ethers";
import { PUBLIC_ADDRESS_FACTORY_DEPLOYER } from "@owlprotocol/envvars";
import { GetInitDataArgs } from "./getInitData.js";

//ERC1167FactoryAddress is computed based on the factory deployer address and nonce = 0
export const ERC1167FactoryAddress = utils.getContractAddress({ from: PUBLIC_ADDRESS_FACTORY_DEPLOYER, nonce: 0 });

export interface GetAddressArgs<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> {
    cloneFactoryAddress?: string;
    salt?: string;
    msgSender?: string;
    contractInterface: ContractTyped["interface"];
    initOptions?: InitSignature extends keyof ContractTyped ? GetInitDataArgs<ContractTyped, InitSignature> : undefined;
}
