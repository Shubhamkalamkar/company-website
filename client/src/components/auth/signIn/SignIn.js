import { useState } from "react"
import { useNavigate } from "react-router"
import environment from "../../../environment"
import Cookies from 'js-cookie'

import { useDispatch } from "react-redux"

export const SignIn = () => {

  // const myState = useSelector((state)=>state.currentUser)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleSignIn = (e) => {
    e.preventDefault()
    
    console.log(formData)
    fetch(`${environment.baseURL}auth/login`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then((data) => {
      console.log(data)
      if (data.ok) {
        // data = data.json()
        // if (data.role == "admin") {
        //     navigate('/admindash')
        // }
        // else {
        //     navigate('/userdash')
        // }
        return data.json()
      }
      else {
        // alert('Invalid Credentials!')
        return data.json()
      }

    }).then((data) => {

      console.log(data)
      Cookies.set('token',data.token)
      dispatch({type:"SET_USER", payload:data.user})
      alert(data.Message)
      if (data.role === "admin") {
        navigate('/admindash')
      }
      else if (data.role === "user") {
        navigate('/userdash')
      }
    }).catch((err) => {
      alert(`Error ${err}`)
    })
  }

  return (
    <>
    <div className="container">
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ email: e.target.value })} />
        <br />
        <label htmlFor="password">password</label>
        <input type="password" id="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <br />
        <button onClick={handleSignIn}>SignIn</button>
      </form>
      <p onClick={() => navigate('/signUp')}>
        i don't have account signUp
      </p>
      </div>
    </>
  )
}