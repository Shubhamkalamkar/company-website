import React, { useState, useEffect } from "react";
import "./header.css";

import { useUserAuth } from "../context/UserAuthContext";

import { useNavigate } from "react-router-dom";


export const Header = () => {
  const { logOut, user } = useUserAuth();
  const [isactive, setIsactive] = useState(false);
  
  const [userName, setUserName] = useState("");


  useEffect(()=>{
    setUserName(user.displayName);
  }, [isactive]);

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
    <>
    
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Help</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Enter Your Message:</label>
            <textarea className="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Send message</button>
      </div>
    </div>
</div>
    </div>

    <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Request Certificate</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Enter Your Email:</label>
            <input className="form-control" id="message-text"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Enter Your Intern Id:</label>
            <input className="form-control" id="message-text"></input>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Send message</button>
      </div>
    </div>
</div>
    </div>

    
    <div className="header-container">
      <div className="header-names">
        <img className="logo-img" onClick={()=>{navigate("/dashboard")}} src={require("./logo.jpeg")} alt="logo" />
      </div>
      <div data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
        {" "}
        <img className="help-logo" src={require("./help.jpg")} alt="logo" />
        <p className="help-name" style={{textAlign: "center"}}>Help</p>
      </div>
      <div data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@fat">
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

            <div className="imgbox" >

              <img src={require("./user.png")} alt="user" />
              {/* <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file"
            required
            onChange={(e) => setProfilePhoto(e.target.files[0])}
          /> */}
          {/* <label htmlFor="file" className="add_avatar">
            <img src={require("./user.png")} alt="" />
            <span style={{ color: "white" }}>Add an avatar</span>
          </label> */}

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
    </>
  );
};
