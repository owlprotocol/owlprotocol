import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import { ContractCRUDActions } from "@owlprotocol/web3-actions";
import {
    ContractDexie,
    Contract,
    ContractKeyId,
    ContractKeyIdx,
    ContractKeyIdEq,
    ContractKeyIdxEq,
    ContractKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const ContractDexieHooks = createCRUDDexieHooks<
    Contract,
    ContractKeyId,
    ContractKeyIdx,
    ContractKeyIdEq,
    ContractKeyIdxEq,
    ContractKeyIdxEqAny
>(ContractDexie);

export const useAddressHasTag = (networkId: string | undefined, address: string | undefined, tag = "Favorite") => {
    const dispatch = useDispatch();

    const [contract] = ContractDexieHooks.useGet({ networkId, address });
    const tags = contract?.tags ?? [];
    const tagsHash = JSON.stringify(tags);
    const isLabel = tags.includes(tag);

    const toggleLabel = useCallback(() => {
        if (networkId && address) {
            if (!isLabel) {
                dispatch(ContractCRUDActions.actions.upsert({ networkId, address, tags: [...tags, tag] }));
            } else {
                dispatch(
                    ContractCRUDActions.actions.upsert({
                        networkId,
                        address,
                        tags: tags.filter((t) => t != tag),
                    }),
                );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [networkId, address, dispatch, isLabel, tagsHash]);

    const returnOptions = { toggleLabel };
    return [isLabel, returnOptions] as [typeof isLabel, typeof returnOptions];
};

export const useAddressLabel = (networkId: string | undefined, address: string | undefined) => {
    const dispatch = useDispatch();

    const [contract] = ContractDexieHooks.useGet({ networkId, address });
    const label = contract?.label;

    const setLabel = useCallback(
        (v) => {
            if (networkId && address) {
                dispatch(ContractCRUDActions.actions.upsert({ networkId, address, label: v }));
            }
        },
        [dispatch, address, networkId],
    );

    const returnOptions = { setLabel };
    return [label, returnOptions] as [typeof label, typeof returnOptions];
};
