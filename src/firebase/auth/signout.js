// components/SignOutButton.js
import { useEffect } from 'react';
import firebase_app from "../config";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebase_app);

const SignOutButton = () => {
    const handleSignOut = async () => {
        try {
            await auth.signOut();
            console.log('User signed out successfully.');
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOutButton;