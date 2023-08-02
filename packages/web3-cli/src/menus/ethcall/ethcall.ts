import { inquireAbiInputList } from "@owlprotocol/web3-prompt"
import { clearTerminal } from "../../utils/index.js";
import { utils } from "ethers";
import { EthCallDexie, NetworkActions, NetworkDexie, NetworkSelectors, store, web3CallAction } from "@owlprotocol/web3-redux";
import Spinnies from "spinnies"
import log from "loglevel";

export async function ethcallMenu(networkId: string, address: string, methodFormatFull: string): Promise<string> {
    clearTerminal();

    const fragment = utils.FunctionFragment.from(methodFormatFull)
    const iface = new utils.Interface([fragment])

    const abi = JSON.parse(fragment.format(utils.FormatTypes.json));
    const spinnies = new Spinnies();

    const network = (await NetworkDexie.get({ networkId }))!
    if (!network.web3Rpc) {
        log.warn("No web3 RPC")
        return `/networks/${networkId}`
    }

    const networkRedux = NetworkSelectors.selectByIdSingle(store.getState(), networkId)
    if (!networkRedux) store.dispatch(NetworkActions.actions.reduxUpsert(network))

    const results = await inquireAbiInputList(abi.inputs)
    const data = iface.encodeFunctionData(fragment, results.flatArgs)
    store.dispatch(web3CallAction({ networkId, to: address, data }))

    return await new Promise((resolve, reject) => {
        //LiveQuery
        const ethCall = EthCallDexie.getLiveQuery({ networkId, to: address, data })
        ethCall.subscribe({
            next: (result) => {
                spinnies.add('spinner-1', { text: `${abi.name}(${results.flatArgs.join(",")})` });
                if (result) {
                    log.info(result.returnValue)
                    spinnies.succeed('spinner-1', { text: `${abi.name}(${results.flatArgs.join(",")}): ${result.returnValue}` });
                    resolve(`/contracts/${networkId}/${address}`)
                }
            },
            error: (error) => reject(error)
        })
        //Dispatch EthCall
        //clearTerminal();
    })
}
