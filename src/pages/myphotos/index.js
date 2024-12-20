import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import Layout from '../../Components/layout';
import { useUserAuth } from '../../context/userAuthContext';
import { getPostByUserId } from '../../repository/post.service';
import { HeartIcon } from 'lucide-react';
const Myphotos = (props) => {
    const { user } = useUserAuth();
    const [data, setData] = React.useState([]);
    console.log(user?.uid);
    const renderPosts = () => {
        return data.map(post => {
            return _jsxs("div", { className: 'relative', children: [_jsx("div", { className: 'absolute group transition-all duration-200 bg-transparent hover:bg-slate-900 hover:opacity-75 top-0 left-0 bottom-0 right-0 w-full h-full', children: _jsxs("div", { className: 'flex flex-col justify-center items-center w-full h-full', children: [_jsx(HeartIcon, { className: 'hidden group-hover:block fill-white' }), _jsxs("div", { className: 'text-white hidden group-hover:block', children: [post.likes, " likes"] }), _jsxs("div", { className: 'text-white hidden group-hover:block', children: ["'", post.caption, "'"] })] }) }), _jsx("img", { src: `${post.photos[0].cdnURL}/-/progressive/yes/-/scale_crop/300x300/center/`, className: 'display-block' })] }, post.photos[0].uuid);
        });
    };
    const getUserPosts = async (id) => {
        try {
            console.log("user:", user);
            const querySnapshot = await getPostByUserId(id);
            const tempArr = [];
            console.log(querySnapshot);
            if (querySnapshot.size > 0) {
                console.log("2");
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const resObj = {
                        id: doc.id,
                        ...data
                    };
                    console.log("3");
                    console.log("resObj:", resObj);
                    tempArr.push(resObj);
                });
            }
            setData(tempArr);
            console.log("tempArr", tempArr);
        }
        catch (error) {
            console.log(error);
        }
    };
    React.useEffect(() => {
        console.log("use effect called");
        if (user != null) {
            getUserPosts(user.uid);
        }
    }, []);
    return _jsx("div", { children: _jsx(Layout, { children: _jsx("div", { className: 'flex justify-center', children: _jsxs("div", { className: 'border max-w-3xl w-full', children: [_jsx("h3", { className: 'bg-slate-800 text-white text-center text-lg p-2', children: "My Photos" }), _jsx("div", { className: 'p-8', children: _jsx("div", { className: 'grid grid-cols-2 md:grid-cols-3 gap-4', children: data ? renderPosts() : _jsx("div", { children: "...loading" }) }) })] }) }) }) });
};
export default Myphotos;
