import React, { useEffect, useState } from "react";
import "./header.css";

import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export const Header = () => {
  const { logOut, user } = useUserAuth();
  const [isactive, setIsactive] = useState(false);

  const [userName, setUserName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    });
  }, []);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggle = () => {
    setIsactive(!isactive);
  };

  return (
    <div className="header-container">
      <div className="header-names">
        <img className="logo-img" src={require("./logo.jpeg")} alt="logo" />
      </div>
      <div>
        {" "}
        <img className="help-logo" src={require("./help.jpg")} alt="logo" />
        <p className="help-name" style={{textAlign: "center"}}>Help</p>
      </div>
      <div>
      <img className="certificate-logo" src={require("./certificate.png")} alt="logo" />
      <p className="certificate-name">Certificate</p>

      </div>

      {/* <div className="header-names">
        {user && user.email} 
         <button onClick={handleLogout} className='header-button'>Logout</button>
      </div> */}
      <div>
        <div className={`navigation ${isactive ? "active" : null}`}>
          <div className="userbox">
            <div className="imgbox">
              <img src={require("./user.png")} alt="user" />
            </div>
            <p className="username">{userName}</p>
          </div>
          <div className="menutoggle" onClick={toggle}>
            <ul className="menu">
              <li>Profile</li>
              <li className="header-certificate">Certificate</li>
              <li className="header-help">Help</li>
              <li>Settings</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
