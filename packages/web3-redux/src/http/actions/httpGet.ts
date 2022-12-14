import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@owlprotocol/crud-redux';
import { name } from '../common.js';

export interface HttpGetInput {
    url: string;
}
/** @internal */
export const HTTP_GET = `${name}/HTTP_GET`;
/** @category Action */
export const httpGet = createAction(HTTP_GET, (payload: HttpGetInput, uuid?: string) => {
    return { payload, meta: { uuid: uuid ?? uuidv4() } };
});
/** @internal */
export type HttpGetAction = ReturnType<typeof httpGet>;
/** @internal */
export const isHttpGetAction = httpGet.match;

export default httpGet;
