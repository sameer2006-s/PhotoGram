import * as React from 'react'
import { DocRes } from '../../types';
import { useUserAuth } from '../../context/userAuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';


interface IPostCardProps {
 data:DocRes;
}

const PostCard:React.FunctionComponent<IPostCardProps> = ({data})=>{
    const {user} = useUserAuth()
     

 return <Card className="mb-6 w-full max-w-md">
          <CardHeader className='flex flex-col p-3 '>
            <CardTitle className="text-sm text-center flex justify-start items-center">
                <span className='mr-2'>
                <img src='https://pbs.twimg.com/media/GRgh9_waAAABgj8.jpg' className='w-10 h-10 rounded-full border-2 border-slate-800 object-cover'/>
                </span>
                <span>Guest User</span></CardTitle>
            
          </CardHeader>
          <CardContent className="grid gap-4">
            <img src={data.photos?data.photos[0].cdnURL:''}/>
          </CardContent>
          <CardFooter>
            <Button className="w-full" >
              Like Post
            </Button>
          </CardFooter>
        </Card>
;}

export default PostCard