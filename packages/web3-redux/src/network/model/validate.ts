import axios from "axios";
import { isUndefined, omit, omitBy } from "lodash-es";
import { Network, NetworkId, NetworkWithObjects } from "./interface.js";
import { defaultNetworks } from "../defaults.js";
import { fromRpc } from "../../utils/web3/index.js";

/** @internal */
export function validateId({ networkId }: NetworkId) {
    return { networkId };
}

export function toPrimaryKey({ networkId }: NetworkId): [string] {
    return [networkId];
}

/**
 * Validate network with default values.
 * @param network
 */
export function validate(network: Network): Network {
    const networkId = network.networkId;
    const defaultNetworkForId = defaultNetworks()[networkId];
    const name = network.name ?? defaultNetworkForId?.name;
    const explorerUrl = network.explorerUrl ?? defaultNetworkForId?.explorerUrl;
    const explorerApiUrl = network.explorerApiUrl ?? defaultNetworkForId?.explorerApiUrl;
    const explorerApiKey = network.explorerApiKey ?? defaultNetworkForId?.explorerApiKey;
    const web3Rpc = network.web3Rpc ?? defaultNetworkForId?.web3Rpc;

    const gsnRelayHubAddress = network.relayHub ?? defaultNetworkForId?.relayHub;
    const gsnForwarderAddress = network.forwarder ?? defaultNetworkForId?.forwarder;
    const gsnVersionRegistry = network.versionRegistry ?? defaultNetworkForId?.versionRegistry;
    const gsnPaymasterAddress = network.paymaster ?? defaultNetworkForId?.paymaster;

    return omitBy(
        {
            ...network,
            name,
            explorerUrl,
            explorerApiUrl,
            explorerApiKey,
            web3Rpc,
            gsnRelayHubAddress,
            gsnForwarderAddress,
            gsnVersionRegistry,
            gsnPaymasterAddress,
        },
        isUndefined,
    ) as unknown as Network;
}

/**
 * Hydrate network with objects.
 * @param network
 */
export function validateWithRedux(network: NetworkWithObjects, sess: any): NetworkWithObjects {
    const { networkId, web3Rpc, explorerApiUrl, explorerApiKey } = network;
    const networkORM: NetworkWithObjects | undefined = sess.Network.withId(networkId);

    let web3 = network.web3;
    if (!web3 && networkORM?.web3 && web3Rpc === networkORM.web3Rpc) {
        //Existing web3 instance the same
        web3 = networkORM.web3;
    } else if (!web3 && web3Rpc) {
        //New web3 instance
        web3 = fromRpc(web3Rpc);
    }

    let web3WithGSN = network.web3WithGSN;
    let isGSN = false;

    //checks if inputted network is a GSN-valid network
    if (network.relayHub !== undefined && network.forwarder !== undefined) {
        isGSN = true;
    }

    if (isGSN) {
        if (!web3WithGSN && networkORM?.web3WithGSN && network.paymaster === networkORM.paymaster) {
            //existing web3WithGSN instance the same
            //check if paymaster is same
            web3WithGSN = networkORM.web3WithGSN;
        }
    }

    let explorerApiClient = network.explorerApiClient;
    if (
        !explorerApiClient &&
        networkORM?.explorerApiClient &&
        explorerApiUrl === networkORM.explorerApiUrl &&
        explorerApiKey === networkORM.explorerApiKey
    ) {
        //Existing axios instance
        explorerApiClient = networkORM.explorerApiClient;
    } else if (!explorerApiClient && explorerApiUrl && explorerApiKey) {
        //New axios instance
        explorerApiClient = axios.create({ baseURL: explorerApiUrl, params: { apikey: explorerApiKey } });
    } else if (!explorerApiClient && explorerApiUrl) {
        //New axios instance
        explorerApiClient = axios.create({ baseURL: explorerApiUrl });
    }

    return omitBy(
        {
            ...network,
            web3,
            explorerApiClient,
            web3WithGSN,
        },
        isUndefined,
    ) as unknown as NetworkWithObjects;
}

/**
 * Encode network
 * @param network
 */
export function encode(network: NetworkWithObjects): Network {
    return omit(network, ["web3", "web3Sender", "explorerApiClient"]);
}

export async function preWriteBulkDB(items: Network[]): Promise<Network[]> {
    return items.map((item) => {
        return { ...item, updatedAt: Date.now() };
    });
}
