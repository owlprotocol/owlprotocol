import type { ContractFactory, Signer } from "ethers";
import { utils } from "ethers"
import { deployDeterministicFactory } from "../utils/ERC1167Factory/deployDeterministic.js";
import { cloneDeterministicFactory } from "../utils/ERC1167Factory/cloneDeterministic.js";
import { beaconProxyFactory } from "../utils/ERC1167Factory/beaconProxyFactory.js";
import { beaconFactory } from "../utils/ERC1167Factory/beaconFactory.js";
import { DeploymentArgs, isDeploymentArgsBeaconExisting, isDeploymentArgsBeaconNew, isDeploymentArgsBeaconOwl, isDeploymentArgsDeterministic, isDeploymentArgsERC1167 } from "./deploymentArgs.js";

export function getDeployFactories<F extends ContractFactory>(
    contractFactory: F,
    signer?: Signer | undefined,
) {

    const regular = contractFactory;
    const implementation = deployDeterministicFactory({
        contractFactory,
    }, signer)
    const deterministic = (args?: { msgSender?: string, salt?: string }) => {
        if (args?.salt && !utils.isHexString(args.salt)) throw new Error(`salt ${args.salt} not hex string`)
        const salt = args?.salt ? utils.hexZeroPad(args.salt, 32) : undefined;
        const msgSender = args?.msgSender
        return deployDeterministicFactory({
            contractFactory,
            initSignature: "initialize",
            msgSender,
            salt
        }, signer)
    }
    const clone = (args?: { msgSender?: string, salt?: string }) => {
        if (args?.salt && !utils.isHexString(args.salt)) throw new Error(`salt ${args.salt} not hex string`)
        const salt = args?.salt ? utils.hexZeroPad(args.salt, 32) : undefined;
        const msgSender = args?.msgSender
        return cloneDeterministicFactory({
            contractFactory,
            initSignature: "initialize",
            implementationAddress: (implementation as any).getAddress(),
            msgSender,
            salt
        }, signer)
    }
    const beacon = (args?: { msgSender?: string, salt?: string, beaconAdmin?: string, }) => {
        if (args?.salt && !utils.isHexString(args.salt)) throw new Error(`salt ${args.salt} not hex string`)
        const salt = args?.salt ? utils.hexZeroPad(args.salt, 32) : undefined;
        const msgSender = args?.msgSender
        const beaconAdmin = args?.beaconAdmin
        return beaconFactory({
            implementationAddress: (implementation as any).getAddress(),
            beaconAdmin,
            msgSender,
            salt
        }, signer);
    }
    const beaconProxy = (args?: { msgSender?: string, salt?: string, beaconAddress?: string }) => {
        if (args?.salt && !utils.isHexString(args.salt)) throw new Error(`salt ${args.salt} not hex string`)
        const salt = args?.salt ? utils.hexZeroPad(args.salt, 32) : undefined;
        const msgSender = args?.msgSender
        const beaconAddress = args?.beaconAddress ?? beacon().getAddress()
        return beaconProxyFactory({
            contractFactory,
            initSignature: "initialize",
            beaconAddress,
            msgSender,
            salt
        }, signer);
    }

    function getDeployFactory(args: DeploymentArgs) {
        const msgSender = args.msgSender;
        const salt = args.salt;

        if (isDeploymentArgsBeaconOwl(args)) {
            return beaconProxy({ msgSender, salt });
        } else if (isDeploymentArgsDeterministic(args)) {
            return deterministic({ msgSender, salt })
        } else if (isDeploymentArgsERC1167(args)) {
            return clone({ msgSender, salt })
        } else if (isDeploymentArgsBeaconExisting(args)) {
            return beaconProxy({ msgSender, salt, beaconAddress: args.beaconAddress });
        } else if (isDeploymentArgsBeaconNew(args)) {
            const beaconAdmin = args.beaconAdmin;
            const beaconFactory = beacon({ msgSender, salt, beaconAdmin })
            const beaconAddress = beaconFactory.getAddress();
            return beaconProxy({ msgSender, salt, beaconAddress })
        } else {
            throw new Error(`Invalid factory(args: ${args})`)
        }
    }

    //Create new factory with new signer
    const connect = (signer: Signer) => {
        return getDeployFactories(contractFactory, signer)
    }

    return {
        regular,
        implementation,
        deterministic,
        clone,
        beacon,
        beaconProxy,
        connect,
        getDeployFactory,
        signer
    } as const
}
