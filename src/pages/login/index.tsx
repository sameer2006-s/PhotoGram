import * as React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../Components/ui/card';
import { Button } from '../../Components/ui/button';
import { Icons } from '../../Components/ui/icons';
import { Label } from '@radix-ui/react-label';
import { Input } from '../../Components/ui/input';
import { UserSignIn } from '../../types';
import { useUserAuth } from '../../context/userAuthContext';
import { GoogleAuthProvider } from 'firebase/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';

interface ILoginProps  {

}

const Login : React.FunctionComponent <ILoginProps> = (props)=>{

    const {logIn,googleSignIn}= useUserAuth()

    const initialValue:UserSignIn ={
        email:"",
        password:"",
        confirmPassword:""
    }

    const [userInfo,setUserInfo]=React.useState<UserSignIn>(initialValue)

    const navigate = useNavigate();


    const handleGoogleSignIn=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        try {
          //const Provider = new GoogleAuthProvider();
          const result = await googleSignIn();
          console.log(result)
          console.log("Google Sign-In Success:", result.user);
          navigate("/Home")
      } catch (error) {
          console.error("Google Sign-In Error:", error);
      }
      } 
      const handleLogIn=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        try {
          const result = await logIn(userInfo.email,userInfo.password);
          console.log(result)
          console.log("Log In Success:", result.user);
          navigate("/Home")
      } catch (error) {
          console.error("Log In Error:", error);
      }
      }



    return <div>
        <div className="min-h-screen  w-full flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

  
<Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle className="text-2xl">Log In</CardTitle>
      <CardDescription>
        Enter your email below to Log In
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="grid grid-cols-2 gap-6">
        <Button variant="outline">
          <Icons.gitHub className="mr-2 h-4 w-4" /> 
          Github
        </Button>
        <Button variant="outline" onClick={handleGoogleSignIn}>
          <Icons.google className="mr-2 h-4 w-4" /> 
          Google
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          value={userInfo.email}
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
            console.log(userInfo);
          }}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
            console.log(userInfo);
          }}
        />
      </div>
      
    </CardContent>
    <CardFooter>
      <Button className="w-full" onClick={handleLogIn}>
        Log In
      </Button>
      
      <div className="mt-4 flex justify-between">
        <Link to="/PhotoGram/src/pages/signup" className="text-sm text-blue-500">
          Don’t have an account? Sign up
        </Link>
      </div>
    </CardFooter>
  </Card>
</div>
    </div>;
}

export default Login