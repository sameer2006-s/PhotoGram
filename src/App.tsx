import * as React from 'react'
import { RouterProvider } from "react-router-dom"
import router from './routes'
import ErrorBoundary from './ErrorBoundary';
import { UserAuthProvider } from './context/userAuthContext';

interface IAppProps  {

}

const App : React.FunctionComponent <IAppProps> = (props)=>{
    return <ErrorBoundary><UserAuthProvider> <RouterProvider router={router}/></UserAuthProvider></ErrorBoundary>;
}

export default App
// import React from "react";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "./firebaseConfig";

// const App = () => {
//     const googleSignIn = async () => {
//         try {
//             const provider = new GoogleAuthProvider();
//             const result = await signInWithPopup(auth, provider);
//             console.log("Google Sign-In Success:", result.user);
//         } catch (error) {
//             console.error("Google Sign-In Error:", error);
//         }
//     };

//     return (
//         <div>
//             <button onClick={googleSignIn}>Sign in with Google</button>
//         </div>
//     );
// };

// export default App;
