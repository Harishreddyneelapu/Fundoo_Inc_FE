import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import NotesContainer from './components/NotesContainer/NotesContainer';
import TrashContainer from './components/TrashContainer/TrashContainer';
import ArchiveContainer from './components/ArchiveContainer/ArchiveContainer';
import Dashboard from './components/DashBoard/Dashboard';



function RoutingModule(){
    const AppRoutes = createBrowserRouter([
        {path:"/login", element:<Login/>},
        {path:"/signUp", element:<SignUp/>},

        {path:"/dashboard", element:<Dashboard/>, children:[
            {path:"notes",element:<NotesContainer/>},
            {path:"archive",element:<ArchiveContainer/>},
            {path:"trash",element:<TrashContainer/>}

        ]},
        
    ])
    return <RouterProvider router={AppRoutes}></RouterProvider>
}
export default RoutingModule;