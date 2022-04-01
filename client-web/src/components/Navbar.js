import React from "react";
import { Link } from "react-router-dom";
//Landing page navbar
const Navbar = () => {
  return (
    <div className="nav">
      <h3 className="nav-header">Excerise Activity Planner</h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <div>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/SignUp">SignUp</Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
