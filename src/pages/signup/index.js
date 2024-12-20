import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../Components/ui/card';
import { Button } from '../../Components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '../../Components/ui/input';
import { useUserAuth } from '../../context/userAuthContext';
import { Icons } from '../../Components/ui/icons';
//import { userInfo } from 'os';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const { logIn, signUp, googleSignIn } = useUserAuth();
    const initialValue = {
        email: "",
        password: "",
        confirmPassword: ""
    };
    const navigate = useNavigate();
    const handleSubmit = async (e, userInfo) => {
        e.preventDefault();
        try {
            // console.log("User info before sign-up:", userInfo);
            await signUp(userInfo.email, userInfo.password);
            // console.log("User created successfully:");
            // console.log("User info after sign-up:", userInfo);
            navigate("/home");
        }
        catch (error) {
            console.log(error);
        }
    };
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            //const provider = new GoogleAuthProvider();
            const result = await googleSignIn();
            console.log(result);
            console.log("Google Sign-In Success:", result.user);
            navigate("/Home");
        }
        catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };
    const [userInfo, setUserInfo] = React.useState(initialValue);
    return (_jsx("div", { className: "min-h-screen  w-full flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-2xl", children: "Create an account" }), _jsx(CardDescription, { children: "Enter your email below to create your account" })] }), _jsxs(CardContent, { className: "grid gap-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsxs(Button, { variant: "outline", children: [_jsx(Icons.gitHub, { className: "mr-2 h-4 w-4" }), "Github"] }), _jsxs(Button, { variant: "outline", onClick: (e) => handleGoogleSignIn(e), children: [_jsx(Icons.google, { className: "mr-2 h-4 w-4" }), "Google"] })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("span", { className: "w-full border-t" }) }), _jsx("div", { className: "relative flex justify-center text-xs uppercase", children: _jsx("span", { className: "bg-background px-2 text-muted-foreground", children: "Or continue with" }) })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "m@example.com", value: userInfo.email, onChange: (e) => {
                                        setUserInfo({ ...userInfo, email: e.target.value });
                                        console.log(userInfo);
                                    } })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", onChange: (e) => {
                                        setUserInfo({ ...userInfo, password: e.target.value });
                                        console.log(userInfo);
                                    } })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password", children: "Confirm Password" }), _jsx(Input, { id: "confirmPassword", type: "password", onChange: (e) => {
                                        setUserInfo({ ...userInfo, confirmPassword: e.target.value });
                                        console.log(userInfo);
                                    } })] })] }), _jsx(CardFooter, { children: _jsx(Button, { className: "w-full", onClick: (e) => handleSubmit(e, userInfo), children: "Create account" }) })] }) }));
};
export default Signup;
