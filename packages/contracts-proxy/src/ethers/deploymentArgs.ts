//Generate factories
export enum DeploymentMethod {
    /* Regular deterministic deployment */
    DETERMINISTIC = "DETERMINISTIC",
    /* Minimal proxy deployment, reduces upfront gas cost */
    ERC1167 = "ERC1167",
    /* Beacon proxy deployment, upgradeable, uses Owl Protocol default beacons */
    BEACON_OWL = "BEACON_OWL",
    /* Beacon proxy deployment, upgradeable, uses existing beacon */
    BEACON_EXISTING = "BEACON_EXISTING",
    /* Beacon proxy deployment, upgradeable, deploys new beacon */
    BEACON_NEW = "BEACON_NEW",
}

export interface DeploymentArgsBase {
    /** msgSender parameter for deployment (default: admin) */
    readonly msgSender?: string,
    /** salt parameter string for deployment of different contracts with same init params (default: 1) */
    readonly salt?: string,
}
export interface DeploymentArgsDeterministic {
    readonly deploymentMethod: DeploymentMethod.DETERMINISTIC
}
export function isDeploymentArgsDeterministic(args: { deploymentMethod?: DeploymentMethod }): args is DeploymentArgsDeterministic {
    return args.deploymentMethod === DeploymentMethod.DETERMINISTIC
}
export interface DeploymentArgsERC1167 {
    readonly deploymentMethod: DeploymentMethod.ERC1167
}
export function isDeploymentArgsERC1167(args: { deploymentMethod?: DeploymentMethod }): args is DeploymentArgsERC1167 {
    return args.deploymentMethod === DeploymentMethod.ERC1167
}
export interface DeploymentArgsBeaconOwl {
    readonly deploymentMethod: DeploymentMethod.BEACON_OWL
}
export function isDeploymentArgsBeaconOwl(args: { deploymentMethod?: DeploymentMethod }): args is DeploymentArgsBeaconOwl {
    return args.deploymentMethod === DeploymentMethod.BEACON_OWL
}
export interface DeploymentArgsBeaconExisting {
    readonly deploymentMethod: DeploymentMethod.BEACON_EXISTING
    /** Beacon Address */
    readonly beaconAddress: string
}
export function isDeploymentArgsBeaconExisting(args: { deploymentMethod?: DeploymentMethod }): args is DeploymentArgsBeaconExisting {
    return args.deploymentMethod === DeploymentMethod.BEACON_EXISTING
}
export interface DeploymentArgsBeaconNew {
    readonly deploymentMethod: DeploymentMethod.BEACON_NEW
    /** Beacon Admin */
    readonly beaconAdmin: string
}
export function isDeploymentArgsBeaconNew(args: { deploymentMethod?: DeploymentMethod }): args is DeploymentArgsBeaconNew {
    return args.deploymentMethod === DeploymentMethod.BEACON_NEW
}

export type DeploymentArgs = DeploymentArgsBase & (
    DeploymentArgsDeterministic |
    DeploymentArgsERC1167 |
    DeploymentArgsBeaconOwl |
    DeploymentArgsBeaconExisting |
    DeploymentArgsBeaconNew
)

/**
 * General interface for deployment args, mostly for informational purposes or for more flexible use cases
 * beaconAddress and beaconAdmin are optional here, but in reality required depending on deploymentMethod
 * no enforcement of parameters based on deploymentMethod
 */
export interface DeploymentArgsOptional {
    /** msgSender parameter for deployment (default: admin) */
    readonly msgSender?: string;
    /** salt parameter string for deployment of different contracts with same init params (default: 1) */
    readonly salt?: string;
    /** Deployment Method */
    readonly deploymentMethod: DeploymentMethod.BEACON_NEW
    /** Beacon Address */
    readonly beaconAddress?: string
    /** Beacon Admin */
    readonly beaconAdmin?: string
}
