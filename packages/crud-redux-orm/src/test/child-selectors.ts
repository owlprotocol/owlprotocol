import { ChildId, Child, ChildName, ChildWithObjects, toPrimaryKeyChild } from "@owlprotocol/crud-models/test";
import { toReduxOrmId } from "@owlprotocol/utils";
import { TestORM } from "./orm.js";
import { createCRUDSelectors } from "../createCRUDSelectors.js";

export const ChildSelectors = createCRUDSelectors<typeof ChildName, ChildId, Child, ChildWithObjects>(
    ChildName,
    {
        toPrimaryKeyString: (id: ChildId | string) =>
            typeof id === "string" ? id : toReduxOrmId(toPrimaryKeyChild(id)),
    },
    TestORM,
);
