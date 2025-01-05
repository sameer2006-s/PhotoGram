import * as React from 'react';
import Layout from '../../Components/layout';
import { Label } from '../../Components/ui/label';
import { Textarea } from '../../Components/ui/textarea';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileRes, UserProfile } from '../../types';
import { updateProfile } from 'firebase/auth';
import { useUserAuth } from '../../context/userAuthContext';
import { userInfo } from 'os';
import { getUserInfo, updateUserInfo } from '../../repository/post.service';

interface IEditProfileProps  {} 

const EditProfile : React.FunctionComponent <IEditProfileProps> = (props)=>{
    const location = useLocation();
    const {user} = useUserAuth();
    const [userInfo, setUserInfo] = React.useState<ProfileRes>({});
    
    // const userInfoAcc = {
    //     userId:userInfo.userInfo.userId,
    //     displayName:userInfo.userInfo.displayName,
    //     photoURL:userInfo.userInfo.photoURL,
    //     userBio:userInfo.userInfo.userBio,
    // }

    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [imageMeta, setImageMeta] = React.useState<any | null>(null);
    const navigate = useNavigate();
   // const [userInfoAcc,setUserInfoAcc]=React.useState<ProfileRes>({});

    

    const handleFileUpload = (file: any) => {
        console.log('File data:', file.allentries);
      
        const firstFile = file.allEntries?.[0];
        if (firstFile && firstFile.cdnUrl) {
          setImageUrl(firstFile.cdnUrl);
          setImageMeta({ cdnURL: firstFile.cdnUrl, uuid: firstFile.uuid });
          setUserInfo({...userInfo,photoURL:firstFile.cdnUrl})
        //  setUserInfoAcc({...userInfoAcc,photoURL:firstFile.cdnUrl})
         // setData({...data,photoURL:firstFile.cdnUrl})
        } else {
          console.error('No valid cdnUrl found in file data.');
        }
      };

      const handleSubmit = async(e: React.FormEvent) => {
      // console.log('userInfoAcc:', userInfoAcc);
       console.log('userInfo:', userInfo);
        event.preventDefault();
       // console.log(data)
       const result = await updateUserInfo(userInfo.userId as string,userInfo)
    
        
       // setData({...data,displayName:data.displayName,photoURL:userInfo.photoURL,userBio:userInfo.userBio})
       // console.log('Profile Updated:', data);
        navigate("/profile")
      }

       const fetchUserInfo = async()=>{
                  const userData= await getUserInfo(user?.uid as string)
                 //console.log("userInfo from db:",userInfo)
                 //console.log(userInfo.photoURL)
                  setUserInfo (userData.data())
                 console.log("userInfo from db",userInfo)
              }

      React.useEffect(() => {
        if(userInfo==null){
            console.log("userInfo is null")    
           }else{
            console.log("userInfo is not null")
            console.log("userInfo:",userInfo)
       
           }
      },[])

        React.useEffect(()=>{
            fetchUserInfo()
        },[])


    return <div>
    <Layout>
        <div className='flex justify-center'>

            <div className='border max-w-3xl w-full'>
                <h3 className='bg-slate-800 text-white text-center text-lg p-2'>Edit Profile</h3>
                <div className='p-8'>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <div className='flex flex-col'>
                            <Label className='mb-4' htmlFor=''>Profile Picture</Label>
                            <div><img className="max-w-70 max-h-64"src={userInfo.photoURL?userInfo.photoURL:""}></img></div>
                            <FileUploaderRegular
                                    classNameUploader="uc-light"
                                    pubkey="8d1814c97e59c361751a"
                                    className="w-48 h-15"
                                 onChange={handleFileUpload}/>

                                 {userInfo.photoURL&& (
                                <div className="mt-4">
                                    <p className="mb-2">Uploaded Image:</p>
                                    <img
                                    src={userInfo.photoURL}
                                    alt="Uploaded"
                                    className="max-w-70 max-h-64 object-cover border"
                                    />
                                </div>
                                )}
                                  <Label className='m-3'>User Name</Label>
                                <Textarea
                                value={userInfo.displayName}
                                onChange={(e)=>setUserInfo({...userInfo,displayName:e.target.value})}
                                placeholder='Enter Your User Name'
                                id='displayName'
                                className='mr-3'></Textarea>
                                <Label className='m-3'>Enter Bio</Label>
                            <Textarea
                                value={userInfo.userBio}
                                onChange={(e)=>setUserInfo({...userInfo,userBio:e.target.value})}
                                placeholder='Enter Your Bio'
                                id='userBio'
                                className='mr-3'></Textarea>
                            
                                <div className='flex space-x-4 justify-between '>
                            <button type='submit' className='mt-2 w-32'>Submit</button>
                            <button onClick={()=>{navigate("/profile")}} className='mt-2 w-32 bg-red-600 text-white'>Cancel</button>

                         

                            </div>
                        </div>
                   
                    </form>
                </div>
            </div>
           
        </div>
    </Layout>
</div>;
}

export default EditProfile;