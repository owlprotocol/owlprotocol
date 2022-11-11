import { Artifacts } from '@owlprotocol/contracts';
import { useERC165SupportsInterface } from './useERC165SupportsInterface.js';
import { useContract } from '../useContract.js';

/**
 * Contract hook for ERC165 interface.
 * Fetch if contract supports interface.
 * @category Hooks
 *
 */
export function useERC165(networkId: string | undefined, address: string | undefined, interfaceId: string | undefined) {
    //Create abi in store if non-existant
    useContract(networkId, address, { abi: Artifacts.IERC165.abi });

    const [value] = useERC165SupportsInterface(networkId, address, [interfaceId]);
    return value;
}

/**
 * Alias for useERC165.
 * @category Hooks
 *
 */
export const useSupportsInterface = useERC165;
export default useSupportsInterface;
