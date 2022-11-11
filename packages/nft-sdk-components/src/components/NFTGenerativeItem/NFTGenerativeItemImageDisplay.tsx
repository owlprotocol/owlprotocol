import { Image } from '@chakra-ui/react';
import { NFTGenerativeItemClass } from '@owlprotocol/nft-sdk';
import { omit } from 'lodash-es';
import { useCallback, useState, useEffect } from 'react';

export interface NFTGenerativeItemImageDisplayProps {
    item: NFTGenerativeItemClass;
    showItemChildren?: boolean;
}

const mimeType = {
    svg: 'image/svg+xml',
    png: 'image/png',
};

export const NFTGenerativeItemImageDisplay = (props: NFTGenerativeItemImageDisplayProps) => {
    const { item, showItemChildren } = props;
    const imageProps = omit(props, 'item', 'showItemChildren');

    const [imageData, setImageData] = useState<string | undefined>(undefined);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getImage = useCallback(async () => {
        const image = await item.getImageWithChildren();
        if (image) {
            const imageEncoded = encodeURIComponent(image.toString());
            console.debug(image.toString());

            const imageType = item.collection.generatedImageType!;
            const imageData = `data:${mimeType[imageType]};utf8,${imageEncoded}`;
            setImageData(imageData);
        }
    }, [item]);

    useEffect(() => {
        getImage();
    }, [getImage]);

    if (!showItemChildren || !item.children) {
        return <Image {...imageProps} src={imageData} alt={item.dna()} />;
    }
    
    return (
        <>
            <Image {...imageProps} src={imageData} alt={item.dna()} objectFit={'contain'} />
            {Object.values(item.children!).map((c, i) => {
                return <NFTGenerativeItemImageDisplay {...imageProps} item={c} />;
            })}
        </>
    );
};
