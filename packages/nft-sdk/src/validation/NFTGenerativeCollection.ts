import { compact, map, values } from 'lodash-es';
import { NFTGenerativeCollection, isNFTGenerativeTraitImage } from '../types/index.js';

export const validateNFTGenerativeCollection = () => {
    //TODO: Validate Attributes
    //TODO: Validate Attribute depedency cycles
    return true;
};

/**
 * Missing middleware:
 * - SHOULD replace "ipfs://" protocol to an arbitrary gateway
 * - SHOULD cache to local storage
 * @param collection
 * @param ipfsGateway OPTIONAL
 */
export async function loadCollectionImages(collection: NFTGenerativeCollection, ipfsGateway?: string) {
    const promises = map(values(collection.traits), (t) => {
        if (isNFTGenerativeTraitImage(t)) {
            return Promise.all(
                map(t.options, async (s) => {
                    if (s.image || !s.image_url) return undefined;
                    let imageUrl = s.image_url;
                    if (imageUrl) {
                        if (imageUrl.substring(0, 7) === 'ipfs://' && !!ipfsGateway) {
                            imageUrl = imageUrl.replace(/^ipfs:\/\//, ipfsGateway + '/');
                        }
                        const result = await fetch(imageUrl);
                        if (t.image_type === 'svg') {
                            //@ts-expect-error
                            s.image = await result.text();
                        } else {
                            //@ts-expect-error
                            s.image = Buffer.from(await result.arrayBuffer()).toString('base64');
                        }
                    }
                }),
            );
        }
        return undefined;
    });

    //@ts-expect-error
    const children = map(values(collection.children ?? {}), (c) => loadCollectionImages(c, ipfsGateway));

    await Promise.all([...compact(promises), ...children]);
}

/**
//IPFS
    async loadFromIPFS(client: IPFS): Promise<void> {
        const results = await Promise.all(
            this.options.map((s) => {
                if (!s.image_url || s.image) return undefined;

                const cid = s.image_url.replace('ipfs://', '');
                return asyncIterableToArray(client.cat(cid));
            }),
        );

        this.options.forEach((s, i) => {
            if (s.image) return;
            const result = results[i];
            if (!result) {
                s.image = undefined;
                return;
            }

            const buffer = Buffer.concat(result);
            s.image = buffer;
        });
    }

 */
