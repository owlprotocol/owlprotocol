import { Child, ChildId, ChildName, ChildWithObjects } from "@owlprotocol/crud-models/test";
import { ChildSelectors } from "@owlprotocol/crud-redux-orm/test";
import { createCRUDHooks } from "../createCRUDHooks.js";

export const ChildSelectorHooks = createCRUDHooks<typeof ChildName, ChildId, Child, any, ChildWithObjects>(
    ChildSelectors,
);
