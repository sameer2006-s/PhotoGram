import * as React from 'react';
import { DocRes } from '../../types';
import { useUserAuth } from '../../context/userAuthContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { HeartIcon, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { updateLikesOnPost } from '../../repository/post.service';

interface IPostCardProps {
    data: DocRes;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
    const { user } = useUserAuth();
    const userId: string = user?.uid ?? ''; // Safely handle null or undefined
    const userLikes: string[] = data.userLikes || []; // Ensure default is an empty array
    
    const [likesInfo, setLikesInfo] = React.useState<{
        likes: number;
        isLike: boolean;
    }>({
        likes: data.likes ?? 0, // Ensure default value is handled
        isLike: userLikes.includes(userId), // Check if the user has already liked
    });

    const updateLike = async (isVal: boolean) => {
        const updatedLikes = isVal ? likesInfo.likes + 1 : likesInfo.likes - 1;
        
        setLikesInfo({
            likes: updatedLikes,
            isLike: !likesInfo.isLike, // Toggle like state
        });

        const updatedUserLikes = isVal
            ? [...userLikes, userId]
            : userLikes.filter((id) => id !== userId);

        await updateLikesOnPost(data.id, updatedUserLikes, updatedLikes);
    };

    return (
        <Card className="mb-6">
            <CardHeader className="flex flex-col p-3">
                <CardTitle className="text-sm text-center flex justify-start items-center">
                    <span className="mr-2">
                        <img
                            src="https://pbs.twimg.com/media/GRgh9_waAAABgj8.jpg"
                            className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover"
                            alt="User profile"
                        />
                    </span>
                    <span>Guest User</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <img src={data.photos?.[0].cdnURL || ''} alt="Post image" />
            </CardContent>
            <CardFooter className="flex flex-col p-3">
                <div className="flex justify-between w-full mb-3">
                    <HeartIcon
                        className={cn('mr-3', 'cursor-pointer', likesInfo.isLike ? 'fill-red-500' : '')}
                        onClick={() => updateLike(!likesInfo.isLike)}
                    />
                    <MessageCircle className="mr-3" />
                </div>
                <div className="w-full text-sm block">{likesInfo.likes} Likes</div>
                <div className="w-full text-sm block">
                    <span>Guest User: {data.caption}</span>
                </div>
            </CardFooter>
        </Card>
    );
};

export default PostCard;
