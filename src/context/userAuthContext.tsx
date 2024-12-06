import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import { createContext,useState,useEffect, useContext } from "react";
import {auth} from "../firebaseConfig"
import { GoogleAuthProvider } from "firebase/auth/web-extension";


type AuthContextData ={
    user:User|null,
logIn: typeof logIn,
signUp : typeof signUp,
logOut: typeof logOut,
googleSignIn: typeof googleSignIn,
}


const logIn = (email:string,password:string)=>{
    return signInWithEmailAndPassword(auth,email,password)
}
const signUp = (email:string,password:string)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}
const logOut = ()=>{
    return signOut(auth)
}
const googleSignIn = ()=>{
    const googleAuthProvider=new GoogleAuthProvider()
    return signInWithPopup(auth,googleAuthProvider)
}
const userAuthContext= createContext<AuthContextData>({
    user:null,
    logIn,
    signUp,
    logOut,
    googleSignIn
})
interface IUserAuthProviderProps {
  children:React.ReactNode
}

export const UserAuthProvider :React.FunctionComponent<IUserAuthProviderProps>= ({children})=>{
    const [user,setUser] = useState<User|null>(null)
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                console.log(user)
                setUser(user)
            }
        })
        return ()=>{unsubscribe()}
    })
    const value :AuthContextData = {
        user:null,
        logIn,
        signUp,
        logOut,
        googleSignIn
    }
    return(<userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>)
}
export const useUserAuth = ()=>{
    return useContext(userAuthContext)
}