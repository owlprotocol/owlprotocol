/**
 * Typescript implementation of Create2 library pure functions
 * https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Create2.sol
 *
 * Aliased for ethers implementation
 */
import { utils } from "ethers";

export function computeAddress(salt: string, bytecodeHash: string, deployer: string): string {
    return utils.getCreate2Address(deployer, salt, bytecodeHash);
}
