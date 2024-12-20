import { User } from "firebase/auth";
type AuthContextData = {
    user: User | null;
    logIn: typeof logIn;
    signUp: typeof signUp;
    logOut: typeof logOut;
    googleSignIn: typeof googleSignIn;
};
declare const logIn: (email: string, password: string) => Promise<import("@firebase/auth").UserCredential>;
declare const signUp: (email: string, password: string) => Promise<import("@firebase/auth").UserCredential>;
declare const logOut: () => Promise<void>;
declare const googleSignIn: () => Promise<import("@firebase/auth").UserCredential>;
interface IUserAuthProviderProps {
    children: React.ReactNode;
}
export declare const UserAuthProvider: React.FunctionComponent<IUserAuthProviderProps>;
export declare const useUserAuth: () => AuthContextData;
export {};
