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
 */
export async function loadCollectionImages(collection: NFTGenerativeCollection) {
    const promises = map(values(collection.traits), (t) => {
        if (isNFTGenerativeTraitImage(t)) {
            return Promise.all(
                map(t.options, async (s) => {
                    if (s.image || !s.image_url) return undefined;
                    if (s.image_url) {
                        const result = await fetch(s.image_url);
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
    const children = map(values(collection.children ?? {}), (c) => loadCollectionImages(c));

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
