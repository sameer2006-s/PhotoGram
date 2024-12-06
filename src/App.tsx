import * as React from 'react'
import { RouterProvider } from "react-router-dom"
import router from './routes'
import ErrorBoundary from './ErrorBoundary';

interface IAppProps  {

}

const App : React.FunctionComponent <IAppProps> = (props)=>{
    return <ErrorBoundary> <RouterProvider router={router}/></ErrorBoundary>;
}

export default App