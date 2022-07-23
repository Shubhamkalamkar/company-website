import React from "react";
import { Sidebar } from "../components/Sidebar";
import "./sidebar-css/dashboard.css";
import { Header } from "../components/Header";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

export const Dashboard = () => {
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
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="dashboard-container">
        <div>
          <Sidebar />
        </div>
        <div className="side-boxes">
          <div className="top-box">
            <h2 className="topbox-header"><b>Intern Dashboard</b></h2>
            <h4>WelCome {userName}</h4>
            <p>
              Thanks for joining our team, DigitalGuruIndia. <br />
               We chose you from
              among all of our applicants because <br />
               we believe that you’ll do
              great things with us. <br />
               We hope you’ll always feel free to innovate, <br />
              share your thoughts and help your teammates.
            </p>
          </div>
          <div className="small-boxs">
            <div className="small-box">
              Task Alloted
              <h1>0</h1>
            </div>
            <div className="small-box">
              Task Completed
              <h1>0</h1>
            </div>
            <div className="small-box">
            Task Reviewed
            <h1>0</h1>
            </div>
            <div className="small-box">
            Score
            <h1>0</h1>
            </div>
          </div>
          <div className="process-box">
            <div className="process">
              <h2><b>Instructions</b></h2>
              <h3>15 January 2022 |</h3>
              <p>Soon Induction meeting will be arranged to Understand the work flow.</p>
              <h2>16 January 2022 |</h2>
              <p>Your first task is to Upload the Offer Letter linkdin post Link in Project Section.</p>
            </div>
          <div className="process">
            <h2><b>Application status</b></h2>
            <h4>Received Application</h4>
            <p>We received the application in the name of <br /> {userName} for web Dev Internship on 3/22/2022 .</p>
            <h2>Interview Scheduled</h2>
            <p>Our Sr. Engineer took an Interview on the basis of the skill mentioned into your application.</p>
            <h2>Payment Initiated</h2>
            <p>On your Confirmation our Accounts team Initiated the Payment Link for Application Fee.</p>
            <h2>Onboarding Confirmed</h2>
            <p>Our HR Team confirmed your application and onboarded you as an Intern at DigitalGuruIndia</p>
            <button>Read More</button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
