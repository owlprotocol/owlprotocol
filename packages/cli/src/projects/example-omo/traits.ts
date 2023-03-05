import { NFTGenerativeTraitEnum, NFTGenerativeTraitImage } from '@owlprotocol/nft-sdk';

export const traitEnumVibe: NFTGenerativeTraitEnum = {
    name: 'Vibe',
    type: 'enum',
    options: ['Chill', 'Boring', 'Eccentric'],
    probabilities: [70, 20, 10],
};

export const traitImageBg: NFTGenerativeTraitImage = {
    name: 'Background',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Dunes',
            image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/bg-dunes.png',
        },
        {
            value: 'Downtown',
            image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/bg-downtown.png',
        },
    ],
    probabilities: [1, 1],
};

export const traitImageBody: NFTGenerativeTraitImage = {
    name: 'Body',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Dunes',
            image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/body-base.png',
        },
        {
            value: 'Downtown',
            image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/body-albino.png',
        },
    ],
    probabilities: [2, 8],
};

export const traitImageHats: NFTGenerativeTraitImage = {
    name: 'Hats',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Cap',
            image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/hats-cap.png',
        },
        {
            value: 'Beanie',
            image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/hats-beanie.png',
        },
        {
            value: 'Beret',
            image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/hats-beret.png',
        },
        {
            value: 'Cowboy',
            image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/hats-cowboy.png',
        },
    ],
    probabilities: [40, 30, 20, 10],
};
