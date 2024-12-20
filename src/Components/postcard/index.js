import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { useUserAuth } from '../../context/userAuthContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { HeartIcon, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { updateLikesOnPost } from '../../repository/post.service';
const PostCard = ({ data }) => {
    const { user } = useUserAuth();
    const userId = user?.uid ?? ''; // Safely handle null or undefined
    const userLikes = data.userLikes ?? [];
    const [likesInfo, setLikesInfo] = React.useState({
        likes: data.likes ?? 0, // Ensure default value is handled
        isLike: Array.isArray(userLikes) ? !userLikes.includes(userId) : false, // Cast userId to string
    });
    const updateLike = async (isVal) => {
        setLikesInfo({
            likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
            isLike: !likesInfo.isLike,
        });
        // Explicitly define userLikes as string array
        const userLikes = data.userLikes ?? [];
        if (isVal) {
            if (!userLikes.includes(userId)) {
                userLikes.push(userId); // Ensure userLikes is an array of strings
            }
        }
        else {
            if (userLikes.includes(userId)) {
                userLikes.splice(userLikes.indexOf(userId), 1);
            }
        }
        await updateLikesOnPost(data.id, userLikes, isVal ? likesInfo.likes + 1 : likesInfo.likes - 1);
    };
    return (_jsxs(Card, { className: "mb-6", children: [_jsx(CardHeader, { className: "flex flex-col p-3", children: _jsxs(CardTitle, { className: "text-sm text-center flex justify-start items-center", children: [_jsx("span", { className: "mr-2", children: _jsx("img", { src: "https://pbs.twimg.com/media/GRgh9_waAAABgj8.jpg", className: "w-10 h-10 rounded-full border-2 border-slate-800 object-cover" }) }), _jsx("span", { children: "Guest User" })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx("img", { src: data.photos?.[0].cdnURL || '', alt: "Post image" }) }), _jsxs(CardFooter, { className: "flex flex-col p-3", children: [_jsxs("div", { className: "flex justify-between w-full mb-3", children: [_jsx(HeartIcon, { className: cn('mr-3', 'cursor-pointer', likesInfo.isLike ? 'fill-red-500' : ''), onClick: () => updateLike(!likesInfo.isLike) }), _jsx(MessageCircle, { className: "mr-3" })] }), _jsxs("div", { className: "w-full text-sm block", children: [likesInfo.likes, " Likes"] }), _jsx("div", { className: "w-full text-sm block", children: _jsxs("span", { children: ["Guest User: ", data.caption] }) })] })] }));
};
export default PostCard;
