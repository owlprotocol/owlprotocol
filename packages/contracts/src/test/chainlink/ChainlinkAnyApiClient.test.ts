import { ethers } from "ethers";

/**
 * Testing out encode/decode for ChainlinkAnyApiClient
 */
function mockConsumer() {
    console.debug("bytes32(1): ", ethers.utils.defaultAbiCoder.encode(["uint256"], [1]));

    const fulfillFragment = ethers.utils.Fragment.from(
        "function fulfill(bytes calldata fulfillPrefixData, bytes calldata fulfillResponseData)",
    );
    const fulfillInterface = new ethers.utils.Interface([fulfillFragment]);
    const fulfillSelector = fulfillInterface.getSighash(fulfillFragment);
    console.debug("fulfillSelector: ", fulfillSelector);

    const prefixData = ethers.utils.defaultAbiCoder.encode(["uint256", "string"], [255, "hello"]);
    const responseData = ethers.utils.defaultAbiCoder.encode(["uint256", "string"], [65535, "world"]);

    console.debug("prefixData: ", prefixData);
    console.debug("responseData: ", responseData);
}

function tokenDnaConsumer() {
    /*
    const jobId = "7da2702f37fd48e5b1b9a5715e3509b6";
    const jobIdBytes32 = ethers.utils.defaultAbiCoder.encode(["bytes32"], [jobId]);
    console.debug("jobId: ", jobIdBytes32);
    */

    const setDnaFragment = ethers.utils.Fragment.from("function setDna(uint256 tokenId, bytes memory dna)");
    const setDnaInterface = new ethers.utils.Interface([setDnaFragment]);
    const setDnaSelector = setDnaInterface.getSighash(setDnaFragment);
    console.debug("setDnaSelector: ", setDnaSelector);

    const prefixData = ethers.utils.defaultAbiCoder.encode(["bytes4", "uint256"], [setDnaSelector, 1]);
    console.debug("prefixData: ", prefixData);
}

function reqResponseData() {
    const data =
        "0x68747470733a2f2f697066732e696f2f697066732f516d5358416257356b716e3259777435444c336857354d736a654b4a4839724c654c6b51733362527579547871313f66696c656e616d653d73756e2d636861696e6c696e6b2e676966";
    const args = ethers.utils.defaultAbiCoder.decode(["bytes"], data);
    console.debug(args);
}

function main() {
    tokenDnaConsumer();
}

main();
