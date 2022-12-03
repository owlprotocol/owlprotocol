import { RunTimeEnvironment } from '../../utils';
import { getFactories } from '../../../ethers/factories';

const deploy = async ({ provider, signers }: RunTimeEnvironment) => {
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const token0 = '0xd8B46A266347806b065211ca198939415607018D';
    const input0 = '0x1fc49c34F4617C2D87fFc9d37B8Df0cEfAFF536D';
    const output0 = '0xCe86e3d997FCF6022091a451054bcEEca6604cDe';

    const token = factories.ERC1155Mintable.attach(token0);
    const input = factories.AssetRouterInput.attach(input0);
    const output = factories.AssetRouterOutput.attach(output0);

    const approved = await token.isApprovedForAll(signerAddress, input0);
    if (!approved) {
        await token.setApprovalForAll(input0, true, { nonce: nonce++, gasLimit: 10e6 });
    }
    const outputableAmount = (await output.getBasket(0)).outputableAmount;
    if (outputableAmount.lt(1)) {
        await output.deposit(1, 0, [], [], { nonce: nonce++, gasLimit: 10e6 });
    }

    const tx = await input.input(output0, 1, 0, [], [], [], 0, { nonce: nonce++, gasLimit: 10e6 });
    console.debug(tx.hash);

    console.debug(await token.balanceOfBatch([signerAddress, signerAddress], [1, 2]));

    return tx;
};

deploy.tags = ['Craft'];
deploy.dependencies = ['ERC1155MintableBeaconProxy', 'AssetRouterInputBeaconProxy', 'AssetRouterOutputBeaconProxy'];
export default deploy;
