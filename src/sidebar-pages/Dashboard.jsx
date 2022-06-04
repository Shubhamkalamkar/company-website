import React from 'react'
import { Sidebar } from '../components/Sidebar'
import "./sidebar-css/dashboard.css";
import { Header } from '../components/Header';

export const Dashboard = () => {
  return (
    <>
    <div><Header/></div>
    <div className='dashboard-container'>
    <div><Sidebar/></div>
    <div className='side-boxes'>
      <div className="top-box">
        <img className='top-box-img' src={require("./top-box.jpeg")} alt="top-box" />

      </div>
      <div className="top-box">
        <img className='top-box-img' src={require("./top-box.jpeg")} alt="top-box" />

      </div>
      <div className="top-box">
        <img className='top-box-img' src={require("./top-box.jpeg")} alt="top-box" />

      </div>
      <div className="top-box">
        <img className='top-box-img' src={require("./top-box.jpeg")} alt="top-box" />

      </div>
      <div className="top-box">
        <img className='top-box-img' src={require("./top-box.jpeg")} alt="top-box" />

      </div>
      <div className="top-box">
        <img className='top-box-img' src={require("./top-box.jpeg")} alt="top-box" />

      </div>
      <div className="top-box">
        <img className='top-box-img' src={require("./top-box.jpeg")} alt="top-box" />

      </div>
      <div className="top-box">
        <img className='top-box-img' src={require("./top-box.jpeg")} alt="top-box" />

      </div>
    </div>  
    </div>
    </>
  )
}
