import web3 from "web3";
import { useEffect, useState } from "react";

export interface IERC20Metadata {
    name: string;
    website: string;
    description: string;
    explorer: string;
    type: string;
    symbol: string;
    decimals: number;
    status: string;
    id: string;
    tags: string[];
    links: { name: string; url: string }[];
}

const BASE_URL = "https://owlprotocol.github.io";

export const useERC20Metadata = (address: string) => {
    const checksumdAddress = web3.utils.toChecksumAddress(address);
    //@ts-expect-error
    const [metadataObject, set] = <IERC20Metadata>(<any>useState({}));
    const URL = `${BASE_URL}/blockchains/ethereum/assets/${checksumdAddress}/info.json`;

    useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((res) => set(res));
    }, [address]);

    return metadataObject;
};

export default useERC20Metadata;
