import React from 'react';
import './header.css'

import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from 'react-router-dom';


export const Header = () => {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          await logOut();
          navigate("/");
        } catch (error) {
          console.log(error.message);
        }
      };

  return (
    <div className='header-container'>
        <div className='header-names'>
           DigitalGuru
        </div>
    
        <div className='header-names'>
        {user && user.email}
        <button onClick={handleLogout} className='header-button'>Logout</button>
      </div>

    </div>
    
  )
}
