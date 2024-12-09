import * as React from 'react'
import Layout from '../../Components/layout';
import { Label } from '../../Components/ui/label';
import { Textarea } from '../../Components/ui/textarea';
import { FileUploaderInline, FileUploaderMinimal, FileUploaderRegular, OutputFileEntry } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { useUserAuth } from '../../context/userAuthContext';
import { FileEntry, PhotoMeta, Post } from '../../types';
import { createPost } from '../../repository/post.service';
import { useNavigate } from 'react-router-dom';



interface ICreatePostProps  {

}



const CreatePost : React.FunctionComponent <ICreatePostProps> = (props)=>{
    const navigate = useNavigate();


    const {user} = useUserAuth()
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [imageMeta, setImageMeta] = React.useState<PhotoMeta | null>(null);
    const [post,setPost]=React.useState<Post>({caption:'',photos:[],likes:0,userLikes:[],userId:null,date:new Date()})

    const handleFileUpload = (file: any) => {
        console.log('File data:', file.allentries);
      
        const firstFile = file.allEntries?.[0];
        if (firstFile && firstFile.cdnUrl) {
          setImageUrl(firstFile.cdnUrl);
          setImageMeta({ cdnURL: firstFile.cdnUrl, uuid: firstFile.uuid });
        } else {
          console.error('No valid cdnUrl found in file data.');
        }
      };
      
      const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
    
        if (!imageUrl || !post.caption) {
          alert('Please add a caption and upload an image.');
          return;
        }
    
        const newPost:Post = {
          ...post,
          userId: user?.uid||null,
          photos: imageMeta ? [imageMeta] : [],
          date: new Date(),
        };
        if (user != null){
        await createPost(newPost)
        console.log('Post created:', newPost);
        alert('Post created successfully!');
        setPost({ caption: '', photos: [], likes: 0, userLikes: [], userId: null, date: new Date() });
        setImageUrl(null);
        navigate("/home");
        }else{
            navigate("/login")
        }
        // Reset form state
        
      };

    return <div>
            <Layout>
                <div className='flex justify-center'>
        
                    <div className='border max-w-3xl w-full'>
                        <h3 className='bg-slate-800 text-white text-center text-lg p-2'>Create Post</h3>
                        <div className='p-8'>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col'>
                                    <Label className='mb-4' htmlFor='caption'>Photo Caption</Label>
                                    <Textarea className='mb-8' id='caption' placeholder="What's on your mind ?" value={post.caption} onChange={e=>{setPost({...post,caption:e.target.value})}}/>
                                    <Label className='mb-4' htmlFor='photo'>Photo</Label>

                                    <FileUploaderRegular
                                            classNameUploader="uc-light"
                                            pubkey="8d1814c97e59c361751a"
                                            className="w-48 h-15"
                                         onChange={handleFileUpload}/>

                                         {imageUrl && (
                                        <div className="mt-4">
                                            <p className="mb-2">Uploaded Image:</p>
                                            <img
                                            src={imageUrl}
                                            alt="Uploaded"
                                            className="w-full max-h-64 object-cover border"
                                            />
                                        </div>
                                        )}

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