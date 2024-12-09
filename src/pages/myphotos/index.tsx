import * as React from 'react'
import Layout from '../../Components/layout';
import { useUserAuth } from '../../context/userAuthContext';
import { DocRes, Post } from '../../types';
import { getPostByUserId } from '../../repository/post.service';

interface IMyphotosProps  {

}

const Myphotos : React.FunctionComponent <IMyphotosProps> = (props)=>{
    const {user} = useUserAuth()
    const [data,setData]=React.useState<DocRes[]>([]);
    console.log(user?.uid)
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

    return <div><Layout>My Photos</Layout></div>;
}

export default Myphotos