import React from 'react';
import "./sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import PieChartIcon from '@mui/icons-material/PieChart';
import ContactlessIcon from '@mui/icons-material/Contactless';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

// from home


import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";


export const Sidebar = () => {


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


  // const navigate = useNavigate();

  const sidebarData = [
    {
      title:"Dashboard",
      icon:<HomeIcon/>,
      link:"/dashboard",
      forColor:"/company-website/dashboard"
    },
    {
      title:"Blog",
      icon:<RssFeedIcon/>,
      link:"/blog",
      forColor:"/company-website/blog"
    },
    {
      title:"Courses",
      icon:<MenuBookIcon/>,
      link:"/course",
      forColor:"/company-website/course"
    },
    {
      title:"Projects",
      icon:<LaptopChromebookIcon/>,
      link:"/projects",
      forColor:"/company-website/projects"
    },
    {
      title:"Reports",
      icon:<PieChartIcon/>,
      link:"/report",
      forColor:"/company-website/report"
    },
    {
      title:"Payments",
      icon:<ContactlessIcon/>,
      link:"/payment",
      forColor:"/company-website/payment"
    },
    {
      title:"Activities",
      icon:<GroupIcon/>,
      link:"/activities",
      forColor:"/company-website/activities"
    },
    {
      title:"Settings",
      icon:<SettingsIcon/>,
      link:"/settings",
      forColor:"/company-website/settings"
    },
  ]

  return (
    <div className='sidebar-container'>
      <div className='sidebar'>
        <ul className='Sidebar-List'>
        {sidebarData.map((val,i)=>{
          return(
            <li key={i}
            id={window.location.pathname === val.forColor ? "active" : ""}
            className="Sidebar-Row" onClick={()=>
            navigate(val.link)} >
              <div id='sidebar-icon'>{val.icon}</div>  
              <div id='sidebar-title'>{val.title}</div>          
            </li>
          )
        })}
        </ul>

        <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>


      </div>
    </div>
  )
}
