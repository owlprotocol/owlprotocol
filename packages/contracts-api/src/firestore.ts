// Get the imports
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_PROJECT_ID,
} from "@owlprotocol/envvars";
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    CollectionReference,
    collection,
    DocumentData,
    where,
    query,
    getDocs,
    setDoc,
    doc,
} from "firebase/firestore";

import { User } from "./types/User";

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    appId: FIREBASE_PROJECT_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
};

// Init the firebase app
export const firebaseApp = initializeApp(firebaseConfig);

// Export firestore incase we need to access it directly
export const firestore = getFirestore(firebaseApp);

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(firestore, collectionName) as CollectionReference<T>;
};

// export all your collections
export const usersCol = createCollection<User>("users");

import * as crypto from "crypto";

interface DFNSCreateWallletResponse {
    id: string;
    status: string;
    network: string;
    name: string;
    tags: string[];
    dateCreated: string;
}

export async function getOrCreateUserAccount(
    usersCol: CollectionReference<User>,
    email: string
): Promise<User> {
    const userQuery = query(usersCol, where("email", "==", email));

    const querySnapshot = await getDocs(userQuery);
    let user: User;
    if (querySnapshot.empty) {
        const apiKey = crypto.randomUUID();
        // email's account does not exist yet, create data for it

        // TODO: interact with DFNS
        // const dfnsUrl = "https://api.dfns.io";
        // const dfnsWalletsUrl = dfnsUrl + "/wallets";
        // const dfnsToken = "";
        let dfnsCreateWalletResponse: DFNSCreateWallletResponse;
        try {
            // const createWallet = await fetch(dfnsWalletsUrl, {
            //     method: "POST",
            //     headers: {
            //         Authorization: `Bearer ${dfnsToken}`,
            //         "Content-type": "application/json",
            //     },
            //     body: JSON.stringify({ network: "Ethereum" }),
            // });
            // createWalletResponse = (await createWallet.json()) as DFNSCreateWallletResponse;
            dfnsCreateWalletResponse = {
                id: "wa-1f04s-lqc9q-xxxxxxxxxxxxxxxx",
                status: "Creating",
                network: "Ethereum",
                name: "my-wallet",
                tags: [],
                dateCreated: "2023-04-14T20:41:28.715Z",
            };
        } catch (e) {
            console.error("Error creating DFNS wallet: ", e);
            throw e;
        }

        const dfnsId = dfnsCreateWalletResponse.id;
        const dfnsStatus = dfnsCreateWalletResponse.status;

        let gnosisTxHash: string;
        try {
            // TODO: create gnosis wallet
            gnosisTxHash =
                "0x8149e1b2930e3a591c487f331a128f671052ec7acb8e26c82d4f1bd307fc38d4";
        } catch (e) {
            console.error("Error creating Gnosis wallet: ", e);
            throw e;
        }

        user = { email, apiKey, dfnsId, dfnsStatus, gnosisTxHash };

        try {
            await setDoc(doc(usersCol), user);
        } catch (e) {
            console.error("Error setting user in firestore: ", e);
        }
    } else {
        user = querySnapshot.docs[0].data();
        const userId = querySnapshot.docs[0].id;

        let userChanged = false;

        if (!user.dfnsAddress) {
            // TODO: get wallet address from DFNS
            let dfnsAddress: string;
            try {
                console.debug(`Updating DFNS wallet address for ${email}`);
                dfnsAddress = "";
            } catch (e) {
                console.error("Error getting DFNS wallet address: ", e);
                throw e;
            }
            userChanged = true;
            user.dfnsAddress = dfnsAddress;
        }

        if (!user.gnosisAddress) {
            // TODO: get wallet address from Gnosis
            let gnosisAddress: string;
            try {
                console.debug(`Updating Gnosis wallet address for ${email}`);
                gnosisAddress = "";
            } catch (e) {
                console.error("Error getting Gnosis wallet address: ", e);
                throw e;
            }
            userChanged = true;
            user.gnosisAddress = gnosisAddress;
        }

        if (userChanged) {
            try {
                // TODO: reuse document id
                await setDoc(doc(usersCol, userId), user);
            } catch (e) {
                console.error("Error updating user in firestore: ", e);
            }
        }
    }
    return user;
}

export async function getUserByApiKey(
    usersCol: CollectionReference<User>,
    apiKey: string
): Promise<User | undefined> {
    const userQuery = query(usersCol, where("apiKey", "==", apiKey));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
        return undefined;
    }

    return querySnapshot.docs[0].data();
}
