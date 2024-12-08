import * as React from 'react'
import Layout from '../../Components/layout';
import { Label } from '../../Components/ui/label';
import { Textarea } from '../../Components/ui/textarea';


interface IPostProps  {

}

const Post : React.FunctionComponent <IPostProps> = (props)=>{
    return <div>
            <Layout>
                <div className='flex justify-center'>
        
                    <div className='border max-w-3xl w-full'>
                        <h3 className='bg-slate-800 text-white text-center text-lg p-2'>Create Post</h3>
                        <div className='p-8'>
                            <form>
                                <div className='flex flex-col'>
                                    <Label className='mb-4' htmlFor='caption'>Photo Caption</Label>
                                    <Textarea className='mb-8' id='caption' placeholder="What's on your mind ?"/>
                                    <Label className='mb-4' htmlFor='photo'>Photo</Label>
                                    <button type='submit' className='mt-8 w-32'>Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
        
        
                </div>
            </Layout>
        </div>;
}

export default Post