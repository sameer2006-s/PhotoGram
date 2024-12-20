import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
//import { useUserAuth } from '../../context/userAuthContext';
import Layout from '../../Components/layout';
import { Input } from '../../Components/ui/input';
import { SearchIcon } from 'lucide-react';
import Stories from '../../stories';
import { useUserAuth } from '../../context/userAuthContext';
import { getPosts } from '../../repository/post.service';
import PostCard from '../../Components/postcard';
const Home = () => {
    const { user } = useUserAuth();
    const [data, setData] = React.useState([]);
    const [email, setEmail] = React.useState(null);
    const renderPosts = () => {
        console.log(data[0]);
        return (_jsx("div", { className: "flex flex-col items-center justify-center w-full", children: data.map((post) => (_jsx(PostCard, { data: post }, post.id))) }));
    };
    const handlePostsCall = async () => {
        try {
            console.log("user:", user);
            const querySnapshot = await getPosts();
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
        handlePostsCall();
    }, []);
    return _jsx("div", { children: _jsx(Layout, { children: _jsxs("div", { className: 'flex flex-col', children: [_jsxs("div", { className: 'relative mb-6 w-full text-gray-600', children: [_jsx(Input, { className: 'border-2 border-gray-300 bg-white px-5 pr-16 rounded-sm text-base focus:outline-none', placeholder: 'Search', type: 'search', name: 'search' }), _jsx("button", { type: 'submit', className: 'absolute right-2.5 top-2.5 w-5 h-5', children: _jsx(SearchIcon, { className: ' text-gray-400 size-4 -translate-y-2 -translate-x-2' }) })] }), _jsxs("div", { className: 'mb-5 overflow-y-auto', children: [_jsx("h2", { className: 'mb-5', children: "Stories" }), _jsx(Stories, {})] }), _jsxs("div", { className: 'mb-5 flex justify-center ', children: [_jsx("h2", { className: 'mb-5' }), _jsx("div", { className: 'w-full flex justify-center max-w-sm rounded-sm overflow-hidden', children: data ? renderPosts() : _jsx("div", { children: "Loading..." }) })] })] }) }) });
};
export default Home;
