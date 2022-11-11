//@ts-nocheck
//@ts-expect-error
import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import { VRFBeacon, VRFBeacon__factory, VRFCoordinatorV2 } from '../../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { deployedBytecode as mockDeployedBytecode } from '../../../artifacts/contracts/testing/VRFCoordinatorV2.sol/VRFCoordinatorV2on';
import { pick } from '../../../lodash.js';

const coordinatorAddr = '0x6168499c0cFfCaCD319c818142124B7A15E857ab';
const EPOCH_PERIOD = 10;
const subId = 8101;

describe('VRFRandom beacon', () => {
    let VRFBeacon: VRFBeacon;
    let signer1: SignerWithAddress;

    beforeEach(async () => {
        [signer1] = await ethers.getSigners();

        //rinkeby fork
        await network.provider.request({
            method: 'hardhat_reset',
            params: [
                {
                    forking: {
                        jsonRpcUrl: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
                        // blockNumber: 11176870,
                    },
                },
            ],
        });

        const VRFBeaconFactory = (await ethers.getContractFactory('VRFBeacon')) as VRFBeacon__factory;
        VRFBeacon = (await VRFBeaconFactory.deploy(
            subId,
            coordinatorAddr,
            '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc',
            50000, //gas limit
            EPOCH_PERIOD,
        )) as VRFBeacon;

        await expect(
            VRFBeaconFactory.deploy(
                subId,
                coordinatorAddr,
                '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc',
                50000, //gas limit
                1,
            ),
            //@ts-expect-error
        ).to.be.revertedWith('VRFBeacon: invalid number for _epoch period');
    });

    it('full test', async () => {
        await network.provider.send('hardhat_setCode', [coordinatorAddr, mockDeployedBytecode]);

        const coordinator = (await ethers.getContractAt('VRFCoordinatorV2', coordinatorAddr)) as VRFCoordinatorV2;
        await coordinator.connect(signer1).addConsumer(subId, VRFBeacon.address);

        const blockNumber = await ethers.provider.getBlockNumber();
        expect(await VRFBeacon.epochBlock(blockNumber)).equals(getEpochBlockNumber(blockNumber));
        expect(await VRFBeacon.epochBlockLatest()).equals(getEpochBlockNumber(blockNumber));

        const [reqId] = await VRFBeacon.callStatic.requestRandomness();
        await VRFBeacon.requestRandomness();
        expect(await VRFBeacon.getRequestId(blockNumber)).to.equal(reqId);

        const blockNumber2 = await ethers.provider.getBlockNumber();
        const [reqId2] = await VRFBeacon.callStatic.requestRandomness();
        await VRFBeacon.requestRandomness();
        expect(reqId2).to.equal(reqId);
        expect(await VRFBeacon.getRequestId(blockNumber2)).to.equal(reqId2);

        const tx = await coordinator.fulfillRandomWords(reqId, VRFBeacon.address);
        const { events } = await tx.wait();
        const fulfilledEvent = events ? events[0] : undefined;

        if (fulfilledEvent === undefined) return;

        const { requestId, randomNumber } = pick(
            VRFBeacon.interface.decodeEventLog('Fulfilled', fulfilledEvent.data, fulfilledEvent.topics),
            ['requestId', 'randomNumber'],
        );

        expect(requestId).to.equal(reqId);
        expect(await VRFBeacon.getRandomness(blockNumber)).to.equal(randomNumber);

        // console.log(randomNumber);
    });
});

function getEpochBlockNumber(blockNumber: number) {
    return blockNumber - (blockNumber % EPOCH_PERIOD) + EPOCH_PERIOD;
}
