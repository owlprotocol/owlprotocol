import { UnsignedTransaction, providers, utils } from "ethers";
import { Utils } from "@owlprotocol/contracts"

export interface RoleArgs {
    /** Role to assign (eg. MINTER_ROLE) */
    readonly role: string,
    /** AccessControl-compatible contract */
    readonly contractAddress: string,
    /** Grantee address */
    readonly granteeAddress: string,
}

/**
 * Check if arg is hash. If it is not, and is a human-readable string, return hash.
 * @param hashOrString
 */
export function isHashOrComputeHash(hashOrString: string) {
    if (!utils.isHexString(hashOrString)) {
        //Not hex string => compute sha-256
        return utils.keccak256(utils.toUtf8Bytes("DEPOSIT_ROLE"));
    }

    //TODO: Also check length
    return hashOrString
}

/**
 * https://docs.openzeppelin.com/contracts/4.x/api/access#IAccessControl-grantRole-bytes32-address-
 */
export async function grantRole(provider: providers.Provider, {
    role,
    contractAddress,
    granteeAddress
}: RoleArgs): Promise<UnsignedTransaction[]> {
    const roleHash = isHashOrComputeHash(role)
    //TODO: Craft transaction

    throw new Error("Unimplemented")
}

/**
 * https://docs.openzeppelin.com/contracts/4.x/api/access#IAccessControl-revokeRole-bytes32-address-
 */
export async function revokeRole(provider: providers.Provider, {
    role,
    contractAddress,
    granteeAddress
}: RoleArgs): Promise<UnsignedTransaction[]> {
    throw new Error("Unimplemented")
}

/**
 *
 * https://docs.openzeppelin.com/contracts/4.x/api/access#IAccessControl-renounceRole-bytes32-address-
 */
export async function renounceRole(provider: providers.Provider, {
    role,
    contractAddress,
    granteeAddress
}: RoleArgs): Promise<UnsignedTransaction[]> {
    throw new Error("Unimplemented")
}


export async function roleHelperFactory(role: string) {
    const grant = (provider: providers.Provider, args: Omit<RoleArgs, "role">) => {
        return grantRole(provider, { ...args, role })
    }
    const revoke = (provider: providers.Provider, args: Omit<RoleArgs, "role">) => {
        return revokeRole(provider, { ...args, role })
    }
    const renounce = (provider: providers.Provider, args: Omit<RoleArgs, "role">) => {
        return renounceRole(provider, { ...args, role })
    }

    return {
        grant,
        revoke,
        renounce
    }
}

//TODO: Add missing
export const MinterRole = roleHelperFactory(Utils.AccessControl.MINTER_ROLE);
export const URIRole = roleHelperFactory(Utils.AccessControl.URI_ROLE);
