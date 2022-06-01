import React from 'react'
import { Sidebar } from '../components/Sidebar'
import "./sidebar-css/dashboard.css";

export const Dashboard = () => {
  return (
    <div className='dashboard-container'>
    <div><Sidebar/></div>
    <div>
      <h1>wellcome dashboard</h1>
    </div>  
    </div>
  )
}
