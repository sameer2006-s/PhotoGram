import * as React from 'react'
import Layout from '../../Components/layout';
import { Label } from '../../Components/ui/label';
import { Textarea } from '../../Components/ui/textarea';
import { FileUploaderInline, FileUploaderMinimal, FileUploaderRegular, OutputFileEntry } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { useUserAuth } from '../../context/userAuthContext';
import { FileEntry, Post } from '../../types';



interface ICreatePostProps  {

}

const CreatePost : React.FunctionComponent <ICreatePostProps> = (props)=>{
    
    const {user} = useUserAuth()
   // const [fileEntry,setFileEntry]=React.useState<OutputFileEntry>({files:[]})
    const [post,setPost]=React.useState<Post>({caption:'',photos:[],likes:0,userLikes:[],userId:null,date:new Date()})
    // const handlePost = (e: React.MouseEvent<HTMLFormElement>) => {
    //     const updatedPost: Post = {
    //         ...post,
    //         photos: fileEntry.files.map((file) => file.cdnUrl || ""),
    //       };
      
    //       console.log("Post created:", updatedPost);
    //       // Save post to the backend (add your API logic here)
    //       setPost(updatedPost);
    //       alert("Post created successfully!");
    // }

    return <div>
            <Layout>
                <div className='flex justify-center'>
        
                    <div className='border max-w-3xl w-full'>
                        <h3 className='bg-slate-800 text-white text-center text-lg p-2'>Create Post</h3>
                        <div className='p-8'>
                            <form>
                                <div className='flex flex-col'>
                                    <Label className='mb-4' htmlFor='caption'>Photo Caption</Label>
                                    <Textarea className='mb-8' id='caption' placeholder="What's on your mind ?" value={post.caption}/>
                                    <Label className='mb-4' htmlFor='photo'>Photo</Label>

                                    <FileUploaderRegular
                                           
                                            classNameUploader="uc-light"
                                            pubkey="8d1814c97e59c361751a"
                                            className="w-48 h-15"
                                        />

                                    <button type='submit' className='mt-2 w-32'>Post</button>

                                </div>
                            </form>
                        </div>
                    </div>
        
        
                </div>
            </Layout>
        </div>;
}

export default CreatePost