import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Excercise from "../components/ExcersieList";
import CreateExcersise from "../components/CreateExcersise";
import EditExcersise from "../components/EditExcercise";
import Login from "../components/login";
import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";
import Error from "../components/Error";

const App = () => {
  const [err, setErr] = useState();
  //App container
  useEffect(() => {
    const a = setTimeout(() => {
      setErr();
    }, 5000);
    return () => {
      clearInterval(a);
    };
  }, [err]);
  return (
    <div className="wrapper">
      <Error err={err} />
      <Router>
        <Switch>
          <Route path="/index.html" exact>
            <LandingPage setErr={setErr} />
          </Route>
          <Route path="/" exact>
            <LandingPage setErr={setErr} />
          </Route>
          <Route path="/Excercice">
            <Excercise />
          </Route>
          <Route path="/login">
            <Login setErr={setErr} />
          </Route>
          <Route path="/signUp">
            <SignUp setErr={setErr} />
          </Route>
          <Route path="/Dashboard">
            <Dashboard setErr={setErr} />
          </Route>

          <Route path="/edit/:id">
            <EditExcersise setErr={setErr} />
          </Route>
          <Route path="/create">
            <CreateExcersise setErr={setErr} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
