import * as React from 'react'
//import { useUserAuth } from '../../context/userAuthContext';
import Layout from '../../Components/layout';

interface IHomeProps  {

}

const Home : React.FunctionComponent <IHomeProps> = ()=>{
   // const {logOut}= useUserAuth()

    return <div>
        <Layout>
            Home
        </Layout>
    </div>;
}

export default Home