import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { useUserAuth } from "../context/UserAuthContext";


export const Blogs = () => {

  const { user } = useUserAuth();
console.log(user);
  return (
    <>
    <div>
      <Sidebar/>
    </div>
    <div>
      {/* <h1>{user.email}</h1> */}
    </div>
    </>
  )
}
