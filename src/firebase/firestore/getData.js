import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getDocuments(collectionName) {
    let collRef = collection(db, collectionName)

    let result = null;
    let error = null;

    try {
        result = await getDocs(collRef);
        // console.log(result);
    } catch (e) {
        error = e;
    }


    return { result, error };
}