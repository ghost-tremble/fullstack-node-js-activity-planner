import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Landingpage.css";
import Navbar from "../components/Navbar";
//landing page
const LandingPage = () => {
  return (
    <div className="landing-container  row justify-content-center">
      <Navbar />
      <div className="content-landing col-md-7 order-sm-1">
        <h1>Excersice Activity Planner</h1>
        <p>
          {" "}
          As covid-19 is takinga toll on the world never forget to keep healthy
          with our Activity Planner Application
        </p>
        <div className="features">
          <p>
            {" "}
            create , Track and share your weekly excercise plans and training
            goals{" "}
          </p>
        </div>
        <div className="login">
          <div className="contain-btn">
            <div className="btn custom">
              <Link to="/login">Login</Link>{" "}
            </div>
            <div className="btn custom">
              <Link to="/signUp">signUp</Link>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="landing-image col-md-5 order--2">
        {/* <img src={Image}>
          
          </img>  */}
      </div>
    </div>
  );
};

export default LandingPage;
