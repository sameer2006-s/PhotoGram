import * as React from 'react'
import { DocRes } from '../../types';
import { useUserAuth } from '../../context/userAuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { HeartIcon, MessageCircle, ShareIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { updateLikesOnPost } from '../../repository/post.service';


interface IPostCardProps {
 data:DocRes;
}

const PostCard:React.FunctionComponent<IPostCardProps> = ({data})=>{
    const {user} = useUserAuth()
    const [likesInfo,setLikesInfo] = React.useState<{
        likes:number,
        isLike:boolean
    }>({
        likes:data.likes,
        isLike: data.userLikes.includes(user?.uid)? true :false
    })

    const updateLike = async (isVal:boolean)=>{
        setLikesInfo ({
            likes: isVal ?likesInfo.likes +1:likesInfo.likes -1,
            isLike:!likesInfo.isLike
        })
        if(isVal){
            data.userLikes?.push(user?.uid)
        }else{
            data.userLikes?.splice(data.userLikes.indexOf(user!.uid))

        }
        await updateLikesOnPost(data.id,data.userLikes,isVal?likesInfo.likes +1:likesInfo.likes -1)
    }

    return <Card className="mb-6">
    <CardHeader className='flex flex-col p-3 '>
      <CardTitle className="text-sm text-center flex justify-start items-center">
          <span className='mr-2'>
          <img src='https://pbs.twimg.com/media/GRgh9_waAAABgj8.jpg' className='w-10 h-10 rounded-full border-2 border-slate-800 object-cover'/>
          </span>
          <span>Guest User</span></CardTitle>
      
    </CardHeader>
    <CardContent className="p-0">
      <img src={data.photos?data.photos[0].cdnURL:''}/>
    </CardContent>
    <CardFooter className='flex flex-col p-3'>
      <div className='flex justify-between w-full mb-3'>
          <HeartIcon className={cn("mr-3","cursor-pointer",likesInfo.isLike?"fill-red-500":"")} onClick={()=>updateLike(!likesInfo.isLike)}/>
          <MessageCircle className='mr-3'/>
          </div>
          
          <div className='w-full text-sm block'>{likesInfo.likes} Likes</div>
          <div className='w-full text-sm block'>
              <span>Guest User : {data.caption}</span>
          
      </div>
    </CardFooter>
  </Card>
  
;}

export default PostCard