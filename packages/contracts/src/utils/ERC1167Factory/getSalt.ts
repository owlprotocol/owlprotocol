import { constants, utils } from 'ethers';

export const DEFAULT_SALT = utils.hexZeroPad(utils.hexlify(1), 32);

export interface SaltArgs {
    salt?: string;
    initData?: string;
    msgSender?: string;
}
export function getSalt({ salt, initData, msgSender }: SaltArgs) {
    if (msgSender && msgSender != constants.AddressZero) {
        if (initData && initData?.length > 0 && initData != '0x') {
            const saltData = utils.solidityPack(
                ['bytes32', 'address', 'bytes'],
                [salt ?? DEFAULT_SALT, msgSender, initData],
            );
            return utils.keccak256(saltData);
        } else {
            const saltData = utils.solidityPack(['bytes32', 'address'], [salt ?? DEFAULT_SALT, msgSender]);
            return utils.keccak256(saltData);
        }
    } else if (initData && initData?.length > 0 && initData != '0x') {
        const saltData = utils.solidityPack(['bytes32', 'bytes'], [salt ?? DEFAULT_SALT, initData]);
        return utils.keccak256(saltData);
    } else {
        return salt ?? DEFAULT_SALT;
    }
}
