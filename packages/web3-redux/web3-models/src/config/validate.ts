import axios from "axios";
import type { IPFS } from "ipfs-core-types";
import { create as createIPFS } from "ipfs-http-client";
import { omit, omitBy, isUndefined } from "lodash-es";
import type { Config, ConfigId, ConfigWithObjects } from "./interface.js";

export function validateIdConfig({ id }: ConfigId) {
    return { id };
}

export function toPrimaryKeyConfig({ id }: ConfigId): [string] {
    return [id];
}

/**
 * Validate config.
 * @param config
 */
export function validateConfig({ id, networkId, account, ipfsUrl, _4byteUrl, corsProxy }: Config): Config {
    return omitBy(
        { id, networkId, account: account?.toLowerCase(), ipfsUrl, _4byteUrl, corsProxy },
        isUndefined,
    ) as unknown as Config;
}

/**
 * Hydrate config with objects.
 * @param config
 */
export function validateWithReduxConfig(config: ConfigWithObjects, sess: any): ConfigWithObjects {
    const { id, ipfsUrl, _4byteUrl } = config;
    const configORM: ConfigWithObjects | undefined = sess.Config.withId(id);

    let ipfsClient = config.ipfsClient;
    if (!ipfsClient) {
        if (configORM?.ipfsUrl && ipfsUrl === configORM.ipfsUrl) {
            //Existing axios instance
            ipfsClient = configORM.ipfsClient;
        } else if (ipfsUrl) {
            //New axios instance
            ipfsClient = createIPFS({ url: ipfsUrl }) as unknown as IPFS;
        }
    }

    let _4byteClient = config._4byteClient;
    if (!_4byteClient) {
        if (configORM?._4byteUrl && _4byteUrl === configORM._4byteUrl) {
            //Existing axios instance
            _4byteClient = configORM._4byteClient;
        } else if (_4byteUrl) {
            //New axios instance
            _4byteClient = axios.create({ baseURL: config._4byteUrl });
        }
    }
    //Existing or new axios instance
    const httpClient = configORM?.httpClient ? configORM.httpClient : axios.create();

    return omitBy(
        {
            ...config,
            ipfsClient,
            _4byteClient,
            httpClient,
        },
        isUndefined,
    ) as unknown as Config;
}

/**
 * Encode config
 * @param config
 */
export function encode(config: ConfigWithObjects): Config {
    return omit(config, ["ipfsClient", "_4byteClient", "httpClient"]);
}
