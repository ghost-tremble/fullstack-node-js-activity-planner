import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
import "./styles/navbar.css";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./Pages/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,

  document.getElementById("root")
);
