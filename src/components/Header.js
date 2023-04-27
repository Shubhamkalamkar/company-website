import React, { useEffect, useState } from "react";
import "./header.css";

import { useUserAuth } from "../context/UserAuthContext";
import { updateProfile } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { auth, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const Header = () => {
  const { logOut, user } = useUserAuth();
  const [isactive, setIsactive] = useState(false);
  
  const [userName, setUserName] = useState("");

  const [userdata, setUserdata] = useState();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        setUserName(user.displayName);
        setUserdata(user)
      } else {
        setUserName("");
      }
    });
  }, []);

  const storageRef = ref(storage, "profilePhotos");

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

  const uploadImg = ()=>{
    
    uploadBytes(storageRef, profilePhoto).then(()=>{
      getDownloadURL(storageRef).then((url)=>{
        setUrl(url);
        console.log(url)
      }).catch(error =>{
        console.log(error.message)
      });
      setProfilePhoto(null)
    }).catch((e)=>{
      console.log(e.message)
    });

    // uploadTask.on(
    //   (error) => {
    //     // Handle unsuccessful uploads
    //     console.log("error while uploading img")
        
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
    //       console.log("File available at", downloadURL);
    //       await updateProfile(userdata,{
    //         photoURL:downloadURL
    //       });
           
    //     });
    //   }
    // )
  }
    

  
  

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

      <button onClick={uploadImg}>upload</button>

      </div>

      {/* <div className="header-names">
        {user && user.email} 
         <button onClick={handleLogout} className='header-button'>Logout</button>
      </div> */}
      <div>
        <div className={`navigation ${isactive ? "active" : null}`}>
          <div className="userbox">

            <div className="imgbox" >

              {/* <img src={require("./user.png")} alt="user" /> */}
              <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file"
            required
            onChange={(e) => setProfilePhoto(e.target.files[0])}
          />
          <label htmlFor="file" className="add_avatar">
            <img src={require("./user.png")} alt="" />
            <span style={{ color: "white" }}>Add an avatar</span>
          </label>

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
