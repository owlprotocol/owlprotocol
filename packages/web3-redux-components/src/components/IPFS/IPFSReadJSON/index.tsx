import { IPFSCache } from '@owlprotocol/web3-redux';
import { useMemo } from 'react';
import { Buffer } from 'buffer';

//https://www.iana.org/assignments/media-types/media-types.xhtml#image
export interface Props {
    cid: string | undefined;
    //mimeType?: 'application/json';
}

export const IPFSReadJSON = ({ cid }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [result]= IPFSCache.hooks.useAtPath(cid);

    return <>{result[0].dataJSON}</>;
};

export default IPFSReadJSON;
