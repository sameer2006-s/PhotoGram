import * as React from 'react';
import { DocRes } from '../../types';
import { useUserAuth } from '../../context/userAuthContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { HeartIcon, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getUserLikes, updateLikesOnPost } from '../../repository/post.service';

interface IPostCardProps {
    data: DocRes;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
    const { user } = useUserAuth();
    const userId: string = user?.uid ?? ''; // Safely handle null or undefined
    const [userLikes, setUserLikes] = React.useState<string[]>(data.userLikes || []); // Initial userLikes from data
    
    const [likesInfo, setLikesInfo] = React.useState<{
        likes: number;
        isLike: boolean;
    }>({
        likes: data.likes ?? 0, // Ensure default value is handled
        isLike: userLikes.includes(userId), // Check if the user has already liked
    });

    React.useEffect(() => {
    if (user?.uid) {
        const fetchUserLikes = async () => {
            const likes = await getUserLikes(userId); // Fetch the user's liked posts
            setUserLikes(likes);  // Update the userLikes state
            
            // Check and update likesInfo based on the fetched user likes
            setLikesInfo({
                likes: data.likes ?? 0,
                isLike: likes.includes(userId), // Reset isLike based on current user
            });
        };
        fetchUserLikes(); // Call the fetchUserLikes function
    }
}, [user, userId, data.likes]); // Dependencies

    const updateLike = async (isVal: boolean) => {
        const updatedLikes = isVal ? likesInfo.likes + 1 : likesInfo.likes - 1;
        
        // Filter out the current user from userLikes if not liking
        const updatedUserLikes = isVal
            ? [...new Set([...userLikes, userId])]  // Ensure uniqueness
            : userLikes.filter((id) => id !== userId);  // Remove user if unlike
        
        setLikesInfo({
            likes: updatedLikes,
            isLike: !likesInfo.isLike,  // Toggle like state
        });
    
        setUserLikes(updatedUserLikes);  // Update userLikes state
        
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
