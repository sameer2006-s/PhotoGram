import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../Components/ui/card';
import { Button } from '../../Components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '../../Components/ui/input';
import { UserSignIn } from '../../types';
import { useUserAuth } from '../../context/userAuthContext';
import { Icons } from '../../Components/ui/icons';
import { Link, useNavigate } from 'react-router-dom';

interface ISignupProps {}

const Signup: React.FunctionComponent<ISignupProps> = () => {
  const { logIn, signUp, googleSignIn } = useUserAuth();

  const initialValue: UserSignIn = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>, userInfo: UserSignIn) => {
    e.preventDefault();
    try {
      await signUp(userInfo.email, userInfo.password);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await googleSignIn();
      console.log(result);
      console.log("Google Sign-In Success:", result.user);
      navigate("/home");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const [userInfo, setUserInfo] = React.useState<UserSignIn>(initialValue);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" onClick={(e) => handleGoogleSignIn(e)}>
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
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
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              onChange={(e) => {
                setUserInfo({ ...userInfo, confirmPassword: e.target.value });
                console.log(userInfo);
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={(e) => handleSubmit(e, userInfo)}>
            Create account
          </Button>
          <div className="mt-4 flex justify-between">
            <Link to="/login" className="text-sm text-blue-500">
              Already have an account? Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
