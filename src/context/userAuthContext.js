import { jsx as _jsx } from "react/jsx-runtime";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";
const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};
const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};
const logOut = () => {
    return signOut(auth);
};
const googleSignIn = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleAuthProvider);
};
const userAuthContext = createContext({
    user: null,
    logIn,
    signUp,
    logOut,
    googleSignIn
});
export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                setUser(user);
            }
        });
        return () => { unsubscribe(); };
    });
    const value = {
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn
    };
    return (_jsx(userAuthContext.Provider, { value: value, children: children }));
};
export const useUserAuth = () => {
    return useContext(userAuthContext);
};
