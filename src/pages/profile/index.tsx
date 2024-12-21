import * as React from 'react'
import Layout from '../../Components/layout';
import { useUserAuth } from '../../context/userAuthContext';
import { DocRes, Post, ProfileRes, ProfilInfo } from '../../types';
import { Button } from '../../Components/ui/button';
import { Edit2Icon, HeartIcon } from 'lucide-react';
import { getPostByUserId, getUserInfo } from '../../repository/post.service';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

interface IProfileProps  {

}

const Profile : React.FunctionComponent <IProfileProps> = (props)=>{

    const {user}= useUserAuth();
   // const location = useLocation();

    // const initialUserInfo: ProfileRes = {
    //     userId: userInfofromstate?.userId || user?.uid || "",
    //     photoURL: userInfofromstate?.photoURL || user?.photoURL || "",
    //     displayName: userInfofromstate?.displayName || user?.displayName || "Guest",
    //     userBio: userInfofromstate?.userBio || "Please add your Bio",
    // }

    const [userInfo, setUserInfo] = React.useState<ProfileRes>({});

    const [data,setData]=React.useState<DocRes[]>([]);
    const navigate = useNavigate();
    
    const editProfile =()=>{
        if(user!=null){
            console.log(userInfo)

            navigate("/edit-profile")
        }else{
            console.log("error")
        }
    }
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

    const fetchUserInfo = async()=>{
            const userData= await getUserInfo(user?.uid as string)
           //console.log("userInfo from db:",userInfo)
           //console.log(userInfo.photoURL)
            setUserInfo (userData.data())
           console.log("userInfo from db",userInfo)
        }

    React.useEffect(()=>{
        console.log("use effect called")

        if(user !=null){getUserPosts(user.uid)}

        fetchUserInfo()
    },[])

    

    return <div><Layout>
            <div className='flex justify-center'>
            
                <div className='border max-w-3xl w-full'>
                    <h3 className='bg-slate-800 text-white text-lg text-center p-2'>Profile</h3>
                    <div className='p-8 pb-4 border-b'>
                        <div className='flex flex-row items-center pb-2 mb-2'>
                            <div className='mr-2'>
                                <img src={userInfo.photoURL} alt="profile" className='w-24 h-24 rounded-full mx-auto mt-4 object-cover'/>
                                <h3 className='text-center text-xl'>{userInfo.displayName}</h3>
                                <p className='text-center text-sm'>{user?.email?user?.email:"guest"}</p>
                                <p className='text-center text-sm'>{userInfo.userBio}</p>
                                <div className='flex justify-center'>
                                    <Button className='justify-center flex mt-4' onClick={()=>{editProfile()}}><Edit2Icon className='mr-2 h-4 w-2'/>Edit Profile</Button>
                                </div>
                                <div className='p-8'>
                                    <h2 className='mb-5'>My Posts</h2>
                                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                                        {data?renderPosts():<p>No Posts</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout></div>;
}

export default Profile