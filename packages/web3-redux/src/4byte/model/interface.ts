import { T_Encoded_Base } from '@owlprotocol/crud-redux';
import { isUndefined, omitBy } from 'lodash-es';

export interface _4ByteSignatureId {
    /** Signature type */
    readonly signatureType: 'Event' | 'Function';
    /** keccak256 hash event signature or 4byte function signature */
    readonly signatureHash: string;
}

export interface _4ByteSignature extends _4ByteSignatureId, T_Encoded_Base {
    /** Pre-image */
    readonly preImage: string;
}

export const _4ByteIndex = '[signatureType+signatureHash]';

/** @internal */
export function validateId({ signatureType, signatureHash }: _4ByteSignatureId) {
    return { signatureType, signatureHash };
}

/** @internal */
export function validate(item: _4ByteSignature): _4ByteSignature {
    return omitBy(item, isUndefined) as _4ByteSignature;
}

export default _4ByteSignature;
