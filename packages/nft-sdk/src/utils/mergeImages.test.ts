import { Canvas, Image } from 'canvas';
import mergeImages from 'merge-images';
import { assert } from 'chai';
import { Buffer } from 'buffer';
import { readFileSync } from 'fs';

describe('mergeImages', () => {
    const path1 = './testdata/merge_images_png/layers/shape0/circle.png';
    const path2 = './testdata/merge_images_png/layers/shape1/square.png';

    const mergedPath = './testdata/merge_images_png/circle_square.png';
    const mergedBuf = readFileSync(mergedPath);

    it('loadFromFile', async () => {
        const image = await mergeImages([path1, path2], { Canvas, Image });
        const imageData = image.toString().replace('data:image/png;base64,', '');

        assert.deepEqual(mergedBuf, Buffer.from(imageData, 'base64'));
    });

    it('loadFromBuffer', async () => {
        const path1Buff = readFileSync(path1);
        const path2Buff = readFileSync(path2);

        const image = await mergeImages([path1Buff, path2Buff], {
            Canvas,
            Image,
        });
        const imageData = image.replace('data:image/png;base64,', '');

        assert.deepEqual(mergedBuf, Buffer.from(imageData, 'base64'));
    });
});
