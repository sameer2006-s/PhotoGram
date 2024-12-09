import * as React from 'react'
import Layout from '../../Components/layout';
import { useUserAuth } from '../../context/userAuthContext';

interface IMyphotosProps  {

}

const Myphotos : React.FunctionComponent <IMyphotosProps> = (props)=>{
    const {user} = useUserAuth()
    return <div><Layout>My Photos</Layout></div>;
}

export default Myphotos