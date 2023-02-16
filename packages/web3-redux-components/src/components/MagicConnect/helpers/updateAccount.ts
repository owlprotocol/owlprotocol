import { Config } from "@owlprotocol/web3-redux";
import { ConfigWithObjects } from "@owlprotocol/web3-redux/src/config/model/interface";

interface Props {
    config: ConfigWithObjects | undefined;
    dispatch: any;
    account: string;
}

const updateAccountInStore = ({ config, dispatch, account }: Props) => {
    const { account: currentAccount } = config ?? {};

    if (account && account != currentAccount) {
        dispatch(Config.actions.setAccount(account));
    }
};

export default updateAccountInStore;
