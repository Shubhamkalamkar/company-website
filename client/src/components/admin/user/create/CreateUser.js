import { useState } from "react"
import environment from "../../../../environment"
import Cookies from 'js-cookie'

export const CreateUser = () => {

    const [userType, setUserType] = useState('select')
    const [userFormData, setUserFormData] = useState({ internId: "" })
    const [adminFormData, setAdminFormData] = useState({
        email: "",
        password: "",
        role: "admin"
    });
    console.log(userType)
    const addAdmin = (e) => {
        e.preventDefault()
        console.log(adminFormData)
        fetch(`${environment.baseURL}user/create`, {
            method:"POST",
            headers:{
                'Content-type': 'application/json',
                'token':Cookies.get('token')
            },
            body:JSON.stringify(adminFormData)
        }).then((data)=>{
            return data.json()
        }).then((data)=>{
            console.log(data)
            alert(data.Message)
        })
    }
    const addUser = (e) => {
        e.preventDefault()
        console.log(userFormData)
        fetch(`${environment.baseURL}user/create`, {
            method:"POST",
            headers:{
                'Content-type': 'application/json',
                'token':Cookies.get('token')
            },
            body:JSON.stringify(userFormData)
        }).then((data)=>{
            return data.json()
        }).then((data)=>{
            console.log(data)
            alert(data.Message)
        })
    }

    return (
        <>
            <div className="container">
                <select name="userType" id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                    <option value="select">Select User Type</option>
                    <option value="admin">Admin</option><br />
                    <option value="user">User</option>
                </select>

                {userType == "admin" &&
                    <form>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={adminFormData.email}
                            onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
                        />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={adminFormData.password}
                            onChange={(e) =>
                                setAdminFormData({ ...adminFormData, password: e.target.value })
                            }
                        />
                        <br />
                        <button onClick={addAdmin}>Add Admin</button>
                    </form>
                }
                {userType == "user" &&
                    <form>
                        <label htmlFor="internId">Intern Id</label>
                        <input
                            type="number"
                            id="internId"
                            value={userFormData.internId}
                            onChange={(e) => setUserFormData({ ...userFormData, internId: e.target.value })}
                        />

                        <br />
                        <button onClick={addUser}>Add User</button>
                    </form>
                }
            </div >
        </>
    )
}