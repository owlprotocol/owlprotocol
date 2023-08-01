import composeHooks from 'react-hooks-compose';
import { StyleProps } from '@chakra-ui/react';
import AddressDisplayPresenter, { Control } from './AddressDisplayPresenter.js';
import { Address } from '../../../interfaces/Address.js';
import { useAddressHasTag, useAddressLabel } from '@owlprotocol/web3-redux';

export type useAddressDisplayProps = Partial<Address>;
const useAddressDisplay = ({ networkId, address }: useAddressDisplayProps) => {
    const [isFavorite, { toggleLabel: toggleFavorite }] = useAddressHasTag(networkId, address, "Favorite");
    const [label, { setLabel }] = useAddressLabel(networkId, address);

    return { label, isFavorite, toggleFavorite, setLabel };
};

export interface AddressDisplayProps extends Partial<Address> {
    borderRadius?: number;
    bg?: string;
    controls?: Control[];
    containerStyles?: StyleProps;
}
const AddressDisplay = composeHooks(({ networkId, address }: AddressDisplayProps) => ({
    useAddressDisplay: () => useAddressDisplay({ networkId, address }),
}))(AddressDisplayPresenter) as (props: AddressDisplayProps) => JSX.Element;

//@ts-expect-error
AddressDisplay.displayName = 'AddressDisplay';

export { AddressDisplay };
