import * as React from 'react'
//import { useUserAuth } from '../../context/userAuthContext';
import Layout from '../../Components/layout';
import { Input } from '../../Components/ui/input';
import { HeartIcon, SearchIcon } from 'lucide-react';
import Stories from '../../stories';
import { useUserAuth } from '../../context/userAuthContext';
import { createUserInfo, getPosts, getUserInfo } from '../../repository/post.service';
import { DocRes, Post } from '../../types';
import PostCard from '../../Components/postcard';
import { create } from 'domain';

interface IHomeProps  {

}

const Home : React.FunctionComponent <IHomeProps> = ()=>{
    const {user}= useUserAuth()
    const [data,setData] = React.useState<DocRes[]>([])
    const [userInfo, SetUserInfo] = React.useState<any>({})
    const [email, setEmail] = React.useState<string | null>(null);

    

    const renderPosts = () => {
        //console.log(data[0])
        
        return (
          <div className="flex flex-col items-center justify-center w-full">
               {data.map((post) => (
              <PostCard key={post.id} data={post} />
              
            ))}
          </div>
        );
      };
        
    
    const handlePostsCall = async()=>{
        try {
           // console.log("user:",user)
            const querySnapshot = await getPosts()
            const tempArr:DocRes[] = [];
           // console.log(querySnapshot)
            if(querySnapshot.size>0){
                //console.log("2")

                querySnapshot.forEach((doc)=>{
                    const data = doc.data()as Post
                    const resObj:DocRes = {
                        id:doc.id,
                        ...data
                    }
                   // console.log("3")

                   // console.log("resObj:",resObj)
                    tempArr.push(resObj)

                    
                })
            }

            setData(tempArr)
            //console.log("tempArr",tempArr)

        } catch (error) {
            console.log(error)
        }
    }

    const fetchUserInfo = async()=>{
        const userData= await getUserInfo(user?.uid as string)
        const userInfo= userData.data()

        if(userInfo==null){
            console.log("user info was null")
            createUserInfo(user?.uid as string,{
                userEmail: user.email || "",
                userId: user.uid,
                displayName: user.displayName || "Guest",
                photoURL: user.photoURL || "",
                userBio: "Please add your Bio",})
                const userData= await getUserInfo(user?.uid as string)
                SetUserInfo (userData.data())
                console.log("user info created",userInfo)
        

        }else{
            console.log("user already exists")

        }

       //console.log("userInfo from db:",userInfo)
       //console.log(userInfo.photoURL)
    }

    React.useEffect(()=>{
        handlePostsCall()
        fetchUserInfo()
    },[])

    React.useEffect(()=>{
        console.log("userData from db",userInfo)
    },[userInfo])

    return <div>
        <Layout>
            <div className='flex flex-col'>
                <div className='relative mb-6 w-full text-gray-600'>
                    <Input className='border-2 border-gray-300 bg-white px-5 pr-16 rounded-sm text-base focus:outline-none' placeholder='Search' type='search' name='search'/>
                    <button type='submit' className='absolute right-2.5 top-2.5 w-5 h-5'>
                        <SearchIcon className=' text-gray-400 size-4 -translate-y-2 -translate-x-2'/>
                    </button>
                </div>
                <div className='mb-5 overflow-y-auto'>
                    <h2 className='mb-5'>Stories</h2>
                    <Stories/>
                </div>
                <div className='mb-5 flex justify-center '>
                    <h2 className='mb-5'></h2>
                    <div className='w-full flex justify-center max-w-sm rounded-sm overflow-hidden'>
                        {data ? renderPosts() : <div>Loading...</div>}
                    </div>
                </div>
            </div>
        </Layout>
    </div>;
}

export default Home