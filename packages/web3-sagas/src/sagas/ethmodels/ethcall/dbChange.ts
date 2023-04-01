import { interfaces } from "@owlprotocol/contracts";
import { utils } from "ethers";
import { call, put } from "typed-redux-saga";
import { httpGet } from "@owlprotocol/web3-actions";
import { catAction } from "@owlprotocol/web3-actions";
import { EthCallCRUDActions } from "@owlprotocol/web3-actions";
import { EthCall } from "@owlprotocol/web3-models";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof EthCallCRUDActions.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { obj } = payload;
    const { returnValue } = obj;
    if (returnValue) {
        yield* call(handleEthCallReturnValueUpdate, obj as Omit<EthCall, "returnValue"> & { returnValue: any });
    }
}

export function* dbUpdatingSaga(action: ReturnType<typeof EthCallCRUDActions.actions.dbUpdating>): Generator<any, any> {
    const { payload } = action;
    const { obj, mods } = payload;
    if (mods.returnValue) {
        yield* call(handleEthCallReturnValueUpdate, { ...obj, ...mods } as Omit<EthCall, "returnValue"> & {
            returnValue: any;
        });
    }
}

//Handle contract creation
export function* dbDeletingSaga(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    action: ReturnType<typeof EthCallCRUDActions.actions.dbDeleting>,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
): Generator<any, any> {}

export function* handleEthCallReturnValueUpdate(
    ethcall: Omit<EthCall, "returnValues"> & { returnValue: any },
): Generator<any, any> {
    const { args, methodFormatFull, returnValue } = ethcall;

    if (
        methodFormatFull ===
        interfaces.IContractURI.interface
            .getFunction("contractURI")
            .format(utils.FormatTypes.full)
            .replace("function ", "")
    ) {
        const uri = returnValue[0] as string;
        if (uri.startsWith("ipfs://")) {
            yield put(httpGet({ url: uri }));
        } else if (uri.startsWith("http://") || uri.startsWith("https://")) {
            yield put(catAction({ path: uri }));
        }
    } else if (
        methodFormatFull ===
        interfaces.IERC721Metadata.interface
            .getFunction("tokenURI")
            .format(utils.FormatTypes.full)
            .replace("function ", "")
    ) {
        const uri = returnValue[0] as string;
        if (uri.startsWith("ipfs://")) {
            yield put(httpGet({ url: uri }));
        } else if (uri.startsWith("http://") || uri.startsWith("https://")) {
            yield put(catAction({ path: uri }));
        }
    } else if (
        methodFormatFull ===
        interfaces.IERC1155MetadataURI.interface
            .getFunction("uri")
            .format(utils.FormatTypes.full)
            .replace("function ", "")
    ) {
        const uri = returnValue[0] as string;
        if (uri.startsWith("ipfs://")) {
            yield put(httpGet({ url: uri.replace("{id}", args[0]) }));
        } else if (uri.startsWith("http://") || uri.startsWith("https://")) {
            yield put(catAction({ path: uri.replace("{id}", args[0]) }));
        }
    }
}
