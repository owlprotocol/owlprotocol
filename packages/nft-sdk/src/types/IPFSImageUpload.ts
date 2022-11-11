export interface IPFSImageUpload {
    /** Upload an image for single upload only */
    readonly image?: Uint8Array;
    /** Wrap the file within a diectory */
    readonly wrapWithDirectory?: boolean;
    /** only necessary if wrapWithDirectory is true */
    readonly path?: string;
    /**  */
}
