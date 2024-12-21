import * as React from 'react';
import { DocRes } from '../../types';
import { useUserAuth } from '../../context/userAuthContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { HeartIcon, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getUserInfo, updateLikesOnPost } from '../../repository/post.service';

interface IPostCardProps {
    data: DocRes;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
    const { user } = useUserAuth();
    const userLikes: string[] = data.userLikes ?? [];
    const PostUserId = data.userId;
    const [PostUserInfo, setPostUserInfo] = React.useState<any>({})

    const [likesInfo, setLikesInfo] = React.useState<{
        likes: number;
        isLike: boolean;
    }>({
        likes: data.likes ?? 0, // Ensure default value is handled
        isLike:  userLikes.includes(user.uid as string)? true : false, // Cast userId to string
    });

    


    const updateLike = async (isVal: boolean) => {
    


        console.log(user.uid);

        setLikesInfo({
            likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
            isLike: !likesInfo.isLike,
        });


        if (isVal) {
                userLikes.push(user.uid); 
            
        } else {
                userLikes.splice(userLikes.indexOf(user.uid), 1);
            
        }

        await updateLikesOnPost(data.id, userLikes, isVal ? likesInfo.likes + 1 : likesInfo.likes - 1);
    };
    
    const fetchUserInfo = async () => {
        try {
            const postUserData = await getUserInfo(PostUserId as string);
            if (postUserData.exists()) {
                setPostUserInfo(postUserData.data());
            } else {
                console.warn("User data not found for PostUserId:", PostUserId);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };
    

    React.useEffect(() => {
       // console.log(PostUserId)
        fetchUserInfo()

    }, []);

    React.useEffect(() => {
       // console.log("userInfo from db",PostUserInfo)
    }, [PostUserInfo]);


    return (
        <Card className="mb-6">
            <CardHeader className="flex flex-col p-3">
                <CardTitle className="text-sm text-center flex justify-start items-center">
                    <span className="mr-2">
                        <img
                            src={PostUserInfo?.photoURL || 'https://pbs.twimg.com/media/GRgh9_waAAABgj8.jpg'}
                            className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover"
                        />
                    </span>
                    <span>{PostUserInfo?.displayName||"couldnt fetch"}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <img src={data.photos?.[0].cdnURL || ''} alt="Post image" />
            </CardContent>
            <CardFooter className="flex flex-col p-3">
                <div className="flex justify-between w-full mb-3">
                    <HeartIcon
                        className={cn('mr-3', 'cursor-pointer', likesInfo.isLike ? 'fill-red-500' : '')}
                        onClick={() => {
                           // alert(`You have  this post!`);

                            
                            console.log("a7aaa")
                            updateLike(!likesInfo.isLike)
                        }
                        }
                    />
                    <MessageCircle className="mr-3" />
                </div>
                <div className="w-full text-sm block">{likesInfo.likes} Likes</div>
                <div className="w-full text-sm block">
                    <span>{PostUserInfo.displayName}: {data.caption}</span>
                </div>
               
            </CardFooter>
        </Card>
    );
};

export default PostCard;
