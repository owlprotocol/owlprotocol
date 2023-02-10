import { assert } from 'chai';
// import sinon from 'sinon';
import mockttp, { Mockttp } from 'mockttp';
import { readFileSync } from 'fs';
// import {MockAgent, MockPool, setGlobalDispatcher} from 'undici';
import { NFTGenerativeCollectionClass } from './NFTGenerativeCollectionClass.js';

let testCollectionClass: any;

const ipfsGateway = '';
const ipfsHash = '';

// set up mocking of HTTP requests
/*
const mockAgent = new MockAgent()
const mockPool: MockPool = mockAgent.get('http://localhost:3000');
mockPool.intercept({path: /\/innovot\/.*/ /*}).reply(200, (args) => {
    console.log('undici intercept', args.path);
    return readFileSync('./testdata' + args.path);
});
setGlobalDispatcher(mockAgent);
*/

let mockServer: Mockttp;

before(async () => {
    const testCollectionFilePath = './testdata/innovot/collection.json';
    const testCollectionJSON = JSON.parse(readFileSync(testCollectionFilePath).toString());

    testCollectionClass = NFTGenerativeCollectionClass.fromData(testCollectionJSON);

    mockServer = mockttp.getLocal();
    mockServer.start(3000);

    await mockServer.forGet(/\/innovot\/.*/).thenCallback((req) => {
        const data = readFileSync('./testdata' + req.path);
        return {
            status: 200,
            body: data,
        };
    });
});

describe('NFTGenerativeCollectionClass', () => {
    it('loadImage from URL', async () => {
        const testOption = testCollectionClass.traits.light.options[0];
        const testChildOption = testCollectionClass.children.dress.traits.dress.options[8];

        assert(testOption.image_url !== undefined, 'image_url must be defined');
        assert(testOption.image === undefined, 'image field of raw data should be undefined');

        assert(testChildOption.image_url !== undefined, 'image_url must be defined on child');
        assert(testChildOption.image === undefined, 'image field of raw data should be undefined on child');

        // load expected image to match
        // console.log(testOption.image_url);
        const expectedImgDataRes = await fetch(testOption.image_url);
        const expectedImgData = Buffer.from(await expectedImgDataRes.arrayBuffer()).toString('base64');

        await testCollectionClass.loadImages(ipfsGateway, ipfsHash);

        // console.log('light 1', testCollectionClass.traits.light.options[0].image);

        assert(testCollectionClass.traits.light.options[0].image === expectedImgData, 'loaded image does not match');

        assert(testChildOption.image === undefined, 'image field of raw data should STAY undefined on child');
    });

    it('loadImageWithChildren from URL', async () => {
        const testChildOption = testCollectionClass.children.dress.traits.dress.options[8];

        assert(testChildOption.image_url !== undefined, 'image_url must be defined on child');
        assert(testChildOption.image === undefined, 'image field of raw data should be undefined on child');

        const expectedImgDataRes = await fetch(testChildOption.image_url);
        const expectedImgData = Buffer.from(await expectedImgDataRes.arrayBuffer()).toString('base64');

        await testCollectionClass.loadImagesWithChildren(ipfsGateway, ipfsHash);

        assert(
            testCollectionClass.children.dress.traits.dress.options[8].image !== undefined,
            'loaded image must be defined',
        );
        assert(
            testCollectionClass.children.dress.traits.dress.options[8].image === expectedImgData,
            'loaded image does not match',
        );
    });
});

after(async () => {
    // mockPool.close();
    mockServer.stop();
});
