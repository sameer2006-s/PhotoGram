import * as React from 'react'
import { useUserAuth } from '../../context/userAuthContext';

interface IHomeProps  {

}

const Home : React.FunctionComponent <IHomeProps> = (props)=>{
    const {logOut}= useUserAuth()

    return <div>
        <button onClick={()=>
            logOut()
        }></button>
    </div>;
}

export default Home