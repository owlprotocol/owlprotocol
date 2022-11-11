import { utils } from 'ethers';

export const ROYALTY_ROLE = utils.keccak256(utils.toUtf8Bytes('ROYALTY_ROLE'));
export const URI_ROLE = utils.keccak256(utils.toUtf8Bytes('URI_ROLE'));
export const MINTER_ROLE = utils.keccak256(utils.toUtf8Bytes('MINTER_ROLE'));
export const DNA_ROLE = utils.keccak256(utils.toUtf8Bytes('DNA_ROLE'));
export const BASE_URI_ROLE = utils.keccak256(utils.toUtf8Bytes('BASE_URI_ROLE'));
export const CONTRACT_URI_ROLE = utils.keccak256(utils.toUtf8Bytes('CONTRACT_URI_ROLE'));
export const ROUTER_ROLE = utils.keccak256(utils.toUtf8Bytes('ROUTER_ROLE'));
export const ASSET_ROUTER_INPUT = utils.keccak256(utils.toUtf8Bytes('ASSET_ROUTER_ROLE'));
export const EXPIRY_ROLE = utils.keccak256(utils.toUtf8Bytes('EXPIRY_ROLE'));
export const SUPPLIER_ROLE = utils.keccak256(utils.toUtf8Bytes('SUPPLIER_ROLE'));
