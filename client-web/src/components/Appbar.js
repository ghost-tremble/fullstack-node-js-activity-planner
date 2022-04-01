import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { Link, useHistory } from "react-router-dom";
import CreateExcersise from "./CreateExcersise";

const Appbar = ({ setModalData, setIsModalOpen, setErr }) => {
  let a = localStorage.getItem("token");
  let userName = jwt.decode(a).name;
  const [user, setUser] = useState(userName);

  const history = useHistory();
  const logOut = async () => {
    const response = await fetch("http://localhost:5000/logout");
    const data = await response.json();

    console.log(data);
    localStorage.setItem("token", data.user);
    setUser("");
    history.push("/");
    // if (data.user) {
    //   alert("login successfull");
    //   localStorage.setItem("token", data.user);
    //   window.location.href = "/Dashboard ";
    // } else {
    //   alert("please check your username and password");
    // }
  };

  return (
    <div>
      <nav className="App-bar">
        <h1>
          {" "}
          {userName} <p>Activity Planner</p>
        </h1>

        <div className="btn-group">
          <a
            className="btn custom "
            onClick={() => {
              setIsModalOpen(true);
              setModalData(
                <CreateExcersise
                  setIsModalOpen={setIsModalOpen}
                  setErr={setErr}
                />
              );
            }}>
            + add
          </a>
          <a
            onClick={() => {
              logOut();
            }}
            className="btn custom">
            log out
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Appbar;
