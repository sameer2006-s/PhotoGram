import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import Layout from '../../Components/layout';
import { Label } from '../../Components/ui/label';
import { Textarea } from '../../Components/ui/textarea';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { useUserAuth } from '../../context/userAuthContext';
import { createPost } from '../../repository/post.service';
import { useNavigate } from 'react-router-dom';
const CreatePost = (props) => {
    const navigate = useNavigate();
    const { user } = useUserAuth();
    const [imageUrl, setImageUrl] = React.useState(null);
    const [imageMeta, setImageMeta] = React.useState(null);
    const [post, setPost] = React.useState({ caption: '', photos: [], likes: 0, userLikes: [], userId: null, date: new Date() });
    const handleFileUpload = (file) => {
        console.log('File data:', file.allentries);
        const firstFile = file.allEntries?.[0];
        if (firstFile && firstFile.cdnUrl) {
            setImageUrl(firstFile.cdnUrl);
            setImageMeta({ cdnURL: firstFile.cdnUrl, uuid: firstFile.uuid });
        }
        else {
            console.error('No valid cdnUrl found in file data.');
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!imageUrl || !post.caption) {
            alert('Please add a caption and upload an image.');
            return;
        }
        const newPost = {
            ...post,
            userId: user?.uid || null,
            photos: imageMeta ? [imageMeta] : [],
            date: new Date(),
        };
        if (user != null) {
            await createPost(newPost);
            console.log('Post created:', newPost);
            alert('Post created successfully!');
            setPost({ caption: '', photos: [], likes: 0, userLikes: [], userId: null, date: new Date() });
            setImageUrl(null);
            navigate("/home");
        }
        else {
            navigate("/login");
        }
        // Reset form state
    };
    return _jsx("div", { children: _jsx(Layout, { children: _jsx("div", { className: 'flex justify-center', children: _jsxs("div", { className: 'border max-w-3xl w-full', children: [_jsx("h3", { className: 'bg-slate-800 text-white text-center text-lg p-2', children: "Create Post" }), _jsx("div", { className: 'p-8', children: _jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { className: 'flex flex-col', children: [_jsx(Label, { className: 'mb-4', htmlFor: 'caption', children: "Photo Caption" }), _jsx(Textarea, { className: 'mb-8', id: 'caption', placeholder: "What's on your mind ?", value: post.caption, onChange: e => { setPost({ ...post, caption: e.target.value }); } }), _jsx(Label, { className: 'mb-4', htmlFor: 'photo', children: "Photo" }), _jsx(FileUploaderRegular, { classNameUploader: "uc-light", pubkey: "8d1814c97e59c361751a", className: "w-48 h-15", onChange: handleFileUpload }), imageUrl && (_jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "mb-2", children: "Uploaded Image:" }), _jsx("img", { src: imageUrl, alt: "Uploaded", className: "w-full max-h-64 object-cover border" })] })), _jsx("button", { type: 'submit', className: 'mt-2 w-32', children: "Post" })] }) }) })] }) }) }) });
};
export default CreatePost;
