import { CreateUser } from "../user/create/CreateUser"
import { Header } from "../header/Header"

export const AdminDashboard = ()=>{
    return(
        <>
        <div className="container">
            <Header/>
        <h1>AdminDashboard</h1>
        <CreateUser/>
        </div>
        </>
    )
}