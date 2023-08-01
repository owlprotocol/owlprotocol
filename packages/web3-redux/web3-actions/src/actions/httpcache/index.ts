import { createAction2 } from "@owlprotocol/crud-actions";
import { HTTPCacheName } from "@owlprotocol/web3-models";

export interface HttpGetInput {
    url: string;
}
/** @internal */
export const HTTP_GET = `${HTTPCacheName}/HTTP_GET`;
/** @category Action */
export const httpGet = createAction2(HTTP_GET, (payload: HttpGetInput) => {
    return payload;
});
/** @internal */
export type HttpGetAction = ReturnType<typeof httpGet>;
/** @internal */
export const isHttpGetAction = httpGet.match;
