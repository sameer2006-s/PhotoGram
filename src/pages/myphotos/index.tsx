import * as React from 'react'
import Layout from '../../Components/layout';
import { useUserAuth } from '../../context/userAuthContext';
import { DocRes, Post } from '../../types';
import { getPostByUserId } from '../../repository/post.service';
import { HeartIcon } from 'lucide-react';

interface IMyphotosProps  {

}

const Myphotos : React.FunctionComponent <IMyphotosProps> = (props)=>{
    const {user} = useUserAuth()
    const [data,setData]=React.useState<DocRes[]>([]);
    console.log(user?.uid)
    const renderPosts=()=>{
        return data.map(post=>{return <div key={post.photos[0].uuid} className='relative'>
            <div className='absolute group transition-all duration-200 bg-transparent hover:bg-slate-900 hover:opacity-75 top-0 left-0 bottom-0 right-0 w-full h-full'>
                <div className='flex flex-col justify-center items-center w-full h-full'>
                    <HeartIcon className='hidden group-hover:block fill-white'/>
                    <div className='text-white hidden group-hover:block'>{post.likes} likes</div>
                    <div className='text-white hidden group-hover:block'>'{post.caption}'</div>
                </div>
            </div> 
            <img src={`${post.photos[0].cdnURL}/-/progressive/yes/-/scale_crop/300x300/center/`} className='display-block'></img>
        </div>})
    }
    const getUserPosts =async (id:string)=>{
        try {
            console.log("user:",user)
            const querySnapshot = await getPostByUserId(id)
            const tempArr:DocRes[] = [];
            console.log(querySnapshot)
            if(querySnapshot.size>0){
                console.log("2")

                querySnapshot.forEach((doc)=>{
                    const data = doc.data()as Post
                    const resObj:DocRes = {
                        id:doc.id,
                        ...data
                    }
                    console.log("3")

                    console.log("resObj:",resObj)
                    tempArr.push(resObj)
                })
            }

            setData(tempArr)
            console.log("tempArr",tempArr)

        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(()=>{
        console.log("use effect called")

        if(user !=null){getUserPosts(user.uid)}
    },[])

    return  <div>
                <Layout>
                    <div className='flex justify-center'>
                        <div className='border max-w-3xl w-full'>
                            <h3 className='bg-slate-800 text-white text-center text-lg p-2'>My Photos</h3>
                            <div className='p-8'>
                                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                                    {data? renderPosts() :<div>...loading</div> }
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>;
}

export default Myphotos