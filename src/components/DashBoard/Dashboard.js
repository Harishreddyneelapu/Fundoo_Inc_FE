import { Outlet } from "react-router-dom";
import Header from "../header/Header"


function Dashboard(){
    return(<><Header></Header><Outlet/></>);
}

export default Dashboard;