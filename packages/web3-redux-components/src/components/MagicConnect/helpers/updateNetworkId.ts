import { Config } from "@owlprotocol/web3-redux";
import { ConfigWithObjects } from "@owlprotocol/web3-redux/src/config/model/interface";

interface Props {
    config: ConfigWithObjects | undefined;
    dispatch: any;
    networkId: string | number;
}

const updateNetworkIdInStore = ({ config, dispatch, networkId }: Props) => {
    const { networkId: currentNetworkId } = config ?? {};

    if (networkId && networkId != currentNetworkId) {
        dispatch(Config.actions.setNetworkId(`${networkId}`));
    }
};

export default updateNetworkIdInStore;
