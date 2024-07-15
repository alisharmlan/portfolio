import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import addNewUser from "../firestore/addNewUser";

const auth = getAuth(firebase_app);


export default async function signUp(email, password) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        console.log(result)
        let newUserData = {
            uuid: result.user.uid,
            name: "null",
            age: "null",
            preferences: {
                skintype: "null",
                skincolor: "null",
                undertone: "null",
                price: "null",
                allergy: "null",
            }
        }
        addNewUser(
            newUserData
        )
    } catch (e) {
        error = e;
    }

    return { result, error };
}